import React, { useEffect, useState } from "react";

import styles from "../../styles/Explore/Explore.module.css";
import { useRouter } from "next/router";

export enum ExploreViewType {
  TOP,
  CREATORS,
  VIDEOS,
}

const Explore = () => {
  const router = useRouter();
  const { q } = router.query;

  const [viewType, setViewType] = useState<ExploreViewType>(
    ExploreViewType.TOP
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const qParam = params.get('q');
    if (!qParam) {
      router.push("/");
    }
  }, [q, router]);

  if (!q) {
    return null;
  }

  return (
    <div className={styles.exploreContainer}>
      <div className={styles.exploreWrapper}>
        <div className={styles.exploreTabsWrapper}>
          <ul className={styles.exploreTabsList}>
            <li
              className={`${styles.exploreTabsItem} ${
                viewType !== ExploreViewType.TOP || styles.selected
              }`}
              onClick={() => setViewType(ExploreViewType.TOP)}
            >
              <span>Top</span>
            </li>
            <li
              className={`${styles.exploreTabsItem} ${
                viewType !== ExploreViewType.CREATORS || styles.selected
              }`}
              onClick={() => setViewType(ExploreViewType.CREATORS)}
            >
              <span>Creators</span>
            </li>
            <li
              className={`${styles.exploreTabsItem} ${
                viewType !== ExploreViewType.VIDEOS || styles.selected
              }`}
              onClick={() => setViewType(ExploreViewType.VIDEOS)}
            >
              <span>Videos</span>
            </li>
          </ul>
        </div>
        <div className={styles.exploreBody}></div>
      </div>
    </div>
  );
};

export default Explore;
