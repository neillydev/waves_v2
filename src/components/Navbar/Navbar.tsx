import { ModalContext } from '@/context/ModalContext';
import React, { useContext } from 'react';
import WaveSVG from '../../../public/wave.svg';

import styles from '../../styles/Navbar/Navbar.module.css';

const Navbar = () => {
  const { modalDispatch } = useContext(ModalContext);
  return (
    <div className={styles.navContainer}>
        <div className={styles.navWrapper}>
          <div className={styles.navLeft}>
            <a href="/" className={styles.navLogo}>
              <WaveSVG className={styles.navSvg} />
              <h2>Waves</h2>
            </a>
          </div>
          <div className={styles.navCenter}>
            <form action="/search" className={styles.navSearchForm}>
              <input placeholder="Surf creators and videos" autoComplete="off" type="search" className={styles.navSearch} />
            </form>
          </div>
          <div className={styles.navRight}>
            <button className={styles.loginBtn} onClick={() => modalDispatch({type: true})}>
              Login
            </button>
          </div>
        </div>
    </div>
  )
}

export default Navbar;