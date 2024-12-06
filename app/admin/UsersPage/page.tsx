"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Article from "../component/Article/article";
import styles from "../layout.module.css";
import { HeaderUsers } from "../component/Users/headerUsers";
import Users from "../component/Users/users";

const UsersPage = () => {
  return (
    <div>
      <HeaderUsers />
      <Users />
    </div>
  );
};

export default UsersPage;
