import React from 'react';
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
                <span>Profile</span>
            </li>
            <li className={styles.dropItem}>
                <span>Settings</span>
            </li>
            <span className={styles.separator}></span>
            <li className={styles.dropItem}>
                <span>Log Out</span>
            </li>
        </ul>
    </div>
  )
}

export default Dropdown