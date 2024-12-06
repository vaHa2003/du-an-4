'use client'

import ArticleAndComments from "@/app/Marketing/Marketing/MarketingArticle/Comments/articleComments";
import { HeaderMarketingArticleComments } from "@/app/Marketing/Marketing/MarketingArticle/Comments/headerArticleComments";
import mod from "../../Marketing/MarketingArticle/Comments/comments.module.css";
import { useEffect, useRef, useState } from "react";
import useCookie from "@/app/(user-global)/component/hook/useCookie";
import useFormatDate from "@/app/(user-global)/component/globalControl/useFormatDate";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import * as Yup from 'yup'
import { useFormik } from "formik";

interface MarketingPostProps {
  params: {
    id: string | number;
  };
}

interface Post {
  category_id: string;
  content_post: string;
  created_at: string;
  del_flag: boolean;
  id: string;
  img_post: string;
  title_post: string;
  updated_at: string;
  user_id: string;
  views_post: number;
}

interface Data<T> {
  status: string;
  message: string;
  data: T;
}

interface Comment {
  avatar: string;
  id: string;
  del_flag: boolean;
  comment_text: string;
  created_at: string;
  updated_at: string;
  fullname: string;
  post_id: string;
  replies: Reply[];
  role: string;
  user_id: string;
}

interface Reply {
  del_flag: boolean;
  avatar: string;
  comment_text: string;
  comment_to: string;
  created_at: string;
  fullname: string;
  id: string;
  replies: Reply[];
  role: string;
  updated_at: string;
  user_id: string;
}

interface PostWithComments<T> {
  post_id: string;
  comments: T[];
}

const MarketingPost: React.FC<MarketingPostProps> = ({ params }) => {

  const userId = useSelector((state: RootState) => state.user.user)
  const [data, setData] = useState<Data<Post> | null>(null)
  const [dataWithCmt, setDataWithCmt] = useState<PostWithComments<Comment> | null>(null)
  const token = useCookie('token')

  const [replyContent, setReplyContent] = useState<string>("");
  const [cmt, setCmt] = useState<string>("");
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [replyContentR, setReplyContentR] = useState<string>("")
  const [activeReplyIdR, setActiveReplyIdR] = useState<string | null>(null)
  const [editIdR, setEditIdR] = useState<string | null>(null);
  const [replyContentRR, setReplyContentRR] = useState<string>("")
  const [activeReplyIdRR, setActiveReplyIdRR] = useState<string | null>(null)
  const [editIdRR, setEditIdRR] = useState<string | null>(null);
  const [loadCmt, setLoadCmt] = useState(false)
  const [reloadCmt, setReloadCmt] = useState(false)

  useEffect(() => {
    if (params.id && token) {
      fetch(`/api/allPost/${params.id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          setData(data)
          console.log(data);
        })
        .catch(error => console.error(error))

    }
  }, [token])

  useEffect(() => {
    if (params.id && token) {
      fetchComments();
    }
  }, [params.id, token]);

  const fetchComments = () => {
    setLoadCmt(true);
    fetch(`/api/comment/${params.id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setDataWithCmt(data);
        console.log(data);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setLoadCmt(false);
        setReloadCmt(false)
      });
  };

  const reloadComments = () => {
    if (!loadCmt) {
      fetchComments();
    }
  };

  useEffect(() => {
    if (params.id && token && reloadCmt) {
      fetchComments();
    }
  }, [params.id, token, reloadCmt]);

  const handleCmtSubmit = (commentId: string | number) => {
    console.log(`Nội dung cho comment ${commentId}:`, cmt)
    if (commentId && token && userId?.id) {
      fetch(`/api/commentPost/${params.id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ comment_text: cmt })
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setCmt("")
          reloadComments()
        })
        .catch(error => {
          setCmt("")
          console.error(error)
        })
    }
  }

  const handleReplySubmit = (commentId: string) => {
    console.log(`Nội dung trả lời cho comment ${commentId}:`, replyContent)
    if (commentId && token) {
      fetch(`/api/commentPost/${params.id}/${commentId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ comment_text: replyContent })
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setReplyContent("")
          setActiveReplyId(null)
          reloadComments()
        })
        .catch(error => {
          setReplyContent("")
          setActiveReplyId(null)
          console.error(error)
        })
    }
  }

  const handleReplySubmitR = (replyId: string) => {
    if (replyId && token) {
      fetch(`/api/commentPost/${params.id}/${replyId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ comment_text: replyContentR })
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setReplyContentR("")
          setActiveReplyIdR(null)
          reloadComments()
        })
        .catch(error => {
          setReplyContentR("")
          setActiveReplyIdR(null)
          console.error(error)
        })
    }
    console.log(`Nội dung trả lời cho reply ${replyId}:`, replyContentR)
  }

  const handleReplySubmitRR = (replyId: string) => {
    if (replyId && token) {
      fetch(`/api/commentPost/${params.id}/${replyId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ comment_text: replyContentRR })
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setReplyContentRR("")
          setActiveReplyIdRR(null)
          reloadComments()
        })
        .catch(error => {
          setReplyContentRR("")
          setActiveReplyIdRR(null)
          console.error(error)
        })
    }
    console.log(`Nội dung trả lời cho reply ${replyId}:`, replyContentRR)
  }

  const handleDelete = (id: string) => {
    if (id && token) {
      if (confirm('bạn có muốn xóa bình luận hay không?')) {
        fetch(`/api/deleteCmtPost/${params.id}/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            alert(data.message)
            reloadComments()
          })
          .catch(error => {
            console.error(error)
          })
      }
    }
  }

  const handleHidden = (id: string) => {
    if (id && token) {
      if (confirm('bạn có muốn ẩn bình luận hay không?')) {
        fetch(`/api/hiddenCmtPost/${params.id}/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            alert(data.message)
            reloadComments()
          })
          .catch(error => {
            console.error(error)
          })
      }
    }
  }

  const formik = useFormik({
    initialValues: {
      comment_text: '',
      id: ''
    },
    validationSchema: Yup.object({
      comment_text: Yup.string().required('bắt buộc').max(255, 'Tối đa 255 ký tự'),
    }),
    onSubmit: async (values) => {

      setEditId(null);
      try {
        if (token && values.id) {
          if (confirm('Bạn có muốn thay đổi bình luận này không!!')) {
            const res = await fetch(`/api/changeCmtPost/${params.id}/${values.id}`, {
              method: 'PUT',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ comment_text: values.comment_text })
            })
            const data = await res.json();
            console.log(data);


            if (res.ok) {
              alert(data.message)
              reloadComments()
              setReloadCmt(true)
            } else {
              alert('Thay đổi thấy bại. Hãy thử lại')
            }
          }
        }
      } catch (error) {
      }
    }
  })

  const formikR = useFormik({
    initialValues: {
      comment_text: '',
      id: ''
    },
    validationSchema: Yup.object({
      comment_text: Yup.string().required('bắt buộc').max(255, 'Tối đa 255 ký tự'),
    }),
    onSubmit: async (values) => {
      setEditIdR(null)
      try {
        if (token && values.id) {
          if (confirm('Bạn có muốn thay đổi bình luận này không!!')) {
            const res = await fetch(`/api/changeCmtPost/${params.id}/${values.id}`, {
              method: 'PUT',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ comment_text: values.comment_text })
            })
            const data = await res.json();
            console.log(data);


            if (res.ok) {
              alert(data.message)
              setReloadCmt(true)
            } else {
              alert('Thay đổi thấy bại. Hãy thử lại')
            }
          }
        }

      } catch (error) {
      }
    }
  })

  const formikRR = useFormik({
    initialValues: {
      comment_text: '',
      id: ''
    },
    validationSchema: Yup.object({
      comment_text: Yup.string().required('bắt buộc').max(255, 'Tối đa 255 ký tự'),
    }),
    onSubmit: async (values) => {
      setEditIdRR(null)
      try {
        if (token && values.id) {
          if (confirm('Bạn có muốn thay đổi bình luận này không!!')) {
            const res = await fetch(`/api/changeCmtPost/${params.id}/${values.id}`, {
              method: 'PUT',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ comment_text: values.comment_text })
            })
            const data = await res.json();
            console.log(data);

            if (res.ok) {
              alert(data.message)
              setReloadCmt(true)
            } else {
              alert('Thay đổi thấy bại. Hãy thử lại')
            }
          }
        }

      } catch (error) {
      }
    }
  })

  useEffect(() => {
    if (editId && dataWithCmt) {
      const selectedComment = dataWithCmt.comments.find(
        (item) => item.id === editId
      );
      if (selectedComment) {
        formik.setFieldValue('comment_text', selectedComment.comment_text);
        formik.setFieldValue('id', selectedComment.id);
      }
    }

    if (editIdR && dataWithCmt?.comments) {
      const selectedComment = dataWithCmt.comments
        .map((item) => item.replies)
        .flat() // Làm phẳng mảng các bình luận trả lời
        .find((item) => item.id === editIdR); // Tìm bình luận trả lời có editIdR
      if (selectedComment) {
        formikR.setFieldValue('comment_text', selectedComment.comment_text);
        formikR.setFieldValue('id', selectedComment.id);
      }
    }

    if (editIdRR && dataWithCmt?.comments) {
      const selectedComment = dataWithCmt.comments
        .map((item) => item.replies) // Lấy tất cả các bình luận trả lời cấp 1
        .flat() // Làm phẳng mảng các bình luận trả lời cấp 1
        .map((itemR) => itemR.replies) // Lấy tất cả các bình luận trả lời cấp 2
        .flat() // Làm phẳng mảng các bình luận trả lời cấp 2
        .find((item) => item.id === editIdRR); // Tìm bình luận trả lời cấp 2 có editIdRR
      if (selectedComment) {
        formikRR.setFieldValue('comment_text', selectedComment.comment_text);
        formikRR.setFieldValue('id', selectedComment.id);
      }
    }
  }, [editId, editIdR, editIdRR, dataWithCmt]);


  return (
    <>
      <HeaderMarketingArticleComments />

      {
        data ? (
          <div className="mx-3 d-flex gap-5">
            <div style={{ minWidth: "880px" }}>
              <span className="fs-1 fs-md-3 fs-lg-5 fw-bold">
                {data.data.title_post}
              </span>
              <div className="my-4">
                <span className="fs-5 fs-sm-2 fs-lg-1">{useFormatDate(data.data.created_at)}</span>
              </div>
              {data.data.content_post.length >= 1000 ? (
                <div
                  dangerouslySetInnerHTML={{ __html: data.data.content_post }}
                  className="fs-5 fs-sm-2 fs-lg-1">

                </div>
              ) : (
                <span className="fs-5 fs-sm-2 fs-lg-1">
                  {data.data.content_post}
                </span>
              )}

              <div
                className="my-5 w-100 d-flex justify-content-center align-items-center"
                style={{ flexDirection: "column" }}
              >
                <img
                  src={`${data.data.img_post}`}
                  alt={`${data.data.title_post}`}
                  style={{
                    width: "auto",
                    height: "auto",
                    objectFit: "contain",
                    borderRadius: 10,
                  }}
                />
              </div>
            </div>
            <div className={`${mod.comments} d-flex flex-column gap-3`}>
              <div className="mt-3">
                <textarea
                  value={cmt}
                  onChange={(e) => setCmt(e.target.value)}
                  placeholder="Nhập nội dung bình luận"
                  rows={3}
                  className={mod.comment_input}
                />
                <button
                  className={`btn btn-primary mt-2 ${cmt === '' ? mod.btn_disabled : ''}`}
                  onClick={() => {
                    if (params.id) {
                      handleCmtSubmit(params.id)
                    }
                  }}
                >
                  Gửi bình luận
                </button>
              </div>
              {dataWithCmt?.comments?.map((item, index) => (
                <div className="d-flex gap-3" key={index}>
                  <img
                    src={`${item.avatar}`}
                    style={{ maxWidth: "48px", objectFit: "cover" }}
                    className="align-self-baseline"
                  />
                  <div className="d-flex flex-column">
                    <span className={`${mod.name}`}>{item.fullname}</span>
                    <small>{item.comment_text}</small>
                    <div className="d-inline-flex gap-3 my-2">
                      <small
                        className="text-primary"
                        onClick={() => {
                          setActiveReplyId(activeReplyId === item.id ? null : item.id)
                          setActiveReplyIdR(null)
                          setActiveReplyIdRR(null)
                          setEditId(null)
                          setEditIdR(null)
                          setEditIdRR(null)
                        }}
                      >
                        Trả lời
                      </small>
                      {item.user_id === userId?.id ? (
                        <small
                          className="text-primary"
                          onClick={() => {
                            setActiveReplyId(null)
                            setActiveReplyIdR(null)
                            setActiveReplyIdRR(null)
                            setEditId(editId === item.id ? null : item.id)
                            setEditIdR(null)
                            setEditIdRR(null)
                          }}
                        >Sửa</small>
                      ) : ('')}
                      {
                        item.user_id === userId?.id ? (
                          <small className="text-primary" onClick={() => handleDelete(item.id)}>Xóa</small>
                        ) : (
                          item.del_flag === true ? (
                            <small className="text-primary" onClick={() => handleHidden(item.id)}>Ẩn</small>
                          ) : (
                            <small className="text-primary" onClick={() => handleHidden(item.id)}>Hiện</small>
                          )
                        )
                      }
                    </div>
                    {activeReplyId === item.id && (
                      <div className="mt-3">
                        <textarea
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          placeholder="Nhập nội dung trả lời..."
                          rows={3}
                          className={mod.comment_input}
                        />
                        <button
                          className={`btn btn-primary mt-2 ${replyContent === '' ? mod.btn_disabled : ''}`}
                          onClick={() => handleReplySubmit(item.id)}
                        >
                          Gửi trả lời
                        </button>
                      </div>
                    )}
                    {editId === item.id && (
                      <form className="mt-3" onSubmit={formik.handleSubmit}>
                        <input
                          style={{ minHeight: '48px', minWidth: '32px' }}
                          type="hidden"
                          value={formik.values.id}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          name="id"
                        />
                        <textarea
                          value={formik.values.comment_text}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          name="comment_text"
                          rows={3}
                          className={mod.comment_input}
                        />
                        {formik.touched.comment_text && formik.errors.comment_text && (
                          <div className="invalid-feedback">{formik.errors.comment_text}</div>
                        )}
                        <button
                          className={`btn btn-primary mt-2 ${formik.values.comment_text.trim() === '' ? mod.btn_disabled : ''
                            }`}
                          type="submit"
                          disabled={formik.isSubmitting || formik.values.comment_text.trim() === ''}
                        >
                          Lưu
                        </button>
                      </form>
                    )}
                    {item.replies?.map((itemR, indexR) => (
                      <div
                        key={indexR}
                        className="d-flex gap-3 flex-column border-2 border-start px-2 mt-3"
                      >
                        <div className="w-100 d-flex flex-row gap-3 ">
                          <img
                            src={`${itemR.avatar}`}
                            className="align-self-baseline"
                            style={{ maxWidth: "48px", objectFit: "cover" }}
                          />
                          <div className="d-flex flex-column">
                            <span className={`${mod.name}`}>{itemR.fullname}</span>
                            <small>{itemR.comment_text}</small>
                            <div className="d-flex flex-row gap-3 mt-2">
                              <small
                                className="text-primary"
                                onClick={() => {
                                  setActiveReplyIdR(activeReplyIdR === itemR.id ? null : itemR.id)
                                  setActiveReplyId(null)
                                  setActiveReplyIdRR(null)
                                  setEditId(null)
                                  setEditIdR(null)
                                  setEditIdRR(null)
                                }}
                              >
                                Trả lời
                              </small>
                              {itemR.user_id === userId?.id ? (
                                <small
                                  className="text-primary"
                                  onClick={() => {
                                    setActiveReplyId(null)
                                    setActiveReplyIdR(null)
                                    setActiveReplyIdRR(null)
                                    setEditId(null)
                                    setEditIdR(editIdR === itemR.id ? null : itemR.id)
                                    setEditIdRR(null)
                                  }}
                                >Sửa</small>
                              ) : ('')}
                              {itemR.id === userId?.id ? (
                                <small className="text-primary" onClick={() => handleDelete(itemR.id)}>Xóa</small>
                              ) : (
                                <small className="text-primary">Ẩn</small>
                              )}
                            </div>
                          </div>
                        </div>
                        {activeReplyIdR === itemR.id && (
                          <div className="mt-3">
                            <textarea
                              value={replyContentR}
                              onChange={(e) => setReplyContentR(e.target.value)}
                              placeholder="Nhập nội dung trả lời..."
                              rows={3}
                              className={mod.comment_input}
                            />
                            <button
                              className={`btn btn-primary mt-2 ${replyContentR === '' ? mod.btn_disabled : ''}`}
                              onClick={() => handleReplySubmitR(itemR.id)}
                            >
                              Gửi trả lời
                            </button>
                          </div>
                        )}
                        {editIdR === itemR.id && (
                          <form className="mt-3" onSubmit={formikR.handleSubmit}>
                            <input
                              type="hidden"
                              value={formikR.values.id}
                              onChange={formikR.handleChange}
                              onBlur={formikR.handleBlur}
                              name="id"
                            />
                            <textarea
                              value={formikR.values.comment_text}
                              onChange={formikR.handleChange}
                              onBlur={formikR.handleBlur}
                              name="comment_text"
                              rows={3}
                              className={mod.comment_input}

                            />
                            <button
                              className={`btn btn-primary mt-2 ${formikR.values.comment_text.trim() === '' ? mod.btn_disabled : ''
                                }`}
                              type="submit"
                              disabled={formikR.isSubmitting || formikR.values.comment_text.trim() === ''}
                            >
                              Lưu
                            </button>
                          </form>
                        )}

                        {itemR.replies?.map((itemRR, indexRR) => (
                          <div
                            key={indexRR}
                            className="d-flex gap-3 border-2 border-start px-2 mt-3"
                          >
                            <div className="w-100 d-flex flex-row gap-3 ">

                              <img
                                src={`${itemRR.avatar}`}
                                className="align-self-baseline"
                                style={{ maxWidth: "48px", objectFit: "cover" }}
                              />
                              <div className="d-flex flex-column">
                                <span className={`${mod.name}`}>{itemRR.fullname}</span>
                                <small>{itemRR.comment_text}</small>
                                <div className="d-flex flex-row gap-3 mt-2">
                                  <small
                                    className="text-primary"
                                    onClick={() => {
                                      setActiveReplyIdRR(activeReplyIdRR === itemRR.id ? null : itemRR.id)
                                      setActiveReplyId(null)
                                      setActiveReplyIdR(null)
                                      setEditId(null)
                                      setEditIdR(null)
                                      setEditIdRR(null)
                                    }}
                                  >
                                    Trả lời
                                  </small>
                                  {itemRR.user_id === userId?.id ? (
                                    <small
                                      className="text-primary"
                                      onClick={() => {
                                        setActiveReplyId(null)
                                        setActiveReplyIdR(null)
                                        setActiveReplyIdRR(null)
                                        setEditId(null)
                                        setEditIdR(null)
                                        setEditIdRR(editIdRR === itemRR.id ? null : itemRR.id)
                                      }}
                                    >Sửa</small>
                                  ) : ('')}
                                  {itemRR.user_id === userId?.id ? (
                                    <small className="text-primary" onClick={() => handleDelete(itemRR.id)}>Xóa</small>
                                  ) : (
                                    <small className="text-primary">Ẩn</small>
                                  )}
                                </div>
                                {activeReplyIdRR === itemRR.id && (
                                  <div className="mt-3">
                                    <textarea
                                      value={replyContentRR}
                                      onChange={(e) => setReplyContentRR(e.target.value)}
                                      placeholder="Nhập nội dung trả lời..."
                                      rows={3}
                                      className={mod.comment_input}
                                    />
                                    <button
                                      className={`btn btn-primary mt-2 ${replyContentRR === '' ? mod.btn_disabled : ''}`}
                                      onClick={() => handleReplySubmitRR(itemRR.id)}
                                    >
                                      Gửi trả lời
                                    </button>
                                  </div>
                                )}
                                {editIdRR === itemRR.id && (
                                  <form onSubmit={formikRR.handleSubmit} className="mt-3">
                                    <input
                                      type="hidden"
                                      value={formikRR.values.id}
                                      onChange={formikRR.handleChange}
                                      onBlur={formikRR.handleBlur}
                                      name="id"
                                    />
                                    <textarea
                                      value={formikRR.values.comment_text}
                                      onChange={formikRR.handleChange}
                                      onBlur={formikRR.handleBlur}
                                      name="comment_text"
                                      rows={3}
                                      className={mod.comment_input}
                                    />
                                    <button
                                      className={`btn btn-primary mt-2 ${formikRR.values.comment_text.trim() === '' ? mod.btn_disabled : ''
                                        }`}
                                      type="submit"
                                      disabled={formikRR.isSubmitting || formikRR.values.comment_text.trim() === ''}
                                    >
                                      Lưu
                                    </button>
                                  </form>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div >
        ) : ('')
      }
    </>
  );
};

export default MarketingPost;
