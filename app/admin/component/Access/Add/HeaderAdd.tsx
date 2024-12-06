import React from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import h from "../access.module.css";
import Link from "next/link";

export const HeaderAddAccess = () => {
  return (
    <div className="mx-4 mx-xs-2 mx-sm-3">
      <div
        className={`d-flex justify-content-between align-items-center my-4 flex-wrap`}
      >
        <div className="col-12 col-md-6">
          <h2 className={h.heading}>Thêm vai trò</h2>
        </div>
      </div>
    </div>
  );
};
