import { AuthContext } from '@/context/AuthContext';
import { ModalContext } from '@/context/ModalContext';
import React, { useContext, useEffect, useState } from 'react';
import WaveSVG from '../../../public/wave.svg';
import SearchSVG from '../../../public/search.svg';

import styles from '../../styles/Navbar/Navbar.module.css';
import Dropdown from '../Dropdown/Dropdown';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = () => {
  const router = useRouter();
  const { q } = router.query;
  const { authState } = useContext(AuthContext);
  const { modalState, modalDispatch } = useContext(ModalContext);
  const [avatar, setAvatar] = useState<string | undefined>();
  const [search, setSearch] = useState<string>()

  const handleSearch = (e: any) => {
    e.preventDefault();
    router.push(`/explore?q=${search}`);
  };

  useEffect(() => {
    setAvatar(localStorage?.getItem('avatar') || 'https://surfwaves.b-cdn.net/user_picture.png');
  }, []);

  return (
    <div className={styles.navContainer}>
      <div className={styles.navWrapper}>
        <div className={styles.navLeft}>
          <a href="/" className={styles.navLogo}>
            <WaveSVG className={styles.navSvg} />
            <h2>Waves</h2>
          </a>
        </div>
        <div className={`${styles.navDisabled} ${styles.navCenter}`}>
          <form className={styles.navSearchForm} onSubmit={handleSearch} >
            <SearchSVG />
            <span className={styles.navSearchSeparator}></span>
            <input placeholder={"Search videos or accounts"} autoComplete="off" type="search" className={styles.navSearch}
            value={q && typeof search !== 'string' ? q.toString() : search}
            onChange={(e: any) => {
              let value: string = e.currentTarget.value;
              if(value.includes('#')) value = value.split('#')[1];
              setSearch(value)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch(e);
              }
            }} 
            />
          </form>
        </div>
        <div className={styles.navRight}>
          <Link href="/upload" className={styles.link} onClick={(e) => {
              if (!authState) {
                e.preventDefault();
                modalDispatch({ type: true });
              }
            }}>
            <button className={styles.uploadBtn}>
              Upload
            </button>
          </Link>
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