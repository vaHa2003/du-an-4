import React, { useState, useEffect, useRef, useMemo } from 'react';
import useCookie from '@app/(user-global)/component/hook/useCookie';
import styles from "@public/styles/Learning/Faq.module.css";
import Button from "../component/globalControl/btnComponent";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import FaqTitle from './FaqTitle';
import CommentItem from './FaqComtainet';
import { IconVideo, IconDoc, IconX, IconWhat32, IconDot } from "@/app/(user-global)/component/icon/icons";
import CkediterCustom from "@app/custom-editor";
import Notification from "@app/(user-global)/component/globalControl/Notification";
import { motion } from 'framer-motion';
import { calculateTimeAgo, scrollToElementBottom, useEscapeKey } from "@app/(user-global)/component/globalControl/commonC";

import Tippy from "@tippyjs/react/headless";
const Faq: React.FC<FaqProps> = ({ course_Id, userImage, onClose }) => {

    const token = useCookie('token');
    const userState = useSelector((state: RootState) => state.user);
    const user = userState?.user;
    const popupRef = useRef<HTMLDivElement | null>(null);
    const scrollableRef = useRef<HTMLDivElement>(null);

    const [openIndexes, setOpenIndexes] = useState<number[]>([]);
    const [activeTab, setActiveTab] = useState('hoidap');
    const [idDocActive, setDocActiveTab] = useState<string>('')
    const [idCommentActive, setCommentActive] = useState<string>('')
    const [idCommentActiveTo, setCommentActiveTo] = useState<string>('')
    const [titleActive, setTitleActive] = useState<string>('')
    const [noteContent, setNoteContent] = useState<string>('');
    const [titleContentFaq, setTitleContentFaq] = useState<string>('');
    const [comments, setCommentsDoc] = useState<CommentTitleData | null>(null);
    const [commentsDetail, setcommentsDetail] = useState<CommentData | null>(null);
    const [course, setCourse] = useState<ChapterFaq[] | null>(null);
    console.log(idCommentActive, idDocActive)
    // các hàm state ẩn hiện
    const [type, setType] = useState<NotiType>("complete");
    const [message, setMessage] = useState<string>("");
    const [showNotification, setShowNotification] = useState(false);
    const [showCkediterCustom, setShowCkediterCustom] = useState(false);

    const [visibleTippyId, setVisibleTippyId] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState<string | null>(null); // Theo dõi id đang sửa
    const [editContent, setEditContent] = useState<string>(""); // Nội dung sửa

    const toggleTippy = (id: string) => {
        setVisibleTippyId((prevId) => (prevId === id ? null : id));
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
            onClose();
            setActiveTab('hoidap'); // Đóng popup khi click ra ngoài
        }
    };
    useEscapeKey(onClose)
    // console.log(commentsDetail);
    // Lắng nghe sự kiện click ngoài popup

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleItem = (index: number) => {
        if (openIndexes.includes(index)) {
            setOpenIndexes(openIndexes.filter((i) => i !== index));
        } else {
            setOpenIndexes([...openIndexes, index]);
        }
    };

    useEffect(() => {
        fetchCourseComentDoc()
    }, [token])


    const fetchCourseComentDoc = async () => {
        if (!course_Id || !token) {
            console.log("Missing course_Id or token");
            return;
        }
        try {
            const response = await fetch(`/api/getDocComent/${course_Id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch course");
            }

            const data = await response.json() as CourseFaq;
            // console.log(data);

            // Cập nhật state với dữ liệu trả về
            setCourse(data?.data ?? null);
        } catch (err: any) {
            console.log(err.message);
        }
    };
    const fetchDoc = async () => {
        try {
            const response = await fetch(`/api/getFaqTitle/${idDocActive}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch course");
            }
            const data = await response.json() as CommentTitleData;
            setCommentsDoc(data);
        } catch (err: any) {
            console.log(err.message);
        }
    };

    const fetchCommentDoc = async () => {
        try {
            const response = await fetch(`/api/getDetailComent/${idDocActive}/${idCommentActive}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {

                throw new Error("Failed to fetch course");
            }
            const data = await response.json() as CommentData;
            setcommentsDetail(data);
            setTitleContentFaq(data.comment.comment_title);

        } catch (err: any) {
            console.log(err.message);
        }
    };

    // console.log(titleContentFaq, "title được chọn")
    // console.log(idCommentActive, "id coment được chọn")

    useEffect(() => {
        if (idDocActive) {
            fetchDoc();
        }
    }, [idDocActive]);

    useEffect(() => {
        if (idCommentActive) {
            fetchCommentDoc();
        }
    }, [idCommentActive]);

    // hàm tạo bình luận mới
    const handleSaveNewComment = async () => {
        const noteData = {
            comment_title: titleContentFaq,
            comment_text: noteContent, // Sử dụng noteContent ở đây
        };
        // console.log(noteData); // In ra console để kiểm tra
        try {
            const response = await fetch(`/api/addComentFaq/${idDocActive}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(noteData),
            })
            const responseData = await response.json();
            if (!response.ok) {
                setType("fail")
                setMessage(responseData.message);
            }
            setType("success")
            setMessage(responseData.message);
            setShowNotification(true)
            setTimeout(() => {
                setShowNotification(false);
            }, 3000);
            setActiveTab('dschcuabai');
            fetchDoc();
        } catch (error) {
            console.error('Failed to save note:', error);
        }
    };
    // Hàm trả lời bình luận cấp 1
    const handleSaveRepplayComment = async () => {
        const noteData = {
            comment_title: titleContentFaq,
            comment_text: noteContent, // Sử dụng noteContent ở đây
        };
        // console.log(noteData); // In ra console để kiểm tra
        try {
            const response = await fetch(`/api/addComentFaq/${idDocActive}/${idCommentActive}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(noteData),
            })

            const responseData = await response.json();
            if (!response.ok) {
                setType("fail")
                setMessage(responseData.message);
            }

            console.log(responseData, "dữ liệu được cập nhật")
            setType("success")
            setMessage(responseData.message);
            setShowNotification(true);
            setShowCkediterCustom(false);
            fetchCommentDoc();
            setTimeout(() => {
                setShowNotification(false);
            }, 3000);
        } catch (error) {
            console.error('Failed to save note:', error);
        }
    };
    // hàm tạo bình luận cấp 2 đến cấp 3
    const handleSaveRepplayCommentTo = async () => {
        const noteData = {
            comment_title: titleContentFaq,
            comment_text: noteContent, // Sử dụng noteContent ở đây
        };
        // console.log(noteData); // In ra console để kiểm tra
        try {
            const response = await fetch(`/api/addComentFaq/${idDocActive}/${idCommentActiveTo}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(noteData),
            })

            const responseData = await response.json();
            if (!response.ok) {
                setType("fail")
                setMessage(responseData.message);
            }

            console.log(responseData, "dữ liệu được cập nhật")
            setType("success")
            setMessage(responseData.message);
            setShowNotification(true);
            setShowCkediterCustom(false);
            fetchCommentDoc();
            setTimeout(() => {
                setShowNotification(false);
            }, 3000);
            scrollToElementBottom(scrollableRef.current);
        } catch (error) {
            console.error('Failed to save note:', error);
        }
    };
    const handleEditCommentUser = async (id: string, content: string) => {
        const noteData = {
            comment_title: titleContentFaq,
            comment_text: content, // Sử dụng noteContent ở đây
        };
        // console.log(noteData); // In ra console để kiểm tra
        try {
            const response = await fetch(`/api/editComment/${idDocActive}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(noteData),
            })

            const responseData = await response.json();
            if (!response.ok) {
                setType("fail")
                setMessage(responseData.message);
            }

            console.log(responseData, "dữ liệu được cập nhật")
            setType("complete");
            setMessage(responseData.message);
            setShowNotification(true);
            setShowCkediterCustom(false);
            fetchCommentDoc();
            setTimeout(() => {
                setShowNotification(false);
            }, 3000);
            scrollToElementBottom(scrollableRef.current);
        } catch (error) {
            console.error('Failed to save note:', error);
        }
    };
    const handleDeleteCommentUser = async (id: string) => {

        // console.log(noteData); // In ra console để kiểm tra
        try {
            const response = await fetch(`/api/deleteComment/${idDocActive}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })

            const responseData = await response.json();
            if (!response.ok) {
                setType("fail")
                setMessage(responseData.message);
            }

            setType("success")
            setMessage(responseData.message);
            setShowNotification(true);
            setShowCkediterCustom(false);
            fetchCommentDoc();
            fetchDoc();
            setTimeout(() => {
                setShowNotification(false);
            }, 3000);
            scrollToElementBottom(scrollableRef.current);
        } catch (error) {
            console.error('Failed to save note:', error);
        }
    };


    const handleEditComment = (id: string, currentText: string) => {
        setEditContent(currentText);
        setIsEditing(id);
        setShowCkediterCustom(false)
        setVisibleTippyId(null); // Ẩn Tippy sau khi nhấn sửa
    };
    const handleDeleteComment = (id: string) => {
        // Gọi API xóa bình luận
        handleDeleteCommentUser(id);
        console.log(`Đang xóa bình luận với ID: ${id}`);
        setVisibleTippyId(null); // Ẩn Tippy sau khi nhấn xóa        // Gọi hàm từ cha để cập nhật giao diện
    };

    const handleGetData = (data: string) => {
        // Xử lý dữ liệu tại đây
        setNoteContent(data);
    };
    const handleSaveReply = (replyData: { id: string; replyText: string }) => {
        setNoteContent(replyData.replyText);
        setCommentActiveTo(replyData.id);
    };
    const handleEditReply = (replyData: { id: string; replyText: string }) => {
        handleEditCommentUser(replyData.id, replyData.replyText);
    };
    const handleSaveEdit = (id: string) => {
        handleEditCommentUser(id, noteContent);
        setIsEditing(null);
        setEditContent("");
    };


    useEffect(() => {
        if (idCommentActiveTo) {
            handleSaveRepplayCommentTo();
        }
    }, [idCommentActiveTo]);
    return (
        <main className={styles.ContainerFaq}>
            <header className={styles.header} style={{
                display: activeTab === 'hoidap' ? 'flex' : 'none',
                zIndex: activeTab === 'hoidap' ? 1 : 0
            }}>
                <h4 className={styles.title}>Hỏi đáp</h4>
                <span onClick={onClose}><IconX /></span>
            </header>
            <header className={styles.header} style={{
                display: activeTab === 'dschcuabai' ? 'flex' : 'none',
                zIndex: activeTab === 'dschcuabai' ? 1 : 0
            }}>
                <div className={styles.titleNext} onClick={() => setActiveTab('hoidap')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M15 18L9 12L15 6" stroke="#237DF7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <h4 className={styles.titleDs}>Danh sách câu hỏi</h4>
                </div>
                <h4 className={styles.title}>Hỏi đáp</h4>
                <span onClick={onClose}><IconX /></span>
            </header>
            <header className={styles.header} style={{
                display: activeTab === 'datcauhoi' ? 'flex' : 'none',
                zIndex: activeTab === 'datcauhoi' ? 1 : 0
            }}>
                <div className={styles.titleNext} onClick={() => setActiveTab('hoidap')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M15 18L9 12L15 6" stroke="#237DF7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <h4 className={styles.titleDs}>Quay lại</h4>
                </div>
                <h4 className={styles.title}>Hỏi đáp</h4>
                <span onClick={onClose}><IconX /></span>
            </header>
            <header className={styles.header} style={{
                display: activeTab === 'chitietcauhoi' ? 'flex' : 'none',
                zIndex: activeTab === 'chitietcauhoi' ? 1 : 0
            }}>
                <div className={styles.titleNext} onClick={() => setActiveTab('hoidap')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M15 18L9 12L15 6" stroke="#237DF7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <h4 className={styles.titleDs}>Quay lại</h4>
                </div>
                <h4 className={styles.title}>Chi tiết câu hỏi</h4>
                <span onClick={onClose}><IconX /></span>
            </header>

            <main className={styles.main}
                style={{
                    display: activeTab === 'hoidap' ? 'block' : 'none',
                    zIndex: activeTab === 'hoidap' ? 1 : 0,
                }}
            >
                <h4 className={styles.title}>Danh sách khóa học</h4>
                {course?.map((item, index) => (
                    <div key={index} className={styles.listItem}>
                        <div className={styles.listItem__title} onClick={() => toggleItem(index)}>
                            <div className={styles.listItem__titleText}>{index + 1}. {item.chapter_name}</div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                className={`${styles.listItem__icon} ${openIndexes.includes(index) ? styles.rotated : ''}`}
                            >
                                <path
                                    d="M18 15L12 9L6 15"
                                    stroke="rgba(35, 125, 247, 1)"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        {openIndexes.includes(index) && (
                            <ul className={styles.listItem__docs} key={index}>
                                {item.documents.map((doc, subIndex) => {
                                    return (
                                        <li
                                            key={subIndex}
                                            className={`${styles.listItem__doc}`}
                                            onClick={() => {
                                                setActiveTab('dschcuabai')
                                                setDocActiveTab(doc.document_id);
                                            }}
                                        >
                                            <div className={styles.doc_title}>
                                                {doc.type_document === "video" ? (
                                                    <IconVideo />
                                                ) : (
                                                    <IconDoc />
                                                )}

                                                <span className={styles.listItem__docIndex}>{`${index + 1}.${subIndex + 1}`}  </span>
                                                <span className={styles.listItem__docName}> {doc.name_document} </span>
                                                {doc.type_document === "video" ? (
                                                    <span className={styles.listItem__docNameType} >Bài học Video</span>
                                                ) : (
                                                    <span className={styles.listItem__docNameType}>Bài tập </span>
                                                )}
                                                {doc.comment_count > 0 ? (
                                                    <span className={styles.listItem__docCommentCount}>
                                                        {doc.comment_count}
                                                    </span>
                                                ) :
                                                    null}
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>
                ))}

            </main>
            <main className={styles.main}
                style={{
                    display: activeTab === 'dschcuabai' ? 'block' : 'none',
                    zIndex: activeTab === 'dschcuabai' ? 1 : 0,
                }}
            >
                <h4 className={styles.title}>Các câu hỏi thường gặp</h4>
                <div className={styles.wapperFaq}>
                    {comments ? (
                        <div>
                            {Object.values(comments.comments).map((comment) => (
                                <div
                                    key={comment.id}  // Move the key here
                                    onClick={() => {
                                        setCommentActive(comment.id)
                                        setTitleActive(comment.title)
                                        setActiveTab('chitietcauhoi')
                                    }}
                                >
                                    <FaqTitle
                                        id={comment.id}
                                        title={comment.title}
                                        replies_count={comment.replies_count}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}

                </div>
                <div className={styles.bottomCTA}>
                    <p>Không tìm thấy câu hỏi của bạn</p>
                    <Button onClick={() => setActiveTab('datcauhoi')} type="premary" status="hover" size="S" leftIcon={false} rightIcon={false} height={32} >Đặt câu hỏi mới </Button>

                </div>
            </main >
            <main className={styles.main}
                style={{
                    display: activeTab === 'datcauhoi' ? 'block' : 'none',
                    zIndex: activeTab === 'datcauhoi' ? 1 : 0,
                }}
            >
                <div className={styles.editorWrapper}>
                    <h4 className={styles.title}>Đặt câu hỏi</h4>
                    <input type="text" className={styles.inputtTitle} placeholder='Nhập tiêu đề câu hỏi' value={titleContentFaq} onChange={(e) => setTitleContentFaq(e.target.value)} />
                    <CkediterCustom initialData='Mời bạn nhập nội dung câu hỏi' onChange={handleGetData} />
                </div>

                <div className={styles.cta}>
                    <Button
                        onClick={onClose}
                        type="premary"
                        status="noBorder"
                        size="S"
                        height={40}
                        leftIcon={false}
                        rightIcon={false}
                    >
                        Hủy
                    </Button>
                    <Button
                        onClick={handleSaveNewComment}
                        type="premary"
                        status="hover"
                        size="S"
                        height={40} leftIcon={false}
                        rightIcon={false}
                    >
                        Đặt câu hỏi
                    </Button>
                </div>

            </main>
            <main className={styles.main}
                style={{
                    display: activeTab === 'chitietcauhoi' ? 'block' : 'none',
                    zIndex: activeTab === 'chitietcauhoi' ? 1 : 0,
                }}
            >
                <div
                    ref={scrollableRef}
                >

                    <h4 className={styles.titleComtent}>{titleActive}</h4>

                    {commentsDetail ? (
                        <section>
                            <header className={styles.headerContentComment}>
                                <article className={styles.user}>
                                    <div className={styles.LeftContentUser}>
                                        {commentsDetail.comment.avatar ? (
                                            <img
                                                src={commentsDetail.comment.avatar}
                                                alt={commentsDetail.comment.fullname}
                                                className={styles.ImageUser}
                                            />
                                        ) : (
                                            <span className={styles.UserName}>{commentsDetail.comment.fullname}</span>
                                        )}

                                        <div className={styles.nameAndTime}>
                                            <h3 className={styles.nameUser}>{commentsDetail.comment.fullname}</h3>
                                            <small className={styles.timeAgo}>
                                                {calculateTimeAgo(commentsDetail.comment.created_at)}
                                            </small>
                                        </div>
                                    </div>
                                    {commentsDetail.comment.user_id === user?.id && (
                                        <Tippy
                                            visible={visibleTippyId === commentsDetail.comment.id}
                                            onClickOutside={() => setVisibleTippyId(null)}
                                            interactive={true}
                                            placement="bottom-end"
                                            render={(attrs) => (
                                                <div className={styles.tippyBox} tabIndex={-1} {...attrs}>
                                                    <button onClick={() => handleEditComment(commentsDetail.comment.id, commentsDetail.comment.comment_text)} className={styles.tippyButton}>
                                                        Sửa bình luận
                                                    </button>
                                                    <button onClick={() => handleDeleteComment(commentsDetail.comment.id)} className={styles.tippyButton}>
                                                        Xóa bình luận
                                                    </button>
                                                </div>
                                            )}
                                        >
                                            <div onClick={() => toggleTippy(commentsDetail.comment.id)} className={styles.icon}>
                                                <IconDot />
                                            </div>
                                        </Tippy>
                                    )}
                                </article>

                                {commentsDetail.comment.replies && commentsDetail.comment.replies.length > 0 ? (
                                    <span className={styles.repliesW}> <IconWhat32 /> Đã trả lời</span>
                                ) : (
                                    <span className={styles.repliesW}> <IconWhat32 /> Chưa trả lời </span>
                                )}
                            </header>

                            <article>

                                <div dangerouslySetInnerHTML={{ __html: commentsDetail.comment.comment_text }} />

                                <p className={styles.totalComment}>{commentsDetail.comment.replies.length} bình luận</p>

                                <div className={styles.form} >
                                    {showCkediterCustom ? (
                                        <>
                                            <CkediterCustom initialData='Mời bạn nhập nội dung câu hỏi' onChange={handleGetData} />
                                            <div className={styles.cta}>
                                                <img
                                                    src={userImage} // Avatar mặc định nếu null
                                                    alt={commentsDetail.comment.fullname}
                                                    className={styles.ImageUser}
                                                />
                                                <Button
                                                    onClick={onClose}
                                                    type="premary"
                                                    status="noBorder"
                                                    size="S"
                                                    height={40}
                                                    leftIcon={false}
                                                    rightIcon={false}
                                                >
                                                    Hủy
                                                </Button>
                                                <Button
                                                    onClick={handleSaveRepplayComment}
                                                    type="premary"
                                                    status="hover"
                                                    size="S"
                                                    height={40}
                                                    leftIcon={false}
                                                    rightIcon={false}
                                                >
                                                    Bình luận
                                                </Button>
                                            </div>
                                        </>
                                    ) : (
                                        isEditing !== commentsDetail.comment.id && (
                                            <div className={styles.showCta}>
                                                <img
                                                    src={userImage} // Avatar mặc định nếu null
                                                    alt={commentsDetail.comment.fullname}
                                                    className={styles.ImageUser}
                                                />
                                                <input
                                                    type="text"
                                                    className={styles.inputShowCta}
                                                    placeholder='Nhập bình luận của bạn'
                                                    onClick={() => setShowCkediterCustom(true)}
                                                />
                                            </div>
                                        )
                                    )}

                                    {isEditing === commentsDetail.comment.id ? (
                                        <div className={styles.form}>
                                            <CkediterCustom
                                                initialData={editContent}
                                                onChange={(data) => handleGetData(data)}
                                            />
                                            <div className={styles.cta}>
                                                <Button
                                                    onClick={() => setIsEditing(null)}
                                                    type="premary"
                                                    status="noBorder"
                                                    size="S"
                                                    height={40}
                                                    leftIcon={false}
                                                    rightIcon={false}
                                                >
                                                    Hủy
                                                </Button>
                                                <Button
                                                    onClick={() => handleSaveEdit(commentsDetail.comment.id)}
                                                    type="premary"
                                                    status="hover"
                                                    size="S"
                                                    height={40}
                                                    leftIcon={false}
                                                    rightIcon={false}
                                                >
                                                    Lưu
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </div>


                                <CommentItem key={commentsDetail.document_id} comment={commentsDetail.comment} currentUserId={user?.id ?? ""} userImage={userImage} onSave={handleSaveReply} onClose={onClose} onEdit={handleEditReply} onDelete={handleDeleteComment} />

                            </article>
                        </section>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>

            </main>
            {showNotification && (
                <motion.div
                    initial={{ x: '-100%' }} // Bắt đầu từ bên ngoài màn hình (trái)
                    animate={{ x: 0 }}       // Chạy vào giữa màn hình
                    exit={{ x: '-100%' }}    // Chạy ra khỏi màn hình (trái)
                    transition={{ duration: 1 }} // Thời gian chuyển đổi 0.5 giây
                    className={styles.noteTap}
                >
                    <Notification type={type} message={message} position='bottom-left' />
                </motion.div>
            )}

        </main>
    );

}

export default Faq;