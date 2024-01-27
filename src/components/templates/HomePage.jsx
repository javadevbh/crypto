import React, { useEffect, useState } from "react";

//APIs
import { getCoinList } from "../../services/cryptoAPI";

//Components
import TableCoin from "../modules/TableCoin";

//Loader
import CoinSkeleton from "../../loader/CoinSkeleton";

function HomePage() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(getCoinList());
      const json = await res.json();
      setCoins(json);
      setIsLoading(false);
    };
    getData();
  }, []);
  return <div>{isLoading ? <CoinSkeleton coins={20} /> : <TableCoin coins={coins} />}</div>;
}

export default HomePage;
