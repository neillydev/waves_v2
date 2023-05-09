import React from "react";

import styles from "../../styles/ExplorePost/ExplorePost.module.css";
import Link from "next/link";

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
  //TO-DO: ADD LOADING SPINNER

  return (
    <div className={styles.explorePostWrapper}>
      <div className={styles.explorePostVideo}>
        <video src={mediaSrc} muted playsInline autoPlay />
      </div>
      <div className={styles.explorePostFooter}>
        <span className={styles.explorePostCaption}>
          {caption.includes("#")
            ? caption.split(" ").map((word) =>
                word.includes("#") ? (
                  <>
                    <Link href={`/explore?q=${word.split("#")[1]}`}>
                      <span className={styles.hashtag}>{`${word}`}</span>
                    </Link>
                    <span className={styles.hashtagSpace}></span>
                  </>
                ) : (
                  `${word} `
                )
              )
            : caption}
        </span>
      </div>
    </div>
  );
};

export default ExplorePost;
