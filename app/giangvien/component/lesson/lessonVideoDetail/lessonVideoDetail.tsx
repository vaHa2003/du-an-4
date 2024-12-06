"use client";

import { SetStateAction, useState } from "react";
import { Button } from "react-bootstrap";
import h from "./lessonVideoDetail.module.css";

const LessonVideoDetail = () => {
  return (
    <div>
      <div className={h.header_add}>Thêm chi tiết video</div>

      <div className={h.body_add}>
        <div className={h.wapper}>
          <div className={h.wapper_body}>
            <div className={h.formnhap}>
              <div className={h.bentrong}>
                <div>Tên chất lượng video</div>
                <input
                  className={h.inputne}
                  placeholder="Nhập vào chất lượng video"
                />
              </div>
              <div className={h.bentrong}>
                <div>Tiêu đề video</div>
                <input
                  className={h.inputne}
                  placeholder="Nhập vào chất lượng video"
                />
              </div>
            </div>

            <div className={h.formnhap}>
              <div className={h.bentrong}>
                <div>Đường dẫn video</div>
                <input
                  className={h.inputne}
                  placeholder="Nhập vào đường dẫn video"
                />
              </div>
              <div className={h.bentrong}>
                <div>Đường dẫn video</div>
                <input
                  className={h.inputne}
                  placeholder="Nhập vào đường dẫn video"
                />
              </div>
            </div>
            <div className={h.formnhap}>
              <div className={h.bentrong}>
                <div>Video</div>
                <div className={h.selectne}>
                  <select
                    className={h.inputne}
                   
                    aria-placeholder="1.2 HTML CSS là gì"
                  >
                   
                    <option value="reactjs">ReactJS</option>
                    <option value="nodejs">NodeJS</option>
                    <option value="typescript">TypeScript</option>
                    <option value="nextjs">Next.js</option>
                  </select>
                  <img src="/img_admin/down.svg" />
                </div>
              </div>
              <div className={h.bentrong}>
                <div>Video</div>
                <div className={h.selectne}>
                  <select
                    className={h.inputne}
                  
                    aria-placeholder="1.2 HTML CSS là gì"
                  >
                    <option value="" disabled>
                      1.2 HTML CSS là gì
                    </option>
                    <option value="reactjs">ReactJS</option>
                    <option value="nodejs">NodeJS</option>
                    <option value="typescript">TypeScript</option>
                    <option value="nextjs">Next.js</option>
                  </select>
                  <img src="/img_admin/down.svg" />
                </div>
              </div>
            </div>

            <div className={h.chonutragiua}>
              <Button className={h.btnthemvao}>Thêm vào</Button>
              <Button className={h.btnthemvao}>Thêm vào</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonVideoDetail;
