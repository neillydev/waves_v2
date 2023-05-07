import React, { useContext, useEffect, useRef, useState } from "react";

import PencilSVG from "../../../public/pencil.svg";

import styles from "../../styles/EditProfile/EditProfile.module.css";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/router";

enum Errors {
  ERROR_TOO_MANY_REQUESTS = "error_0",
  ERROR_INPUT_TOO_SHORT = "error_1",
  ERROR_INPUT_EMPTY = "error_2",
  ERROR_INPUT_TOO_LONG = "error_3",
  ERROR_USERNAME_TAKEN = "error_4",
}

const ProfileSettingsForm = () => {
  const router = useRouter();
  const { authState } = useContext(AuthContext);

  let user_id: any = router.query["@user_id"];
  let localAvatar: string =
    localStorage.getItem("avatar") ||
    "https://surfwaves.b-cdn.net/user_picture.png";

  const [avatar, setAvatar] = useState<any>(localAvatar);
  const [avatarBlob, setAvatarBlob] = useState<any>();
  const [username, setUsername] = useState(user_id.split('@')[1]);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const avatarInput = useRef<HTMLInputElement>(null);

  const [usernameErrors, setUsernameErrors] = useState<any>([]);

  const getErrorMessage = (error: Errors) => {
    switch (error) {
      case Errors.ERROR_INPUT_EMPTY:
        return "Username cannot be empty";
      case Errors.ERROR_INPUT_TOO_SHORT:
      case Errors.ERROR_INPUT_TOO_LONG:
        return "Username must be between 4-20 characters";
      default:
        return "";
    }
  };
  const handleSubmitProfile = async (e: any) => {
    e.preventDefault();

    const newUsernameErrors: any = [];
    try {
      if (!authState) {
        return;
      }

      if (!username || username.length === 0) {
        newUsernameErrors.push(Errors.ERROR_INPUT_EMPTY);
      }

      if (username.length > 20) {
        newUsernameErrors.push(Errors.ERROR_INPUT_TOO_LONG);
      }

      if (username.length > 0 && username.length < 4) {
        newUsernameErrors.push(Errors.ERROR_INPUT_TOO_SHORT);
      }

      if(newUsernameErrors.length > 0){
        setUsernameErrors(newUsernameErrors);
        return;
      }

      const token = localStorage.getItem("token");
      if(!token || token.length === 0) return;

      const formData = new FormData();
      const emptyBlob = new Blob();

      formData.append("file", avatarBlob ? avatarBlob : emptyBlob, avatarBlob ? avatarBlob.name : '');
      formData.append("token", token);
      formData.append("username", username);
      formData.append("name", name);
      formData.append("bio", bio);


      const response = await fetch(`http://localhost:8022/user/${user_id}`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const {avatar, username, name, bio} = await response.json();
        if(avatar) localStorage.setItem('avatar', avatar)
        if(username) {
            setUsername(username);
            localStorage.setItem('username', username)
        }
        if(name) {
            setName(name);
            localStorage.setItem('name', name)
        }
        if(bio) {
            setBio(bio);
        }

      } else {
        // switch errors and handle accordingly
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUsernameChange = (e: any) => {
    e.preventDefault();

    setUsernameErrors([]);

    setUsername(e.currentTarget.value);
  };

  const handleAvatarSelect = (e: any) => {
    e.preventDefault();

    if (e && e.target && e.target.files) {
        const newAvatarURL = URL.createObjectURL(e.target.files[0]);
        setAvatar(newAvatarURL);
        setAvatarBlob(e.target.files[0]);
      }
  };

  return (
    <div className={styles.settingsContainer}>
      <h1 className={styles.settingsHeader}>Profile</h1>
      <div className={styles.settingsBody}>
        <div className={styles.settingsGroup}>
          <div className={styles.settingsSubgroup}>
            <div
              className={`${styles.settingsItem} ${styles.settingsWidth100}`}
            >
              <h3 className={styles.settingsLabel}>Username</h3>
              {usernameErrors.length > 0 ? (
                <div className={styles.errorInputContainer}>
                  <input
                    type="text"
                    className={`${styles.settingsInput} ${styles.settingsInputError}`}
                    placeholder="Username..."
                    value={username}
                    onChange={handleUsernameChange}
                  />
                  {usernameErrors.map((error: any, index: number) => (
                    <span key={index} className={styles.settingsInputErrorMessage}>{getErrorMessage(error)}</span>
                  ))}
                </div>
              ) : (
                <input
                  type="text"
                  className={styles.settingsInput}
                  placeholder="Username..."
                  value={username}
                  onChange={handleUsernameChange}
                />
              )}
            </div>
            <div
              className={`${styles.settingsItem} ${styles.settingsWidth100}`}
            >
              <h3 className={styles.settingsLabel}>Display Name</h3>
              <input
                type="text"
                className={styles.settingsInput}
                placeholder="Display Name..."
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
              />
            </div>
            <div
              className={`${styles.settingsItem} ${styles.settingsWidth100}`}
            >
              <h3 className={styles.settingsLabel}>Bio</h3>
              <textarea
                className={styles.settingsTextarea}
                placeholder="Write bio here..."
                value={bio}
                onChange={(e) => setBio(e.currentTarget.value)}
              />
            </div>
            <button
              className={`${styles.submitProfile} ${
                !submitting || styles.submitProfileInactive
              }`}
              onClick={handleSubmitProfile}
            >
              Update Profile
            </button>
          </div>
          <div
            className={`${styles.settingsItem} ${styles.settingsMarginLeft} ${styles.settingsPosition}`}
          >
            <img className={styles.settingsAvatar} src={avatar} alt="" onClick={() => avatarInput.current?.click()} />
            <input
                ref={avatarInput}
                type="file"
                accept="image/jpeg, image/png"
                style={{display: 'none'}}
                onChange={handleAvatarSelect} />
            <div className={styles.settingsEditAvatarBtn} onClick={() => avatarInput.current?.click()}>
              <PencilSVG />
              Edit
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsForm;
