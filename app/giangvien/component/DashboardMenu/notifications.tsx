// components/Notifications.js
import React from "react";
import styles from "./notification.module.css";
import { Button, Image } from "react-bootstrap";
import Link from "next/link";

const notifications = [
  { id: 1, name: "Nguyễn Minh Tâm", message: "Bài viết này hay quá bạn ơi" },
  { id: 2, name: "Nguyễn Minh Tâm", message: "Bài viết này hay quá bạn ơi" },
  { id: 3, name: "Nguyễn Minh Tâm", message: "Bài viết này hay quá bạn ơi" },
  { id: 4, name: "Nauvến Minh Tâm", message: "Bài viết này hay quá bạn ơi" },
  { id: 5, name: "Nauvến Minh Tâm", message: "Bài viết này hay quá bạn ơi" },
  { id: 6, name: "Nauvến Minh Tâm", message: "Bài viết này hay quá bạn ơi" },
];

const Notifications = () => {
  return (
    <div className={styles.notificationContainer}>
      <div className={styles.header}>Thông báo</div>
      <div className={styles.notificationBody}>
        {notifications.map((notification) => (
          <div key={notification.id} className={styles.notificationItem}>
            <div className={styles.part1}>
              <Image
                src="/img_admin/avatar.png" // Replace with your avatar path
                roundedCircle
                className={styles.avatar}
              />

              <div className={styles.notificationContent}>
                <span className={styles.name}>{notification.name}</span>
                <p className={styles.message}>{notification.message}</p>
              </div>
            </div>

            <div className={styles.option_button_group}>
              <div
                className={`d-block  ${styles.option_button}`}
              >
                <Link href="/#!">
                  <img src="/img_admin/eyes.svg" alt="Edit" />
                </Link>
                <Link href="/#!">
                  <img src="/img_admin/add.svg" alt="View" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.loadMore}>
        <button className={styles.buttonnoti}>Xem thêm</button>
      </div>
    </div>
  );
};

export default Notifications;
