import React, { useState } from "react";
import { Button, Form, Image, InputGroup } from "react-bootstrap";
import h from "../users.module.css";


export const HeaderDetailUser = () => {

  return (
    <div>
      <div
        className={`${h.header} d-flex justify-content-between align-items-center`}
      >
        <h2 className={h.heading}>Chi tiết người dùng</h2>

        {/* <div className={`${h.actions} d-flex`}>
          <Button
            variant="outline-primary"
            className={`${h.btnCTA} ${h.btnCTAOutline} me-2`}
          >
            Thêm danh mục bài viết
          </Button>
          <Button className={`${h.btnCTA}`}>Thêm bài viết</Button>
        </div> */}
      </div>

    </div>
  );
};

