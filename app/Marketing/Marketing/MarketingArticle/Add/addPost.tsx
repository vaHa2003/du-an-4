"use client";
;
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

import mod from "../../marketing.module.css";
import postMod from "./post.module.css";
import { useEffect, useRef, useState } from "react";
import useCookie from "@/app/(user-global)/component/hook/useCookie";
import CkediterCustom from "../../../../custom-editor";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

interface Category {
  id: string;
  name_category: string;
  created_at: string;
  updated_at: string;
  del_flag: boolean;
}

interface Data<T> {
  status: string;
  message: string;
  data: T[];
}

const AddMarketingPost = () => {
  const token = useCookie('token')
  const [content, setContent] = useState<string>('');
  const [dataCates, setDataCates] = useState<Data<Category> | null>(null)
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter()

  useEffect(() => {
    if (token) {
      fetch(`/api/post_categories/`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setDataCates(data)
        })
        .catch(error => {
          console.log(error);
        })
    }
  }, [token])

  const formik = useFormik({
    initialValues: {
      title_post: "",
      content_post: "",
      category_id: "",
      img_post: null as File | null,
    },
    validationSchema: Yup.object({
      title_post: Yup.string()
        .required("Tiêu đề không được để trống")
        .max(255, "Tiêu đề quá dài"),
      content_post: Yup.string()
        .test(
          "isNotEmptyHTML",
          "Tiêu đề không được để trống",
          (value) => !!value && value.replace(/<[^>]*>/g, "").trim() !== ""
        )
        .required("Tiêu đề không được để trống"),
      category_id: Yup.string().required("Vui lòng chọn danh mục"),
      img_post: Yup.mixed().required("Hình ảnh không được để trống"),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("title_post", values.title_post);
      formData.append("content_post", values.content_post);
      formData.append("category_id", values.category_id);
      if (values.img_post) {
        formData.append("img_post", values.img_post);
      }

      try {
        const response = await fetch("/api/allPost", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        const result = await response.json();
        console.log(result);
        if (result.ok) {
          alert('Thêm thành công!!!')
          router.replace('/Marketing/MarketingPosts/')
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });

  const handleEditorChange = (data: string) => {
    formik.setFieldValue("content_post", data);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      formik.setFieldValue("img_post", file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const openFileSelector = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div
      className={`${postMod.postContainer} d-flex flex-column gap-4 m-4 m-xs-2 m-sm-3 p-4 bg-white`}
    >
      <Form onSubmit={formik.handleSubmit}>
        <div
          className={`${postMod.dragAndDrop} border-dark-subtle d-flex flex-column gap-2 w-100 justify-content-center align-items-center`}
        >
          <div className="mb-4">
            <svg
              width="47"
              height="39"
              viewBox="0 0 47 39"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M31.5 27.5L23.5 19.5L15.5 27.5"
                stroke="#4D4D4D"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M23.5 19.5V37.5"
                stroke="#4D4D4D"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M40.2789 32.28C42.2296 31.2165 43.7706 29.5337 44.6587 27.4972C45.5468 25.4607 45.7314 23.1864 45.1834 21.0334C44.6353 18.8803 43.3859 16.971 41.6323 15.6069C39.8786 14.2427 37.7207 13.5014 35.4989 13.5H32.9789C32.3736 11.1585 31.2453 8.98464 29.6788 7.14195C28.1124 5.29927 26.1486 3.83567 23.9351 2.86118C21.7216 1.8867 19.316 1.42669 16.8992 1.51573C14.4823 1.60478 12.1171 2.24057 9.9813 3.3753C7.84552 4.51003 5.99477 6.11417 4.56819 8.06713C3.14161 10.0201 2.17632 12.271 1.7449 14.6508C1.31348 17.0305 1.42715 19.477 2.07737 21.8065C2.72759 24.136 3.89743 26.2877 5.49894 28.1"
                stroke="#4D4D4D"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M31.5 27.5L23.5 19.5L15.5 27.5"
                stroke="#4D4D4D"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          {previewImage ? (
            <img
              src={previewImage}
              alt="Preview"
              className="mb-3"
              style={{
                maxWidth: "200px",
                maxHeight: "200px",
                objectFit: "cover",
              }}
            />
          ) : (
            <small className="fw-semibold">Chọn một hình ảnh</small>
          )}
          <span className="text-muted">
            JPG, PNG hoặc PDF, kích thước không lớn hơn 10MB
          </span>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          {formik.errors.img_post && formik.touched.img_post && (
            <p className="text-danger">{formik.errors.img_post}</p>
          )}
          <Button
            variant="outline-primary"
            className={`${mod.btnCTA} ${mod.btnCTAOutline} m-3 p-3`}
            onClick={openFileSelector}
          >
            <small>Thêm ảnh bài viết</small>
          </Button>
        </div>
        <Form.Group>
          <Form.Label>Tên tiêu đề</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập vào tiêu đề nội dung"
            className={`${postMod.form} text-muted py-2`}
            name="title_post"
            value={formik.values.title_post}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.title_post && formik.touched.title_post && (
            <p className="text-danger">{formik.errors.title_post}</p>
          )}
        </Form.Group>
        <CkediterCustom
          initialData={formik.values.content_post}
          onChange={(data) => formik.setFieldValue("content_post", data)}
        />
        {formik.errors.content_post && formik.touched.content_post && (
          <p className="text-danger">{formik.errors.content_post}</p>
        )}
        <Form.Group className="w-25">
          <Form.Label>Danh mục</Form.Label>
          <Form.Select
            className={`${postMod.form} text-muted py-2`}
            name="category_id"
            value={formik.values.category_id}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">Chọn danh mục</option>
            {dataCates?.data.map((item, index) => (
              <option key={index} value={item.id}>
                {item.name_category}
              </option>
            ))}
          </Form.Select>
          {formik.errors.category_id && formik.touched.category_id && (
            <p className="text-danger">{formik.errors.category_id}</p>
          )}
        </Form.Group>
        <Button type="submit" className={`${postMod.addBtn} ${mod.btnCTA}`}>Thêm vào</Button>
      </Form>
    </div>
  );
};

export default AddMarketingPost;
