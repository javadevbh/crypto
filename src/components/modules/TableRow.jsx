import React from "react";

//Styles
import styles from "./TableRow.module.css"

//Images
import chartUp from "../../assets/chart-up.svg";
import chartDown from "../../assets/chart-down.svg";

function TableRow({
  coin: {
    image,
    symbol,
    name,
    current_price,
    price_change_percentage_24h: price_change,
    total_volume,
  },
}) {
  return (
    <tr>
      <td>
        <div className={styles.symbol}>
          <img src={image} alt="coin-image" />
          <span>{symbol.toUpperCase()}</span>
        </div>
      </td>
      <td>{name}</td>
      <td>${current_price.toLocaleString()}</td>
      <td className={price_change > 0 ? styles.ascending : styles.descending}>{price_change.toFixed(2)}%</td>
      <td>{total_volume.toLocaleString()}</td>
      <td>
        <img src={price_change > 0 ? chartUp : chartDown} alt="change chart" />
      </td>
    </tr>
  );
}

export default TableRow;
