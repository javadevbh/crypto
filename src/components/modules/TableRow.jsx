import React from "react";

//API
import { marketChartCoin } from "../../services/cryptoAPI";

//Styles
import styles from "./TableRow.module.css";

//Images
import chartUp from "../../assets/chart-up.svg";
import chartDown from "../../assets/chart-down.svg";

//Helpers
import { currencySymbol } from "../../helpers/currencySymbol";

function TableRow({ currency, setChart, coin }) {
  const {
    id,
    image,
    symbol,
    name,
    current_price,
    price_change_percentage_24h: price_change,
    total_volume,
  } = coin;
  //Handlers
  const showChartHandler = () => {
    const fetchMarketChart = async (id) => {
      try {
        const res = await fetch(marketChartCoin(id));
        const json = await res.json();
        setChart({ ...json, coin });
      } catch (error) {
        setChart(null);
        console.log(error.message);
      }
    };
    fetchMarketChart(id);
  };
  return (
    <tr>
      <td>
        <div onClick={showChartHandler} className={styles.symbol}>
          <img src={image} alt="coin-image" />
          <span>{symbol.toUpperCase()}</span>
        </div>
      </td>
      <td>{name}</td>
      <td>
        {currencySymbol(currency)}
        {current_price.toLocaleString()}
      </td>
      <td className={price_change > 0 ? styles.ascending : styles.descending}>
        {price_change.toFixed(2)}%
      </td>
      <td>
        {currencySymbol(currency)}
        {total_volume.toLocaleString()}
      </td>
      <td>
        <img src={price_change > 0 ? chartUp : chartDown} alt="change chart" />
      </td>
    </tr>
  );
}

export default TableRow;
