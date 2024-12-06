
import React from "react";
import styles from "./settings.module.css";





const Settings = () => {
  return (
    <div>
      <div className={styles.settingsContainer}>
        <div className={styles.header}>
          <div className={styles.title}>Người viết bài</div>
          <div className={styles.name}>Nguyễn Minh Tâm</div>
        </div>

        <div className={styles.body}>
          <div className={styles.title}>Liên hệ admin</div>
          <div className={styles.title}>Đăng xuất</div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
