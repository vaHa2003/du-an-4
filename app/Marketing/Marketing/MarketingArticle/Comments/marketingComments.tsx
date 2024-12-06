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
import h from "../article.module.css";
import Link from "next/link";
import "../article.css";
import header from "@/app/(user-global)/component/globalControl/header";
import { useRouter } from "next/navigation";

const Comments: React.FC<{}> = () => {
  const router = useRouter();

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
              <td>Chọn</td>
              <td>ID</td>
              <td>Nội dung</td>
              <td>Trả lời</td>
              <td>Ngày đăng</td>
              <td className="text-center">Trạng thái</td>
              <td>Hành động</td>
            </tr>
          </thead>
          <tbody>
            {Array(5)
              .fill(null)
              .map((_, idx) => (
                <tr
                  key={idx}
                  onClick={() => {
                    router.push(`MarketingPosts/${idx}`);
                  }}
                >
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{idx + 1}</td>
                  <td>Bài viết này hay quá đi cảm ơn TTO</td>
                  <td>Cảm ơn</td>
                  <td>01/02/2024</td>
                  <td className="text-center">
                    {idx % 2 == 0 ? (
                      <span className={h.active_text}>Active</span>
                    ) : (
                      <span className={h.rejected_text}>Rejected</span>
                    )}
                  </td>
                  <td className={h.option_button_group}>
                    <div
                      className={`d-flex justify-content-evenly border py-2 rounded`}
                    >
                      <svg
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M12.5 8.25C10.4289 8.25 8.75 9.92893 8.75 12C8.75 14.0711 10.4289 15.75 12.5 15.75C14.5711 15.75 16.25 14.0711 16.25 12C16.25 9.92893 14.5711 8.25 12.5 8.25ZM10.25 12C10.25 10.7574 11.2574 9.75 12.5 9.75C13.7426 9.75 14.75 10.7574 14.75 12C14.75 13.2426 13.7426 14.25 12.5 14.25C11.2574 14.25 10.25 13.2426 10.25 12Z"
                          fill="#4D4D4D"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M12.5 3.25C7.98587 3.25 4.94529 5.9542 3.18057 8.24686L3.14874 8.2882C2.74964 8.80653 2.38206 9.28392 2.13269 9.8484C1.86564 10.4529 1.75 11.1117 1.75 12C1.75 12.8883 1.86564 13.5471 2.13269 14.1516C2.38206 14.7161 2.74964 15.1935 3.14875 15.7118L3.18057 15.7531C4.94529 18.0458 7.98587 20.75 12.5 20.75C17.0141 20.75 20.0547 18.0458 21.8194 15.7531L21.8512 15.7118C22.2504 15.1935 22.6179 14.7161 22.8673 14.1516C23.1344 13.5471 23.25 12.8883 23.25 12C23.25 11.1117 23.1344 10.4529 22.8673 9.8484C22.6179 9.28391 22.2504 8.80652 21.8512 8.28818L21.8194 8.24686C20.0547 5.9542 17.0141 3.25 12.5 3.25ZM4.36922 9.1618C5.99864 7.04492 8.65036 4.75 12.5 4.75C16.3496 4.75 19.0014 7.04492 20.6308 9.1618C21.0694 9.73159 21.3263 10.0721 21.4952 10.4545C21.6532 10.812 21.75 11.2489 21.75 12C21.75 12.7511 21.6532 13.188 21.4952 13.5455C21.3263 13.9279 21.0694 14.2684 20.6308 14.8382C19.0014 16.9551 16.3496 19.25 12.5 19.25C8.65036 19.25 5.99864 16.9551 4.36922 14.8382C3.93064 14.2684 3.67374 13.9279 3.50476 13.5455C3.34684 13.188 3.25 12.7511 3.25 12C3.25 11.2489 3.34684 10.812 3.50476 10.4545C3.67374 10.0721 3.93063 9.73159 4.36922 9.1618Z"
                          fill="#4D4D4D"
                        />
                      </svg>
                      <div className="border border-start" />
                      <svg
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.0703 22C17.5932 22 22.0703 17.5228 22.0703 12C22.0703 6.47715 17.5932 2 12.0703 2C6.54747 2 2.07031 6.47715 2.07031 12C2.07031 13.5997 2.44593 15.1116 3.11378 16.4525C3.29125 16.8088 3.35032 17.2161 3.24743 17.6006L2.65183 19.8267C2.39327 20.793 3.27733 21.677 4.24366 21.4185L6.4697 20.8229C6.85425 20.72 7.26152 20.7791 7.61784 20.9565C8.95868 21.6244 10.4706 22 12.0703 22Z"
                          stroke="#438FF7"
                          stroke-width="1.5"
                        />
                        <path
                          d="M9.07031 12.08L11.0703 14L15.0703 10"
                          stroke="#438FF7"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
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

export default Comments;
