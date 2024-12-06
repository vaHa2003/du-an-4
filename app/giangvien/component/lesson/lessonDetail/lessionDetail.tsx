import { useEffect, useRef, useState } from "react";
import videoMod from "./course-video.module.css";
import courseMod from "./course.module.css";
import { Button, Stack } from "react-bootstrap";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  PlayCircle,
  QuestionCircle,
  Search,
  SkipStart,
} from "react-bootstrap-icons";
import Accordion from "react-bootstrap/Accordion";
import CommentLesson from "@/app/giangvien/component/lesson/lessonDetail/commentless";

const LessonDetail = () => (
  <>
    <div className="mx-4 mx-xs-2 mx-sm-3">
      <div className={`d-flex justify-content-between align-items-center my-4`}>
        <h2 className={courseMod.heading}>Chi tiết bài học</h2>
        <Link href="/giangvien/Lesson/LessonVideoDetail">
        <div className={`${courseMod.actions} d-flex`}>
          <Button className={`${courseMod.btnCTA1}`}>Thêm video</Button>
        </div>
        </Link>
      </div>
    </div>
    <div className={`${videoMod.content} d-flex flex-column flex-lg-row`}>
      {/*Video + bài viết*/}
      <div
        className={`${videoMod.videoContainer} flex-shrink-1 align-items-start`}
      >
        <video controls>
          <source src="/video/html-in-5-mins.mp4" type="video/mp4" />
        </video>
        <div className="d-flex flex-row p-3 gap-2">
          <div className="d-flex flex-column flex-grow-1">
            <span className={`${videoMod.date} text-muted`}>
              Cập nhật ngày <time dateTime="07-10-2024">07-10-2024</time>
            </span>
            <h3>HTML và CSS là gì?</h3>
            <p>
              HTML CSS (HyperText Markup Language Cascading Style Sheets) Nội
              dung bổ sung: https://www.w3schools.com/css/css_pseudo_classes.asp
            </p>
          </div>
          <div
            className={`${courseMod.actions} d-flex flex-column flex-shrink-0`}
          >
            <Button className={`${courseMod.btnCTA2}`}>Duyệt video</Button>
          </div>
        </div>
      </div>
      {/*Accordion gồm chương và dấu thời gian*/}
      <div className={`${videoMod.chapters} flex-md-shrink-1 flex-grow-1 p-2`}>
        <ChapterSearchBar />
        <ChapterAccordion />
      </div>
    </div>
    <ContentFooter />
  </>
);

export default LessonDetail;

const ChapterSearchBar = () => {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span
          className="input-group-text bg-transparent border-end-0 rounded-start-5 rounded-end-0 p-2"
          id="inputGroup-sizing-default"
        >
          {/* Search icon start */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 12 12"
            fill="none"
          >
            <g clip-path="url(#clip0_3435_8010)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.75 1.375C3.33375 1.375 1.375 3.33375 1.375 5.75C1.375 8.16625 3.33375 10.125 5.75 10.125C8.16625 10.125 10.125 8.16625 10.125 5.75C10.125 3.33375 8.16625 1.375 5.75 1.375ZM0.625 5.75C0.625 2.91954 2.91954 0.625 5.75 0.625C8.58046 0.625 10.875 2.91954 10.875 5.75C10.875 7.03026 10.4056 8.20087 9.62943 9.0991L11.2652 10.7348C11.4116 10.8813 11.4116 11.1187 11.2652 11.2652C11.1187 11.4116 10.8813 11.4116 10.7348 11.2652L9.0991 9.62943C8.20087 10.4056 7.03026 10.875 5.75 10.875C2.91954 10.875 0.625 8.58046 0.625 5.75Z"
                fill="#4993f8"
              />
            </g>
            <defs>
              <clipPath id="clip0_3435_8010">
                <rect width="12" height="12" fill="white" />
              </clipPath>
            </defs>
          </svg>
          {/* Search icon end */}
        </span>
      </div>
      <input
        placeholder="Tìm kiếm bài học"
        type="text"
        className="form-control rounded-end-5 border-start-0 p-2"
        aria-label="Default"
        aria-describedby="inputGroup-sizing-default"
      />
    </div>
  );
};

const ChapterAccordion = () => {
  return (
    <Accordion defaultActiveKey={["0"]} alwaysOpen>
      <Accordion.Item eventKey="0">
        {/* <Accordion.Header>
          <div className="d-flex flex-column">
            <span className="fw-bold">1. Bắt đầu</span>
            <div className={`${videoMod.accordionHeaderInfo} d-flex gap-2`}>
              <span>3/3</span>|<span>24.24</span>
            </div>
          </div>
        </Accordion.Header> */}
        <Accordion.Body className="p-0">
          <Stack gap={2}>
            <Button variant="outline" className={`${videoMod.chapterBtn}`}>
              <div className="d-flex align-items-center gap-2">
                <PlayCircle size={17} className="text-muted" />
                <div
                  className={`${videoMod.accordionChapter} d-flex flex-column align-items-start text-muted`}
                >
                  <span>1.2 HTML CSS là gì</span>
                  <span>24.24</span>
                </div>
              </div>
            </Button>
          </Stack>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};






const ContentFooter = () => {
  const [showPage, setShowPage] = useState(false);
  const commentRef = useRef<HTMLDivElement | null>(null);

  const handleTogglePage = () => {
    setShowPage(!showPage);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      commentRef.current &&
      !commentRef.current.contains(event.target as Node)
    ) {
      setShowPage(false);
    }
  };

  useEffect(() => {
    if (showPage) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPage]);

  return (
    <footer className="d-flex align-items-center justify-content-between px-3">
      <a
        href="/"
        onClick={(e) => {
          e.preventDefault();
          handleTogglePage();
        }}
      >
        <QuestionCircle size={32} className="text-primary" />
      </a>

      <div className="d-inline-flex gap-2">
        <Button
          variant="outline-primary"
          className="d-flex align-items-center gap-2"
        >
          <ChevronLeft />
          Bài trước
        </Button>
        <Button
          variant="outline-primary"
          className="d-flex align-items-center gap-2"
        >
          Bài kế tiếp
          <ChevronRight />
        </Button>
      </div>

      <div className="d-inline-flex align-items-center gap-2">
        <span className="text-muted">Chương 1: Bắt đầu</span>
        <Button variant="light" className="rounded-circle p-1">
          <SkipStart size={24} />
        </Button>
      </div>

      {showPage && (
        <div ref={commentRef}>
          <CommentLesson onClose={handleTogglePage} />
        </div>
      )}
    </footer>
  );
};
