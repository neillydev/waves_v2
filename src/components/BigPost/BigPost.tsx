import React, { useContext, useEffect, useState } from "react";

import ExitSVG from "../../../public/close.svg";
import SoundSVG from "../../../public/sound.svg";
import CommentSVG from "../../../public/comment.svg";
import LikeSVG from "../../../public/wave_bw.svg";

import styles from "../../styles/BigPost/BigPost.module.css";
import { AuthContext } from "@/context/AuthContext";

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
  likes: number;
  comments: any;
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
  likes,
  comments,
  removePost,
  setEnlarge,
}: BigPostProps) => {
  const myUsername = localStorage.getItem("username") || "";

  const { authState } = useContext(AuthContext);

  const [comment, setComment] = useState("");
  const [replies, setReplies] = useState([]);

  const handleComment = async () => {
    try {
      if (!authState) {
        return;
      }
      if (comment.length === 0) {
        //set error (must input a comment)
        return;
      }
      const token = localStorage.getItem("token");
      if (!token) return;
      const response = await fetch("/api/comment", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          post_id: postID,
          comment,
        }),
      });
      switch (response.status) {
        case 200:
          const { comment_id, comment, username, timestamp } = await response.json();
          comments.shift({
            comment_id,
            comment,
            username,
            timestamp,
          });
          break;
        default:
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSetReply = (post_id: any) => {
    if (!authState) {
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) return;
  };

  useEffect(() => {
    //handle get all replies for postID,commentIDs
  }, []);

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
        <div className={styles.postControls}>
          <div className={styles.postControlGroup}>
            <div className={styles.postControlGroupItem}>
              <button className={styles.likeBtn}>
                <LikeSVG />
              </button>
              <h3>{likes}</h3>
            </div>
            <div className={styles.postControlGroupItem}>
              <button className={styles.commentBtn}>
                <CommentSVG />
              </button>
              <h3>{comments}</h3>
            </div>
          </div>
          <div className={styles.postControlGroup}>{/* Share links */}</div>
        </div>
        <div className={styles.postCommentsWrapper}>
          { comments.map((commentObj: any) => 
            <div className={styles.commentWrapper}>
              <div className={styles.commenterWrapper}>
                <div className={styles.avatar}>
                  <img src={profileImg} />
                </div>
                <div className={styles.commentMeta}>
                  <div className={styles.commenter}>{commentObj.username}</div>
                  <div className={styles.comment}>
                    {commentObj.comment}
                  </div>
                  <div className={styles.commentMetaControls}>
                    <div className={styles.commentTimestamp}>
                      <h3>{commentObj.timestamp}</h3>
                    </div>
                    <button
                      className={styles.commentReplyBtn}
                      onClick={() => handleSetReply(commentObj.comment_id)}
                    >
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className={styles.addCommentsWrapper}>
          <input
            type="text"
            className={styles.commentInput}
            placeholder="Post a comment..."
          />
          <button className={styles.postCommentBtn} onClick={handleComment}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default BigPost;
