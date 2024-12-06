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
import Body from "./component/globalControl/body";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxRender>
      <SessionProvider>
        <html lang="vi">
          <body className={styles.container}>
            <Body>
              {children}
            </Body>
          </body>
        </html>
      </SessionProvider>
    </ReduxRender>
  );
}
