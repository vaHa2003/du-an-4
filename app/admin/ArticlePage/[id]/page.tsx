'use client'

import React, { useEffect, useState } from 'react'
import { HeaderAcceptArticel } from '../../component/Article/Accept/HeaderAccept'
import ReactLoading from 'react-loading';
import h from '../../component/Article/articel.module.css'


interface AccepptArticelProps {
  params: {
    id: number;
  };
}

interface Post {
  post_id: number;
  title_post: string;
  content_post: string;
  img_post: string;
  views_post: number;
  user_id: number;
}

interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
}

const AccepptArticel: React.FC<AccepptArticelProps> = ({ params }) => {
  const [dataPost, setDataPost] = useState<ApiResponse<Post> | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    fetch(`/api/allPost/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setIsLoading(false)
        setDataPost(data)
      })
      .catch(error => {
        console.log(error)
        setIsLoading(false)
      })
  }, [params.id])

  console.log(dataPost);


  return (
    <div>
      <HeaderAcceptArticel />
      {isLoading ? (
        <ReactLoading type={"bubbles"} color={'rgba(153, 153, 153, 1)'} height={'10%'} width={'10%'} className={h.align}/>
      ) : (
        <div className='mx-3 d-flex' style={{ flexDirection: 'column' }}>
          <span className='fs-1 fs-md-3 fs-lg-5 fw-bold'>{dataPost?.data.title_post}</span>
          <div className='my-4'>
            {/* <span className='fs-5 fs-sm-2 fs-lg-1'>Chào mọi người ✌✌</span> */}
          </div>
          <span className='fs-5 fs-sm-2 fs-lg-1'>{dataPost?.data.content_post}</span>
          <div className='my-5 w-100 d-flex justify-content-center align-items-center' style={{ flexDirection: 'column' }}>
            <img src={`${dataPost?.data.img_post}`} alt="" style={{ width: '100%', height: '30%', objectFit: 'contain', borderRadius: 10 }} />
            {/* <span className='mt-2' style={{ fontStyle: 'italic' }}>Click vào màn hình để mở video nhé anh em!</span> */}
          </div>
        </div>
      )}

    </div>
  )
}


export default AccepptArticel;