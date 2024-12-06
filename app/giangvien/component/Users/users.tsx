"use client";

import React, { FC } from "react";
import {
  Button,
  Form,
  InputGroup,
  Table,
  Pagination,
  Container,
} from "react-bootstrap";
import h from "./users.module.css";
import Link from "next/link";
import "./users.css";
import header from "@/app/(user-global)/component/globalControl/header";

const Users: React.FC<{}> = () => {
  return (
    <div
      className={`${h.container} d-flex flex-column flex-grow-1 align-items-start`}
    >
      {/* Header */}
      {/* <div
        className={`${h.header} d-flex justify-content-between align-items-center`}
      >
        <h2 className={h.heading}>Bài viết</h2>
        {showActions && (
          <div className={`${h.actions} d-flex`}>
            <Button
              variant="outline-primary"
              className={`${h.btnCTA} ${h.btnCTAOutline} me-2`}
            >
              Thêm danh mục bài viết
            </Button>
            <Button className={`${h.btnCTA}`}>Thêm bài viết</Button>
          </div>
        )}
      </div>

      <div
        className={`${h.filterBar} d-flex justify-content-between align-items-center w-100`}
      >
        <InputGroup className={`${h.filterInputGroup} d-flex`}>
          <InputGroup.Text className={h.inputGroupText}>
            <img src="/img_admin/action.svg" alt="Action" />
          </InputGroup.Text>

          <select aria-label="Trạng thái" className={h.formSelect}>
            <option>Trạng thái  </option>
            <option value="1">Active</option>
            <option value="2">Inactive</option>
          </select>

          <select aria-label="Lượt xem" className={h.formSelect}>
            <option>Lượt xem  </option>
            <option value="1">0-100</option>
            <option value="2">1000+</option>
          </select>

          <InputGroup.Text className={h.resetGroupText}>
            <img src="/img_admin/restart.svg" alt="Reset" />
            <span>  Cài lại</span>
          </InputGroup.Text>
        </InputGroup>

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
      </div> */}

      {/* Post List */}
      <div className="d-flex overflow-auto w-100" style={{ whiteSpace: 'nowrap' }}>
        <Table id="cssTable" bordered hover className={`${h.table}`}>
          <thead>
            <tr>
              <td>Tên</td>
              <td>Email</td>
              <td>Số điện thoại</td>
              <td>Vai trò</td>
              <td>Ngày đăng kí</td>
              <td>Trạng thái</td>
              <td>Hành động</td>
            </tr>
          </thead>
          <tbody>
            {Array(5)
              .fill(null)
              .map((_, idx) => (
                <tr key={idx}>
                  <td>Minh Tâm</td>
                  <td>
                    Name123@gmail.com
                  </td>
                  <td>0962987455</td>
                  <td>Học viên</td>
                  <td>01/02/2024</td>
                  <td>
                    <span className={h.active_text}>Active</span>
                  </td>
                  <td className={h.option_button_group}>
                    <div
                      className={`justify-content-between border d-flex py-2`}
                    >
                      <Link href="/#!" className="w-50 border-end">
                        <img src="/img_admin/action1.svg" alt="Edit" />
                      </Link>
                      <Link href={`/UsersPage?id=${1}`} as={`UsersPage/${1}`} className="w-50">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="" className="bi bi-eye" viewBox="0 0 16 16">
                          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
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
    </div >
  );
};

export default Users;
