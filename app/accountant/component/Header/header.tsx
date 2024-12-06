"use client";

import React, { useEffect, useRef, useState } from "react";
import { Navbar, Form, Button, ButtonGroup } from "react-bootstrap";
import h from "./Header.module.css";

const Header: React.FC = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const notificationRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setShowSettings(false);
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    setShowNotifications(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node) &&
        showNotifications
      ) {
        setShowNotifications(false);
      }

      if (
        settingsRef.current &&
        !settingsRef.current.contains(event.target as Node) &&
        showSettings
      ) {
        setShowSettings(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotifications, showSettings]);

  return (
    <>
      <Navbar
        bg="white"
        expand="lg"
        className={`${h.nav} d-flex justify-content-between align-items-center `}
      >
        <Navbar.Brand href="#">
          <img
            src="/img/logoPage.jpg"
            className="d-inline-block align-top"
            alt="Logo"
          />
        </Navbar.Brand>
        <Form className={` ${h.formGroup} mx-auto d-none d-xl-block`}>
          <input
            type="text"
            placeholder="Tìm kiếm"
            aria-label="Search"
            className={h.searchInput}
          />
          <Button className={h.btnSearch}>
            <img src="/img_admin/searchheader.svg" alt="Search" />
          </Button>
        </Form>
        <ButtonGroup className={`${h.CTA} d-none d-xl-block`}>
          <Button
            variant="link"
            className={h.iconButton}
            onClick={toggleNotifications}
          >
            <img src="/img/Bell.svg" alt="Notifications" />
          </Button>

          <Button
            variant="link"
            className={h.iconButton}
            onClick={toggleSettings}
          >
            <img src="/img/user.svg" alt="User d-none d-xl-block" />
          </Button>
          <Button variant="link" className={h.iconButton}>
            <img src="/img/list.svg" alt="Menu" onClick={handleShow} />
          </Button>
        </ButtonGroup>
      </Navbar>
    </>
  );
};

export default Header;
