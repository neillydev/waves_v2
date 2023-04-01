import { AuthContext } from '@/context/AuthContext';
import { ModalContext } from '@/context/ModalContext';
import React, { useContext, useEffect, useState } from 'react';
import WaveSVG from '../../../public/wave.svg';
import UserSVG from '../../../public/user.svg';

import styles from '../../styles/Navbar/Navbar.module.css';
import Dropdown from '../Dropdown/Dropdown';

const Navbar = () => {
  const { authState } = useContext(AuthContext);
  const { modalState, modalDispatch } = useContext(ModalContext);
  const [avatar, setAvatar] = useState<string | undefined>();

  useEffect(() => {
    if (!avatar) {
        setAvatar(localStorage?.getItem('avatar') || 'https://surfwaves.b-cdn.net/user_picture.png');
    }
  }, [])

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
          <button className={styles.uploadBtn} onClick={() => { 
            if(!authState) {
              modalDispatch({ type: true });
            }
          }}>
            Upload
          </button>
          {
            !authState ?
              <button className={styles.loginBtn} onClick={() => modalDispatch({ type: true })}>
                Login
              </button>
              :
              <div style={
                {
                  backgroundImage: `url(${avatar})`,
                }
              } className={styles.profileBtn}>
                <Dropdown />
              </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar;