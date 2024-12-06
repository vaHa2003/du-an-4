"use client";

import React, { FC } from "react";
import {
  Button,
  Form,
  InputGroup,
  Pagination,
  Container,
  Card,
} from "react-bootstrap";
import Table from "react-bootstrap/Table";
import h from "./course.module.css";
import Link from "next/link";
import "./course.css";
import header from "@/app/(user-global)/component/globalControl/header";

const MarketingCourse: React.FC<{}> = () => {
  return (
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
                  <td className={h.headerTD}>
                    <Card.Header className={`${h.headerContent}`}>
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
                  <td>20.000</td>
                  <td className="text-center">
                    <span className={`${h.active_text}`}>Active</span>
                  </td>
                  <td className={h.option_button_group}>
                    <div
                      className={`justify-content-evenly border d-flex py-2 rounded`}
                    >
                      <Link href="/#!" className="">
                        <img src="/img_admin/action1.svg" alt="Edit" />
                      </Link>
                      <div className="border border-start" />
                      <Link href="UsersPage/DetailUser/" className="">
                        <svg
                          width="24"
                          height="25"
                          viewBox="0 0 24 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.5 6V19C4.5 20.6569 5.84315 22 7.5 22H17.5C19.1569 22 20.5 20.6569 20.5 19V9C20.5 7.34315 19.1569 6 17.5 6H4.5ZM4.5 6V5"
                            stroke="#4589FF"
                            stroke-width="1.5"
                          />
                          <circle cx="12.5" cy="14" r="3" stroke="#4589FF" stroke-width="1.5"
                          />
                          <path
                            d="M18.5 6.00002V6.75002H19.25V6.00002H18.5ZM16.2172 2.32614L16.1111 1.58368L16.2172 2.32614ZM5.41959 3.86865L5.31353 3.12619H5.31353L5.41959 3.86865ZM5.57107 6.75002H18.5V5.25002H5.57107V6.75002ZM19.25 6.00002V4.30604H17.75V6.00002H19.25ZM16.1111 1.58368L5.31353 3.12619L5.52566 4.61111L16.3232 3.0686L16.1111 1.58368ZM5.31353 3.12619C4.41638 3.25435 3.75 4.0227 3.75 4.92895H5.25C5.25 4.76917 5.36749 4.63371 5.52566 4.61111L5.31353 3.12619ZM19.25 4.30604C19.25 2.63253 17.7678 1.34701 16.1111 1.58368L16.3232 3.0686C17.0763 2.96103 17.75 3.54535 17.75 4.30604H19.25ZM5.57107 5.25002C5.39375 5.25002 5.25 5.10627 5.25 4.92895H3.75C3.75 5.9347 4.56532 6.75002 5.57107 6.75002V5.25002Z"
                            fill="#4589FF"
                          />
                        </svg>
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
          {Array(2)
            .fill(null)
            .map((_, idx) => (
              <Pagination.Item key={idx} active={idx === 0}>
                {idx + 1}
              </Pagination.Item>
            ))}
          <Pagination.Next>
            <img src="/img_admin/prep2.svg" alt="Next" width="8" height="16" />
          </Pagination.Next>
        </Pagination>
      </div>
    </div>
  );
};

export default MarketingCourse;
