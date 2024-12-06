"use client";

import { SetStateAction, useState } from "react";
import { Button } from "react-bootstrap";
import h from "./lessonAddDetailVideo.module.css";

const LessonAddDetailVideo = () => {
  const [activeButton, setActiveButton] = useState("lesson");

  const handleButtonClick = (buttonType: SetStateAction<string>) => {
    setActiveButton(buttonType);
  };

  return (
    <div>
      <div className={h.header_add}>Thêm chi tiết bài tập</div>
      <div className={h.nutheader}>
        <Button
          className={activeButton === "lesson" ? h.btnbaihoc : h.btnbaitap}
          onClick={() => handleButtonClick("lesson")}
        >
          Trắc nghiệm
        </Button>
        <Button
          className={activeButton === "exercise" ? h.btnbaihoc : h.btnbaitap}
          onClick={() => handleButtonClick("exercise")}
        >
          Điền từ
        </Button>
        <Button
          className={activeButton === "code" ? h.btnbaihoc : h.btncode}
          onClick={() => handleButtonClick("code")}
        >
          Code
        </Button>
      </div>

      <div className={h.body_add}>
        <div className={h.wapper}>
          <div className={h.wapper_body}>
            {/* Form Trắc Nghiệm */}
            {activeButton === "lesson" && (
              <div className={h.formnhap}>
                <div className={h.bentrong}>
                  <div>Nội dung</div>
                  <input
                    className={h.inputne}
                    placeholder="Nhập câu hỏi vào đây"
                  />
                </div>
                <div className={h.bentrong}>
                  <div>Bài tập</div>
                  <div className={h.selectne}>
                    <select className={h.inputne}>
                      <option value="reactjs">ReactJS</option>
                      <option value="nodejs">NodeJS</option>
                      <option value="typescript">TypeScript</option>
                      <option value="nextjs">Next.js</option>
                    </select>
                    <img src="/img_admin/down.svg" />
                  </div>
                </div>
              </div>
            )}

            {/* Form Điền Từ */}
            {activeButton === "exercise" && (
              <div className={h.formnhap}>
                <div className={h.bentrong}>
                  <div>Nội dung</div>
                  <input
                    className={h.inputne}
                    placeholder="Nhập câu hỏi vào đây"
                  />
                </div>
                <div className={h.bentrong}>
                  <div>Mã câu hỏi</div>
                  <div className={h.selectne}>
                    <select className={h.inputne}>
                      <option value="reactjs">ReactJS</option>
                      <option value="nodejs">NodeJS</option>
                      <option value="typescript">TypeScript</option>
                      <option value="nextjs">Next.js</option>
                    </select>
                    <img src="/img_admin/down.svg" />
                  </div>
                </div>
              </div>
            )}

            {/* Form Code */}
            {activeButton === "code" && (
              <>
                <div className={h.formnhap}>
                  <div className={h.bentrong}>
                    <div>Nội dung câu hỏi</div>
                    <input
                      className={h.inputne}
                      placeholder="Nhập nội dung vào đây"
                    />
                  </div>
                  <div className={h.bentrong}>
                    <div>Câu trả lời</div>
                    <input
                      className={h.inputne}
                      placeholder="Nhập câu hỏi vào đây"
                    />
                  </div>
                </div>
                <div className={h.formnhap}>
                  <div className={h.bentrong}>
                    <div>Mã code</div>
                    <input
                      className={h.inputne}
                      placeholder="Nhập mã code vào đây"
                    />
                  </div>
                  <div className={h.bentrong}>
                    <div>doc</div>
                    <div className={h.selectne}>
                      <select className={h.inputne}>
                        <option value="reactjs">ReactJS</option>
                        <option value="nodejs">NodeJS</option>
                        <option value="typescript">TypeScript</option>
                        <option value="nextjs">Next.js</option>
                      </select>
                      <img src="/img_admin/down.svg" />
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className={h.chonutragiua}>
              <Button className={h.btnthemvao}>Thêm vào</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonAddDetailVideo;
