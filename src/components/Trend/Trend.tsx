import React from 'react';

import FireSVG from '../../../public/fire.svg';

import styles from '../../styles/Trend/Trend.module.css';
import { useRouter } from 'next/router';

type TrendProps = {
    title: string;
    path: string;
};

const Trend = ({ title, path }: TrendProps) => {
    const router = useRouter();

    return (
        <a href={`/explore?q=${path}`} className={styles.trendTag} onClick={() => router.push(`/explore?q=${path}`)}>
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