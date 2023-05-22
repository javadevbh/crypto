import React, { useEffect, useState } from 'react';

//API
import { getCoins } from '../services/api';

//Gif
import loader from '../assets/loader.gif'

//Components
import Coin from './Coin';

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

    const searchedCoins = coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <div>
            <input type='text' placeholder='Search' value={search} onChange={searchHandler}/>
            {   coins.length ?
                searchedCoins.map(coin => <Coin
                    key={coin.id}
                    name={coin.name}
                    image={coin.image}
                    symbol={coin.symbol}
                    price={coin.current_price}
                    marketCap={coin.market_cap}
                    priceChange={coin.price_change_percentage_24}
                />):
                <img src={loader} alt="loader" />
            }
        </div>
    );
};

export default Landing;