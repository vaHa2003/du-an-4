"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Image } from "react-bootstrap";
import style from "../../CoursePage/CourseDetail/courseDetail.module.css";
import TeacherDetailPage from "../../component/Teacher/tableTeacherDetail";

const TeacherDetail = () => {
  return (
    <div className={style.content}>
      <div className={style.generalInfo}>
        <div>
          <h5>Giảng viên:</h5>
          <p>Gia Thành</p>
          <p>Kế toán</p>
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

      <TeacherDetailPage />
    </div>
  );
};

export default TeacherDetail;
