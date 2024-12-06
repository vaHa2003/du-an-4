'use client'

import React, { useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import h from "./articel.module.css";
import Article from "./article";
import { usePathname } from "next/navigation";
import useCookie from "@/app/(user-global)/component/hook/useCookie";

interface Post {
  post_id: number;
  title_post: string;
  content_post: string;
  img_post: string;
  views_post: number;
  category_id: number;
  created_at: string;
  updated_at: string;
}

interface ApiResponse<T> {
  status: string;
  message: string;
  data: T[];
}
interface PostProps {
  postData: ApiResponse<Post> | null;
}


export const HeaderArticle: React.FC = () => {

  const pathname = usePathname()
  const isMarketing = pathname === '/Marketing'
  const token = useCookie('token');

  const [postData, setPostData] = useState<ApiResponse<Post> | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedViews, setSelectedViews] = useState<string>('');
  const [selectedDiscount, setSelectedDiscount] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetch('/api/allPost/')
      .then(res => res.json())
      .then(data => {
        setPostData(data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false);
      });
  }, [token]);

  const filteredPost = postData?.data?.filter(post => {
    // const matchStatus = selectedStatus ? post.updated_at === selectedStatus : true;
    const matchViews = selectedViews === '1' ? post.views_post <= 1000 : selectedViews === '2' ? post.views_post > 1000 : true;
    return matchViews;
  }) || [];

  const array: ApiResponse<Post> = {
    status: postData?.status ?? '',
    message: postData?.message ?? '',
    data: filteredPost
  };

  const handleReset = () => {
    setSelectedStatus('')
    setSelectedViews('')
  }

  return (
    <>
      <div className="mx-4 mx-xs-2 mx-sm-3">
        <div
          className={`d-flex justify-content-between align-items-center my-4 flex-wrap`}
        >
          <div className="col-12 col-md-6">
            {isMarketing ? ('') : (
              <h2 className={h.heading}>Bài viết</h2>
            )}
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between mx-3">
          <div className="d-flex mb-4">
            <img
              src="/img_admin/action.svg"
              className="bg-white border-end p-4 rounded-start-4"
              alt="Action"
            />
            <div className="bg-white border-end p-4">
              <select aria-label="Lượt xem" className={`${h.formSelect} bg-transparent`} value={selectedViews} onChange={(e) => setSelectedViews(e.target.value)}>
                <option>Lượt xem</option>
                <option value="1">{"<1k"}</option>
                <option value="2">{">1k"}</option>
              </select>
            </div>
            <div className="bg-white border-end p-4">
              <select aria-label="Trạng thái" className={`${h.formSelect} bg-transparent`} value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                <option>Trạng thái</option>
                <option value="1">Active</option>
                <option value="2">Inactive</option>
              </select>
            </div>

            <div className="bg-white p-4 d-inline-flex align-items-center rounded-end-4" onClick={handleReset}>
              <img src="/img_admin/restart.svg" alt="Reset" />
              <span className="text-danger">Cài lại</span>
            </div>
          </div>
        </div>
      </div>
      {
        loading ? (
          <Article postData={array} loading={true} ></Article>
        ) : (
          <Article postData={array} loading={false}></Article>
        )}
    </>
  );
};

export const HeaderArticleSimple = () => {
  return (
    <div>
      <div
        className={`${h.header1} d-flex justify-content-between align-items-center`}
      >
        <h2 className={h.heading}>Bài viết</h2>

        <div className={`${h.actions} d-flex`}>
          <InputGroup className={h.searchInputGroup}>
            <Form.Control
              type="text"
              placeholder="Tìm kiếm bài viết"
              className={h.searchInput}
            />
            <div className={h.searchIconWrapper}>
              <img
                src="/img_admin/search.svg"
                alt="Search"
                width={"24px"}
                height={"24px"}
              />
            </div>
          </InputGroup>
        </div>
      </div>
    </div>
  );
};
