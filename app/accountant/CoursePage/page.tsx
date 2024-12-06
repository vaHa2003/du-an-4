"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Course from "../component/Course/course";
import { HeaderCourse } from "../component/Course/headerCourse";

const CoursePage = () => {
  return (
    <div>
      <HeaderCourse />
      <Course />
    </div>
  );
};

export default CoursePage;
