import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Styles
import styles from "./Search.module.css";

//API
import { searchCoin } from "../../services/cryptoAPI";

//Helpers
import notify from "../../helpers/toastify";

//Skeleton Loader
import SearchCoinSkeleton from "../../loaders/SearchCoinSkeleton";

function Search({ currency, setCurrency }) {
  const [text, setText] = useState("");
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setCoins([]);
    if (!text) return;
    setIsLoading(true);
    const fetchCoins = async (text) => {
      try {
        const res = await fetch(searchCoin(text), {
          signal: controller.signal,
        });
        const json = await res.json();
        if (json.coins) {
          setCoins(json.coins);
          setIsLoading(false);
        } else {
          notify(json.status.error_message,"error");
        }
      } catch (error) {
        if (error.name != "AbortError") notify(error.message,"error");
      }
    };
    fetchCoins(text);

    //cleanup function
    return () => {
      controller.abort();
      setIsLoading(false);
    };
  }, [text]);

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Search"
      />
      <select onChange={(e) => setCurrency(e.target.value)} value={currency}>
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="jpy">JPY</option>
      </select>
      <div className={text ? styles.searchResult : null}>
        <ul>
          {isLoading && <SearchCoinSkeleton coins={10} />}
          {coins.map((coin) => (
            <li key={coin.id}>
              <img src={coin.thumb} alt={coin.name} />
              <p>{coin.name}</p>
              <span title="Market Cap Rank">#{coin.market_cap_rank}</span>
            </li>
          ))}
        </ul>
      </div>
      <ToastContainer theme="dark" />
    </div>
  );
}

export default Search;
