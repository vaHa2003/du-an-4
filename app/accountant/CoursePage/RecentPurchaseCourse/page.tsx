"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Pagination, Table, Form } from "react-bootstrap";
import h from "./recentpurchase.module.css";
import "../../component/Course/course.css";
import Link from "next/link";

const RecentPurchaseCourse = () => {
  return (
    <div className={h.content}>
      <div className={h.title}>
        <h4>Danh sách 50 lượt mua gần nhất</h4>
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
      </div>

      <div
        className={`d-flex flex-column flex-grow-1 align-items-start mx-4 mx-xs-2 mx-sm-3`}
      >
        <div
          className="d-flex overflow-auto w-100"
          style={{ whiteSpace: "nowrap" }}
        >
          <Table bordered hover className={`${h.table} table-responsive`}>
            <thead>
              <tr>
                <td>Tên người mua</td>
                <td>Khóa học</td>
                <td>Giá</td>
                <td>Giảng viên</td>
                <td>Ngày</td>
              </tr>
            </thead>
            <tbody>
              {Array(5)
                .fill(null)
                .map((_, idx) => (
                  <tr key={idx}>
                    <td>Nguyễn Minh Tâm</td>
                    <td>Khóa học Javascript</td>
                    <td>1.000.000</td>
                    <td>Hiếu Thảo</td>
                    <td>10/01/2024</td>
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

export default RecentPurchaseCourse;
