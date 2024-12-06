import React from "react";
import { Offcanvas, Table } from "react-bootstrap";
import styles from "./overviewmenu.module.css";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Link from "next/link";
import MyChartComponentMenu from "../Dashboard/ViewChartMenu";
import MychartComponentmenuRadius from "../Dashboard/ViewchartMenuRadius";

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
        <div className={styles.title}>Biểu đồ doanh thu khóa học</div>

        <button className={styles.customCloseButton} onClick={handleClose}>
          <img
            src="/img_admin/closevip.svg"
            alt="Close"
            className={styles.closeIcon}
          />
        </button>
      </div>
      <div>
        <div>
          <MyChartComponentMenu />
        </div>
        <div className={styles.header}>
          <div className={styles.title}>Biểu đồ xem thời gian khóa học</div>
        </div>
        <div className={styles.wapper_chart}>
          <div className={styles.tieude_chart}>
            <div className={styles.tieude1}>Khóa học</div>

            <select className={styles.custom_select}>
              <option value="option1">Khóa học reactJS</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>
          <div className={styles.soluonghocvien}>5.000</div>
          <div className={styles.soluongonline}>100 đang học online</div>
          <div>
            <MychartComponentmenuRadius />
          </div>
        </div>
      </div>
    </Offcanvas>
  );
};

export default OverviewMenu;
