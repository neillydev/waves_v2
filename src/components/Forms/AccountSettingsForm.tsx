import React, { useContext, useEffect, useState } from "react";
import styles from "../../styles/EditProfile/EditProfile.module.css";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/AuthContext";

type AccountSettingsProps = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

const AccountSettingsForm = ({email, setEmail}:AccountSettingsProps) => {
  const router = useRouter();
  const { authState } = useContext(AuthContext);

  const [submitting, setSubmitting] = useState(false);

  let user_id: any = router.query["@user_id"];
  user_id = user_id.split('@')[1];
  let localAvatar: string =
    localStorage.getItem("avatar") ||
    "https://surfwaves.b-cdn.net/user_picture.png";

  const handleSubmitAccount = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const header = { Authorization: `Bearer ${token}` };
      const body = {
        email,
      };
      const response = await fetch(`/api/user/@${user_id}`, {
        method: "PUT",
        headers: {
          ...header,
        },
        body: JSON.stringify(body)
      });

      if (response.status === 200) {
        
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
  }, []);

  return (
    <div className={styles.settingsContainer}>
      <h1 className={styles.settingsHeader}>Account</h1>
      <div className={styles.settingsBody}>
        <div className={styles.settingsGroup}>
            <div
              className={`${styles.settingsItem} ${styles.settingsWidth100}`}
            >
              <h3 className={styles.settingsLabel}>Email</h3>
              <input
                type="text"
                className={styles.settingsInput}
                placeholder="Email..."
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
            </div>
        </div>
          <button
            className={`${styles.submitProfile} ${
              !submitting || styles.submitProfileInactive
            }`}
            onClick={handleSubmitAccount}
          >
            Update Account
          </button>
      </div>
    </div>
  );
};

export default AccountSettingsForm;
