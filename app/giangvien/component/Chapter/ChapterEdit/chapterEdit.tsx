"use client";
import { Button } from "react-bootstrap";
import h from "./chapterEdit.module.css";
const ChapterEdit = () => {
  return (
    <div>
      <div className={h.header_add}>Sửa chapter</div>
      <div className={h.body_add}>
        <div className={h.wapper}>
          <div className={h.formnhap}>
            <div className={h.bentrong}>
              <div>Tên</div>
              <input className={h.inputne} placeholder="Nhập tiêu đề chapter" />
            </div>
            <div className={h.bentrong}>
              <div>Khóa học</div>
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
          <div className={h.chonutragiua}>
            <Button className={h.btnthemvao}>Thêm vào</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChapterEdit;
