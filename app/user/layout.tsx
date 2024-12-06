import React from "react";
import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row } from "react-bootstrap";
import "./globals.css";

import styles from "./layout.module.css";

import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "../admin/component/Header/header";
import Sidebar from "../Marketing/component/Sidebar/sidebar";
import ReduxRender from "@/redux/provider"
import { SessionProvider } from "next-auth/react"
import ScrollToTop from "../(user-global)/component/globalControl/scrollToTop"
import ProfileDispatch from "../(user-global)/component/auth/user-component/profileDispatch"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={styles.container}>
      <ReduxRender>
          <SessionProvider>
            <ScrollToTop />
            <ProfileDispatch></ProfileDispatch>
            <div className={styles.header}>
              <Header />
            </div>
            <Row className={`${styles.mainContent} m-0`}>
              <Col md={0} xl={2} sm={0} xs={0} className={`d-none d-md-none d-xl-block`}>
                <Sidebar />
              </Col>
              <Col className={styles.article} xs={12} sm={12} md={12} xl={10}>{children}</Col>
            </Row>
            </SessionProvider>
        </ReduxRender>
      </body>
    </html>
  );
}
