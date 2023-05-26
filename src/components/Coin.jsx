import React from 'react';

//Styles
import styles from './Coin.module.css';

const Coin = ({name,image,symbol,price,marketCap,priceChange}) => {
    return (
        <div className={styles.coinContainer}>
            <img src={image} alt={name} />
            <span className={styles.coinName}>{name}</span>
            <span className={styles.symbol}>{symbol.toUpperCase()}</span>
            <span title='Price'>${price && price.toLocaleString()}</span>
            <span title='Price change percentage 24h' className={priceChange < -5 ? styles.highRed: (priceChange < -3 ? styles.mediumRed : (priceChange < 0 ? styles.lowRed : (priceChange > 5 ? styles.highGreen : (priceChange > 3 ? styles.mediumGreen : (priceChange > 0 && styles.lowGreen))))) }>{priceChange && priceChange.toFixed(2)}%</span>
            <span className={styles.marketCap} title='Market cap'>{marketCap && marketCap.toLocaleString()}</span>
        </div>
    );
};

export default Coin;