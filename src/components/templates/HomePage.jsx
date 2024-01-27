import React, { useEffect, useState } from "react";

//APIs
import { getCoinList } from "../../services/cryptoAPI";

//Components
import TableCoin from "../modules/TableCoin";
import Pagination from "../modules/Pagination";

function HomePage() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      const res = await fetch(getCoinList(page));
      const json = await res.json();
      setCoins(json);
      setIsLoading(false);
    };
    getData();
  }, [page]);
  return (
    <>
      <TableCoin coins={coins} isLoading={isLoading} />
      <Pagination setPage={setPage} page={page} />
    </>
  );
}

export default HomePage;
