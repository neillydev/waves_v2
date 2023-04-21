import React, { useContext, useEffect, useRef, useState } from "react";

import styles from "../../styles/Profile/Profile.module.css";
import MenuSVG from "../../../public/dots.svg";
import ViewSVG from "../../../public/view.svg";

import { useRouter } from "next/router";
import BigPost from "@/components/BigPost/BigPost";
import { AuthContext } from "@/context/AuthContext";

type Profile = {
  user_id: string;
  avatar: string;
  email: string;
  username: string;
  name: string;
  verified: boolean;
  followers: number;
  follows: number;
  likes: number;
  posts: [];
  bio: string;
  isFollowing: boolean;
};

const Profile = ({ user_id }: any) => {
  const router = useRouter();
  const videoRefs = useRef<any>({});
  const { authState } = useContext(AuthContext);

  const [profile, setProfile] = useState<Profile>();
  const [localUserID, setLocalUserID] = useState<string | null>();
  const [enlarge, setEnlarge] = useState(false);
  const [likeAmount, setLikeAmount] = useState<any>(0);
  const [likeBoolean, setLikeBoolean] = useState<any>(false);
  const [postID, setPostID] = useState();

  if (!user_id || !user_id.includes("@")) {
    if (typeof window !== "undefined") {
      router.push("/");
    }
    return null;
  }

  user_id = user_id.replace("@", "");

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

  const handleFetchProfile = async () => {
    if (!user_id) return;
    const token = localStorage.getItem("token");
    const header: any = token ? { Authorization: `Bearer ${token}` } : {};

    const response = await fetch(`/api/user/@${user_id}`, {
      method: "GET",
      headers: { ...header },
    });

    if (response.status === 200) {
      const data = await response.json();

      setProfile(data);
    } else {
    }
  };

  const handleLike = async () => {
    try {
      if (!authState) {
        return;
      }
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch(`/api/like/${postID}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      switch (response.status) {
        case 200:
          setLikeAmount(likeAmount + 1);
          setLikeBoolean(true);
          break;
        default:
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteLike = async () => {
    try {
      if (!authState) {
        return;
      }
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch(`/api/like/${postID}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      switch (response.status) {
        case 200:
          setLikeAmount(likeAmount - 1);
          setLikeBoolean(false);
          break;
        default:
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    handleFetchProfile();
    if (typeof window !== "undefined" && !localUserID) {
      setLocalUserID(localStorage?.getItem("username"));
    }
  }, [,enlarge]);

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileWrapper}>
        <div className={styles.profileHeaderWrapper}>
          <div className={styles.profileHeaderGroup}>
            <div className={styles.profileHeaderGroupWrapper}>
              <div className={styles.headerLeft}>
                <img className={styles.avatar} src={profile?.avatar} alt="" />
              </div>
              <div className={styles.headerCenter}>
                <div className={styles.headerCenterName}>
                  <h2>{profile?.username}</h2>
                  <h3>{profile?.name}</h3>
                </div>
                <div className={styles.headerCenterControls}>
                  {localUserID && user_id === localUserID ? (
                    <button className={styles.editProfileBtn}>
                      Edit Profile
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
            <div className={styles.profileStatsWrapper}>
              <span className={styles.profileStat}>
                <span>{profile?.followers}</span> followers
              </span>
              <span className={styles.profileStat}>
                <span>{profile?.follows}</span> following
              </span>
              <span className={styles.profileStat}>
                <span>{profile?.likes}</span> likes
              </span>
            </div>
            <div className={styles.profileBioWrapper}>
              <h3 className={styles.bio}>{profile?.bio}</h3>
            </div>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.interactBtn}>
              <MenuSVG />
            </div>
          </div>
        </div>
        <div className={styles.profileBodyWrapper}>
          {profile && profile.posts.length > 0 ? (
            profile.posts.map((post: any) => (
              <div
                className={styles.profilePostContainer}
                key={post.post_id}
                onMouseEnter={() => handleMouseEnter(post.post_id)}
                onMouseLeave={() => handleMouseLeave(post.post_id)}
                onClick={() => { (!enlarge ? (setEnlarge(true), setPostID(post.post_id),setLikeBoolean(post.hasLiked),setLikeAmount(post.likes)) : null) }}
              >
                {enlarge ? (
                  <BigPost
                    postID={post.post_id}
                    isFollowing={profile.isFollowing}
                    hasLiked={likeBoolean}
                    profileImg={profile.avatar}
                    username={profile.username}
                    name={profile.name}
                    mediaSrc={post.media}
                    caption={post.caption}
                    soundCaption={post.soundCaption}
                    soundSrc={``}
                    likes={likeAmount}
                    comments={[]}
                    removePost={() => {}}
                    setEnlarge={setEnlarge}
                    handleLike={handleLike}
                    handleDeleteLike={handleDeleteLike}
                  />
                ) : null}
                <div className={styles.profilePost}>
                  <video
                    ref={(ref) => (videoRefs.current[post.post_id] = ref)}
                    src={post.media}
                    muted
                  ></video>
                </div>
                <div className={styles.profilePostStats}>
                  <div className={styles.profilePostStat}>
                    <ViewSVG />
                    <h4>{post.views || 0}</h4>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h1>No posts found</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps({ query }: any) {
  const user_id = query["@user_id"];

  if (typeof user_id === "undefined") {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      user_id,
    },
  };
}

export default Profile;