import React, { useEffect, useState } from "react";

import styles from "../../../styles/EditProfile/EditProfile.module.css";
import { useRouter } from "next/router";
import ProfileSettingsForm from "@/components/Forms/ProfileSettingsForm";
import AccountSettingsForm from "@/components/Forms/AccountSettingsForm";

const EditProfile = () => {
  const router = useRouter();

  let user_id: any = router.query["@user_id"];

  const [tabs, setTabs] = useState<any>([
    {
      id: "settings_profile",
      label: "Profile Settings",
      selected: true
    },
    {
      id: "settings_account",
      label: "Account Settings",
      selected: false
    },
  ]);

  const [selected, setSelected] = useState<string>('settings_profile');

  if (!user_id || !user_id.includes("@")) {
    if (typeof window !== "undefined") {
      router.push("/");
    }
    return null;
  }
  user_id = user_id.split("@")[1];

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

  return (
    <div className={styles.editContainer}>
      <div className={styles.editWrapper}>
        <div className={styles.editLeftWrapper}>
          <ul className={styles.tabsList}>
            {tabs.map((tab: any, index: any) => (
              <li key={index} className={`${styles.tabItem} ${tab.selected ? styles.tabSelected : ''}`} onClick={() => handleSelect(index)}>
                <h3>{tab.label}</h3>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.editRightWrapper}>
          {selected === 'settings_profile' ? <ProfileSettingsForm /> : <AccountSettingsForm />}
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
