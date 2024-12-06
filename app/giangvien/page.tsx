"use client";

import ViewBarCharts from "./component/Dashboard/ViewChart";
import style from "./component/Dashboard/Chart.module.css";
import { Card, Image } from "react-bootstrap";
import { useState } from "react";
import OffcanvasComponent from "@/app/giangvien/component/DashboardMenu/overviewmenu";
import LineChart from "@/app/accountant/chart/LineChart";
import DoughnutChart from "@/app/accountant/chart/DoughnutChart";
import h from "./test.module.css";

const Dashboard = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  return (
    <>
      <div className={style.mar}>
        <section className={style.container}>
          <div className={style.tag_notice}>
            <div className={style.card_notice}>
              <span>
                <p>Tổng khóa học</p>
                <h3>100</h3>
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
                <p>Tổng doanh thu</p>
                <h3>40k</h3>
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
                <p>Đánh giá giảng viên</p>
                <h3>4.5</h3>
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
                <p>Tổng lượt xem</p>
                <h3>400</h3>
              </span>
              <Image
                src={"/img_admin/total_view.svg"}
                alt="icon"
                width={60}
                height={60}
                onClick={handleShow}
              />
            </div>
            <OffcanvasComponent show={show} handleClose={handleClose} />
          </div>
          <div className={style.chart}>
            <ViewBarCharts />
          </div>
          <div className={h.card_group}>
            <div className={h.card}>
              <div className={h.card_content}>
                <h6>Người hoàn thành khóa học</h6>
                <div className={h.chart}>
                  <div>
                    <DoughnutChart />
                  </div>
                </div>
                <div className={h.info_course}>
                  <span>
                    <h4>500</h4>
                    <div>
                      <div className={h.point}></div>Hoàn thành
                    </div>
                  </span>
                  <span>
                    <h4>900</h4>
                    <div>
                      <div className={h.point_light}></div>Chưa hoàn thành
                    </div>
                  </span>
                </div>
              </div>
            </div>
            <div className={h.card}>
              <div className={h.card_content}>
                <h6>Khóa học nổi bật</h6>
                <div>
                  <Card className={h.mainBox__content}>
                    <Card.Header className={h.headerContent}>
                      <section className={h.headerContent__text}>
                        <Card.Title className={h.text__hedding2}>
                          WEBSITE DESIGN UI/UX
                        </Card.Title>
                        <Card.Subtitle className={h.text__hedding3}>
                          by My Team
                        </Card.Subtitle>
                        <Card.Img
                          src="/img/iconReact.svg"
                          alt=""
                          className={h.text__img}
                        />
                      </section>
                      <Card.Img
                        src="/img/tuan.png"
                        alt=""
                        className={h.headerContent__avt}
                      />
                    </Card.Header>
                    <section className={h.mainContent__headContent}>
                      <div className={h.headContent__evaluete}>
                        <div className={h.evaluete__main}>
                          <div className={h.starGroup}>
                            <Image
                              src="/img/iconStar.svg"
                              alt=""
                              className={h.starElement}
                            />
                            <Image
                              src="/img/iconStar.svg"
                              alt=""
                              className={h.starElement}
                            />
                            <Image
                              src="/img/iconStar.svg"
                              alt=""
                              className={h.starElement}
                            />
                            <Image
                              src="/img/iconStar.svg"
                              alt=""
                              className={h.starElement}
                            />
                            <Image
                              src="/img/iconStar.svg"
                              alt=""
                              className={h.starElement}
                            />
                          </div>

                          <Card.Text className={h.starNumber}>
                            {"("} 4,5 {")"}
                          </Card.Text>
                        </div>
                      </div>
                      <div className={h.headContent__percent}>
                        <Card.Text className={h.evaluete__note}>
                          {"("} 504 phản hồi {")"}
                        </Card.Text>
                      </div>
                    </section>
                    <Card.Body className={h.mainContent}>
                      <section className={h.bodyContent}>
                        <div className={h.bodyContent__element}>
                          <Image
                            src="/img/bookoffgreen.svg"
                            alt=""
                            className={h.element__img}
                          />
                          <Card.Text className={h.element__text}>
                            10 Chương
                          </Card.Text>
                        </div>
                        <div className={h.bodyContent__element}>
                          <Image
                            src="/img/bookopenblue.svg"
                            alt=""
                            className={h.element__img}
                          />
                          <Card.Text className={h.element__text}>
                            10 Bài tập
                          </Card.Text>
                        </div>
                        <div className={h.bodyContent__element}>
                          <Image
                            src="/img/bookopenyellow.svg"
                            alt=""
                            className={h.element__img}
                          />
                          <Card.Text className={h.element__text}>
                            10 Đã học
                          </Card.Text>
                        </div>
                      </section>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </div>
            <div className={h.card}>
              <div className={h.card_content}>
                <h6>Doanh thu</h6>
                <div>
                  <LineChart />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Dashboard;
