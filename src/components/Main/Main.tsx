import React from 'react';
import SideItem from '../SideItem/SideItem';
import FireSVG from '../../../public/fire.svg';
import FollowersSVG from '../../../public/followers.svg';

import styles from '../../styles/main.module.css';
import Post from '../Post/Post';

const Main = () => {
  return (
    <div className={styles.mainWrapper}>
        <div className={styles.mainLeft}>
          <div className={styles.mainLeftContainer}>
            <div className={styles.mainLeftWrapper}>
              <div className={styles.leftMain}>
                <SideItem icon={<FireSVG />} header='Trending' subHeader='' path='/' />
                <SideItem icon={<FollowersSVG />} header='Following' subHeader=''path='/following' />
              </div>
              <div className={styles.separator} />
              <div className={styles.leftLogin}>
                <h2>Login to like videos, interact with creators, and see comments</h2>
                <button>Login</button>
              </div>
              <div className={styles.separator} />
              <div className={styles.leftFeatured}>
                <h2>Featured Creators</h2>
                <SideItem icon="" header='Vernon Neilly III' subHeader='@neillydev' path='/' />
                <SideItem icon="" header='Pistachio The Cat' subHeader='@pistachio' path='/' />
              </div>
              <div className={styles.separator} />
              <div className={styles.leftSurf}>

              </div>
              <div className={styles.leftFooter}></div>
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