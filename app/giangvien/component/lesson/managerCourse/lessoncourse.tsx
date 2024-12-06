"use client";

import React, { FC } from "react";
import {
  Button,
  Form,
  InputGroup,
  Pagination,
  Container,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import Table from "react-bootstrap/Table";
import h from "./lessoncourse.module.css";
import Link from "next/link";
import "./lessoncourse.css";

const LessonCourse: React.FC<{}> = () => {
  return (
    <div>
      <div className="mx-4 mx-xs-2 mx-sm-3">
        <div
          className={`d-flex justify-content-between align-items-center my-4`}
        >
          <h2 className={h.heading}>Quản lý khóa học</h2>

          <div className={`${h.actions} d-flex`}>
            <Button className={`${h.btnCTA}`}>Thêm bài học</Button>
          </div>
        </div>

        <Row
          className={`${h.filterBar} justify-content-between align-items-center`}
        >
          <Col xs={12} sm={12} md={4} className="mb-4">
            <Row className="bg-white d-flex flex-row rounded-lg justify-content-between py-3 rounded-3">
              <Col
                xs={6}
                sm={2}
                md={1}
                className={`d-flex flex-row justify-content-center align-items-center  mb-4 mb-md-0 mb-sm-0 px-0`}
              >
                <img src="/img_admin/action.svg" alt="Action" />
              </Col>
              <Col
                xs={6}
                sm={2}
                md={2}
                className=" justify-content-center align-items-center d-flex mb-4 mb-md-0 mb-sm-0"
              >
                <select aria-label="Trạng thái" className={`${h.formSelect} `}>
                  <option>Trạng thái  </option>
                  <option value="1">Active</option>
                  <option value="2">Inactive</option>
                </select>
              </Col>

              <Col xs={6} sm={2} md={3}>
                <div className="d-flex flex-row justify-content-center align-items-center mt-4 mt-md-0 mt-sm-0">
                  <img src="/img_admin/restart.svg" alt="Reset" />
                  <span className="text-danger">  Cài lại</span>
                </div>
              </Col>
            </Row>
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
                placeholder="Tìm kiếm bài viết"
                // className={h.searchInput}
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
      <div
        className={`d-flex flex-column flex-grow-1 align-items-start mx-4 mx-xs-2 mx-sm-3`}
      >
        {/* Post List */}
        <div
          className="d-flex overflow-auto w-100"
          style={{ whiteSpace: "nowrap" }}
        >
          <Table
            id="cssTable"
            bordered
            hover
            className={`${h.table} table-responsive`}
          >
            <thead>
              <tr>
                <td>Hình ảnh</td>
                <td>Tên khóa học</td>
                <td>Giá</td>
                <td>Giá giảm</td>
                <td>Lượt xem</td>

                <td>Trạng thái</td>
                <td>Hành động</td>
              </tr>
            </thead>
            <tbody>
              {Array(5)
                .fill(null)
                .map((_, idx) => (
                  <tr key={idx}>
                    <td>
                      <Card.Header className={h.headerContent}>
                        <section className={h.headerContent__text}>
                          <Card.Title className={h.text__hedding2}>
                            WEBSITE DESIGN UI/UX
                          </Card.Title>
                          <Card.Subtitle className={h.text__hedding3}>
                            by My Team
                          </Card.Subtitle>
                          <Card.Img
                            src="/img/iconReact.svg"
                            alt=""
                            className={h.text__img}
                          />
                        </section>
                        <Card.Img
                          src="/img/tuan.png"
                          alt=""
                          className={h.headerContent__avt}
                        />
                      </Card.Header>
                    </td>
                    <td>WEBSITE DESIGN UI/UX</td>
                    <td>1.000.000</td>
                    <td>20%</td>
                    <td>2000</td>

                    <td>
                      <span className={h.active_text}>Active</span>
                    </td>
                    <td className={h.option_button_group}>
                      <div
                        className={`justify-content-between border d-flex py-2 rounded`}
                      >
                        <Link href="/#!" className="w-50 border-end">
                          <img src="/img_admin/action1.svg" alt="Edit" />
                        </Link>
                        <Link href="/#!" className="w-50 border-end">
                          <img src="/img_admin/dautick.png" alt="Edit" />
                        </Link>

                        <Link href="UsersPage/DetailUser/" className="w-50">
                          <img src="/img_admin/action2.svg" alt="Edit" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="paginationWrapper">
          <Pagination className="pagination">
            <Pagination.Prev>
              <img
                src="/img_admin/prep.svg"
                alt="Previous"
                width="8"
                height="16"
              />
            </Pagination.Prev>
            {Array(7)
              .fill(null)
              .map((_, idx) => (
                <Pagination.Item key={idx} active={idx === 0}>
                  {idx + 1}
                </Pagination.Item>
              ))}
            <Pagination.Next>
              <img
                src="/img_admin/prep2.svg"
                alt="Next"
                width="8"
                height="16"
              />
            </Pagination.Next>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default LessonCourse;
