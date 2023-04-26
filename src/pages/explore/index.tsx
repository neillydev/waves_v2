import React, { useState } from "react";

import styles from "../../styles/Explore/Explore.module.css";

export enum ExploreViewType {
  TOP,
  CREATORS,
  VIDEOS,
}

const Explore = () => {
    const [viewType, setViewType] = useState<ExploreViewType>(ExploreViewType.TOP);

  return (
    <div className={styles.exploreContainer}>
      <div className={styles.exploreWrapper}>
        <div className={styles.exploreTabsWrapper}>
          <ul className={styles.exploreTabsList}>
            <li 
            className={`${styles.exploreTabsItem} ${viewType !== ExploreViewType.TOP || styles.selected}`}
            onClick={() => setViewType(ExploreViewType.TOP)}>
              <span>Top</span>
            </li>
            <li 
            className={`${styles.exploreTabsItem} ${viewType !== ExploreViewType.CREATORS || styles.selected}`}
            onClick={() => setViewType(ExploreViewType.CREATORS)}>
              <span>Creators</span>
            </li>
            <li 
            className={`${styles.exploreTabsItem} ${viewType !== ExploreViewType.VIDEOS || styles.selected}`}
            onClick={() => setViewType(ExploreViewType.VIDEOS)}>
              <span>Videos</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Explore;
