import React from 'react';
import WaveSVG from '../../../public/wave.svg'

import styles from '../../styles/Navbar/Navbar.module.css';

const Navbar = () => {
  return (
    <div className={styles.navContainer}>
        <div className={styles.navWrapper}>
          <div className={styles.navLeft}>
            <a href="/" className={styles.navLogo}>
              <WaveSVG className={styles.navSvg} />
            </a>
          </div>
          <div className={styles.navCenter}>

          </div>
          <div className={styles.navRight}>

          </div>
        </div>
    </div>
  )
}

export default Navbar;