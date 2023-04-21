import React, { useContext, useEffect, useState } from "react";

import SoundSVG from "../../../public/sound.svg";
import WaveBwSVG from "../../../public/wave_bw.svg";
import ShareSVG from "../../../public/share.svg";
import CommentSVG from "../../../public/comment.svg";
import MenuSVG from "../../../public/dots.svg";

import styles from "../../styles/Post/Post.module.css";
import { AuthContext } from "@/context/AuthContext";
import { ModalContext } from "@/context/ModalContext";
import BigPost from "../BigPost/BigPost";

export type PostProps = {
  postID: string;
  isFollowing: boolean;
  hasLiked: boolean;
  profileImg: string;
  username: string;
  name: string;
  mediaSrc: string;
  caption: string;
  soundCaption: string;
  soundSrc: string;
  likes: number;
  comments: any;
  removePost: (post_id: string) => void;
};

const Post = ({
  postID,
  isFollowing,
  hasLiked,
  profileImg,
  username,
  name,
  mediaSrc,
  caption,
  soundCaption,
  soundSrc,
  likes,
  comments,
  removePost,
}: PostProps) => {
  const { authState } = useContext(AuthContext);
  const { modalState, modalDispatch } = useContext(ModalContext);
  const [following, setFollowing] = useState(isFollowing || false);
  const [enlarge, setEnlarge] = useState(false);

  const [likeAmount, setLikeAmount] = useState(likes);
  const [likeBoolean, setLikeBoolean] = useState(hasLiked);

  const myUsername = localStorage.getItem("username") || "";

  const handleFollow = async () => {
    try {
      const token = localStorage.getItem("token");
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

  const handleDeletePost = async () => {
    if (!authState) {
      return;
    }
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch(`http://localhost:8022/post/${postID}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        removePost(postID);
      } else {
        // switch errors and handle accordingly
      }
    } catch (error) {
      console.error(error);
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
          setLikeAmount(likeAmount+1);
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
          setLikeAmount(likeAmount-1);
          setLikeBoolean(false);
          break;
        default:
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.postContainer}>
      {enlarge ? (
        <BigPost
          postID={postID}
          isFollowing={isFollowing}
          hasLiked={likeBoolean}
          profileImg={profileImg}
          username={username}
          name={name}
          mediaSrc={mediaSrc}
          caption={caption}
          soundCaption={soundCaption}
          soundSrc={soundSrc}
          likes={likeAmount}
          comments={comments}
          removePost={removePost}
          setEnlarge={setEnlarge}
          handleLike={handleLike}
          handleDeleteLike={handleDeleteLike}
        />
      ) : (
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
                {username === myUsername ? (
                  <button
                    className={styles.postDeleteBtn}
                    onClick={handleDeletePost}
                  >
                    <MenuSVG />
                  </button>
                ) : (
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
                    {following === true ? "Following" : "Follow"}
                  </button>
                )}
              </div>
            </div>
            <div className={styles.postMedia}>
              <div
                className={styles.postMediaVideoContainer}
                onClick={() => setEnlarge(!enlarge)}
              >
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
      )}
    </div>
  );
};

export default Post;
