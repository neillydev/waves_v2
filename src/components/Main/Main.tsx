import React, { useContext, useEffect, useState } from 'react';
import SideItem from '../SideItem/SideItem';

import { ModalContext } from '@/context/ModalContext';

import FireSVG from '../../../public/fire.svg';
import FollowersSVG from '../../../public/followers.svg';

import styles from '../../styles/main.module.css';
import Post from '../Post/Post';
import Trend from '../Trend/Trend';
import SideBar from '../SideBar/SideBar';
import { AuthContext } from '@/context/AuthContext';

enum ViewType {
  TRENDING,
  FOLLOWING
};

const Main = () => {
  const { authState } = useContext(AuthContext);
  const { modalDispatch } = useContext(ModalContext);

  const [viewType, setViewType] = useState<ViewType>(ViewType.TRENDING);

  useEffect(() => {
    window.scrollTo(0, 0);

    switch (viewType) {
      case ViewType.FOLLOWING:
        //handleFetchFollowingPosts();
        break;
      case ViewType.TRENDING:
        //handleFetchPosts();
        break;
      default:
        break;
    }
  }, [viewType]);

  return (
    <div className={styles.mainWrapper}>
      <SideBar />
      <div className={styles.mainLeft}>
        <div className={styles.mainLeftContainer}>
          <div className={styles.mainLeftWrapper}>
            <div className={styles.leftMain}>
              <SideItem icon={<FireSVG className={viewType !== ViewType.TRENDING || styles.selectedSvg} />} header='Trending' subHeader='' path='/' account={false} selected={viewType === ViewType.TRENDING} />
              <SideItem icon={<FollowersSVG className={viewType !== ViewType.FOLLOWING || styles.selectedSvg} />} header='Following' subHeader='' path='/following' account={false} selected={viewType === ViewType.FOLLOWING} />
            </div>

            {authState ? <></> : <>
              <div className={styles.separator} /><div className={styles.leftLogin}>
                <h2>Login to like videos, interact with creators, and see comments</h2>
                <button onClick={() => modalDispatch({ type: true })}>Login</button>
              </div></>}
            <div className={styles.separator} />
            <div className={styles.leftSection}>
              <h2 className={styles.leftTitle}>Featured Creators</h2>
              <SideItem icon="https://surfwaves.b-cdn.net/neillydev.png" header='Vernon Neilly III' subHeader='@neillydev' path='/' account />
              <SideItem icon="https://images.unsplash.com/photo-1615789591457-74a63395c990?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9tZXN0aWMlMjBjYXR8ZW58MHx8MHx8&w=1000&q=80" header='Pistachio The Cat' subHeader='@pistachio' path='/' account />
            </div>
            <div className={styles.separator} />
            <div className={styles.leftSection}>
              <h2 className={styles.leftTitle}>Surf Trends</h2>
              <div className={styles.trendsWrapper}>
                <Trend title='waves' />
                <Trend title='surf' />
              </div>
            </div>
            <div className={styles.separator} />
            <div className={styles.leftSection}>
              <div className={styles.leftSubRow}>
                <a href='/about' className={`${styles.leftSubtitle} ${styles.leftSublink}`}>About</a>
                <a href='/contact' className={`${styles.leftSubtitle} ${styles.leftSublink}`}>Contact</a>
              </div>
              <h3 className={styles.leftSubtitle}>© 2023 Waves</h3>
            </div>
          </div>
          <div className={styles.mainLeftScroll}>

          </div>
        </div>
      </div>
      <div className={styles.mainRight}>
        <div className={styles.mainRightWrapper}>
          <Post profileImg='https://images.unsplash.com/photo-1615789591457-74a63395c990?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9tZXN0aWMlMjBjYXR8ZW58MHx8MHx8&w=1000&q=80'
            username='pistachio'
            name='Pistachio The Cat'
            mediaSrc='https://surfwaves.b-cdn.net/cat_video_example.mp4'
            caption='Pistachio moves in silence #pistachio #trending #cats #waves'
            soundCaption='pistachio'
            soundSrc='' />
        </div>
      </div>
    </div>
  )
};

export default Main;