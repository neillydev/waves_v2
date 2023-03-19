import React from 'react';

import FireSVG from '../../../public/fire.svg';

import styles from '../../styles/Trend/Trend.module.css';

type TrendProps = {
    title: string;
};

const Trend = ({ title }: TrendProps) => {
    return (
        <a href="/" className={styles.trendTag}>
            <div className={styles.trendContainer}>
                <div className={styles.trendIcon}>
                    <FireSVG />
                </div>
                <p className={styles.trendTitle}>
                    {title}
                </p>
            </div>
        </a>
    )
}

export default Trend