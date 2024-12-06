"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Course from "../component/ChapterDetails/course";
import { HeaderCourse } from "../component/ChapterDetails/headerCourse";

const CoursePage = () => {
  return (
    <div>
      <HeaderCourse />
      <Course />
    </div>
  );
};

export default CoursePage;
