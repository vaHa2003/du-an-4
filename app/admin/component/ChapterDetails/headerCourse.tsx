import React from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import h from "./course.module.css";

export const HeaderCourse = () => {
  return (
    <>
      <div className={`${h.mainheader} d-flex flex-column `}>
        <div className="mx-4 mx-xs-2 mx-sm-3">
          <div
            className={`d-flex justify-content-between align-items-center my-4 flex-wrap`}
          >
            <div className="col-12 col-md-6">
              <h2 className={h.heading}>Quản lý khóa học </h2>
            </div>
            <div className={`${h.actions} d-flex`}>
              <Button
                variant="outline-primary"
                className={`${h.btnCTA} ${h.btnCTAOutline} me-2`}
              >
                Thêm chapter
              </Button>
              <Button className={`${h.btnCTA}`}>Thêm khóa học</Button>
            </div>
          </div>
        </div>
        <div className={`${h.filter_bar} d-flex justify-content-between `}>
          <div className="d-flex">
            <img
              src="/img_admin/action.svg"
              className="bg-white border-end p-4 "
              alt="Action"
            />
            <div className="bg-white border-end p-4">
              <select
                aria-label="Trạng thái"
                className={`${h.formSelect} bg-transparent`}
              >
                <option>Trạng thái</option>
                <option value="1">Active</option>
                <option value="2">Inactive</option>
              </select>
            </div>
            <div className="bg-white border-end p-4">
              <select
                aria-label="Trạng thái"
                className={`${h.formSelect} bg-transparent`}
              >
                <option>Giá</option>
                <option value="1">Active</option>
                <option value="2">Inactive</option>
              </select>
            </div>
            <div className="bg-white border-end p-4">
              <select
                aria-label="Trạng thái"
                className={`${h.formSelect} bg-transparent`}
              >
                <option>Giá giảm</option>
                <option value="1">Active</option>
                <option value="2">Inactive</option>
              </select>
            </div>
            <div className="bg-white p-4 d-inline-flex align-items-center ">
              <img src="/img_admin/restart.svg" alt="Reset" />
              <span className="text-danger">  Cài lại</span>
            </div>
          </div>
          <div>
            <InputGroup className={h.searchInputGroup}>
              <input
                type="text"
                placeholder="Tìm kiếm khóa học"
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
    </>
  );
};
