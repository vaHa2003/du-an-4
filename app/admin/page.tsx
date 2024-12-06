"use client";
import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col } from "react-bootstrap";
import "./globals.css";
import Header from "./component/Header/header";
import Sidebar from "./component/Sidebar/sidebar";
import Article from "./component/Article/article";
import styles from './layout.module.css';
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

import ViewBarCharts from "./component/Dashboard/ViewChart";
import style from "./component/Dashboard/Chart.module.css";
import { Image } from "react-bootstrap";
import OffcanvasComponent from "@/app/admin/component/DashboardMenu/overviewmenu";
import BodyDashboard from "@/app/admin/component/Dashboard/BodyDashboard";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import ReactLoading from 'react-loading';

interface Statistical {
  totalCourse: number;
  totalCourseLecturer: number; // nhân viên
  totalCourseNow: number; //  
  totalCourseRevenue: string; // doanh thu
}

const getCookie = (name: string) => {
  if (typeof window !== 'undefined') {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
  }
  return null;
};

const Dashboard: React.FC = () => {
  const router = useRouter()
  const userState = useSelector((state: RootState) => state.user.user)
  const [data, setData] = useState<Statistical | null>(null)
  const alertShown = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);
  const token = getCookie('token');
  const [countEnrollments, setCountEnrollments] = useState(0)

  useEffect(() => {
    if (token) {
      setIsLoading(true)
      fetch(`/api/statistical_admin/`, {
        cache: 'no-cache',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then(async res => {
          if (!res.ok) {
            const errorDetail = await res.text();
            throw new Error(`HTTP error! status: ${res.status} - ${errorDetail}`);
          }
          return res.json();
        })
        .then(data => {
          setIsLoading(false)
          console.log(data);
          setData(data)
        })
        .catch(error => {
          console.log(error)
          setIsLoading(false)
        })
    }
  }, [token])

    useEffect(() => {
      if (token) {
        setIsLoading(true)
        fetch(`/api/courseEnrollments/`, {
          cache: 'no-cache',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
          .then(async res => {
            if (!res.ok) {
              const errorDetail = await res.text();
              throw new Error(`HTTP error! status: ${res.status} - ${errorDetail}`);
            }
            return res.json();
          })
          .then(data => {
            setIsLoading(false)
            console.log(data);
            setCountEnrollments(data.data.length)
          })
          .catch(error => {
            console.log(error)
            setIsLoading(false)
          })
      }
    }, [token])

    // console.log('phần tử:',countEnrollments);
    

  useEffect(() => {
    if (!alertShown.current) {
      if (userState?.role === 'admin') {
        setIsLoading(false);
      } else {
        alert('bạn không có quuyền ở đây!');
        router.push('/home');
      }
      alertShown.current = true;
    }
  }, [userState, router]);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);


  return (
    <>
      <div className={style.mar}>
        <section className={style.container}>
          <div className={style.tag_notice}>
            <div className={style.card_notice}>
              <span>
                <p>Tổng khóa học</p>
                {isLoading ? (
                  <ReactLoading type={"spokes"} color={'rgba(153, 153, 153, 1)'} height={'30%'} width={'30%'} delay={10} />
                ) : (
                  <h3>{data?.totalCourse}</h3>
                )}
              </span>
              <Image
                src={"/img_admin/boxvippro.png"}
                alt="icon"
                width={60}
                height={60}
              />
            </div>
            <div className={style.card_notice}>
              <span>
                <p>Đơn hôm nay</p>
                {isLoading ? (
                  <ReactLoading type={"spokes"} color={'rgba(153, 153, 153, 1)'} height={'30%'} width={'30%'} delay={10} />
                ) : (
                  <h3>{data?.totalCourseNow}</h3>
                )}
              </span>
              <Image
                src={"/img_admin/total_view.svg"}
                alt="icon"
                width={60}
                height={60}
              />
            </div>
            <div className={style.card_notice}>
              <span>
                <p>Tổng nhân viên</p>
                {isLoading ? (
                  <ReactLoading type={"spokes"} color={'rgba(153, 153, 153, 1)'} height={'30%'} width={'30%'} delay={10} />
                ) : (
                  <h3>{data?.totalCourseLecturer}</h3>
                )}
              </span>
              <Image
                src={"/img_admin/comment.svg"}
                alt="icon"
                width={60}
                height={60}
              />
            </div>
            <div className={style.card_notice}>
              <span id="tippy">
                <p>Tổng doanh thu</p>
                {isLoading ? (
                  <ReactLoading type={"spokes"} color={'rgba(153, 153, 153, 1)'} height={'30%'} width={'30%'} delay={10} />
                ) : (
                  <Tippy
                    content={`${parseFloat(typeof data?.totalCourseRevenue === 'string' ? data.totalCourseRevenue.replace(/[^\d]/g, "") : '').toLocaleString('vi-VN')}đ`}
                    animation='scale-extreme'
                    theme="light"
                    placement="bottom"
                  >
                    <h3>{`${Math.floor(parseFloat(data?.totalCourseRevenue?.replace(/[^\d]/g, "") || "0") / 1_000_000)}tr VND`}</h3>
                  </Tippy>
                )}
              </span>

              <Image
                src={"/img_admin/monneyvip.svg"}
                alt="icon"
                width={60}
                height={60}
                onClick={handleShow}
              />
            </div>
            <OffcanvasComponent show={show} handleClose={handleClose} />
          </div>
          <div className={style.chart}>
            <ViewBarCharts />
          </div>
          <BodyDashboard />
        </section>
      </div>
    </>
  );
};

export default Dashboard;