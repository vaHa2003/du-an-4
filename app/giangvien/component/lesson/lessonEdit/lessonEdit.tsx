"use client";

import { SetStateAction, useState } from "react";
import { Button } from "react-bootstrap";
import h from "../lessonAdd/lessonAdd.module.css";

const LessonEdit = () => {
  return (
    <div>
      <div className={h.header_add}>Sửa bài học</div>

      <div className={h.body_add}>
        <div className={h.wapper}>
          <div className={h.wapper_body}>
            <div className={h.thatep}>
              <div className={h.thatep1}>
                <img src="/img_admin/may.svg" alt="" />
                <div className={h.phangiua}>
                  <div className={h.chon1tep}>Chọn một tệp</div>
                  <div className={h.ghichuhinh}>
                    JPG, PNG or PDF, Kích thức file không lớn hơn 10MB
                  </div>
                </div>
                <Button className={h.bnthem}>Thêm</Button>
              </div>
            </div>

            <div className={h.formnhap}>
              <div className={h.bentrong}>
                <div>Tên</div>
                <input
                  className={h.inputne}
                  placeholder="Nhập tên bài học vào"
                />
              </div>
              <div className={h.bentrong}>
                <div>Mô tả</div>
                <input className={h.inputne} placeholder="Nhập mô tả vào đây" />
              </div>
            </div>

            <div className={h.formnhap}>
              <div className={h.bentrong}>
                <div>Tên tiêu đề</div>
                <div className={h.selectne}>
                  <select className={h.inputne}>
                    <option value="reactjs">tiều đề 1</option>
                    <option value="nodejs">NodeJS</option>
                    <option value="typescript">TypeScript</option>
                    <option value="nextjs">Next.js</option>
                  </select>
                  <img src="/img_admin/down.svg" />
                </div>
              </div>
              <div className={h.bentrong}>
                <div>Video</div>
                <input className={h.inputne} type="file" />
              </div>
            </div>

            <div className={h.chonutragiua}>
              <Button className={h.btnthemvao}>Thêm vào</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonEdit;
