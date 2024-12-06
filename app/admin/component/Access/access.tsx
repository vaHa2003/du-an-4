"use client";

import React, { FC, useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import {
  Button,
  Form,
  InputGroup,
  Table,
  Pagination,
  Container,
  Col,
  Row,
} from "react-bootstrap";
import h from "./access.module.css";
import Link from "next/link";
import "./access.css";
import ReactLoading from 'react-loading';
import { useDispatch, useSelector } from "react-redux";
import { put } from "@/redux/slices/userSlice";
import { RootState } from "@/redux/store";
import useCookie from "@/app/(user-global)/component/hook/useCookie";

interface Role {
  id: number | string;
  fullname: string;
  email: string;
  role: string;
  del_flag: boolean;
}

interface ApiResponse<T> {
  status: string;
  message: string;
  data: T[];
}

const Access: React.FC<{}> = () => {
  const dispatch = useDispatch()
  const token = useCookie('token');
  const [roleData, setRoleData] = useState<ApiResponse<Role> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [getData, setGetData] = useState<string>('allRole')
  const [history, setHistory] = useState(null)

  console.log('lịch sử', history);


  useEffect(() => {
    if (token)
      fetch(`/api/getAllHistory/`, {
        cache: 'no-cache',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(res => res.json())
        .then(data => {
          setHistory(data)
          console.log('lịch sử:', data);
        })
        .catch(error => console.error(error))
  }, [])

  useEffect(() => {
    setLoading(true);
    if (token) {
      fetch(`/api/${getData}/`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then(res => res.json())
        .then(data => {
          setRoleData(data)
          setLoading(false)
          console.log(data);

        })
        .catch(err => {
          console.log(err)
          setLoading(false);
        });
    }
  }, [token, getData]);


  const [currentPage, setCurrentPage] = useState(1);
  const rolePerPage = 5;
  const totalPages = Math.ceil((roleData?.data.length || 0) / rolePerPage);

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

  const indexOfLastUser = currentPage * rolePerPage;
  const indexOfFirstUser = indexOfLastUser - rolePerPage;
  const currentRole =
    roleData?.data && Array.isArray(roleData.data)
      ? roleData.data.slice(indexOfFirstUser, indexOfLastUser)
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
      setCurrentPage(1);
    }
  }, [totalPages, currentPage, setCurrentPage]);

  const handleHiddenUser = async (id: number | string) => {
    try {
      if (confirm('Bạn có muốn thay đổi trạng thái tài khoản không?')) {
        const res = await fetch(`/api/hiddenUser/${id}`, {
          cache: "no-cache",
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        const data = await res.json();
        if (res.ok) {
          alert('Thay đổi trạng thái thành công')
          console.log(data);
          setRoleData((prevData) => {
            if (!prevData) return null;
            return {
              ...prevData,
              data: prevData.data.map((user: Role) =>
                user.id === id ? { ...user, del_flag: !user.del_flag } : user
              )
            }
          })
        }
        else {
          console.log(await res.json());
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleGetRole = (id: string | number) => {
    const dataUserId = currentRole.find(item => item.id === id);
    if (dataUserId) {
      const { email, role } = dataUserId;
      dispatch(put({ email, role, id }))
    }
  }

  const handleReset = () => {
    setGetData('allRole')
  }


  return (
    <div
      className={`d-flex flex-column flex-grow-1 align-items-start mx-4 mx-xs-2 mx-sm-3`}
    >
      <Col xs={12} sm={12} md={8} className="mb-4">
        <Row className="bg-white d-flex flex-row rounded-lg justify-content-between py-3 rounded-3">
          <Col xs={6} sm={2} md={1} className={`d-flex flex-row justify-content-center align-items-center mb-4 mb-md-0 mb-sm-0 px-0`}>
            <img src="/img_admin/action.svg" alt="Action" />
          </Col>
          <Col xs={6} sm={2} md={2} className="justify-content-center align-items-center d-flex mb-4 mb-md-0 mb-sm-0">
            <select
              aria-label="Quản lý tài khoản"
              className={`${h.formSelect}`}
              onChange={(e) => setGetData(e.target.value)}
              value={getData}
            >
              <option value="allRole">Quản lý tài khoản</option>
              <option value="getAllFpt">Tài khoản nhân viên</option>
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
      <div className="d-flex overflow-auto w-100" style={{ whiteSpace: 'nowrap' }}>
        <Table bordered hover className={`${h.table}`}>
          <thead>
            <tr>
              <td>Id</td>
              <td>Người dùng</td>
              <td>Email</td>
              <td>Vai trò</td>
              <td>Hành động</td>
            </tr>
          </thead>
          {loading ? (
            <tbody>
              <tr>
                <td colSpan={5}>
                  <ReactLoading type={"bubbles"} color={'rgba(153, 153, 153, 1)'} height={'10%'} width={'10%'} className={h.align} />
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {currentRole.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>
                    {item.fullname}
                  </td>
                  <td>{item.email}</td>
                  <td>
                    <span
                      className={`
                      ${item.role === 'admin' ?
                          h.active_text : item.role === 'instructor' ?
                            h.active_text1 : item.role === 'accountant' ? h.active_text2
                              : h.active_text3
                        } `}
                    >{item.role}</span>
                  </td>

                  <td className={h.option_button_group}>
                    <div
                      className={`justify-content-between border d-flex py-2 rounded row mx-1`}
                    >
                      <Link
                        href={`AccessPage/${item.id}`}
                        onClick={() => handleGetRole(item.id)}
                        className="w border-end justify-content-center align-item-center d-flex col-4"
                      >
                        <img src="/img_admin/action2.svg" alt="Delete" />
                      </Link>
                      <div onClick={() => handleHiddenUser(item.id)} className="w-30 border-end justify-content-center align-item-center d-flex col-4">
                        {item.del_flag ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="" className="bi bi-eye" viewBox="0 0 16 16">
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                          </svg>
                        ) : (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.8825 4.88129L19.1465 4.14535C18.9385 3.93736 18.5545 3.96937 18.3145 4.25731L15.7543 6.80128C14.6023 6.30533 13.3384 6.06533 12.0103 6.06533C8.05822 6.08127 4.63444 8.38524 2.98633 11.6974C2.8903 11.9054 2.8903 12.1614 2.98633 12.3374C3.75426 13.9054 4.90633 15.2014 6.34633 16.1774L4.25034 18.3053C4.01034 18.5453 3.97833 18.9293 4.13838 19.1373L4.87432 19.8733C5.08231 20.0812 5.4663 20.0492 5.7063 19.7613L19.7542 5.7134C20.0582 5.47354 20.0902 5.08958 19.8822 4.88156L19.8825 4.88129ZM12.8583 9.71318C12.5863 9.64916 12.2984 9.5692 12.0264 9.5692C10.6663 9.5692 9.57842 10.6572 9.57842 12.0171C9.57842 12.2891 9.64244 12.5771 9.72239 12.8491L8.65028 13.9051C8.33032 13.3452 8.15433 12.7211 8.15433 12.0172C8.15433 9.88919 9.86636 8.17717 11.9943 8.17717C12.6984 8.17717 13.3224 8.35315 13.8823 8.67311L12.8583 9.71318Z" fill="#666666" fillOpacity="0.8" />
                            <path d="M21.0344 11.6974C20.4745 10.5773 19.7384 9.56941 18.8265 8.75338L15.8504 11.6974V12.0173C15.8504 14.1453 14.1384 15.8573 12.0104 15.8573H11.6905L9.80249 17.7453C10.5065 17.8893 11.2425 17.9853 11.9625 17.9853C15.9146 17.9853 19.3384 15.6814 20.9865 12.3532C21.1305 12.1291 21.1305 11.9052 21.0345 11.6972L21.0344 11.6974Z" fill="#666666" fillOpacity="0.8" />
                          </svg>

                        )}
                      </div>
                      <Link href="/#!" className="w-30 justify-content-center align-item-center d-flex col-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="orange" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
                          <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
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
  );
};

export default Access;
