import React from "react";

//Styles
import styles from "./Chart.module.css";

function Chart({ chart, setChart }) {
  return (
    <div className={styles.container}>
      <span onClick={() => setChart(null)} className={styles.closeBtn}>
        X
      </span>
      <div className={styles.chart}></div>
    </div>
  );
}

export default Chart;
