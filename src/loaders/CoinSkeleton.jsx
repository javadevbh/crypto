import React from 'react';
import styles from './CoinSkeleton.module.css'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const CoinSkeleton = ({coins}) => {
    return (
        Array(coins).fill(0).map(( _ , i ) => (
            <div key={i} className={styles.coinSkeleton}>
                <Skeleton className={styles.circle} circle width={35} height={35}/>
                <Skeleton className={styles.row}/>
            </div>
        ))
    );
};

export default CoinSkeleton;