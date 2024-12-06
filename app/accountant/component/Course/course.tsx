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

const Course: React.FC<{}> = () => {
  const totalPages = 10;
  const currentPage = 1;
  const onPageChange = (page: number) => {
    console.log("Chuyển tới trang:", page);
  };

  const renderPaginationItems = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, idx) => (
        <Pagination.Item
          key={idx}
          active={currentPage === idx + 1}
          onClick={() => onPageChange(idx + 1)}
        >
          {idx + 1}
        </Pagination.Item>
      ));
    }

    return (
      <>
        {Array.from({ length: 7 }, (_, idx) => (
          <Pagination.Item
            key={idx}
            active={currentPage === idx + 1}
            onClick={() => onPageChange(idx + 1)}
          >
            {idx + 1}
          </Pagination.Item>
        ))}
        <Pagination.Ellipsis disabled />
      </>
    );
  };

  return (
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
              <td>Hình ảnh</td>
              <td>Tên khóa học</td>
              <td>Giá</td>
              <td>Giá giảm</td>
              <td>Lượt xem</td>
              <td>Giảng viên</td>
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
                  <td>20%</td>
                  <td>Nguyễn Minh Tâm</td>
                  <td>
                    <span className={h.active_text}>Active</span>
                  </td>
                  <td className={h.option_button_group}>
                    <div
                      className={`justify-content-between border d-flex py-2 rounded`}
                    >
                      <Link href="/accountant/CoursePage/RecentPurchaseCourse" className="w-50 border-end">
                        <img src="/img_admin/action1.svg" alt="Edit" />
                      </Link>
                      <Link href="CoursePage/CourseDetail" className="w-50">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                          <path d="M17.6213 21.1213C18.5 20.2426 18.5 18.8284 18.5 16L18.5 12.6595C17.0233 12.1579 15.0419 11.7498 12.5 11.7498C9.95812 11.7498 7.97667 12.1579 6.5 12.6595V16C6.5 18.8284 6.5 20.2426 7.37868 21.1213C8.25736 22 9.67157 22 12.5 22C15.3284 22 16.7426 22 17.6213 21.1213Z" fill="#24A148" />
                          <path d="M16.5 6H8.5C5.67157 6 4.25736 6 3.37868 6.87868C2.5 7.75736 2.5 9.17157 2.5 12C2.5 14.8284 2.5 16.2426 3.37868 17.1213C3.87105 17.6137 4.53157 17.8302 5.51484 17.9253C5.49996 17.3662 5.49998 16.7481 5.5 16.0706L5.5 13.0424C5.43434 13.0706 5.37007 13.0988 5.3072 13.1271C4.92933 13.2967 4.48546 13.1279 4.3158 12.7501C4.14614 12.3722 4.31493 11.9283 4.6928 11.7587C6.41455 10.9856 8.9805 10.2498 12.5 10.2498C16.0195 10.2498 18.5854 10.9856 20.3072 11.7587C20.6851 11.9283 20.8539 12.3722 20.6842 12.7501C20.5145 13.1279 20.0707 13.2967 19.6928 13.1271C19.6299 13.0988 19.5657 13.0706 19.5 13.0424L19.5 16.0706C19.5 16.748 19.5 17.3662 19.4852 17.9253C20.4684 17.8302 21.129 17.6137 21.6213 17.1213C22.5 16.2426 22.5 14.8284 22.5 12C22.5 9.17157 22.5 7.75736 21.6213 6.87868C20.7426 6 19.3284 6 16.5 6Z" fill="#24A148" />
                          <path d="M17.6209 2.87868C16.7422 2 15.328 2 12.4995 2C9.67112 2 8.25691 2 7.37823 2.87868C6.88586 3.37105 6.66939 4.03157 6.57422 5.01484C7.13346 4.99996 7.75161 4.99998 8.42921 5H16.5704C17.2478 4.99998 17.8658 4.99996 18.4249 5.01483C18.3297 4.03156 18.1132 3.37105 17.6209 2.87868Z" fill="#24A148" />
                        </svg>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>

      <div className="paginationWrapper">
        <Pagination className="pagination">
          <Pagination.Prev
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          >
            <img
              src="/img_admin/prep.svg"
              alt="Previous"
              width="8"
              height="16"
            />
          </Pagination.Prev>
          {renderPaginationItems()}
          <Pagination.Next
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          >
            <img src="/img_admin/prep2.svg" alt="Next" width="8" height="16" />
          </Pagination.Next>
        </Pagination>
      </div>
    </div>
  );
};

export default Course;
