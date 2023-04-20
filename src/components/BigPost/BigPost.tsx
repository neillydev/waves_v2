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
  const myUserID = localStorage.getItem("user_id") || "";
  const myUsername = localStorage.getItem("username") || "";

  const inputRef = useRef<HTMLInputElement>(null);

  const { authState } = useContext(AuthContext);

  const [comment, setComment] = useState("");
  const [commentsArray, setCommentsArray] = useState(comments);
  const [replies, setReplies] = useState(0);
  const [replying, setReplying] = useState<any>();

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

      setComment("");

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
          const { avatar, comment_id, comment, username, timestamp, replies } =
            await response.json();
          setCommentsArray([
            {
              avatar,
              comment_id,
              comment,
              username,
              timestamp,
              replies,
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
          const updatedCommentsArray = commentsArray.filter(
            (comment: any) => comment.comment_id !== comment_id
          );
          setCommentsArray(updatedCommentsArray);

          const replyLength = updatedCommentsArray.reduce(
            (acc: any, comment: any) => {
              return acc + comment.replies.length;
            },
            0
          );

          setReplies(replyLength);
          break;
        default:
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCommentChange = (comment_value: string) => {
    if (replying && comment_value.split(" ")[0] !== `@${replying.username}`) {
      setReplying(null);
    }

    setComment(comment_value);
  };

  const handleSetReply = (comment_id: any, username: string) => {
    if (!authState) {
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) return;

    setReplying({
      comment_id,
      username,
    });

    //@ts-ignore
    inputRef.current.value = `@${username} ${comment}`;
  };

  const handleReply = async (event: any) => {
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
      inputRef.current.value = ``;
      setReplying(null);
      setComment("");

      //loading_dispatch({ loading: true, type: "bar" });
      const response = await fetch("/api/comment/reply", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          post_id: postID,
          comment_id: replying.comment_id,
          comment,
          username: myUsername,
        }),
      });
      switch (response.status) {
        case 200:
          const {
            reply_id,
            comment_id,
            user_id,
            avatar,
            comment,
            username,
            timestamp,
          } = await response.json();

          const updatedCommentsArray = [...commentsArray];
          const index = updatedCommentsArray.findIndex(
            (commentObj: any) => commentObj.comment_id === comment_id
          );

          // If the object is found in comments
          const outerComment = { ...updatedCommentsArray[index] };

          // Add a new entry to the replies array of the outer comment
          outerComment.replies.push({
            reply_id,
            comment_id,
            user_id,
            avatar,
            reply: comment,
            username,
            timestamp,
          });

          updatedCommentsArray[index] = outerComment;
          setCommentsArray(updatedCommentsArray);

          break;
        default:
          break;
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      if (replying) {
        handleReply(event);
        return;
      }

      handleComment();
    }
  };

  const handleHover = (setDisplay: boolean, comment_id: number) => {
    if (setDisplay) {
      manageCommentRefs.current[comment_id].style.display = "flex";
      return;
    }

    manageCommentRefs.current[comment_id].style.display = "none";
  };

  const handleFetchPost = async (post_id: number) => {
    //start loading animation and skeleton screen
    try {
      const token = localStorage.getItem("token") || "";
      const header = token ? { Authorization: `Bearer ${token}` } : undefined;
      const response = await fetch(`http://localhost:8022/post/${post_id}`, {
        method: "GET",
        headers: {
          ...header,
        },
      });

      if (response.status === 200) {
        const data = await response.json(); //Data is dependent on what is returned from the trending algorithm
        setCommentsArray(data.comments);
        
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
    handleFetchPost(Number(postID));

    const replyLength = commentsArray.reduce((acc: any, comment: any) => {
      return acc + comment.replies.length;
    }, 0);

    setReplies(replyLength);
  }, []);

  return (
    <div className={styles.postContainer}>
      <button
        className={styles.exitBtn}
        onClick={() => {
          setEnlarge(false);
        }}
      >
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
              <h3>{commentsArray.length + replies}</h3>
            </div>
          </div>
          <div className={styles.postControlGroup}>{/* Share links */}</div>
        </div>
        <div className={styles.postCommentsWrapper}>
          {comments
            ? commentsArray.map((commentObj: any) => (
                <div
                  key={commentObj.comment_id}
                  className={styles.commentWrapper}
                >
                  <div className={styles.commenterContainer}>
                    <div className={styles.commenterWrapper}>
                      <div className={styles.avatar}>
                        <img src={commentObj.avatar} />
                      </div>
                      <div className={styles.commentMeta}>
                        <div className={styles.commenter}>
                          {commentObj.username}
                        </div>
                        <div className={styles.comment}>
                          {commentObj.comment.includes("#") ||
                          commentObj.comment.includes("@")
                            ? commentObj.comment
                                .split(" ")
                                .map((word: string) =>
                                  word.includes("#") || word.includes("@") ? (
                                    <>
                                      <span
                                        className={styles.hashtag}
                                      >{`${word}`}</span>
                                      <span
                                        className={styles.hashtagSpace}
                                      ></span>
                                    </>
                                  ) : (
                                    `${word} `
                                  )
                                )
                            : commentObj.comment}
                        </div>
                        <div className={styles.commentMetaControls}>
                          <div className={styles.commentTimestamp}>
                            <h3>{commentObj.timestamp}</h3>
                          </div>
                          <button
                            className={styles.commentReplyBtn}
                            onClick={() =>
                              handleSetReply(
                                commentObj.comment_id,
                                commentObj.username
                              )
                            }
                          >
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                    {commentObj.user_id === myUserID ? (
                      <button
                        className={styles.manageCommentBtn}
                        onMouseEnter={() =>
                          handleHover(true, commentObj.comment_id)
                        }
                        onMouseLeave={() =>
                          handleHover(false, commentObj.comment_id)
                        }
                      >
                        <MenuSVG />
                        <span
                          className={styles.manageComment}
                          ref={(ref) =>
                            (manageCommentRefs.current[commentObj.comment_id] =
                              ref)
                          }
                        >
                          <ul>
                            <li
                              onClick={() =>
                                handleDeleteComment(commentObj.comment_id)
                              }
                            >
                              Delete
                            </li>
                          </ul>
                        </span>
                      </button>
                    ) : null}
                  </div>
                  {commentObj.replies && commentObj.replies.length > 0
                    ? commentObj.replies.map((reply: any) => (
                        <div className={styles.replyWrapper}>
                          <div className={styles.replyAvatar}>
                            <img src={reply.avatar} />
                          </div>
                          <div className={styles.commentMeta}>
                            <div className={styles.replyUsername}>
                              {reply.username}
                            </div>
                            <div className={styles.comment}>
                              {reply.reply.includes("#") ||
                              reply.reply.includes("@")
                                ? reply.reply.split(" ").map((word: string) =>
                                    word.includes("#") || word.includes("@") ? (
                                      <>
                                        <span
                                          className={styles.hashtag}
                                        >{`${word}`}</span>
                                        <span
                                          className={styles.hashtagSpace}
                                        ></span>
                                      </>
                                    ) : (
                                      `${word} `
                                    )
                                  )
                                : reply.reply}
                            </div>
                            <div className={styles.commentMetaControls}>
                              <div className={styles.commentTimestamp}>
                                <h3>{commentObj.timestamp}</h3>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    : null}
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
            onChange={(event) => handleCommentChange(event.target.value)}
            //onKeyDown={handleKeyDown}
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
