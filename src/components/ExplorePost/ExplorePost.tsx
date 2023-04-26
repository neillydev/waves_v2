import React from "react";

import styles from "../../styles/ExplorePost/ExplorePost.module.css";

type ExplorePostProps = {
  postID: any;
  profileImg: string;
  username: string;
  mediaSrc: string;
  caption: string;
  setEnlarge: React.Dispatch<React.SetStateAction<boolean>>;
};

const ExplorePost = ({
  postID,
  profileImg,
  username,
  mediaSrc,
  caption,
  setEnlarge,
}: ExplorePostProps) => {


  return (
    <div className={styles.explorePostWrapper}>
      <div className={styles.explorePostVideo}>
        <video src={mediaSrc} />
      </div>
      <div className={styles.explorePostFooter}></div>
    </div>
  );
};

export default ExplorePost;
