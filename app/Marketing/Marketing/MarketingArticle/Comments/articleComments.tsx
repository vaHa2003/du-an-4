import mod from "./comments.module.css";

const ArticleAndComments = () => {
  return (
    <div className="mx-3 d-flex gap-5">
      <div>
        <span className="fs-1 fs-md-3 fs-lg-5 fw-bold">
          [Phần 1] Tạo dự án ReactJS với Webpack và Babel
        </span>
        <div className="my-4">
          <span className="fs-5 fs-sm-2 fs-lg-1">Chào mọi người ✌✌</span>
        </div>
        <span className="fs-5 fs-sm-2 fs-lg-1">
          Hôm nay mình có quay một video trong khóa học ReactJS là "Tạo dự án
          ReactJS với Webpack và Babel". Mình làm video này với mong muốn chia
          sẽ cho các bạn cụ thể hình dung ra dự án được tạo bởi
          "create-react-app" được xây dựng như thế nào. Các bạn có thể xem video
          hướng đãn dưới đây nhé.
        </span>
        <div
          className="my-5 w-100 d-flex justify-content-center align-items-center"
          style={{ flexDirection: "column" }}
        >
          <img
            src="/img/html css pro.png"
            alt=""
            style={{
              width: "100%",
              height: "30%",
              objectFit: "contain",
              borderRadius: 10,
            }}
          />
          <span className="mt-2" style={{ fontStyle: "italic" }}>
            Click vào màn hình để mở video nhé anh em!
          </span>
        </div>
      </div>
      <div className={`${mod.comments} d-flex flex-column gap-3`}>
        <div className="d-flex gap-3">
          <img src="/img_admin/commenter.png" className="align-self-baseline" />
          <div className="d-flex flex-column">
            <span className={`${mod.name}`}>Minh Tâm</span>
            <small>Bài viết này hữu ích quá</small>
            <div className="d-inline-flex gap-3 my-2">
              <small className="text-primary">Trả lời</small>
              <small className="text-primary">Ẩn</small>
            </div>
            <div className="d-flex gap-3 border-2 border-start px-2">
              <img src="/img_admin/admin.png" className="align-self-baseline" />
              <div className="d-flex flex-column">
                <span className={`${mod.name}`}>Admin</span>
                <small>Mình cảm ơn</small>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex gap-3">
          <img src="/img_admin/commenter.png" className="align-self-baseline" />
          <div className="d-flex flex-column">
            <span className={`${mod.name}`}>Minh Tâm</span>
            <small>Bài viết này hữu ích quá</small>
            <div className="d-inline-flex gap-3 my-2">
              <small className="text-primary">Trả lời</small>
              <small className="text-primary">Ẩn</small>
            </div>
          </div>
        </div>
        <div className="d-flex gap-3">
          <img src="/img_admin/commenter.png" className="align-self-baseline" />
          <div className="d-flex flex-column">
            <span className={`${mod.name}`}>Minh Tâm</span>
            <small>Bài viết này hữu ích quá</small>
            <div className="d-inline-flex gap-3 my-2">
              <small className="text-primary">Trả lời</small>
              <small className="text-primary">Ẩn</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleAndComments;
