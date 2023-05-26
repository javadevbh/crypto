import React, { useEffect, useState } from "react";

//Infinite scroll
import InfiniteScroll from "react-infinite-scroll-component";

//Skeleton
import CoinSkeleton from "./CoinSkeleton";

//API
import { getCoins } from "../services/api";

//Gif
import loader from "../assets/loader.gif";

//Components
import Coin from "./Coin";

//Styles
import styles from "./Landing.module.css";
import axios from "axios";

const Landing = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("market_cap_desc");
  const [hasMore , setHasMore] = useState(true);
  const [page , setPage] = useState(2);

  useEffect(() => {
    const fetchAPI = () => {
      getCoins(filter)
        .then((data) => setCoins(data))
        .catch((error) =>
          alert(`${error.message} : Check your connection or try again later`)
        );
    };
    fetchAPI();
  }, [filter]);

  console.log(coins)

  const fetchCoins = async () => {
    const res = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=${filter}&per_page=50&page=${page}&sparkline=false&locale=en`);
    return res.data
  };

  const fetchData = async () => {
   const coinsForServer = await fetchCoins();
   setCoins([...coins, ...coinsForServer]);
   if(coinsForServer === 0 || coinsForServer < 20){
    setHasMore(false);
   }
   setPage(page + 1);
  }

  const searchHandler = (event) => {
    setSearch(event.target.value);
  };
  const searchedCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  const filterHandler = (event) => {
    setFilter(event.target.value);
  };

  return (
    <InfiniteScroll
      style={{textAlign : "center"}}
      dataLength={coins.length}
      next={fetchData}
      hasMore={hasMore}
      loader={<img style={{width : "250px"}} src={loader} alt="loader"/>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      {
        <div className={styles.container}>
            <p style={{textAlign : 'center' , marginTop : '15px'}}>Made by <a href="https://github.com/javadevbh/" target="blank">Javad Bahrami</a>&#127775;</p>
            <input className={styles.input} type='text' placeholder='Search coins' value={search} onChange={searchHandler}/>
            <label>Filter by :</label>
            <select className={styles.filter} value={filter} onChange={filterHandler}>
                <option value="market_cap_asc">Market Cap asc</option>
                <option value="market_cap_desc">Market Cap desc</option>
                <option value="volume_asc">Volume asc</option>
                <option value="volume_desc">Volume desc</option>
                <option value="id_asc">ID asc</option>
                <option value="id_desc">ID desc</option>
            </select>
            <div className={styles.coinsContainer}>
                <div className={styles.tableHeader}>
                    <span className={styles.headerCoin}>Coin</span>
                    <span className={styles.headerPrice}>Price</span>
                    <span className={styles.headerChangeP}>24h</span>
                    <span className={styles.headerMarket}>Mkt Cap</span>
                </div>
                {   coins.length ?
                    searchedCoins.map(coin => 
                    <Coin
                        key={coin.id}
                        name={coin.name}
                        image={coin.image}
                        symbol={coin.symbol}
                        price={coin.current_price}
                        priceChange={coin.price_change_percentage_24h}
                        marketCap={coin.market_cap}
                    />):
                    <CoinSkeleton coins={20}/>
                }
            </div>
        </div>
      }
    </InfiniteScroll>
  );
};

export default Landing;
