import React, { useContext, useState } from "react";

import SoundSVG from "../../../public/sound.svg";
import WaveBwSVG from "../../../public/wave_bw.svg";
import ShareSVG from "../../../public/share.svg";
import CommentSVG from "../../../public/comment.svg";

import styles from "../../styles/Post/Post.module.css";
import { AuthContext } from "@/context/AuthContext";
import { ModalContext } from "@/context/ModalContext";

type PostProps = {
  profileImg: string;
  username: string;
  name: string;
  mediaSrc: string;
  caption: string;
  soundCaption: string;
  soundSrc: string;
};

const Post = ({
  profileImg,
  username,
  name,
  mediaSrc,
  caption,
  soundCaption,
  soundSrc,
}: PostProps) => {
  const { authState } = useContext(AuthContext);
  const { modalState, modalDispatch } = useContext(ModalContext);
  const [following, setFollowing] = useState(false);

  const myUsername = localStorage.getItem("username") || "";

  const handleFollow = async () => {
    try {
      const token = localStorage.getItem("token") || "";
      if (!token) return;

      const response = await fetch("/api/user/follow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          following_username: username,
        }),
      });

      switch (response.status) {
        case 200:
          const { following } = await response.json();

          setFollowing(following);
          break;
        default:
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.postContainer}>
      <div className={styles.postWrapper}>
        <div className={styles.postProfile}>
          <img src={profileImg} />
        </div>
        <div className={styles.post}>
          <div className={styles.postProfileContainer}>
            <div className={styles.profileMeta}>
              <div className={styles.profileUsername}>{username}</div>
              <div className={styles.profileName}>{name}</div>
            </div>
            <div className={styles.followContainer}>
              {username === myUsername ? null : (
                <button
                  className={styles.followBtn}
                  onClick={() => {
                    if (!authState) {
                      modalDispatch({ type: true });
                      return;
                    }

                    handleFollow();
                  }}
                >
                  {following ? "Following" : "Follow"}
                </button>
              )}
            </div>
          </div>
          <div className={styles.postMedia}>
            <div className={styles.postMediaVideoContainer}>
              <video src={mediaSrc} autoPlay loop playsInline />
            </div>
            <div className={styles.postControls}>
              <button className={styles.postControl}>
                <WaveBwSVG />
              </button>
              <button className={styles.postControl}>
                <CommentSVG />
              </button>
              <button className={styles.postControl}>
                <ShareSVG />
              </button>
            </div>
          </div>
          <div className={styles.postCaption}>
            <h2 className={styles.caption}>
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
            </h2>
          </div>
          <div className={styles.postSound}>
            <SoundSVG />
            <h4 className={styles.soundCaption}>{soundCaption}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
