import React, { useEffect, useRef, useState } from "react";

import styles from "../../styles/Explore/Explore.module.css";
import loaders from "../../styles/loaders.module.css";
import { useRouter } from "next/router";
import { PostProps } from "@/components/Post/Post";
import ExplorePost from "@/components/ExplorePost/ExplorePost";

import SurfboardSVG from "../../../public/surfboard.svg";

export enum ExploreViewType {
  TOP,
  CREATORS,
  VIDEOS,
}

const Explore = () => {
  const router = useRouter();
  const { q } = router.query;
  const videoRefs = useRef<any>({});

  const [viewType, setViewType] = useState<ExploreViewType>(
    ExploreViewType.TOP
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [posts, setPosts] = useState<any[]>([]);
  const [enlarge, setEnlarge] = useState(false);

  const handleMouseEnter = (post_id: string) => {
    if (videoRefs.current[post_id]) {
      videoRefs.current[post_id].currentTime = 0;
      videoRefs.current[post_id].play();
    }
  };

  const handleMouseLeave = (post_id: string) => {
    if (videoRefs.current[post_id]) {
      videoRefs.current[post_id].currentTime = 0;
      videoRefs.current[post_id].pause();
    }
  };

  const handleFetchExplore = async () => {
    //start loading animation and skeleton screen
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token") || "";
      const header = token ? { Authorization: `Bearer ${token}` } : undefined;
      const response = await fetch(`/api/explore?q=${q}`, {
        method: "GET",
        headers: {
          ...header,
        },
      });

      if (response.status === 200) {
        const data = await response.json(); //Data is dependent on what is returned from the trending algorithm

        setPosts(data);

        setTimeout(() => {
          //loading_dispatch({ loading: true, type: "bar" });
        }, 200);
      } else {
        // switch errors and handle accordingly
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const qParam = params.get("q");
    if (!qParam) {
      router.push("/");
      return;
    }

    if (q) {
      handleFetchExplore();
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
        <div
          className={`${styles.exploreBody} ${
            isLoading || (posts.length === 0 && !isLoading) ? loaders.loadingJustify : ""
          }`}
        >
          {viewType !== ExploreViewType.CREATORS ? (
            isLoading ? (
              <div className={loaders.loader}></div>
            ) : posts.length > 0 ? (
              posts.map((post: any) => (
                <ExplorePost
                  postID={post.postID}
                  profileImg={post.profileImg}
                  username={post.username}
                  mediaSrc={post.media}
                  caption={post.caption}
                  setEnlarge={setEnlarge}
                />
              ))
            ) : (
              <span className={styles.nothingFound}>
                <SurfboardSVG />
                Nothing found. Keep surfing!
              </span>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Explore;
