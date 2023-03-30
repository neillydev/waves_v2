import React from 'react';

import UserSVG from '../../../public/user.svg';
import CogSVG from '../../../public/cog.svg';
import LogOutSVG from '../../../public/logout.svg';

import styles from '../../styles/Navbar/Navbar.module.css';

const Dropdown = () => {
  return (
    <div className={styles.dropContainer}>
        <div className={styles.dropWrapper}>
            
        </div>
        <ul className={styles.dropList}>
            <li className={styles.dropHeader}>
            </li>
            <li className={styles.dropItem}>
                <UserSVG />
                <span>Profile</span>
            </li>
            <li className={styles.dropItem}>
                <CogSVG />
                <span>Settings</span>
            </li>
            <span className={styles.separator}></span>
            <li className={styles.dropItem}>
                <LogOutSVG />
                <span>Log Out</span>
            </li>
        </ul>
    </div>
  )
}

export default Dropdown