"use client";


import style from "@/app/admin/component/Dashboard/Chart.module.css";
import { Image } from "react-bootstrap";
import { useState } from "react";
import OffcanvasComponent from "@/app/admin/component/DashboardMenu/overviewmenu";
import { HeaderArticleSimple } from "@/app/admin/component/Article/headerArrticle";
import ViewBarCharts from "@/app/admin/component/Dashboard/ViewChart";
import Article from "@/app/admin/component/Article/article";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/rootReducer";
import { HeaderArticle } from "@/app/admin/component/Article/headerArrticle";


const Dashboard = () => {
  const userState = useSelector((state:RootState)=>state.user.user)
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  console.log(userState?.avatar);
  return (
    <>
      <div className={style.mar}>
        <section className={style.container}>
          <div className={style.tag_notice}>
            <div className={style.card_notice}>
              <span>
                <p>Tổng bài viết</p>
                <h3>100</h3>
              </span>
              <Image
                src={"/img_admin/total_article.svg"}
                alt="icon"
                width={60}
                height={60}
              />
            </div>
            <div className={style.card_notice}>
              <span>
                <p>Tổng danh mục</p>
                <h3>200</h3>
              </span>
              <Image
                src={"/img_admin/category.svg"}
                alt="icon"
                width={60}
                height={60}
              />
            </div>
            <div className={style.card_notice}>
              <span>
                <p>Tổng bình luận</p>
                <h3>3000</h3>
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
                <h3>230,000</h3>
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
        </section>
        <section>
          <HeaderArticleSimple />
          <HeaderArticle />
        </section>
      </div>
    </>
  );
};

export default Dashboard;
