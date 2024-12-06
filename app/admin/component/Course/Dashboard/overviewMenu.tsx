import React from "react";
import { Offcanvas, Table } from "react-bootstrap";
import styles from "./overviewmenu.module.css";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Link from "next/link";
import MyChartComponentMenu from "@/app/admin/component/Dashboard/ViewChartMenu";

interface OverviewMenuProps {
  show: boolean;
  handleClose: () => void;
}

const OverviewMenu: React.FC<OverviewMenuProps> = ({ show, handleClose }) => {
  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="end"
      className={styles.customOffcanvas}
    >
      <div className={styles.header}>
        <div className={styles.title}>Biểu đồ tổng lượt xem bài viết</div>

        <button className={styles.customCloseButton} onClick={handleClose}>
          <img
            src="/img_admin/close.svg"
            alt="Close"
            className={styles.closeIcon}
          />
        </button>
      </div>
      <div>
        <div className={styles.item}>
          <div className={styles.verticalLine1}></div>
          <div className={styles.processbar}>
            <CircularProgressbar
              value={68}
              text={`${68}%`}
              styles={buildStyles({
                rotation: 1.3,
                pathColor: "#24A148",
                textColor: "#333333",
                trailColor: "#d6d6d6",
              })}
            />
          </div>
          <div className={styles.progresstext}>
            <div className={styles.text1}>Bài viết</div>
            <div className={styles.text2}>100.00 lượt xem</div>
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.verticalLine2}></div>
          <div className={styles.processbar}>
            <CircularProgressbar
              value={92}
              text={`${92}%`}
              styles={buildStyles({
                rotation: 1.1,
                pathColor: "#15C8E0",
                textColor: "#333333",
                trailColor: "#d6d6d6",
              })}
            />
          </div>
          <div className={styles.progresstext}>
            <div className={styles.text1}>Bình Luận</div>
            <div className={styles.text2}>1000 bình luận</div>
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.verticalLine3}></div>
          <div className={styles.processbar}>
            <CircularProgressbar
              value={75}
              text={`${75}%`}
              styles={buildStyles({
                rotation: 1.2,
                pathColor: "#4589FF",
                textColor: "#333333",
                trailColor: "#d6d6d6",
              })}
            />
          </div>
          <div className={styles.progresstext}>
            <div className={styles.text1}>Danh mục</div>
            <div className={styles.text2}>Danh mục được sử dụng</div>
          </div>
        </div>
        <div>
          <MyChartComponentMenu />
        </div>
        <div className={styles.header}>
          <div className={styles.title}>Biểu đồ tổng lượt xem bài viết</div>
        </div>
        <div className={styles.tableContainer}>
          {/* Post List */}
          <Table bordered hover className={`${styles.table}`}>
            <thead>
              <tr>
                <td>Tiêu đề</td>

                <td>Hành động</td>
              </tr>
            </thead>
            <tbody>
              {Array(5)
                .fill(null)
                .map((_, idx) => (
                  <tr key={idx}>
                    <td>Học ReactJS với TTO</td>

                    <td className={styles.option_button_group}>
                      <div
                        className={`d-flex justify-content-between ${styles.option_button}`}
                      >
                        <Link href="/#!">
                          <img src="/img_admin/action1.svg" alt="Edit" />
                        </Link>
                        <Link href="/#!">
                          <img src="/img_admin/action2.svg" alt="View" />
                        </Link>
                        <Link href="/#!">
                          <img src="/img_admin/action3.svg" alt="Delete" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </div>
    </Offcanvas>
  );
};

export default OverviewMenu;
