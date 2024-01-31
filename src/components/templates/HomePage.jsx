import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//APIs
import { getCoinList } from "../../services/cryptoAPI";

//Components
import TableCoin from "../modules/TableCoin";
import Pagination from "../modules/Pagination";
import Search from "../modules/Search";
import Chart from "../modules/Chart";

//Helpers
import notify from "../../helpers/toastify";

function HomePage() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("usd");
  const [chart, setChart] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      try {
        const res = await fetch(getCoinList(page, currency));
        const json = await res.json();
        setCoins(json);
        setIsLoading(false);
      } catch (error) {
        notify(error.message);
      }
    };
    getData();
  }, [page, currency]);
  return (
    <>
      <Search currency={currency} setCurrency={setCurrency} />
      <TableCoin coins={coins} isLoading={isLoading} currency={currency} setChart={setChart} />
      <Pagination setPage={setPage} page={page} />
      <ToastContainer />
      {!!chart && <Chart chart={chart} setChart={setChart} />}
    </>
  );
}

export default HomePage;
