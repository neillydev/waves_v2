import React from 'react';
import SideItem from '../SideItem/SideItem';
import FireSVG from '../../../public/fire.svg';
import FollowersSVG from '../../../public/followers.svg';

import styles from '../../styles/main.module.css';

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

              </div>
              <div className={styles.leftFeatured}>

              </div>
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

          </div>
        </div>
    </div>
  )
};

export default Main;