"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Article from "../component/Article/article";
import styles from "../layout.module.css";

import ChapterAdd from "@/app/admin/component/Chapter/chapterAdd";

const Admin = () => {
  return (
    <div>
      <ChapterAdd />
    </div>
  );
};

export default Admin;
