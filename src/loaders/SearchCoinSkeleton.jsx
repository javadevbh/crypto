import React from "react";
import styles from "./SearchCoinSkeleton.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SearchCoinSkeleton({ coins }) {
  return Array(coins)
    .fill(0)
    .map((_, i) => (
      <div key={i} className={styles.coinSkeleton}>
        <Skeleton className={styles.circle} circle width={25} height={25} />
        <Skeleton className={styles.row} />
      </div>
    ));
}

export default SearchCoinSkeleton;
