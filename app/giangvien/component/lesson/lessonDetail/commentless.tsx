"use client";

import { Button, Col, Row } from "react-bootstrap";
import h from "./comment.module.css";
import Link from "next/link";
import { useState } from "react";

interface CommentLessonProps {
  onClose: () => void;
}

const CommentLesson: React.FC<CommentLessonProps> = ({ onClose }) => {
  const [activeCommentId, setActiveCommentId] = useState<number | null>(null);

  const toggleCommentBox = (commentId: number) => {
    // Chỉ mở phần bình luận của comment đang được bấm, nếu đã mở thì đóng lại
    setActiveCommentId((prevId) => (prevId === commentId ? null : commentId));
  };

  const comments = [
    {
      id: 1,
      name: "Huy Huy",
      date: "3 tháng trước",
      content:
        "Domain rồi còn subdomain dùng sao hả thầy. Em có sài domain và deploy được rồi.",
    },
    {
      id: 2,
      name: "Nguyen Phuoc",
      date: "2 tháng trước",
      content: "Cho em hỏi cách config tên miền vào dự án.",
    },
    {
      id: 3,
      name: "Tran Minh",
      date: "1 tháng trước",
      content: "Thầy có thể cho thêm tài liệu tham khảo không ạ?",
    },
    {
      id: 4,
      name: "Tran Minh",
      date: "1 tháng trước",
      content: "Thầy có thể cho thêm tài liệu tham khảo không ạ?",
    },
    {
      id: 5,
      name: "Tran Minh",
      date: "1 tháng trước",
      content: "Thầy có thể cho thêm tài liệu tham khảo không ạ?",
    },
    {
      id: 6,
      name: "Tran Minh",
      date: "1 tháng trước",
      content: "Thầy có thể cho thêm tài liệu tham khảo không ạ?",
    },
    {
      id: 7,
      name: "Tuấn Anh",
      date: "1 tháng trước",
      content: "Thầy có thể cho thêm tài liệu tham khảo không ạ?",
    },
  ];

  return (
    <div className={h.pageContainer}>
      <div className={h.header}>
        <div className={h.title}>{comments.length} Bình Luận</div>

        <Row
          className={`${h.filterBar} justify-content-between align-items-center`}
        >
          <Col xs={12} sm={12} md={12} className="mb-4">
            <Row className="bg-white d-flex flex-row rounded-lg justify-content-between py-3 rounded-3">
              <Col
                xs={6}
                sm={2}
                md={1}
                className="d-flex flex-row justify-content-center align-items-center mb-4 mb-md-0 mb-sm-0 px-0"
              >
                <img src="/img_admin/action.svg" alt="Action" />
              </Col>
              <Col
                xs={6}
                sm={2}
                md={4}
                className="justify-content-center align-items-center d-flex mb-4 mb-md-0 mb-sm-0"
              >
                <select aria-label="Trạng thái" className={`${h.formSelect}`}>
                  <option>Trạng thái</option>
                  <option value="1">Active</option>
                  <option value="2">Inactive</option>
                </select>
              </Col>

              <Col
                xs={6}
                sm={2}
                md={2}
                className="justify-content-center align-items-center d-flex"
              >
                <select aria-label="Lượt xem" className={`${h.formSelect}`}>
                  <option>Thời gian</option>
                  <option value="1">0-100</option>
                  <option value="2">1000+</option>
                </select>
              </Col>

              <Col xs={6} sm={2} md={4}>
                <div className="d-flex flex-row justify-content-center align-items-center">
                  <img src="/img_admin/restart.svg" alt="Reset" />
                  <span className="text-danger">  Cài lại</span>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <div className={h.thanhcuon}>
        {comments.map((comment) => (
          <div key={comment.id} className={h.phanduoi}>
            <div className={h.avatar}>
              <img src="/img_admin/avatarcoment.png" alt="Avatar" />
              <div className={h.khuvucten}>
                <div className={h.name}>{comment.name}</div>
                <div className={h.ngaygio}>{comment.date}</div>
              </div>
            </div>
            <div className={h.binhluan}>{comment.content}</div>
            <div className={h.option_button_group}>
              <div
                className={`justify-content-between border d-flex py-2 rounded row mx-1`}
              >
                <Link
                  href="/#!"
                  className="w border-end justify-content-center align-item-center d-flex col-4"
                >
                  <img src="/img_admin/vuong.svg" alt="Edit" />
                </Link>
                <Link
                  href={`ArticlePage?id=${comment.id}`}
                  as={`ArticlePage/${comment.id}`}
                  className="w-30 border-end justify-content-center align-item-center d-flex col-4"
                >
                  <img src="/img_admin/eyes.svg" alt="View" />
                </Link>
                <div
                  onClick={() => toggleCommentBox(comment.id)}
                  className="w-30 border-end justify-content-center align-item-center d-flex col-4"
                  style={{ cursor: "pointer" }}
                >
                  <img src="/img_admin/messenger.svg" alt="Reply" />
                </div>
              </div>
            </div>

            {/* Hiển thị phần bình luận khi activeCommentId trùng với comment.id */}
            {activeCommentId === comment.id && (
              <div className={h.vietcomment}>
                <img src="/img_admin/hinhcomment.svg" alt="Comment Icon" />
                <div className={h.khuicon}>
                  <div className={h.danicon}>
                    <img src="/img_admin/1.svg" />
                    <img src="/img_admin/1.svg" />
                    <img src="/img_admin/1.svg" />
                    <img src="/img_admin/1.svg" />
                    <img src="/img_admin/1.svg" />
                    <img src="/img_admin/1.svg" />
                    <img src="/img_admin/1.svg" />
                    <img src="/img_admin/1.svg" />
                    <img src="/img_admin/1.svg" />
                    <img src="/img_admin/1.svg" />
                    <img src="/img_admin/1.svg" />
                    <img src="/img_admin/1.svg" />
                    <img src="/img_admin/1.svg" />
                    <img src="/img_admin/1.svg" />
                    <img src="/img_admin/1.svg" />
                    <img src="/img_admin/1.svg" />
                  </div>
                  <input
                    className={h.noidung}
                    placeholder="  Nhập câu trả lời của bạn"
                  />
                  <div className={h.buttongroupvip}>
                    <Button className={h.btn1}>Hủy</Button>
                    <Button className={h.btn2}>Trả lời</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentLesson;
