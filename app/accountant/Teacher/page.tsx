"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { HeaderTeacher } from "../component/Teacher/HeaderTeacher";
import { Pagination, Image } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import h from "./teacher.module.css";
import Link from "next/link";
import ".././component/Course/course.css";

const TeacherPage = () => {
  return (
    <div>
      <HeaderTeacher />
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
                <td>Giảng viên</td>
                <td>Tên khóa học</td>
                <td>Email</td>
                <td>Tuổi</td>
                <td>Số điện thoại</td>
                <td>Hành động</td>
              </tr>
            </thead>
            <tbody>
              {Array(5)
                .fill(null)
                .map((_, idx) => (
                  <tr key={idx}>
                    <td>
                      <Image
                        src="/img_accountant/avatar.png"
                        width={80}
                        height={80}
                        className={h.roundedImg}
                      />
                    </td>
                    <td>
                      <Link href={"Teacher/TeacherDetail"}>
                        Nguyễn Minh Tâm
                      </Link>
                    </td>
                    <td>Website Design UI/UX</td>
                    <td>Tam@gmail.com</td>
                    <td>20</td>
                    <td>096294354</td>
                    <td>
                      <div className={h.PrintBtn}>
                        <Link href="/accountant/Teacher/TeacherDetail">
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

export default TeacherPage;
