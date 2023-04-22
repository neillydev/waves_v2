import React, { useState } from "react";
import styles from "../../styles/EditProfile/EditProfile.module.css";

enum Errors {
    ERROR_TOO_MANY_REQUESTS,
    ERROR_INPUT_TOO_SHORT,
    ERROR_INPUT_TOO_LONG,
    ERROR_USERNAME_TAKEN,
}

const ProfileSettingsForm = () => {
  const [username, setUsername] = useState("@neillydev");
  const [name, setName] = useState("wavecreator");
  const [bio, setBio] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [errors, setErrors] = useState([]);

  const handleSubmitProfile = () => {
    try {
        
    } catch (err) {
        console.error(err);
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
              <input
                type="text"
                className={styles.settingsInput}
                placeholder="Username..."
                value={username}
                onChange={(e) => setUsername(e.currentTarget.value)}
              />
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
                value={bio.length > 0 ? bio : ""}
                onChange={(e) => setBio(e.currentTarget.value)}
              />
            </div>
          <button className={`${styles.submitProfile} ${!submitting || styles.submitProfileInactive}`}
          onClick={handleSubmitProfile}>
            Update Profile
          </button>
          </div>
          <div
            className={`${styles.settingsItem} ${styles.settingsMarginLeft} ${styles.settingsPosition}`}
          >
            <img
              className={styles.settingsAvatar}
              src="https://surfwaves.b-cdn.net/user_picture.png"
              alt=""
            />
            <div className={styles.settingsEditAvatarBtn}>Edit</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsForm;
