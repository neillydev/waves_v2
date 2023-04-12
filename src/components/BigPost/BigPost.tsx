import React from "react";

import ExitSVG from '../../../public/close.svg'

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
}

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
      <div className={styles.postRightWrapper}></div>
    </div>
  );
};

export default BigPost;
