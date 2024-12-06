"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Article from "../component/Article/article";
import styles from "../layout.module.css";
import { HeaderArticle } from "../component/Article/headerArrticle";
import Chapter from "@/app/admin/component/Chapter/chapter";

const Admin = () => {
  return (
    <div>
      <Chapter />
    </div>
  );
};

export default Admin;
