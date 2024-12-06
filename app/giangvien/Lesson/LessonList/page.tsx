"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CourseList from "@/app/giangvien/component/Course/CourseList/courseList";
import { HeaderCourseList } from "@/app/giangvien/component/Course/CourseList/headerCourseList";


const CourseListvip = () => {
  return (
    <div>
      <HeaderCourseList />
      <CourseList />
    </div>
  );
};

export default CourseListvip;
