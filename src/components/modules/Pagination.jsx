import React from "react";

//Styles
import styles from "./Pagination.module.css";

function Pagination({ setPage, page }) {
  //Handlers
  const previousHandler = () => {
    if (page <= 1) return;
    setPage((page) => page - 1);
  };
  const nextHandler = () => {
    if (page >= 10) return;
    setPage((page) => page + 1);
  };
  const changePageHandler = (e) => {
    const text = +e.target.innerHTML;
    setPage(text)
  }
  return (
    <div className={styles.paginationContainer}>
      <button className={page <= 1 ? styles.disable : null} onClick={previousHandler}>Previous</button>
      <p onClick={changePageHandler} className={page == 1 ? styles.selected : null}>1</p>
      <p onClick={changePageHandler} className={page == 2 ? styles.selected : null}>2</p>
      {page > 2 && page < 9 && (
        <>
          <span>...</span>
          <p className={styles.selected}>{page}</p>
        </>
      )}
      <span>...</span>
      <p onClick={changePageHandler} className={page == 9 ? styles.selected : null}>9</p>
      <p onClick={changePageHandler} className={page == 10 ? styles.selected : null}>10</p>
      <button className={page >= 10 ? styles.disable : null} onClick={nextHandler}>Next</button>
    </div>
  );
}

export default Pagination;
