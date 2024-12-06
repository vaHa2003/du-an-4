import React from "react";
import {
  Button,
  Form,
  InputGroup,
  Row,
  Col,
  FormControl,
} from "react-bootstrap";
import h from "./headerteacher.module.css";

export const HeaderTeacher = () => {
  return (
    <div className="mx-4 mx-xs-2 mx-sm-3">
      <div className={`d-flex justify-content-between align-items-center my-4`}>
        <h2 className={h.heading}>Giảng viên</h2>
      </div>

      <Row
        className={`${h.filterBar} justify-content-between align-items-center`}
      >
        <Col xs={4} sm={4} md={5} className="mb-4">
          <div className="d-flex">
            <img
              src="/img_admin/action.svg"
              className="bg-white border-end p-4 rounded-start-4"
              alt="Action"
            />
            <div className="bg-white border-end p-4">
              <select
                aria-label="Trạng thái"
                className={`${h.formSelect} bg-transparent`}
              >
                <option>Trạng thái  </option>
                <option value="1">Active</option>
                <option value="2">Inactive</option>
              </select>
            </div>
            <div className="bg-white p-4 d-inline-flex align-items-center rounded-end-4">
              <img src="/img_admin/restart.svg" alt="Reset" />
              <span className="text-danger">  Cài lại</span>
            </div>
          </div>
        </Col>

        <Col
          xs={12}
          sm={12}
          md={4}
          className="align-items-end d-flex justify-content-end mb-4 mb-md-0 mb-sm-0"
        >
          <div className={`${h.searchInputGroup} `}>
            <Form.Control
              type="text"
              placeholder="Tìm kiếm giảng viên"
              className="w-100"
            />
            <div className={h.searchIconWrapper}>
              <img
                src="/img_admin/search.svg"
                alt="Search"
                width={"24px"}
                height={"24px"}
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
