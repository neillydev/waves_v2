import React, { useEffect, useState } from "react";

import FireSVG from "../../../public/fire.svg";
import FollowersSVG from "../../../public/followers.svg";
import VideoSVG from "../../../public/video.svg";

import styles from "../../styles/SideBar/SideBar.module.css";
import { ViewType } from "../Main/Main";

type SideBarProps = {
  viewType: ViewType;
};

const SideBar = ({ viewType }: SideBarProps) => {
  const [featuredUsers, setFeaturedUsers] = useState<any>([]);

  const handleFetchFeatured = async () => {
    //start loading animation and skeleton screen
    try {
      const response = await fetch("/api/featured", {
        method: "GET",
      });

      if (response.status === 200) {
        const data = await response.json();
        setFeaturedUsers(data);
        setTimeout(() => {
          //loading_dispatch({ loading: true, type: "bar" });
        }, 200);
      } else {
        // switch errors and handle accordingly
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleFetchFeatured();
  }, []);

  return (
    <div className={styles.sideBarContainer}>
      <div className={styles.sideBarWrapper}>
        <div className={styles.sideBarControlsWrapper}>
          <div className={styles.sideBarItem}>
            <FireSVG
              className={viewType !== ViewType.TRENDING || styles.selected}
            />
          </div>
          <div className={styles.sideBarItem}>
            <FollowersSVG
              className={viewType !== ViewType.FOLLOWING || styles.selected}
            />
          </div>
          <div className={styles.sideBarItem}>
            <VideoSVG
              className={viewType !== ViewType.LIVE || styles.selected}
            />
          </div>
        </div>
        <span className={styles.separator} />
        <ul className={styles.featuredAccountList}>
          {featuredUsers.length > 0
            ? featuredUsers.map((user: any) => (
                <li className={styles.featuredAccountItem}>
                  <a href={`/@${user.username}`} className={styles.account}>
                    <img src={user.avatar} alt={user.name} />
                  </a>
                </li>
              ))
            : null}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
