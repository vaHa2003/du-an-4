"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { HeaderAccess } from "../component/Access/headerAccess";
import Access from "../component/Access/access";

const AccessPage = () => {
  return (
    <div>
      <HeaderAccess />
      <Access />
    </div>
  );
};

export default AccessPage;
