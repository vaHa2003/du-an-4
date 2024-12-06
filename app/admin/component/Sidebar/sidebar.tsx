"use client";

import React, { useState } from "react";
import { Col, Dropdown, Nav } from "react-bootstrap";
import h from "../Sidebar/sidebar.module.css";
import Link from "next/link";
import path from "path";

const Sidebar: React.FC = () => {
  return (
    <Nav className={` ${h.sidebar} `}>
      <Link href={"/admin"}>
        <Nav.Item className={`${h.navItem} mb-3`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.0494 1.25H11.9506C11.2858 1.24997 10.7129 1.24994 10.2542 1.31161C9.76252 1.37771 9.29126 1.52677 8.90901 1.90901C8.52676 2.29126 8.3777 2.76252 8.31161 3.25416C8.24993 3.7129 8.24996 4.28577 8.25 4.95063L8.25 7.37804C8.01542 7.29512 7.76298 7.25001 7.5 7.25001H4.5C3.25736 7.25001 2.25 8.25737 2.25 9.50001V21.25H2C1.58579 21.25 1.25 21.5858 1.25 22C1.25 22.4142 1.58579 22.75 2 22.75H22C22.4142 22.75 22.75 22.4142 22.75 22C22.75 21.5858 22.4142 21.25 22 21.25H21.75V14.5C21.75 13.2574 20.7426 12.25 19.5 12.25H16.5C16.237 12.25 15.9846 12.2951 15.75 12.378L15.75 4.95064C15.75 4.28577 15.7501 3.71291 15.6884 3.25416C15.6223 2.76252 15.4732 2.29126 15.091 1.90902C14.7087 1.52677 14.2375 1.37771 13.7458 1.31161C13.2871 1.24994 12.7142 1.24997 12.0494 1.25ZM20.25 21.25V14.5C20.25 14.0858 19.9142 13.75 19.5 13.75H16.5C16.0858 13.75 15.75 14.0858 15.75 14.5V21.25H20.25ZM14.25 21.25V5.00001C14.25 4.2717 14.2484 3.80091 14.2018 3.45403C14.158 3.12873 14.0874 3.02677 14.0303 2.96967C13.9732 2.91258 13.8713 2.84197 13.546 2.79823C13.1991 2.7516 12.7283 2.75001 12 2.75001C11.2717 2.75001 10.8009 2.7516 10.454 2.79823C10.1287 2.84197 10.0268 2.91258 9.96967 2.96968C9.91258 3.02677 9.84197 3.12873 9.79823 3.45403C9.75159 3.80091 9.75 4.2717 9.75 5.00001V21.25H14.25ZM8.25 21.25V9.50001C8.25 9.08579 7.91421 8.75001 7.5 8.75001H4.5C4.08579 8.75001 3.75 9.08579 3.75 9.50001V21.25H8.25Z"
              fill="#4D4D4D"
            />
          </svg>
          <span className={h.itemTitle}>Dashboard</span>
        </Nav.Item>
      </Link>
      <Dropdown>
        <Dropdown.Toggle as={Nav.Item} className={`${h.navItem} mb-3`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="6" r="4" stroke="#4D4D4D" strokeWidth="1.5" />
            <path d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z" stroke="#4D4D4D" strokeWidth="1.5" />
          </svg>
          <span className={h.itemTitle}>Người dùng</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} href={"/admin/UsersPage"} className={h.dropdownItem}>
            <span>Học viên</span>
          </Dropdown.Item>
          <Dropdown.Item as={Link} href={"/admin"} className={h.dropdownItem}>
            <span>Quản trị viên</span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown>
        <Dropdown.Toggle as={Nav.Item} className={`${h.navItem} mb-3`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M21 15.9999V7.9999C20.9996 7.64918 20.9071 7.30471 20.7315 7.00106C20.556 6.69742 20.3037 6.44526 20 6.2699L13 2.2699C12.696 2.09437 12.3511 2.00195 12 2.00195C11.6489 2.00195 11.304 2.09437 11 2.2699L4 6.2699C3.69626 6.44526 3.44398 6.69742 3.26846 7.00106C3.09294 7.30471 3.00036 7.64918 3 7.9999V15.9999C3.00036 16.3506 3.09294 16.6951 3.26846 16.9987C3.44398 17.3024 3.69626 17.5545 4 17.7299L11 21.7299C11.304 21.9054 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9054 13 21.7299L20 17.7299C20.3037 17.5545 20.556 17.3024 20.7315 16.9987C20.9071 16.6951 20.9996 16.3506 21 15.9999Z" stroke="#4D4D4D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7.5 4.20996L12 6.80996L16.5 4.20996" stroke="#4D4D4D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7.5 19.79V14.6L3 12" stroke="#4D4D4D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M21 12L16.5 14.6V19.79" stroke="#4D4D4D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3.27002 6.95996L12 12.01L20.73 6.95996" stroke="#4D4D4D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 22.08V12" stroke="#4D4D4D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className={h.itemTitle}>Khóa học</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} href={"/admin/CoursePage"} className={h.dropdownItem}>
            <span>Khóa học mặc định</span>
          </Dropdown.Item>
          <Dropdown.Item as={Link} href={"/giangvien/CoursePage"} className={h.dropdownItem}>
            <span>Khóa học của giảng viên</span>
          </Dropdown.Item>
          <Dropdown.Item as={Link} href={"/admin"} className={h.dropdownItem}>
            <span>Thống kê</span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown>
        <Dropdown.Toggle as={Nav.Item} className={`${h.navItem} mb-3`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M10.9436 1.25H13.0564C14.8942 1.24998 16.3498 1.24997 17.489 1.40314C18.6614 1.56076 19.6104 1.89288 20.3588 2.64124C20.6516 2.93414 20.6516 3.40901 20.3588 3.7019C20.0659 3.9948 19.591 3.9948 19.2981 3.7019C18.8749 3.27869 18.2952 3.02502 17.2892 2.88976C16.2615 2.75159 14.9068 2.75 13 2.75H11C9.09318 2.75 7.73851 2.75159 6.71085 2.88976C5.70476 3.02502 5.12511 3.27869 4.7019 3.7019C4.27869 4.12511 4.02502 4.70476 3.88976 5.71085C3.75159 6.73851 3.75 8.09318 3.75 10V14C3.75 15.9068 3.75159 17.2615 3.88976 18.2892C4.02502 19.2952 4.27869 19.8749 4.7019 20.2981C5.12511 20.7213 5.70476 20.975 6.71085 21.1102C7.73851 21.2484 9.09318 21.25 11 21.25H13C14.9068 21.25 16.2615 21.2484 17.2892 21.1102C18.2952 20.975 18.8749 20.7213 19.2981 20.2981C19.994 19.6022 20.2048 18.5208 20.2414 15.9892C20.2474 15.575 20.588 15.2441 21.0022 15.2501C21.4163 15.2561 21.7472 15.5967 21.7412 16.0108C21.7061 18.4383 21.549 20.1685 20.3588 21.3588C19.6104 22.1071 18.6614 22.4392 17.489 22.5969C16.3498 22.75 14.8942 22.75 13.0564 22.75H10.9436C9.10583 22.75 7.65019 22.75 6.51098 22.5969C5.33856 22.4392 4.38961 22.1071 3.64124 21.3588C2.89288 20.6104 2.56076 19.6614 2.40314 18.489C2.24997 17.3498 2.24998 15.8942 2.25 14.0564V9.94358C2.24998 8.10582 2.24997 6.65019 2.40314 5.51098C2.56076 4.33856 2.89288 3.38961 3.64124 2.64124C4.38961 1.89288 5.33856 1.56076 6.51098 1.40314C7.65019 1.24997 9.10582 1.24998 10.9436 1.25ZM18.1131 7.04556C19.1739 5.98481 20.8937 5.98481 21.9544 7.04556C23.0152 8.1063 23.0152 9.82611 21.9544 10.8869L17.1991 15.6422C16.9404 15.901 16.7654 16.076 16.5693 16.2289C16.3387 16.4088 16.0892 16.563 15.8252 16.6889C15.6007 16.7958 15.3659 16.8741 15.0187 16.9897L12.9351 17.6843C12.4751 17.8376 11.9679 17.7179 11.625 17.375C11.2821 17.0321 11.1624 16.5249 11.3157 16.0649L11.9963 14.0232C12.001 14.0091 12.0056 13.9951 12.0102 13.9813C12.1259 13.6342 12.2042 13.3993 12.3111 13.1748C12.437 12.9108 12.5912 12.6613 12.7711 12.4307C12.924 12.2346 13.099 12.0596 13.3578 11.8009C13.3681 11.7906 13.3785 11.7802 13.3891 11.7696L18.1131 7.04556ZM20.8938 8.10622C20.4188 7.63126 19.6488 7.63126 19.1738 8.10622L18.992 8.288C19.0019 8.32149 19.0132 8.3571 19.0262 8.39452C19.1202 8.66565 19.2988 9.02427 19.6372 9.36276C19.9757 9.70125 20.3343 9.87975 20.6055 9.97382C20.6429 9.9868 20.6785 9.99812 20.712 10.008L20.8938 9.8262C21.3687 9.35124 21.3687 8.58118 20.8938 8.10622ZM19.5664 11.1536C19.2485 10.9866 18.9053 10.7521 18.5766 10.4234C18.2479 10.0947 18.0134 9.75146 17.8464 9.43357L14.4497 12.8303C14.1487 13.1314 14.043 13.2388 13.9538 13.3532C13.841 13.4979 13.7442 13.6545 13.6652 13.8202C13.6028 13.9511 13.5539 14.0936 13.4193 14.4976L13.019 15.6985L13.3015 15.981L14.5024 15.5807C14.9064 15.4461 15.0489 15.3972 15.1798 15.3348C15.3455 15.2558 15.5021 15.159 15.6468 15.0462C15.7612 14.957 15.8686 14.8513 16.1697 14.5503L19.5664 11.1536ZM7.25 9C7.25 8.58579 7.58579 8.25 8 8.25H14.5C14.9142 8.25 15.25 8.58579 15.25 9C15.25 9.41421 14.9142 9.75 14.5 9.75H8C7.58579 9.75 7.25 9.41421 7.25 9ZM7.25 13C7.25 12.5858 7.58579 12.25 8 12.25H10.5C10.9142 12.25 11.25 12.5858 11.25 13C11.25 13.4142 10.9142 13.75 10.5 13.75H8C7.58579 13.75 7.25 13.4142 7.25 13ZM7.25 17C7.25 16.5858 7.58579 16.25 8 16.25H9.5C9.91421 16.25 10.25 16.5858 10.25 17C10.25 17.4142 9.91421 17.75 9.5 17.75H8C7.58579 17.75 7.25 17.4142 7.25 17Z" fill="#4D4D4D" />
          </svg>
          <span className={h.itemTitle}>Bài viết</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} href={"/admin/ArticlePage"} className={h.dropdownItem}>
            <span>Danh mục</span>
          </Dropdown.Item>
          <Dropdown.Item as={Link} href={"/admin/ArticlePage"} className={h.dropdownItem}>
            <span>Bài viết</span>
          </Dropdown.Item>
          <Dropdown.Item as={Link} href={""} className={h.dropdownItem}>
            <span>Bình luận</span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown>
        <Dropdown.Toggle as={Nav.Item} className={`${h.navItem} mb-3`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3 10.4167C3 7.21907 3 5.62028 3.37752 5.08241C3.75503 4.54454 5.25832 4.02996 8.26491 3.00079L8.83772 2.80472C10.405 2.26824 11.1886 2 12 2C12.8114 2 13.595 2.26824 15.1623 2.80472L15.7351 3.00079C18.7417 4.02996 20.245 4.54454 20.6225 5.08241C21 5.62028 21 7.21907 21 10.4167C21 10.8996 21 11.4234 21 11.9914C21 17.6294 16.761 20.3655 14.1014 21.5273C13.38 21.8424 13.0193 22 12 22C10.9807 22 10.62 21.8424 9.89856 21.5273C7.23896 20.3655 3 17.6294 3 11.9914C3 11.4234 3 10.8996 3 10.4167Z" stroke="#4D4D4D" strokeWidth="1.5" />
            <path d="M17 12C17 12.6566 16.8707 13.3068 16.6194 13.9134C16.3681 14.52 15.9998 15.0712 15.5355 15.5355C15.0712 15.9998 14.52 16.3681 13.9134 16.6194C13.3068 16.8707 12.6566 17 12 17C11.3434 17 10.6932 16.8707 10.0866 16.6194C9.47995 16.3681 8.92876 15.9998 8.46447 15.5355C8.00017 15.0712 7.63188 14.52 7.3806 13.9134C7.12933 13.3068 7 12.6566 7 12C7 11.3434 7.12933 10.6932 7.3806 10.0866C7.63188 9.47995 8.00017 8.92876 8.46447 8.46447C8.92876 8.00017 9.47996 7.63188 10.0866 7.3806C10.6932 7.12933 11.3434 7 12 7C12.6566 7 13.3068 7.12933 13.9134 7.3806C14.52 7.63188 15.0712 8.00017 15.5355 8.46447C15.9998 8.92876 16.3681 9.47996 16.6194 10.0866C16.8707 10.6932 17 11.3434 17 12L17 12Z" stroke="#4D4D4D" strokeWidth="1.5" />
            <path d="M13.8478 13.9134C13.9483 13.3068 14 12.6566 14 12C14 11.3434 13.9483 10.6932 13.8478 10.0866C13.7472 9.47996 13.5999 8.92876 13.4142 8.46447C13.2285 8.00017 13.008 7.63188 12.7654 7.3806C12.5227 7.12933 12.2626 7 12 7C11.7374 7 11.4773 7.12933 11.2346 7.3806C10.992 7.63188 10.7715 8.00017 10.5858 8.46447C10.4001 8.92876 10.2528 9.47995 10.1522 10.0866C10.0517 10.6932 10 11.3434 10 12C10 12.6566 10.0517 13.3068 10.1522 13.9134C10.2527 14.52 10.4001 15.0712 10.5858 15.5355C10.7715 15.9998 10.992 16.3681 11.2346 16.6194C11.4773 16.8707 11.7374 17 12 17C12.2626 17 12.5227 16.8707 12.7654 16.6194C13.008 16.3681 13.2285 15.9998 13.4142 15.5355C13.5999 15.0712 13.7472 14.52 13.8478 13.9134Z" stroke="#4D4D4D" strokeWidth="1.5" />
            <path d="M7 12H17" stroke="#4D4D4D" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className={h.itemTitle}>Quyền truy cập</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} href={"/admin/AccessPage"} className={h.dropdownItem}>
            <span>Danh sách quyền truy cập</span>
          </Dropdown.Item>
          <Dropdown.Item as={Link} href={"/admin/CreateAccess"} className={h.dropdownItem}>
            <span>Tạo quyền truy cập mới</span>
          </Dropdown.Item>
          <Dropdown.Item as={Link} href={"/admin"} className={h.dropdownItem}>
            <span>Admin</span>
          </Dropdown.Item>
          <Dropdown.Item as={Link} href={"/accountant"} className={h.dropdownItem}>
            <span>Kế Toán</span>
          </Dropdown.Item>
          <Dropdown.Item as={Link} href={"/Marketing"} className={h.dropdownItem}>
            <span>Marketing</span>
          </Dropdown.Item>
          <Dropdown.Item as={Link} href={"/giangvien"} className={h.dropdownItem}>
            <span>Giảng viên</span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>


      <Nav.Item className={`${h.navbottom} mb-3`}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.00195 7C9.01406 4.82497 9.11051 3.64706 9.87889 2.87868C10.7576 2 12.1718 2 15.0002 2L16.0002 2C18.8286 2 20.2429 2 21.1215 2.87868C22.0002 3.75736 22.0002 5.17157 22.0002 8L22.0002 16C22.0002 18.8284 22.0002 20.2426 21.1215 21.1213C20.2429 22 18.8286 22 16.0002 22H15.0002C12.1718 22 10.7576 22 9.87889 21.1213C9.11051 20.3529 9.01406 19.175 9.00195 17"
            stroke="#4D4D4D"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M15 12L2 12M2 12L5.5 9M2 12L5.5 15"
            stroke="#4D4D4D"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className={h.itemTitle}>Thoát</span>
      </Nav.Item>

    </Nav>
  );
};

export default Sidebar;