import React, { useEffect, useState } from "react";

import styles from "../../../styles/EditProfile/EditProfile.module.css";
import { useRouter } from "next/router";
import ProfileSettingsForm from "../../../components/Forms/ProfileSettingsForm";
import AccountSettingsForm from "../../../components/Forms/AccountSettingsForm";

const EditProfile = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");

  let user_id: any = router.query["@user_id"];

  const [tabs, setTabs] = useState<any>([
    {
      id: "settings_profile",
      label: "Profile Settings",
      selected: true,
    },
    {
      id: "settings_account",
      label: "Account Settings",
      selected: false,
    },
  ]);

  const [selected, setSelected] = useState<string>("settings_profile");

  const handleSelect = (index: number) => {
    const updatedTabs = tabs.map((tab: any, i: number) => {
      if (i === index) {
        setSelected(tab.id);
        return { ...tab, selected: true };
      } else {
        return { ...tab, selected: false };
      }
    });
    setTabs(updatedTabs);
  };

  const handleFetchAccount = async () => {
    //start loading animation and skeleton screen
    try {
      const token = localStorage.getItem("token") || "";
      const header = token ? { Authorization: `Bearer ${token}` } : undefined;
      const response = await fetch(`/api/user/${user_id}`, {
        method: "GET",
        headers: {
          ...header,
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        setEmail(data.email);
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
    if (!user_id || !user_id.includes("@")) {
      if (typeof window !== "undefined") {
        router.push("/");
      }
      return;
    }
    user_id = user_id.split("@")[1];

    handleFetchAccount();
  }, []);

  return (
    <div className={styles.editContainer}>
      <div className={styles.editWrapper}>
        <div className={styles.editLeftWrapper}>
          <ul className={styles.tabsList}>
            {tabs.map((tab: any, index: any) => (
              <li
                key={index}
                className={`${styles.tabItem} ${
                  tab.selected ? styles.tabSelected : ""
                }`}
                onClick={() => handleSelect(index)}
              >
                <h3>{tab.label}</h3>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.editRightWrapper}>
          {selected === "settings_profile" ? (
            <ProfileSettingsForm />
          ) : (
            <AccountSettingsForm email={email} setEmail={setEmail} />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
