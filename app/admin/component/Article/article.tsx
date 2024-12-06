"use client";

import React, { FC, useEffect, useState } from "react";
import {
  Button,
  Form,
  InputGroup,
  Table,
  Pagination,
  Container,
} from "react-bootstrap";
import h from "./articel.module.css";
import Link from "next/link";
import "./articel.css";
import header from "@/app/(user-global)/component/globalControl/header";
import useFormatDate from "@/app/(user-global)/component/globalControl/useFormatDate";
import ReactLoading from 'react-loading';

interface Post {
  post_id: number;
  title_post: string;
  content_post: string;
  img_post: string;
  views_post: number;
  category_id: number;
  created_at: string;
  updated_at: string;
}

interface ApiResponse<T> {
  status: string;
  message: string;
  data: T[];
}
interface PostProps {
  postData: ApiResponse<Post> | null;
  loading: boolean;
}

const Article: React.FC<PostProps> = ({ postData, loading }) => {


  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 5;
  const totalPages = Math.ceil((postData?.data.length || 0) / postPerPage);
  const [count, setCount] = useState(true)

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const indexOfLastUser = currentPage * postPerPage;
  const indexOfFirstUser = indexOfLastUser - postPerPage;
  const currentPost =
    postData?.data && Array.isArray(postData.data)
      ? postData.data.slice(indexOfFirstUser, indexOfLastUser)
      : [];

  const renderPaginationItems = () => {
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
  };

  useEffect(() => {
    if (postData?.data.length === 0) {
      setCount(false)
    } else {
      setCount(true)
    }
  }, [postData])

  return (
    <div
      className={`d-flex flex-column flex-grow-1 align-items-start mx-4 mx-xs-2 mx-sm-3`}
    >
      <div className="d-flex overflow-auto w-100" style={{ whiteSpace: 'nowrap' }}>
        <Table bordered hover className={`${h.table}`}>
          <thead>
            <tr>
              <td>Tiêu đề</td>
              <td>Nội dung</td>
              <td>Lượt xem</td>
              <td>Trạng thái</td>
              <td>Ngày sửa</td>
              <td>Ngày đăng</td>
              <td>Hành động</td>
            </tr>
          </thead>
          {loading ? (
            <tbody>
              <tr>
                <td colSpan={7}>
                  <ReactLoading type={"bubbles"} color={'rgba(153, 153, 153, 1)'} height={'10%'} width={'10%'} className={h.align} />
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {count ?
                currentPost.map((item,index) => (
                  <tr key={index}>
                    <td>{item.title_post}</td>
                    <td>
                      {item.content_post}
                    </td>
                    <td>{item.views_post.toLocaleString('en-EN')}</td>
                    <td>
                      <span className={h.active_text}>Active</span>
                    </td>
                    <td> {useFormatDate(item.updated_at)}</td>
                    <td>{useFormatDate(item.created_at)}</td>
                    <td className={h.option_button_group}>
                      <div
                        className={`justify-content-between border d-flex py-2 rounded row mx-1`}
                      >
                        <Link href={`ArticlePage/${item.post_id}`} className="w border-end justify-content-center align-item-center d-flex col-6">
                          <img src="/img_admin/action1.svg" alt="Edit" />
                        </Link>
                        <Link href={`ArticlePage/${item.post_id}`} className="w-30 border-end justify-content-center align-item-center d-flex col-6">
                          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="green" className="bi bi-check-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                            <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                          </svg>
                        </Link>
                      </div>

                    </td>
                  </tr>
                )) : (
                  <>
                    <tr>
                      <td colSpan={7} style={{ margin: '0 auto', textAlign: 'center' }}>Không có dữ liệu</td>
                    </tr>
                  </>
                )}
            </tbody>
          )}
        </Table>
      </div>

      {/* Pagination */}
      <div className="paginationWrapper">
        <Pagination>
          <Pagination.Prev onClick={handlePrevPage} />
          {renderPaginationItems()}
          <Pagination.Next onClick={handleNextPage} />
        </Pagination>
      </div>
    </div>
  );
};

export default Article;
