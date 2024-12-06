"use client";
import { Button, Form } from "react-bootstrap";
import "./categoryAdd.css";
import mod from "../../marketing.module.css";
import { useFormik } from "formik";
import * as Yup from 'yup'
import useCookie from "@/app/(user-global)/component/hook/useCookie";

interface category {
  name_category: string;
  tag: string;
}

const CategoryAdd = () => {

  const token = useCookie('token')

  const formik = useFormik({
    initialValues: {
      name_category: '',
      tag: ''
    },
    validationSchema: Yup.object({
      name_category: Yup.string()
        .required('Bắt buộc')
        .max(255, 'Tối đa 255 ký tự')
        .min(5, 'Tối thiểu 5 ký tự'),
      tag: Yup.string()
        .required('Bắt buộc')
        .test(
          'is-valid-tag',
          'Tag không hợp lệ. Các tag phải bắt đầu bằng #, chỉ chứa chữ cái thường và cách nhau bằng khoảng trắng.',
          (value) => {
            if (!value) return false;
            const tags = value.split(/\s+/);
            return tags.every(tag => /^#[a-z0-9]+$/i.test(tag));
          }
        )
    }),
    onSubmit: async (values: category) => {
      console.log(values.name_category);
      console.log(values.tag);
      try {
        if (token) {
          const res = await fetch(`/api/post_categories/`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name_category: values.name_category,
              tags: values.tag
            }),
          })

          const data = await res.json();
          console.log(data);
        }
      } catch (error) {
        console.error('Lỗi khi gửi dữ liệu:', error);
      }
    }
  })

  return (
    <div className="h-100">
      <div className="header-add">Thêm danh mục</div>
      <div className="body-add bg-white d-flex flex-column flex-grow-1 mx-4">
        <div className="d-flex flex-column align-items-center wrapper gap-4">
          <Form
            onSubmit={formik.handleSubmit}
          >
            <Form.Group>
              <Form.Label>Tên danh mục</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập vào tên danh mục mới"
                className="form text-muted py-2"
                {...formik.getFieldProps('name_category')}
              />
              {formik.touched.name_category && formik.errors.name_category ? (
                <div className="text-danger">{formik.errors.name_category}</div>
              ) : null}
            </Form.Group>
            <Form.Group>
              <Form.Label>Tag danh mục</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập vào tag danh mục mới"
                className="form text-muted py-2"
                {...formik.getFieldProps('tag')}
              />
              {formik.touched.tag && formik.errors.tag ? (
                <div className="text-danger">{formik.errors.tag}</div>
              ) : null}
            </Form.Group>
            <Button type="submit" style={{ marginTop: '30px', width: '100%' }} className={`${mod.btnCTA} btnAdd`}>Thêm vào</Button>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default CategoryAdd;
