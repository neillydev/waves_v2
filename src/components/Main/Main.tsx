import React, { useContext, useEffect, useState } from "react";
import SideItem from "../SideItem/SideItem";

import { ModalContext } from "@/context/ModalContext";

import FireSVG from "../../../public/fire.svg";
import FollowersSVG from "../../../public/followers.svg";
import VideoSVG from "../../../public/video.svg";

import styles from "../../styles/main.module.css";
import Post from "../Post/Post";
import Trend from "../Trend/Trend";
import SideBar from "../SideBar/SideBar";
import { AuthContext } from "@/context/AuthContext";
import { PostContext } from "@/context/PostContext";

export enum ViewType {
  TRENDING,
  FOLLOWING,
  LIVE,
}

type PostType = {
  post_id: string;
  avatar: string;
  name: string;
  wavecreators_id: string;
  username: string;
  caption: string;
  mediaType: "video" | "image";
  media: string;
  date_posted: string;
  audiodesc: string;
  likes: number;
  comments: any;
  timestamp: string;
  following: boolean;
  hasLiked: boolean;
  hasViewed: boolean;
  views: number;
};

function isEmptyObject(obj: any) {
  return Object.keys(obj).length === 0;
}

const Main = () => {
  const { authState } = useContext(AuthContext);
  const { modalDispatch } = useContext(ModalContext);
  const { postState, postDispatch } = useContext(PostContext);

  const [viewType, setViewType] = useState<ViewType>(ViewType.TRENDING);

  const [posts, setPosts] = useState<PostType[]>();
  const [suggested, setSuggested] = useState<any>(undefined);

  const [followingList, setFollowingList] = useState<any>([]);

  const [featuredUsers, setFeaturedUsers] = useState<any>([]);

  const removePost = (post_id: string) => {
    if (!posts || posts.length === 0) return;

    const updatedPosts = posts.filter((post) => post.post_id !== post_id);

    setPosts(updatedPosts);
  };

  const handleFetchPosts = async () => {
    //start loading animation and skeleton screen
    try {
      const token = localStorage.getItem("token") || "";
      const header = token ? { Authorization: `Bearer ${token}` } : undefined;
      const response = await fetch("http://localhost:8022/posts", {
        method: "GET",
        headers: {
          ...header,
        },
      });

      if (response.status === 200) {
        const data = await response.json(); //Data is dependent on what is returned from the trending algorithm
        let postsData = data;
        if (!isEmptyObject(postState)) {
          postsData = [postState, ...data];
          postDispatch({ type: "SET_DATA", payload: {} }); //resetting the postState
        }

        setPosts(postsData);
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

  const handleFetchFollowingPosts = async () => {
    //start loading animation and skeleton screen
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const header = { Authorization: `Bearer ${token}` };
      const response = await fetch("/api/posts/followers", {
        method: "GET",
        headers: {
          ...header,
        },
      });

      if (response.status === 200) {
        const data = await response.json(); //Data is dependent on what is returned from the trending algorithm
        let postsData = data;
        if (!isEmptyObject(postState)) {
          //postsData = [postState, ...data]; //fix when changing the trending algorithm
          postDispatch({ type: "SET_DATA", payload: {} }); //resetting the postState
        }

        setPosts(postsData);
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
    window.scrollTo(0, 0);

    if (featuredUsers.length === 0) handleFetchFeatured();

    switch (viewType) {
      case ViewType.FOLLOWING:
        handleFetchFollowingPosts();
        break;
      case ViewType.TRENDING:
        handleFetchPosts();
        break;
      case ViewType.LIVE:
        //handleLiveSessions();
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
              <SideItem
                icon={
                  <FireSVG
                    className={
                      viewType !== ViewType.TRENDING || styles.selectedSvg
                    }
                  />
                }
                header="Trending"
                subHeader=""
                path=""
                account={false}
                selected={viewType === ViewType.TRENDING}
                viewType={ViewType.TRENDING}
                setViewType={setViewType}
              />
              <SideItem
                icon={
                  <FollowersSVG
                    className={
                      viewType !== ViewType.FOLLOWING || styles.selectedSvg
                    }
                  />
                }
                header="Following"
                subHeader=""
                path=""
                account={false}
                selected={viewType === ViewType.FOLLOWING}
                viewType={ViewType.FOLLOWING}
                setViewType={setViewType}
              />
              <SideItem
                icon={
                  <VideoSVG
                    className={viewType !== ViewType.LIVE || styles.selectedSvg}
                  />
                }
                header="Live"
                subHeader=""
                path=""
                account={false}
                selected={viewType === ViewType.LIVE}
                viewType={ViewType.LIVE}
                setViewType={setViewType}
              />
            </div>
            {authState ? (
              <></>
            ) : (
              <>
                <div className={styles.separator} />
                <div className={styles.leftLogin}>
                  <h2>
                    Login to like videos, interact with creators, and see
                    comments
                  </h2>
                  <button onClick={() => modalDispatch({ type: true })}>
                    Login
                  </button>
                </div>
              </>
            )}
            <div className={styles.separator} />
            <div className={styles.leftSection}>
              <h2 className={styles.leftTitle}>Featured Creators</h2>
              {featuredUsers.length > 0
                ? featuredUsers.map((user: any) => (
                    <SideItem
                      icon={user.avatar}
                      header={user.name}
                      subHeader={`@${user.username}`}
                      path="/"
                      account
                    />
                  ))
                : null}
            </div>
            <div className={styles.separator} />
            <div className={styles.leftSection}>
              <h2 className={styles.leftTitle}>Surf Trends</h2>
              <div className={styles.trendsWrapper}>
                <Trend title="waves" />
                <Trend title="surf" />
              </div>
            </div>
            <div className={styles.separator} />
            <div className={styles.leftSection}>
              <div className={styles.leftSubRow}>
                <a
                  href="/about"
                  className={`${styles.leftSubtitle} ${styles.leftSublink}`}
                >
                  About
                </a>
                <a
                  href="/contact"
                  className={`${styles.leftSubtitle} ${styles.leftSublink}`}
                >
                  Contact
                </a>
              </div>
              <h3 className={styles.leftSubtitle}>© 2023 Waves</h3>
            </div>
          </div>
          <div className={styles.mainLeftScroll}></div>
        </div>
      </div>
      <div className={styles.mainRight}>
        <div className={styles.mainRightWrapper}>
          {posts
            ? posts.map((post) => (
                <Post
                  postID={post.post_id}
                  isFollowing={post.following}
                  hasLiked={post.hasLiked}
                  hasViewed={post.hasViewed}
                  profileImg={post.avatar}
                  username={post.username}
                  name={post.name}
                  mediaSrc={post.media}
                  caption={post.caption}
                  soundCaption={post.audiodesc}
                  soundSrc=""
                  likes={post.likes}
                  comments={post.comments}
                  timestamp={post.timestamp}
                  removePost={removePost}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default Main;
