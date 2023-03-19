import React from 'react';

import FireSVG from '../../../public/fire.svg';
import FollowersSVG from '../../../public/followers.svg';

import styles from '../../styles/SideBar/SideBar.module.css';

const SideBar = () => {
    return (
        <div className={styles.sideBarContainer}>
            <div className={styles.sideBarWrapper}>
                <div className={styles.sideBarItem}>
                    <FireSVG />
                </div>
                <div className={styles.sideBarItem}>
                    <FollowersSVG />
                </div>
                <span className={styles.separator} />
                <ul className={styles.featuredAccountList}>
                    <li className={styles.featuredAccountItem}>
                        <a href="/@neillydev" className={styles.account}>
                            <img src="https://surfwaves.b-cdn.net/neillydev.png" alt="Vernon Neilly III" />
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SideBar