import React, { useState } from "react";
import styles from "@public/styles/Learning/Faq.module.css";
import { calculateTimeAgo } from "@app/(user-global)/component/globalControl/commonC";
import CkediterCustom from "@app/custom-editor";
import Button from "../component/globalControl/btnComponent";
import { IconDot } from "@/app/(user-global)/component/icon/icons";
import Tippy from "@tippyjs/react/headless";


const CommentItem: React.FC<CommentItemProps> = ({
    comment,
    userImage,
    currentUserId,
    onSave,
    onEdit,
    onDelete,
    onClose,
}) => {
    const [noteContent, setNoteContent] = useState<string>("");
    const [activeReply, setActiveReply] = useState<string | null>(null);
    const [expandedReply, setExpandedReply] = useState<string | null>(null);
    const [visibleTippyId, setVisibleTippyId] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState<string | null>(null); // Theo dõi id đang sửa
    const [editContent, setEditContent] = useState<string>(""); // Nội dung sửa

    if (!comment) {
        return <p>No comment data available.</p>;
    }

    const handleCommentData = (data: string) => {
        setNoteContent(data);
    };

    const handleSaveNote = (id: string) => {
        onSave({ id, replyText: noteContent });
        setActiveReply(null);
        setNoteContent("");
    };

    const toggleTippy = (id: string) => {
        setVisibleTippyId((prevId) => (prevId === id ? null : id));
    };

    // Hàm xử lý sửa bình luận
    const handleEditComment = (id: string, currentText: string) => {
        setIsEditing(id);
        setEditContent(currentText);
        setVisibleTippyId(null); // Ẩn Tippy sau khi nhấn sửa
    };

    const handleSaveEdit = (id: string) => {
        // Gửi nội dung đã sửa lên server
        onEdit({ id, replyText: editContent });
        setIsEditing(null);
        setEditContent("");
    };

    // Hàm xử lý xóa bình luận
    const handleDeleteComment = (id: string) => {
        // Gọi API xóa bình luận
        onDelete(id)
        console.log(`Đang xóa bình luận với ID: ${id}`);
        setVisibleTippyId(null); // Ẩn Tippy sau khi nhấn xóa
        // onClose(); // Gọi hàm từ cha để cập nhật giao diện
    };

    return (
        <div>
            {comment.replies.length > 0 && (
                <>
                    {comment.replies.map((reply) => (
                        <div
                            key={reply.id}
                            style={{ marginLeft: "12px" }}
                            className={styles.contentRep}
                        >
                            <article className={styles.user}>
                                <div className={styles.LeftContentUser}>
                                    {reply.avatar ? (
                                        <img
                                            src={reply.avatar}
                                            alt={reply.fullname}
                                            className={styles.ImageUser}
                                        />
                                    ) : (
                                        <span className={styles.UserName}>{reply.fullname}</span>
                                    )}

                                    <div className={styles.nameAndTime}>
                                        <h3 className={styles.nameUser}>{reply.fullname}</h3>
                                        <small className={styles.timeAgo}>
                                            {calculateTimeAgo(reply.created_at)}
                                        </small>
                                    </div>
                                </div>
                                {reply.user_id === currentUserId && ( // Chỉ hiển thị khi user_id khớp
                                    <Tippy
                                        visible={visibleTippyId === reply.id}
                                        onClickOutside={() => setVisibleTippyId(null)}
                                        interactive={true}
                                        placement="bottom-end"
                                        render={(attrs) => (
                                            <div className={styles.tippyBox} tabIndex={-1} {...attrs}>
                                                <button onClick={() => handleEditComment(reply.id, reply.comment_text)} className={styles.tippyButton}>
                                                    Sửa bình luận
                                                </button>
                                                <button onClick={() => handleDeleteComment(reply.id)} className={styles.tippyButton}>
                                                    Xóa bình luận
                                                </button>
                                            </div>
                                        )}
                                    >
                                        <div onClick={() => toggleTippy(reply.id)} className={styles.icon}>
                                            <IconDot />
                                        </div>
                                    </Tippy>
                                )}
                            </article>


                            {isEditing === reply.id ? (
                                <div className={styles.form}>
                                    <CkediterCustom
                                        initialData={editContent}
                                        onChange={(data) => setEditContent(data)}
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
                                            onClick={() => handleSaveEdit(reply.id)}
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
                                <div
                                    dangerouslySetInnerHTML={{ __html: reply.comment_text }}
                                    className={styles.commentContent}
                                />
                            )}

                            {/* Nút Phản hồi */}
                            <div className={styles.ctaEditComment}>
                                <button
                                    className={styles.buttonReply}
                                    onClick={() =>
                                        setActiveReply(activeReply === reply.id ? null : reply.id)
                                    }
                                >
                                    Phản hồi
                                </button>

                                {reply.replies.length > 0 && (
                                    <button
                                        className={styles.buttonReply}
                                        onClick={() =>
                                            setExpandedReply(
                                                expandedReply === reply.id ? null : reply.id
                                            )
                                        }
                                    >
                                        {expandedReply === reply.id
                                            ? "Ẩn bình luận"
                                            : `Xem ${reply.replies.length} bình luận`}
                                    </button>
                                )}
                            </div>

                            {/* Hiển thị form nếu activeReply khớp với reply.id */}
                            {activeReply === reply.id && (
                                <div className={styles.form}>
                                    <CkediterCustom
                                        initialData="Mời bạn nhập nội dung câu hỏi"
                                        onChange={handleCommentData}
                                    />
                                    <div className={styles.cta}>
                                        <img
                                            src={userImage}
                                            alt={comment.fullname}
                                            className={styles.ImageUser}
                                        />
                                        <Button
                                            onClick={() => setActiveReply(null)}
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
                                            onClick={() => handleSaveNote(reply.id)}
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
                                </div>
                            )}

                            {/* Gọi đệ quy cho các bình luận con */}
                            {expandedReply === reply.id && (
                                <div className={styles.replyWapper}>
                                    <CommentItem
                                        key={reply.id}
                                        currentUserId={currentUserId}
                                        comment={reply}
                                        userImage={userImage}
                                        onSave={onSave}
                                        onEdit={onEdit}
                                        onDelete={onDelete}
                                        onClose={onClose}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

export default CommentItem;
