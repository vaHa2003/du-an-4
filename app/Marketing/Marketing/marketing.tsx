"use client";

import React, { FC, useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import {
  Button,
  Form,
  InputGroup,
  Pagination,
  Container,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import Table from "react-bootstrap/Table";
import h from "./marketing.module.css";
import Link from "next/link";
import "./marketing.css";
import header from "@/app/(user-global)/component/globalControl/header";
import { usePathname, useRouter } from "next/navigation";
import useCookie from "@/app/(user-global)/component/hook/useCookie";
import ReactLoading from 'react-loading';
import useFormatDate from "@/app/(user-global)/component/globalControl/useFormatDate";

interface Post {
  id: number | string;
  title_post: string;
  content_post: string;
  img_post: string;
  views_post: number;
  category_id: number | string;
  created_at: string;
  updated_at: string;
  del_flag: boolean;
}

interface ApiResponse<T> {
  status: string;
  message: string;
  data: T[];
}
interface PostProps {
  postData: ApiResponse<Post> | null;
}

const Marketing: React.FC<{}> = () => {
  const pathname = usePathname()
  const isMarketing = pathname === '/Marketing'
  const token = useCookie('token');
  const [currentPage, setCurrentPage] = useState(1)
  const catePerPage = 5;
  const [statusCate, setStatusCate] = useState('')
  const [dataFilter, setDataFilter] = useState<Post[] | null>(null)

  const [postData, setPostData] = useState<ApiResponse<Post> | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedViews, setSelectedViews] = useState<string>('');
  const [selectedDiscount, setSelectedDiscount] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetch('/api/allPost/')
      .then(res => res.json())
      .then(data => {
        setPostData(data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false);
      });
  }, [token]);

  console.log(postData);


  const filteredPost = useMemo(() => {
    return postData?.data?.filter((post) => {
      const matchStatus = statusCate === '1' ? post.del_flag : statusCate === '2' ? !post.del_flag : true;

      let matchViews = true;
      if (selectedViews === '1') {
        matchViews = post.views_post >= 0 && post.views_post <= 1000;
      } else if (selectedViews === '2') {
        matchViews = post.views_post > 100;
      }

      return matchStatus && matchViews;
    }) || [];
  }, [postData, statusCate, selectedViews]);

  const array: ApiResponse<Post> = {
    status: postData?.status ?? '',
    message: postData?.message ?? '',
    data: filteredPost
  };

  const totalPages = Math.ceil((array?.data.length || 0) / catePerPage)
  const indexOfLastCate = currentPage * catePerPage;
  const indexOfFirstCate = indexOfLastCate - catePerPage;
  const currentStatus =
    array?.data && Array.isArray(array.data)
      ? array.data.slice(indexOfFirstCate, indexOfLastCate)
      : [];

  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  }, [currentPage, totalPages]);

  const handlePrevPage = useCallback(() => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  }, [currentPage]);

  useLayoutEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage, setCurrentPage]);

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

  const handleReset = () => {
    setStatusCate('');
    setSelectedViews('');
  };

  const handleDelete = (id: string | number) => {
    if (token && id) {
      if (confirm('Bạn có muốn thay đổi trạng thái bài viết này không??')) {
        fetch(`/api/hiddenPost/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then(res => res.json())
          .then(data => {
            alert(data.message)
            console.log(data);
            setPostData(prev => {
              if (!prev || !prev.data) return prev;
              const updatedData = prev.data.map(post => {
                if (post.id === id) {
                  return { ...post, del_flag: !post.del_flag };
                }
                return post;
              });
              return { ...prev, data: updatedData };
            });
          })
          .catch(error => {
            console.log(error);
          })
      }
    }
  }

  return (
    <>
      <div className="mx-4 mx-xs-2 mx-sm-3">
        <div className={`d-flex justify-content-between align-items-center my-4`}>
          <h2 className={h.heading}>Bài viết</h2>

          <div className={`${h.actions} d-flex`}>
            <Button
              variant="outline-primary"
              className={`${h.btnCTA} ${h.btnCTAOutline} me-2`}
            >
              Thêm danh mục bài viết
            </Button>
            <Link href="/Marketing/MarketingPosts/AddPost">
              <Button
                className={`${h.btnCTA}`}
              >
                Thêm bài viết
              </Button>
            </Link>
          </div>
        </div>

        <Row
          className={`${h.filterBar} justify-content-between align-items-center`}
        >
          <Col xs={12} sm={12} md={8} className="mb-4">
            <Row className="bg-white d-flex flex-row rounded-lg justify-content-between py-3 rounded-3">
              <Col
                xs={6}
                sm={2}
                md={1}
                className={`d-flex flex-row justify-content-center align-items-center  mb-4 mb-md-0 mb-sm-0 px-0`}
              >
                <img src="/img_admin/action.svg" alt="Action" />
              </Col>
              <Col
                xs={6}
                sm={2}
                md={2}
                className=" justify-content-center align-items-center d-flex mb-4 mb-md-0 mb-sm-0"
              >
                <select
                  onChange={(e) => setStatusCate(e.target.value)}
                  value={statusCate}
                  aria-label="Trạng thái"
                  className={`${h.formSelect} `}
                >
                  <option>Trạng thái  </option>
                  <option value="1">Active</option>
                  <option value="2">Inactive</option>
                </select>
              </Col>
              <Col
                xs={6}
                sm={2}
                md={2}
                className=" justify-content-center align-items-center d-flex "
              >
                <select
                  aria-label="Lượt xem"
                  className={`${h.formSelect} `}
                  onChange={(e) => setSelectedViews(e.target.value)}
                  value={selectedViews}
                >
                  <option>Lượt xem  </option>
                  <option value="1">0-100</option>
                  <option value="2">1000+</option>
                </select>
              </Col>
              <Col xs={6} sm={2} md={3}>
                <div className="d-flex flex-row justify-content-center align-items-center mt-4 mt-md-0 mt-sm-0" onClick={() => handleReset()}>
                  <img src="/img_admin/restart.svg" alt="Reset" />
                  <span className="text-danger">  Cài lại</span>
                </div>
              </Col>
            </Row>
          </Col>
          <Col
            xs={12}
            sm={12}
            md={4}
            className="align-items-end d-flex justify-content-end mb-4 mb-md-0 mb-sm-0"
          >
            <div className={`${h.searchInputGroup} `}>
              <Form.Control
                type="text"
                placeholder="Tìm kiếm bài viết"
                // className={h.searchInput}
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
      <div
        className={`d-flex flex-column flex-grow-1 align-items-start mx-4 mx-xs-2 mx-sm-3`}
      >
        {/* Post List */}
        <div
          className="d-flex overflow-auto w-100"
          style={{ whiteSpace: "nowrap" }}
        >
          <Table
            id="cssTable"
            bordered
            hover
            className={`${h.table} table-responsive`}
          >
            <thead>
              <tr>
                <td>Tiêu đề</td>
                <td>Nội dung</td>
                <td>Lượt xem</td>
                <td>Ngày đăng</td>
                <td>Ngày sửa</td>
                <td className="text-center">Trạng thái</td>
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
                {currentStatus.map((item, idx) => (
                  <tr
                    key={idx}
                  >
                    <td>{item.title_post}</td>
                    <td className="text-truncate">
                      {item.content_post}
                    </td>
                    <td>{item.views_post.toLocaleString('vi-VN')}</td>
                    <td>{useFormatDate(item.created_at)}</td>
                    <td>{useFormatDate(item.updated_at)}</td>
                    <td className="text-center">
                      <span className={`${h.active_text}`}>{item.del_flag === true ? 'active' : 'anactive'}</span>
                    </td>
                    <td className={h.option_button_group}>
                      <div className="d-flex justify-content-evenly border py-2 rounded">
                        <Link href={`/Marketing/MarketingPosts/${item.id}`} className="">
                          <img src="/img_admin/action1.svg" alt="Edit" />
                        </Link>
                        <div className="border-end" />
                        <Link href={`/Marketing/MarketingPosts/editPost?id=${item.id}`} className="">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 25 24"
                            fill="none"
                          >
                            <path
                              d="M12.5 1.25H12.4426C10.1342 1.24999 8.32519 1.24998 6.91371 1.43975C5.46897 1.63399 4.32895 2.03933 3.43414 2.93414C2.53933 3.82895 2.13399 4.96897 1.93975 6.41371C1.74998 7.82519 1.74999 9.63423 1.75 11.9426V12.0574C1.74999 14.3658 1.74998 16.1748 1.93975 17.5863C2.13399 19.031 2.53933 20.1711 3.43414 21.0659C4.32895 21.9607 5.46897 22.366 6.91371 22.5603C8.32519 22.75 10.1342 22.75 12.4426 22.75H12.5574C14.8658 22.75 16.6748 22.75 18.0863 22.5603C19.531 22.366 20.6711 21.9607 21.5659 21.0659C22.4607 20.1711 22.866 19.031 23.0603 17.5863C23.25 16.1748 23.25 14.3658 23.25 12.0574V12C23.25 11.5858 22.9142 11.25 22.5 11.25C22.0858 11.25 21.75 11.5858 21.75 12C21.75 14.3782 21.7484 16.0864 21.5736 17.3864C21.4018 18.6648 21.0749 19.4355 20.5052 20.0052C19.9355 20.5749 19.1648 20.9018 17.8864 21.0736C16.5864 21.2484 14.8782 21.25 12.5 21.25C10.1218 21.25 8.41356 21.2484 7.11358 21.0736C5.83517 20.9018 5.06445 20.5749 4.4948 20.0052C3.92514 19.4355 3.59825 18.6648 3.42637 17.3864C3.25159 16.0864 3.25 14.3782 3.25 12C3.25 9.62178 3.25159 7.91356 3.42637 6.61358C3.59825 5.33517 3.92514 4.56445 4.4948 3.9948C5.06445 3.42514 5.83517 3.09825 7.11358 2.92637C8.41356 2.75159 10.1218 2.75 12.5 2.75C12.9142 2.75 13.25 2.41421 13.25 2C13.25 1.58579 12.9142 1.25 12.5 1.25Z"
                              fill="#4D4D4D"
                            />
                            <path
                              d="M22.0303 3.53033C22.3232 3.23744 22.3232 2.76256 22.0303 2.46967C21.7374 2.17678 21.2626 2.17678 20.9697 2.46967L13.25 10.1893V6.65625C13.25 6.24204 12.9142 5.90625 12.5 5.90625C12.0858 5.90625 11.75 6.24204 11.75 6.65625V12C11.75 12.4142 12.0858 12.75 12.5 12.75H17.8438C18.258 12.75 18.5938 12.4142 18.5938 12C18.5938 11.5858 18.258 11.25 17.8438 11.25H14.3107L22.0303 3.53033Z"
                              fill="#4D4D4D"
                            />
                          </svg>
                        </Link>
                        <div className="border-end" />
                        <Link href="" onClick={() => handleDelete(item.id)} className="">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="24"
                            viewBox="0 0 25 24"
                            fill="none"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M10.8094 2.25002H14.1908C14.4072 2.24988 14.5957 2.24976 14.7737 2.27819C15.477 2.39049 16.0856 2.82915 16.4146 3.46084C16.4978 3.62073 16.5573 3.79961 16.6256 4.00494L16.7373 4.33984C16.7562 4.39653 16.7616 4.41258 16.7661 4.42522C16.9413 4.90933 17.3953 5.23659 17.9099 5.24964C17.9235 5.24998 17.94 5.25004 18.0001 5.25004H21.0001C21.4143 5.25004 21.7501 5.58582 21.7501 6.00004C21.7501 6.41425 21.4143 6.75004 21.0001 6.75004H4C3.58579 6.75004 3.25 6.41425 3.25 6.00004C3.25 5.58582 3.58579 5.25004 4 5.25004H7.00008C7.06013 5.25004 7.0767 5.24998 7.09023 5.24964C7.60488 5.23659 8.05891 4.90936 8.23402 4.42524C8.23863 4.41251 8.24392 4.39681 8.26291 4.33984L8.37452 4.00496C8.44281 3.79964 8.50233 3.62073 8.58559 3.46084C8.91453 2.82915 9.52313 2.39049 10.2264 2.27819C10.4044 2.24976 10.593 2.24988 10.8094 2.25002ZM9.50815 5.25004C9.55966 5.14902 9.60531 5.04404 9.64458 4.93548C9.6565 4.90251 9.6682 4.86742 9.68322 4.82234L9.78302 4.52292C9.87419 4.24941 9.89519 4.19363 9.91601 4.15364C10.0257 3.94307 10.2285 3.79686 10.463 3.75942C10.5075 3.75231 10.567 3.75004 10.8553 3.75004H14.1448C14.4331 3.75004 14.4927 3.75231 14.5372 3.75942C14.7716 3.79686 14.9745 3.94307 15.0842 4.15364C15.105 4.19363 15.126 4.2494 15.2171 4.52292L15.3169 4.82216L15.3556 4.9355C15.3949 5.04405 15.4405 5.14902 15.492 5.25004H9.50815Z"
                              fill="#DA1E28"
                            />
                            <path
                              d="M6.41509 8.45015C6.38754 8.03685 6.03016 7.72415 5.61686 7.7517C5.20357 7.77925 4.89086 8.13663 4.91841 8.54993L5.38186 15.5017C5.46736 16.7844 5.53642 17.8205 5.69839 18.6336C5.86679 19.4789 6.15321 20.185 6.7448 20.7385C7.3364 21.2919 8.05995 21.5308 8.9146 21.6425C9.73662 21.7501 10.775 21.7501 12.0606 21.75H12.9395C14.2251 21.7501 15.2635 21.7501 16.0856 21.6425C16.9402 21.5308 17.6638 21.2919 18.2554 20.7385C18.847 20.185 19.1334 19.4789 19.3018 18.6336C19.4638 17.8206 19.5328 16.7844 19.6183 15.5017L20.0818 8.54993C20.1093 8.13663 19.7966 7.77925 19.3833 7.7517C18.97 7.72415 18.6126 8.03685 18.5851 8.45015L18.1251 15.3493C18.0353 16.6971 17.9713 17.6349 17.8307 18.3406C17.6943 19.025 17.504 19.3873 17.2306 19.6431C16.9572 19.8989 16.583 20.0647 15.891 20.1552C15.1776 20.2485 14.2376 20.25 12.8868 20.25H12.1134C10.7626 20.25 9.82255 20.2485 9.10915 20.1552C8.41715 20.0647 8.04299 19.8989 7.76958 19.6431C7.49617 19.3873 7.30583 19.025 7.16948 18.3406C7.02892 17.6349 6.96489 16.6971 6.87503 15.3493L6.41509 8.45015Z"
                              fill="#DA1E28"
                            />
                            <path
                              d="M9.92546 10.2538C10.3376 10.2125 10.7052 10.5133 10.7464 10.9254L11.2464 15.9254C11.2876 16.3376 10.9869 16.7051 10.5747 16.7463C10.1626 16.7875 9.79503 16.4868 9.75381 16.0747L9.25381 11.0747C9.2126 10.6625 9.51331 10.295 9.92546 10.2538Z"
                              fill="#DA1E28"
                            />
                            <path
                              d="M15.0747 10.2538C15.4869 10.295 15.7876 10.6625 15.7464 11.0747L15.2464 16.0747C15.2052 16.4868 14.8376 16.7875 14.4255 16.7463C14.0133 16.7051 13.7126 16.3376 13.7538 15.9254L14.2538 10.9254C14.295 10.5133 14.6626 10.2125 15.0747 10.2538Z"
                              fill="#DA1E28"
                            />
                          </svg>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
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
    </>
  );
};

export default Marketing;
