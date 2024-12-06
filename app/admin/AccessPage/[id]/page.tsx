"use client";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { HeaderAccess } from "@/app/admin/component/Access/headerAccess";
import InputComponents from "@/app/admin/component/InputComponent";
import { HeaderUpdateAccess } from "../../component/Access/Update/HeaderUpdate";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { clear } from "@/redux/slices/userSlice";
import { useFormik } from "formik";
import * as Yup from 'yup'

interface RoleProps {
  params: {
    id: number | string;
  }
}

const UpdateAccessPage: React.FC<RoleProps> = ({ params }) => {
  const userState = useSelector((state: RootState) => state.user.data)
  const pathname = usePathname();
  const dispatch = useDispatch()
  const route = useRouter()

  console.log(userState);


  const formik = useFormik({
    initialValues: {
      id: params.id,
      role: userState?.role || "",
    },
    validationSchema: Yup.object({
      role: Yup.string().required('bắt buộc'),
    }),
    onSubmit: async (values) => {
      try {
        if (confirm('Bạn có muốn thay đổi vai trò của tài khoản này không!!')) {
          const res = await fetch(`/api/updateRoleFpt/`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id: values.id, role: values.role })
          })
          const data = await res.json();
          console.log(data);

          if (data.status === 'success') {
            alert('Bạn đã thay đổi thành công!!!')
            route.replace('/admin/AccessPage/')
          } else {
            alert('Thay đổi thấy bại. Chỉ có thể thay đổi với những email có đuôi @fpt.edu.vn')
          }
        }

      } catch (error) {
      }
    }
  })

  return (
    <div>
      <HeaderUpdateAccess />
      <div
        className={` flex-column flex-grow-1 mx-4 mx-xs-2 mx-sm-3 bg-white`}
        style={{ minHeight: '75vh' }}
      >
        <form className="d-flex align-items-center justify-center col w-50 m-auto" onSubmit={formik.handleSubmit} style={{ flexDirection: 'column' }}>
          <div className="row d-flex align-items-center justify-content-center mb4" style={{ width: '100%' }}>
            <div className=" col-12 col-md-6 col-lg-6">
              <div className="form-label">
                Tài khoản
              </div>
              <div>{userState?.email}</div>
            </div>
            <div className="col-12 col-md-6 col-lg-6">
              <label className="form-label">
                Vai trò
              </label>
              <div className="position-relative d-flex">
                <select
                  aria-label="Lượt xem"
                  value={formik.values.role}
                  className="form-control"
                  style={{ height: 50, backgroundColor: '#f5f6fa', borderColor: '#f5f6fa', borderRadius: 10 }}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="role"
                >
                  <option value="admin">Admin</option>
                  <option value="marketing">Marketing</option>
                  <option value="accountant">Accountant</option>
                  <option value="instructor">Instructor</option>
                </select>
                <div className="position-absolute" style={{ top: '25%', right: 10 }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                  </svg>
                </div>
              </div>
              {formik.touched.role && formik.errors.role && (
                <div style={{ color: 'red', fontSize: '12px' }}>
                  {formik.errors.role}
                </div>
              )}
            </div>
          </div>
          <button type="submit" className="btn btn-primary my-4" style={{ width: 200, height: 50 }}>
            Thay đổi
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateAccessPage;
