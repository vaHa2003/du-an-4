"use client";
import { Button, Form } from "react-bootstrap";
import "./categoryEdit.css";
import mod from "../../marketing.module.css";

const CategoryEdit = () => {
  return (
    <div className="h-100">
      <div className="header-add">Chỉnh sửa danh mục</div>
      <div className="body-add bg-white d-flex flex-column flex-grow-1 mx-4">
        <div className="d-flex flex-column align-items-center wrapper gap-4">
          <Form>
            <Form.Group>
              <Form.Label>Tên danh mục</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập vào vào tên danh mục mới"
                value={"Học ReactJS với TTO"}
                className={`form text-muted py-2`}
              />
            </Form.Group>
          </Form>
          <Button className={`${mod.btnCTA} btnAdd`}>Chỉnh sửa</Button>
        </div>
      </div>
    </div>
  );
};
export default CategoryEdit;
