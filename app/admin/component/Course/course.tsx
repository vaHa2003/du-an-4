"use client";

import React, { FC, useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import {
  Button,
  Form,
  InputGroup,
  Pagination,
  Container,
  Card,
} from "react-bootstrap";
import Table from "react-bootstrap/Table";
import h from "./course.module.css";
import Link from "next/link";
import "./course.css";
import header from "@/app/(user-global)/component/globalControl/header";
import useSWR from 'swr';
import useFormatDate from "@/app/(user-global)/component/globalControl/useFormatDate";
import ReactLoading from 'react-loading';


interface Course {
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

interface CourseProps {
  courseData: ApiResponse<Course> | null;
  loading: boolean;
}

const Course: React.FC<CourseProps> = ({ courseData, loading }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const coursePerPage = 5;
  const totalPages = Math.ceil((courseData?.data.length || 0) / coursePerPage);
  const [count, setCount] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, totalPages]);

  const handlePrevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage]);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [loading]);

  const indexOfLastUser = currentPage * coursePerPage;
  const indexOfFirstUser = indexOfLastUser - coursePerPage;
  const currentCourse =
    courseData?.data && Array.isArray(courseData.data)
      ? courseData.data.slice(indexOfFirstUser, indexOfLastUser)
      : [];

  const renderPaginationItems = useMemo(() => {
    const pageNumbers = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <Pagination.Item
            key={i}
            active={i === currentPage}
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </Pagination.Item>
        );
      }
    } else {
      pageNumbers.push(
        <Pagination.Item
          key={1}
          active={1 === currentPage}
          onClick={() => setCurrentPage(1)}
        >
          1
        </Pagination.Item>
      );

      if (currentPage > 3) {
        pageNumbers.push(<Pagination.Ellipsis key="start-ellipsis" />);
      }

      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pageNumbers.push(
          <Pagination.Item
            key={i}
            active={i === currentPage}
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </Pagination.Item>
        );
      }

      if (currentPage < totalPages - 2) {
        pageNumbers.push(<Pagination.Ellipsis key="end-ellipsis" />);
      }

      pageNumbers.push(
        <Pagination.Item
          key={totalPages}
          active={totalPages === currentPage}
          onClick={() => setCurrentPage(totalPages)}
        >
          {totalPages}
        </Pagination.Item>
      );
    }
    return pageNumbers;
  }, [totalPages, currentPage]);

  useLayoutEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1)
    }
  }, [currentPage, totalPages, setCurrentPage])

  useEffect(() => {
    if (courseData?.data.length === 0) {
      setCount(false)
    } else {
      setCount(true)
    }
  }, [courseData])
  return (
    <div
      className={`d-flex flex-column flex-grow-1 align-items-start mx-4 mx-xs-2 mx-sm-3`}
    >
      <div className="d-flex overflow-auto w-100" style={{ whiteSpace: 'nowrap' }}>
        <Table id="cssTable" bordered hover className={`${h.table} table-responsive`}>
          <thead>
            <tr>
              <td>Hình ảnh</td>
              <td>Tên khóa học</td>
              <td>Giá</td>
              <td>Giá giảm</td>
              <td>Lượt xem</td>
              <td>Giảng viên</td>
              <td className="text-center">Trạng thái</td>
              <td>Hành động</td>
            </tr>
          </thead>
          {loading ? (
            <tbody>
              <tr>
                <td colSpan={8}>
                  <ReactLoading type={"bubbles"} color={'rgba(153, 153, 153, 1)'} height={'10%'} width={'10%'} className={h.align} />
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {count ?
                currentCourse.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <Card.Header className={h.headerContent}>
                        <section className={h.headerContent__text}>
                          <Card.Title className={h.text__hedding2}>
                            {item.name_course}
                          </Card.Title>
                          <Card.Subtitle className={h.text__hedding3}>
                            by My Team
                          </Card.Subtitle>
                          <Card.Img
                            src="/img/iconReact.svg"
                            alt=""
                            className={h.text__img}
                          />
                        </section>
                        <Card.Img
                          src="/img/tuan.png"
                          alt=""
                          className={h.headerContent__avt}
                        />
                      </Card.Header>
                    </td>
                    <td> {item.name_course}</td>
                    <td> {item.price_course.toLocaleString('vi-VN')} đ</td>
                    <td>{item.discount_price_course ? item.discount_price_course + '%' : 0}</td>
                    <td>{item.views_course}</td>
                    <td>{item.instructor_name}</td>
                    <td className="text-center">
                      <span className={h.active_text}>{item.status_course}</span>
                    </td>
                    <td className={h.option_button_group}>
                      <div
                        className={`justify-content-evenly border d-flex py-2 rounded`}
                      >
                        <Link href={`/admin/CoursePage/${item.id}`} className="w-50 border-end">
                          <img src="/img_admin/action1.svg" alt="Edit" />
                        </Link>
                        <Link href="UsersPage/DetailUser/" className="">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="green"
                            className="bi bi-check-circle"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                            <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                          </svg>
                        </Link>
                      </div>
                    </td>
                  </tr>
                )) : (<td colSpan={8} style={{ margin: '0 auto', textAlign: 'center' }}>Không có dữ liệu</td>)}
            </tbody>
          )}
        </Table>
      </div>

      {/* Pagination */}
      <div className="paginationWrapper">
        <Pagination>
          <Pagination.Prev onClick={handlePrevPage} />
          {renderPaginationItems}
          <Pagination.Next onClick={handleNextPage} />
        </Pagination>
      </div>
    </div>
  );
};

export default Course;
