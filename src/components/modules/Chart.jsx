import React, { useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

//Styles
import styles from "./Chart.module.css";

//Helpers
import { convertData } from "../../helpers/convertData";
import { currencySymbol } from "../../helpers/currencySymbol";

function Chart({ chart, setChart, currency }) {
  const [type, setType] = useState("prices");
  const { name, image, ath, current_price, market_cap } = chart.coin;

  //Handlers
  const typeHandler = (event) => {
    if (event.target.tagName === "BUTTON") {
      const type = event.target.innerText.toLowerCase().replace(" ", "_");
      setType(type);
    }
  };
  return (
    <div className={styles.container}>
      <span onClick={() => setChart(null)} className={styles.closeBtn}>
        X
      </span>
      <div className={styles.chart}>
        <header>
          <img src={image} alt="coin-image" />
          <h2>{name}</h2>
        </header>
        <div className={styles.graph}>
          <ChartComponent data={convertData(chart, type)} type={type} />
        </div>
        <div
          className={styles.buttonsContainer}
          onClick={(event) => typeHandler(event)}
        >
          <button className={type == "prices" ? styles.activeBtn : null}>
            Prices
          </button>
          <button className={type == "market_caps" ? styles.activeBtn : null}>
            Market Caps
          </button>
          <button className={type == "total_volumes" ? styles.activeBtn : null}>
            Total Volumes
          </button>
        </div>
        <footer>
          <p>
            Price:{" "}
            <span>
              {currencySymbol(currency)}
              {current_price}
            </span>
          </p>
          <p>
            ATH:{" "}
            <span>
              {currencySymbol(currency)}
              {ath}
            </span>
          </p>
          <p>
            Market Cap:{" "}
            <span>
              {currencySymbol(currency)}
              {market_cap}
            </span>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default Chart;

const ChartComponent = ({ data, type }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={400} height={400} data={data}>
        <Line
          type="monotone"
          dataKey={type}
          stroke="#3874ff"
          strokeWidth="2px"
        />
        <CartesianGrid stroke="#404042" />
        <YAxis dataKey={type} domain={["auto", "auto"]} />
        <XAxis dataKey="date" hide />
        <Legend />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};
