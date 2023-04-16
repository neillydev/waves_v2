import React, { useContext, useEffect, useRef, useState } from "react";

import ExitSVG from "../../../public/close.svg";
import SoundSVG from "../../../public/sound.svg";
import CommentSVG from "../../../public/comment.svg";
import LikeSVG from "../../../public/wave_bw.svg";
import MenuSVG from "../../../public/dots.svg";

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

  const inputRef = useRef<HTMLInputElement>(null);

  const { authState } = useContext(AuthContext);

  const [comment, setComment] = useState("");
  const [commentsArray, setCommentsArray] = useState(comments);
  const [replies, setReplies] = useState<any>([]);
  const [replying, setReplying] = useState();

  const manageCommentRefs = useRef<any>([]);

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
      //@ts-ignore
      inputRef.current.value = "";
      //loading_dispatch({ loading: true, type: "bar" });
      const response = await fetch("/api/comment", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          post_id: postID,
          comment,
          username: myUsername,
        }),
      });
      switch (response.status) {
        case 200:
          const { comment_id, comment, username, timestamp } =
            await response.json();
          setCommentsArray([
            {
              comment_id,
              comment,
              username,
              timestamp,
            },
            ...commentsArray,
          ]);
          break;
        default:
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteComment = async (comment_id: number) => {
    try {
      if (!authState) {
        return;
      }
      const token = localStorage.getItem("token");
      if (!token) return;
      //loading_dispatch({ loading: true, type: "bar" });
      const response = await fetch("/api/comment", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          comment_id,
        }),
      });
      switch (response.status) {
        case 201:

          setCommentsArray(commentsArray.filter((comment: any) => comment.comment_id !== comment_id));

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

    setReplying(post_id);
  };

  const handleReply = async () => {
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
      //loading_dispatch({ loading: true, type: "bar" });
      const response = await fetch("/api/comment/reply", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          post_id: postID,
          comment_id: replying,
          comment,
          username: myUsername,
        }),
      });
      switch (response.status) {
        case 200:
          const { comment_id, comment, username, timestamp } =
            await response.json();
          setReplies([
            { comment_id, comment, username, timestamp },
            ...replies,
          ]);
          break;
        default:
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      if (replying) {
        handleReply();
        return;
      }

      handleComment();
    }
  };

  const handleHover = (setDisplay: boolean, comment_id: number) => {
    if(setDisplay){
      manageCommentRefs.current[comment_id].style.display = "flex";
      return;
    }

    manageCommentRefs.current[comment_id].style.display = "none";
  }

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
              <h3>{commentsArray.length}</h3>
            </div>
          </div>
          <div className={styles.postControlGroup}>{/* Share links */}</div>
        </div>
        <div className={styles.postCommentsWrapper}>
          {comments
            ? commentsArray.map((commentObj: any) => (
                <div key={commentObj.comment_id} className={styles.commentWrapper}>
                  <div className={styles.commenterWrapper}>
                    <div className={styles.avatar}>
                      <img src={profileImg} />
                    </div>
                    <div className={styles.commentMeta}>
                      <div className={styles.commenter}>
                        {commentObj.username}
                      </div>
                      <div className={styles.comment}>{commentObj.comment}</div>
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
                  <button className={styles.manageCommentBtn}
                    
                    onMouseEnter={() => handleHover(true, commentObj.comment_id)}
                    onMouseLeave={() => handleHover(false, commentObj.comment_id)}>
                    <MenuSVG />
                    <span className={styles.manageComment} 
                    ref={(ref) => (manageCommentRefs.current[commentObj.comment_id] = ref)}
                    >
                      <ul>
                        <li onClick={() => handleDeleteComment(commentObj.comment_id)}>Delete</li>
                      </ul>
                    </span>
                  </button>
                </div>
              ))
            : null}
        </div>
        <div className={styles.addCommentsWrapper}>
          <input
            type="text"
            ref={inputRef}
            className={styles.commentInput}
            placeholder="Post a comment..."
            onChange={(event) => setComment(event.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className={styles.postCommentBtn}
            onClick={replying ? handleReply : handleComment}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default BigPost;
