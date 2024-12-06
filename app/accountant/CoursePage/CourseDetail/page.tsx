"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CourseDetailPage from "../../component/Course/course_detail";
import { Card, Image } from "react-bootstrap";
import style from "./courseDetail.module.css";

const CourseDetail = () => {
  return (
    <div className={style.content}>
      <div className={style.generalInfo}>
        <div>
          <h5>Khóa học:</h5>
          <div>
            <Card.Header className={style.headerContent}>
              <section className={style.headerContent__text}>
                <Card.Title className={style.text__hedding2}>
                  WEBSITE DESIGN UI/UX
                </Card.Title>
                <Card.Subtitle className={style.text__hedding3}>
                  by My Team
                </Card.Subtitle>
                <Card.Img
                  src="/img/iconReact.svg"
                  alt=""
                  className={style.text__img}
                />
              </section>
              <Card.Img
                src="/img/tuan.png"
                alt=""
                className={style.headerContent__avt}
              />
            </Card.Header>
          </div>
          <p>Khóa học UI/UX</p>
        </div>
        <div>
          <h5>Người in:</h5>
          <p>Nguyễn Minh Tâm</p>
          <p>Kế toán</p>
        </div>
        <div>
          <h5>Ngày</h5>
          <p>Ngày bắt đầu: 17/8/2024</p>
          <p>Ngày bắt đầu: 17/9/2024</p>
        </div>
      </div>

      <CourseDetailPage />
    </div>
  );
};

export default CourseDetail;
