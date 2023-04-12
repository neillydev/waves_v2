import React from "react";

import ExitSVG from "../../../public/close.svg";
import SoundSVG from "../../../public/sound.svg";

import styles from "../../styles/BigPost/BigPost.module.css";

type BigPostProps = {
  postID: string;
  isFollowing: boolean;
  profileImg: string;
  username: string;
  name: string;
  mediaSrc: string;
  caption: string;
  soundCaption: string;
  soundSrc: string;
  removePost: (post_id: string) => void;
  setEnlarge: React.Dispatch<React.SetStateAction<boolean>>;
};

const BigPost = ({
  postID,
  isFollowing,
  profileImg,
  username,
  name,
  mediaSrc,
  caption,
  soundCaption,
  soundSrc,
  removePost,
  setEnlarge,
}: BigPostProps) => {
  const myUsername = localStorage.getItem("username") || "";

  return (
    <div className={styles.postContainer}>
      <button className={styles.exitBtn} onClick={() => setEnlarge(false)}>
        <ExitSVG />
      </button>
      <div className={styles.postLeftWrapper}>
        <div className={styles.postVideoWrapper}>
          <video className={styles.postVideo} src={mediaSrc} autoPlay></video>
        </div>
      </div>
      <div className={styles.postRightWrapper}>
        <div className={styles.postProfileWrapper}>
          <div className={styles.postUserWrapper}>
            <div className={styles.avatar}>
              <img src={profileImg} />
            </div>
            <div className={styles.profileMeta}>
              <div className={styles.profileUsername}>{username}</div>
              <div className={styles.nameMeta}>
                <div className={styles.profileName}>{name}</div>
                <span> · </span>
                <h4>12h ago</h4>
              </div>
            </div>
          </div>
          {username !== myUsername ? (
            <div className={styles.followBtnWrapper}>
              <button className={styles.postFollowBtn}>
                {isFollowing ? "Following" : "Follow"}
              </button>
            </div>
          ) : null}
        </div>
        <div className={styles.postCaption}>
          <h3>
            {caption.includes("#")
              ? caption.split(" ").map((word) =>
                  word.includes("#") ? (
                    <>
                      <span className={styles.hashtag}>{`${word}`}</span>
                      <span className={styles.hashtagSpace}></span>
                    </>
                  ) : (
                    `${word} `
                  )
                )
              : caption}
          </h3>
        </div>
        <div className={styles.postSound}>
              <SoundSVG />
              <h4 className={styles.soundCaption}>{soundCaption}</h4>
            </div>
        <div className={styles.postControls}></div>
      </div>
    </div>
  );
};

export default BigPost;
