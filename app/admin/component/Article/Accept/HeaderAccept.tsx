import React from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import h from "../articel.module.css";

export const HeaderAcceptArticel = () => {
  return (
    <div className="mx-4 mx-xs-2 mx-sm-3">
      <div
        className={`d-flex justify-content-between align-items-center my-4 flex-wrap`}
      >
        <div className="col-12 col-md-6">
          <h2 className={h.heading}>Kiểm duyệt post</h2>
        </div>


        <div className={`col-12 col-md-6 flex-row d-flex justify-content-end`}>
          <Button className={`${h.btnCTA}`}>Đăng bài</Button>
        </div>
      </div>

    </div>
  );
};

export const HeaderArticleSimple = () => {
  return (
    <div>
      <div
        className={`${h.header1} d-flex justify-content-between align-items-center`}
      >
        <h2 className={h.heading}>Bài viết</h2>

        <div className={`${h.actions} d-flex`}>
          <InputGroup className={h.searchInputGroup}>
            <Form.Control
              type="text"
              placeholder="Tìm kiếm bài viết"
              className={h.searchInput}
            />
            <div className={h.searchIconWrapper}>
              <img
                src="/img_admin/search.svg"
                alt="Search"
                width={"24px"}
                height={"24px"}
              />
            </div>
          </InputGroup>
        </div>
      </div>
    </div>
  );
};
