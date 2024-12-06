import h from "./course.module.css";

import { Button } from "react-bootstrap";

const HeaderVideoDetail = () => {
  return (
    <div className="mx-4 mx-xs-2 mx-sm-3">
      <div className={`d-flex justify-content-between align-items-center my-4`}>
        <h2 className={h.heading}>Chi tiết khóa học</h2>

        <div className={`${h.actions} d-flex`}>
          <Button
            variant="outline-primary"
            className={`${h.btnCTA} ${h.btnCTAOutline} me-2`}
          >
            Từ chối khoá học
          </Button>
          <Button className={`${h.btnCTA}`}>Đăng khoa học</Button>
        </div>
      </div>
    </div>
  );
};

export default HeaderVideoDetail;
