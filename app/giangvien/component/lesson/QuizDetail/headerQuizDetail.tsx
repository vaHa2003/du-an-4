import h from "./course.module.css";

import { Button } from "react-bootstrap";

const HeaderQuizDetail = () => {
  return (
    <div className="mx-4 mx-xs-2 mx-sm-3">
      <div className={`d-flex justify-content-between align-items-center my-4`}>
        <h2 className={h.heading}>Chi tiết bài học</h2>

        <div className={`${h.actions} d-flex`}>
      
          <Button className={`${h.btnCTA1}`}>Thêm câu hỏi</Button>
        </div>
      </div>
    </div>
  );
};

export default HeaderQuizDetail;
