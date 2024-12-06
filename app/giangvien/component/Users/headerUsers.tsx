import React from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import h from "./users.module.css";

export const HeaderUsers = () => {
  return (
    <div>
      <div
        className={`${h.header} d-flex justify-content-between align-items-center`}
      >
        <h2 className={h.heading}>Người dùng</h2>

        {/* <div className={`${h.actions} d-flex`}>
          <Button
            variant="outline-primary"
            className={`${h.btnCTA} ${h.btnCTAOutline} me-2`}
          >
            Thêm danh mục bài viết
          </Button>
          <Button className={`${h.btnCTA}`}>Thêm bài viết</Button>
        </div> */}
      </div>

      {/* <div
        className={`${h.filterBar} d-flex justify-content-between align-items-center`}
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
    </div>
  );
};

export const HeaderUsersSimple = () => {
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
