import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//API
import { searchCoin } from "../../services/cryptoAPI";

//Helpers
import notify from "../../helpers/toastify";

function Search({ currency, setCurrency }) {
  const [text, setText] = useState("");
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    setCoins([])
    if (!text) return;
    const fetchCoins = async (text) => {
      try {
        const res = await fetch(searchCoin(text), {
          signal: controller.signal,
        });
        const json = await res.json();
        if (json.coins) {
          setCoins(json.coins);
        } else {
          notify(json.status.error_message);
        }
      } catch (error) {
        if (error.name != "AbortError") notify(error.message);
      }
    };
    fetchCoins(text);

    //cleanup function
    return () => controller.abort();
  }, [text]);

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <select onChange={(e) => setCurrency(e.target.value)} value={currency}>
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="jpy">JPY</option>
      </select>
      <div>
        <ul>
          {coins.map(coin => (<li key={coin.id}>
            <img src={coin.thumb} alt={coin.name} />
            <p>{coin.name}</p>
          </li>))}
        </ul>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Search;
