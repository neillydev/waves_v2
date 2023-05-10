import React, { useContext, useEffect, useRef, useState } from "react";
import ContainerBlock from "@/components/ContainerBlock/ContainerBlock";

import UploadSVG from "../../../public/gallery.svg";

import styles from "../../styles/Upload/Upload.module.css";
import { AuthContext } from "@/context/AuthContext";
import { PostContext } from "@/context/PostContext";
import { useRouter } from "next/router";
import getAPI from "@/util/getAPI";

enum ACCESS {
  PUBLIC = 0,
  PRIVATE = 1,
}

const Upload = () => {
  const router = useRouter();
  const API = getAPI();
  const { authState } = useContext(AuthContext);
  const { postDispatch } = useContext(PostContext);

  const mediaInput = useRef<HTMLInputElement>(null);
  const captionRef = useRef<HTMLInputElement>(null);
  const [mediaPreview, setMediaPreview] = useState("");
  const [media, setMedia] = useState<File>();
  const [access, setAccess] = useState<any>(ACCESS.PUBLIC);
  const [caption, setCaption] = useState("");
  const [invalid, setInvalid] = useState<any>([]);

  const [loading, setLoading] = useState(false);

  const handlePostMedia = async () => {
    if (!authState) {
      return;
    } else if (!caption) {
      setInvalid([...invalid, captionRef]);
      return;
    }

    //set loading to true for spinner animation
    setLoading(true);

    const user_id = localStorage.getItem("user_id");
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");

    if (!username || !token || !user_id || !media) {
      //Attempt to retrieve proper data and replace them in localStorage
      //If not, log user out and send to home page
      return;
    }
    const reader: any = new FileReader();

    reader.readAsArrayBuffer(media);

    reader.onload = async () => {
      const blob = new Blob([reader.result], { type: media.type });
      const formData = new FormData();
      formData.append("file", blob, media.name);
      formData.append("token", token);
      formData.append("user_id", user_id);
      formData.append("caption", caption);
      formData.append("access", access);
      try {
        const response = await fetch(`api/upload`, {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const data = await response.json();
          //postDispatch({ type: "SET_DATA", payload: data });
          setLoading(false);
          router.push("/");
        } else {
          // switch errors and handle accordingly
        }
      } catch (error) {
        console.error(error);
      }
    };
  };

  const handleDeletePost = async () => {
    if (!authState) {
      return;
    }
    router.push("/");
  };

  useEffect(() => {
    if (invalid.length > 0) {
      invalid.forEach((element: HTMLInputElement) => {
        element.className += ` ${styles.invalid}`;
      });
    }
  }, [invalid]);

  return (
    <div className={styles.mainUpload}>
      <ContainerBlock>
        <div className={styles.uploadContainer}>
          <div className={styles.uploadWrapper}>
            <div
              className={styles.loaderContainer}
              style={{ display: loading ? "flex" : "none" }}
            >
              <span className={styles.loader}></span>
            </div>
            <div className={styles.uploadTitleContainer}>
              <h1>Upload post</h1>
              <h2>Post content to your account</h2>
            </div>
            <div className={styles.uploadBodyContainer}>
              <div className={styles.uploadMeta}>
                <div className={styles.uploadCaption}>
                  <h3>Caption</h3>
                  <input
                    type="text"
                    value={caption}
                    onChange={(e) => setCaption(e.currentTarget.value)}
                  />
                </div>
                <div className={styles.uploadAccessControls}>
                  <h3>Post visible to</h3>
                  <select>
                    <option>Public</option>
                    <option>Follows</option>
                    <option>Unlisted</option>
                  </select>
                </div>
                <div className={styles.uploadAllowanceControls}>
                  <h3>Users can:</h3>
                  <div className={styles.uploadCheckbox}>
                    <input type="checkbox" id="comment" name="comment" />
                    <label htmlFor="comment">Comment</label>
                  </div>
                </div>
                <div className={styles.uploadSubmitControls}>
                  <button onClick={handleDeletePost}>Delete</button>
                  <button onClick={handlePostMedia}>Post</button>
                </div>
              </div>
              <div
                className={styles.uploadPreviewWrapper}
                onClick={() => mediaInput.current?.click()}
              >
                <input
                  ref={mediaInput}
                  type="file"
                  accept="video/*"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    if (e && e.target && e.target.files) {
                      setMedia(e.target.files[0]);
                    }
                  }}
                />
                <div
                  className={`${styles.uploadPreview} ${styles.uploadPreviewBefore}`}
                >
                  {media ? (
                    <video className={styles.media} controls>
                      <source
                        src={URL.createObjectURL(media)}
                        type={media.type}
                      />
                    </video>
                  ) : (
                    <>
                      <UploadSVG />
                      <div className={styles.previewTitle}>
                        <h2>Select media to upload</h2>
                        <h3>or drag and drop</h3>
                      </div>
                      <button className={styles.mediaSelectBtn}>
                        Select Media
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContainerBlock>
    </div>
  );
};

export default Upload;
