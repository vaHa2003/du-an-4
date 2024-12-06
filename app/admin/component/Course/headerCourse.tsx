import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  InputGroup,
  Row,
  Col,
  FormControl,
} from "react-bootstrap";
import h from "./course.module.css";
import Course from "./course";

interface Courses {
  id: string;
  name_course: string;
  views_course: number;
  discount_price_course: number;
  price_course: number;
  instructor_name: string;
  status_course: string;
}

interface ApiResponse<T> {
  status: string;
  message: string;
  data: T[];
}

export const HeaderCourse: React.FC = () => {
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
  };

  const token = getCookie('token');

  const [courseData, setCourseData] = useState<ApiResponse<Courses> | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedViews, setSelectedViews] = useState<string>('');
  const [selectedDiscount, setSelectedDiscount] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetch('/api/allCourse/', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(res => res.json())
      .then(data => {
        setCourseData(data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false);
      });
  }, [token]);

  const filteredCourses = courseData?.data?.filter(course => {
    const matchStatus = selectedStatus ? course.status_course === selectedStatus : true;
    const matchViews = selectedViews === '1' ? course.views_course <= 100 : selectedViews === '2' ? course.views_course > 1000 : true;
    const matchDiscount = selectedDiscount === '1' ? course.discount_price_course >= 0 && course.discount_price_course <= 100 : selectedDiscount === '2' ? course.discount_price_course >= 1000 : true;

    return matchStatus && matchViews && matchDiscount;
  }) || [];

  const array: ApiResponse<Courses> = {
    status: courseData?.status ?? '',
    message: courseData?.message ?? '',
    data: filteredCourses
  };

  const handleReset = () => {
    setSelectedStatus('')
    setSelectedViews('')
    setSelectedDiscount('')
  }

  return (
    <>
      <div className="mx-4 mx-xs-2 mx-sm-3">
        <div className={`d-flex justify-content-between align-items-center my-4`}>
          <h2 className={h.heading}>Quản lý khóa học</h2>
        </div>
        <Row className={`${h.filterBar} justify-content-between align-items-center`}>
          <Col xs={12} sm={12} md={8} className="mb-4">
            <Row className="bg-white d-flex flex-row rounded-lg justify-content-between py-3 rounded-3">
              <Col xs={6} sm={2} md={1} className={`d-flex flex-row justify-content-center align-items-center mb-4 mb-md-0 mb-sm-0 px-0`}>
                <img src="/img_admin/action.svg" alt="Action" />
              </Col>
              <Col xs={6} sm={2} md={2} className="justify-content-center align-items-center d-flex mb-4 mb-md-0 mb-sm-0">
                <select aria-label="Trạng thái" className={`${h.formSelect}`} value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                  <option value="">Trạng thái</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="archived">Archived</option>
                </select>
              </Col>
              <Col xs={6} sm={2} md={2} className="justify-content-center align-items-center d-flex">
                <select aria-label="Lượt xem" className={`${h.formSelect}`} value={selectedViews} onChange={(e) => setSelectedViews(e.target.value)}>
                  <option value="">Lượt xem</option>
                  <option value="1">0-100</option>
                  <option value="2">1000+</option>
                </select>
              </Col>
              <Col xs={6} sm={2} md={2} className="justify-content-center align-items-center d-flex">
                <select aria-label="Giảm giá" className={`${h.formSelect}`} value={selectedDiscount} onChange={(e) => setSelectedDiscount(e.target.value)}>
                  <option value="">Giảm giá</option>
                  <option value="1">0-100</option>
                  <option value="2">1000+</option>
                </select>
              </Col>
              <Col xs={6} sm={2} md={3}>
                <div className="d-flex flex-row justify-content-center align-items-center mt-4 mt-md-0 mt-sm-0" onClick={handleReset}>
                  <img src="/img_admin/restart.svg" alt="Reset" />
                  <span className="text-danger">Cài lại</span>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xs={12} sm={12} md={4} className="align-items-end d-flex justify-content-end mb-4 mb-md-0 mb-sm-0">
            <div className={`${h.searchInputGroup}`}>
              <Form.Control
                type="text"
                placeholder="Tìm kiếm bài viết"
                className="w-100"
              />
              <div className={h.searchIconWrapper}>
                <img
                  src="/img_admin/search.svg"
                  alt="Search"
                  width={"24px"}
                  height={"24px"}
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>
      {loading ? (
        <Course courseData={array} loading={true} />
      ) : (
        <Course courseData={array} loading={false} />
      )}
    </>
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
