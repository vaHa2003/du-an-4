"use client";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Access from "../../component/Access/access";
import { HeaderAddAccess } from "../../component/Access/Add/HeaderAdd";
import InputComponents from "../../component/InputComponent";

const AddAccessPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    account: '',
    password: '',
    role: '',
    confirmation: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedFormData);
    console.log(updatedFormData); // Log ra dữ liệu form mỗi khi có thay đổi
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted data:", formData); // Log dữ liệu khi form được gửi
    // Xử lý logic gửi form
  };

  return (
    <div>
      <HeaderAddAccess />
      <div className={`flex-column flex-grow-1 mx-4 mx-xs-2 mx-sm-3 bg-white`} style={{ minHeight: '75vh' }}>
        <form className="d-flex align-items-center justify-center col w-50 m-auto" onSubmit={handleSubmit} style={{ flexDirection: 'column' }}>
          {/* Tên */}
          <div className="row d-flex align-items-center justify-content-center my-4" style={{ width: '100%' }}>
            <div className="col-12 col-md-6 col-lg-6">
              <label htmlFor="name" className="form-label">Tên</label>
              <InputComponents
                value={formData.name}
                onChange={handleChange}
                placeholder="Nhập tên của bạn"
                type="text"
                name="name"
              />
            </div>

            {/* Mật khẩu */}
            <div className="col-12 col-md-6 col-lg-6">
              <label htmlFor="password" className="form-label">Mật khẩu</label>
              <InputComponents
                value={formData.password}
                onChange={handleChange}
                placeholder="Nhập mật khẩu"
                type="password"
                name="password"
              />
            </div>
          </div>

          {/* Tài khoản */}
          <div className="row d-flex align-items-center justify-content-center mb-4" style={{ width: '100%' }}>
            <div className="col-12 col-md-6 col-lg-6">
              <label htmlFor="account" className="form-label">Tài khoản</label>
              <InputComponents
                value={formData.account}
                onChange={handleChange}
                placeholder="Nhập tài khoản của bạn"
                type="text"
                name="account" // Sửa từ "acount" thành "account"
              />
            </div>

            {/* Vai trò */}
            <div className="col-12 col-md-6 col-lg-6">
              <label htmlFor="role" className="form-label">Vai trò</label>
              <select
                aria-label="Lựa chọn vai trò"
                className="form-control"
                name="role" // Thêm name cho select
                value={formData.role} // Đặt giá trị cho select
                onChange={handleChange} // Gọi handleChange khi chọn vai trò
                style={{ height: 50, backgroundColor: '#f5f6fa', borderColor: '#f5f6fa', borderRadius: 10 }}
              >
                <option value="">Chọn vai trò</option>
                <option value="1">Người dùng</option>
                <option value="2">Quản trị viên</option>
              </select>
            </div>
          </div>

          {/* Mã xác nhận */}
          <div className="row d-flex align-items-center justify-content-center my-4" style={{ width: '100%' }}>
            <div className="col-12 col-md-6 col-lg-6">
              <label htmlFor="confirmation" className="form-label">Mã xác nhận</label>
              <div className="position-relative d-flex">
                <InputComponents
                  value={formData.confirmation}
                  onChange={handleChange}
                  placeholder="Nhập mã xác nhận"
                  type="text"
                  name="confirmation"
                />
                <div className="position-absolute d-flex align-items-center justify-content-center border border-primary" style={{ top: 0, right: 0, width: 100, height: '100%', borderRadius: 10 }}>
                  <span className="text-primary">Gửi mã</span>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-6" />
          </div>

          {/* Nút gửi */}
          <button type="submit" className="btn btn-primary my-4" style={{ width: 200, height: 50 }}>
            Thêm vào
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAccessPage;
