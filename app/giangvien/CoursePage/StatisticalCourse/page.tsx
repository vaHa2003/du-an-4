"use client";
import { Line } from "react-chartjs-2";
import { useState } from "react";
import style from "./statistical.module.css";
import { Card, Col, Row, Image } from "react-bootstrap";
import styles from "@public/styles/home/CoursePro.module.css";

const StatisticalCourse = () => {
  const [data] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept"],
    datasets: [
      {
        // Để trống label thay vì gán false
        label: "",
        data: [30, 60, 90, 60, 90, 120, 100, 130, 150],
        backgroundColor: "rgba(0, 123, 255, 0.2)",
        borderColor: "#007bff",
        borderWidth: 2,
        fill: true,
      },
    ],
  });
  const options = {
    plugins: {
      legend: {
        display: false, // Ẩn legend (bao gồm cả label của dataset)
      },
    },
  };

  return (
    <div className={style.container}>
      <h2 className={style.title}>Thống kê chi tiết khóa học</h2>
      <div className={style.statContainer}>
        {/* Cards for statistics */}
        <div className={style.card_notice}>
          <span>
            <p>Sinh viên đã học</p>
            <h3>500</h3>
          </span>
          <Image
            src={"/img_admin/boxvippro.png"}
            alt="icon"
            width={60}
            height={60}
          />
        </div>

        <div className={style.card_notice}>
          <span>
            <p>Đã hoàn thành</p>
            <h3>499</h3>
          </span>
          <Image
            src={"/img_admin/monneyvip.svg"}
            alt="icon"
            width={60}
            height={60}
          />
        </div>

        <div className={style.card_notice}>
          <span>
            <p>Đánh giá học viên</p>
            <h3>6.000k</h3>
          </span>
          <Image
            src={"/img_admin/comment.svg"}
            alt="icon"
            width={60}
            height={60}
          />
        </div>

        <div className={style.card_notice}>
          <span>
            <p>Lượt xem</p>
            <h3>3</h3>
          </span>
          <Image
            src={"/img_admin/total_view.svg"}
            alt="icon"
            width={60}
            height={60}
          />
        </div>
      </div>

      <Row className={`mt-4 chartAndColContainer`}>
        <Col md={3}>
          <Card className={style.mainBox__content}>
            <Card.Header className={styles.headerContent}>
              <section className={styles.headerContent__text}>
                <Card.Title className={styles.text__hedding2}>
                  WEBSITE DESIGN UI/UX
                </Card.Title>
                <Card.Subtitle className={styles.text__hedding3}>
                  by My Team
                </Card.Subtitle>
                <Card.Img
                  src="/img/iconReact.svg"
                  alt=""
                  className={styles.text__img}
                />
              </section>
              <Card.Img
                src="/img/tuan.png"
                alt=""
                className={styles.headerContent__avt}
              />
            </Card.Header>
            <Card.Body className={style.mainContent}>
              <section className={style.bodyContent}>
                <div className={style.bodyContent__element}>
                  <Image
                    src="/img/bookoffgreen.svg"
                    alt=""
                    className={styles.element__img}
                  />
                  <Card.Text className={styles.element__text}>
                    10 Chương
                  </Card.Text>
                </div>
                <div className={style.bodyContent__element}>
                  <Image
                    src="/img/bookopenblue.svg"
                    alt=""
                    className={styles.element__img}
                  />
                  <Card.Text className={styles.element__text}>
                    10 Bài tập
                  </Card.Text>
                </div>
                <div className={style.bodyContent__element}>
                  <Image
                    src="/img/bookopenyellow.svg"
                    alt=""
                    className={styles.element__img}
                  />
                  <Card.Text className={styles.element__text}>
                    10 Đã học
                  </Card.Text>
                </div>
              </section>
              <section className={styles.mainContent__headContent}>
                <div className={styles.headContent__evaluete}>
                  <div className={styles.evaluete__main}>
                    <div className={styles.starGroup}>
                      <Image
                        src="/img/iconStar.svg"
                        alt=""
                        className={styles.starElement}
                      />
                      <Image
                        src="/img/iconStar.svg"
                        alt=""
                        className={styles.starElement}
                      />
                      <Image
                        src="/img/iconStar.svg"
                        alt=""
                        className={styles.starElement}
                      />
                      <Image
                        src="/img/iconStar.svg"
                        alt=""
                        className={styles.starElement}
                      />
                      <Image
                        src="/img/iconStar.svg"
                        alt=""
                        className={styles.starElement}
                      />
                    </div>
                    <Card.Text className={styles.starNumber}>
                      {"("} 4,5 {")"}
                    </Card.Text>
                  </div>
                </div>
                <div className={styles.headContent__percent}>
                  <Card.Text className={styles.evaluete__note}>
                    {"("} 504 phản hồi {")"}
                  </Card.Text>
                </div>
              </section>
            </Card.Body>
          </Card>

          <div className={style.card_notice}>
            <span>
              <p>Doanh Thu</p>
              <h3>1.000K</h3>
            </span>
            <Image
              src={"/img_admin/monneyvip.svg"}
              alt="icon"
              width={60}
              height={60}
            />
          </div>
        </Col>

        <Col md={8} className={`${style.chartContainer} ${style.chartMargin}`}>
          <h5>Thống kê doanh thu của khóa học</h5>
          <div className={`${style.lineChartResponsive}`}>
            <Line height={100}  data={data} options={options} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default StatisticalCourse;
