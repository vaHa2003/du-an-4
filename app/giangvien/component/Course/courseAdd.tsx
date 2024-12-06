"use client";

import { Button } from "react-bootstrap";
import h from "./courseAdd.module.css";
const CourseAdd = () => {
  return (
    <div>
      <div className={h.header_add}>Thêm Khóa học</div>
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
                  placeholder="Nhập tên khóa học vào"
                />
              </div>
              <div className={h.bentrong}>
                <div>Giá</div>
                <input className={h.inputne} placeholder="Giá nhập vào" />
              </div>
            </div>
            <div className={h.formnhap}>
              <div className={h.bentrong}>
                <div>Giá giảm</div>
                <input
                  className={h.inputne}
                  placeholder="Nhập giá giảm vào"
                />
              </div>
              <div className={h.bentrong}>
                <div>Mô tả</div>
                <textarea
                  className={h.inputne}
                  placeholder="Nhập mô tả vào đây"
                />
              </div>
            </div>
            <div className={h.formnhap}>
              <div className={h.bentrong}>
                <div>Số lượng video</div>
                <input
                  className={h.inputne}
                  placeholder="Nhập số lượng video"
                />
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
export default CourseAdd;
