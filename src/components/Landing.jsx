import React, { useEffect, useState } from 'react';

//API
import { getCoins } from '../services/api';

//Gif
import loader from '../assets/loader.gif'

//Components
import Coin from './Coin';

//Styles
import styles from './Landing.module.css';

const Landing = () => {

    const [coins , setCoins] = useState([]);
    const [search , setSearch] = useState('');

    useEffect(() => {
        const fetchAPI =  () => {
            getCoins()
            .then(data => setCoins(data))
            .catch( error => alert(`${error.message} : Check your connection or try again later`))
        }
        fetchAPI()
    },[])

    const searchHandler = event => {
        setSearch(event.target.value);
    }

    console.log(coins)

    const searchedCoins = coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className={styles.container}>
            <input className={styles.input} type='text' placeholder='Search coins' value={search} onChange={searchHandler}/>
            <div className={styles.coinsContainer}>
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
                    <img src={loader} alt="loader" />
                }
            </div>
        </div>
    );
};

export default Landing;