import React, { useState, useEffect } from 'react';
import useCookie from '@app/(user-global)/component/hook/useCookie';
import styles from "@public/styles/Learning/NoteContent.module.css";
import Tippy from "@tippyjs/react/headless";
import { motion } from 'framer-motion';
import { Arrow, IconX } from "@/app/(user-global)/component/icon/icons";
import Notification from "@app/(user-global)/component/globalControl/Notification";
import { useEscapeKey } from "@app/(user-global)/component/globalControl/commonC";

import NoteItem from "./NoteItem";

const NoteContent: React.FC<NoteContentProps> = ({ course_Id, doc_id, chapter_Id, userImage, onClose }) => {

    const token = useCookie('token');
    const [selected, setSelected] = useState<string>("Bài học hiện tại");
    const [arrangeContent, setArrangeContent] = useState<string>("Mới nhất");
    const [isSecledCate, setSecledCate] = useState<boolean>(false);
    const [isSecledArrange, setSecledArrange] = useState<boolean>(false);
    const [notes, setNotes] = useState<Note[] | null>(null);
    const [type, setType] = useState<NotiType>("complete");
    const [message, setMessage] = useState<string>("");
    const [showNotification, setShowNotification] = useState(false);

    const toggleSecledCate = () => setSecledCate(prev => !prev);
    const toggleSecledArrange = () => setSecledArrange(prev => !prev);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Xử lý sắp xếp
    const arrange = arrangeContent === "Mới nhất" ? "desc" : "asc";
    const fetchNoteDoc = async () => {
        let endpoint = '';
        switch (selected) {
            case 'Bài học hiện tại':
                endpoint = `/api/getNoteDoc/${doc_id}/${arrange}`;
                break;
            case 'Chương hiện tại':
                endpoint = `/api/getNoteChapter/${chapter_Id}/${arrange}`;
                break;
            case 'Khóa học hiện tại':
                endpoint = `/api/getNoteCourse/${course_Id}/${arrange}`;
                break;
            case 'Tất cả':
                endpoint = `/api/getNoteUser/${arrange}`;
                break;
            default:
                console.error('Invalid selection');
                return;
        }

        setIsLoading(true); // Đặt trạng thái đang load

        try {
            const response = await fetch(endpoint, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error("Failed to fetch notes");

            const data = await response.json() as { data: Note[] };
            setNotes(data.data);
        } catch (err: any) {
            console.error(err.message);
            setNotes(null);
        } finally {
            setIsLoading(false); // Dừng trạng thái đang load
        }
    };
    const handleEdit = async (replyData: {
        document_id: string;
        note_id: string;
        cache_time: number;
        title_note: string;
        content_note: string;
    }) => {
        try {
            const response = await fetch(`/api/updateNote/${replyData.document_id}/${replyData.note_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title_note: replyData.title_note,
                    content_note: replyData.content_note,
                }),
            });

            const responseData = await response.json();
            if (!response.ok) {
                setType("fail");
                setMessage(responseData.message || "Cập nhật ghi chú thất bại");
            } else {
                setType("complete");
                setMessage(responseData.message || "Cập nhật ghi chú thành công");
                fetchNoteDoc();
            }

            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 3000);
        } catch (error) {
            console.error('Failed to update note:', error);
            setType("fail");
            setMessage("Đã xảy ra lỗi khi cập nhật ghi chú");
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 3000);
        }
    };

    const handleDelete = async (id: string) => {

        // console.log(noteData); // In ra console để kiểm tra
        try {
            const response = await fetch(`/api/deleteNote/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })

            const responseData = await response.json();
            if (!response.ok) {
                setType("fail");
                setMessage(responseData.message);
            }

            setType("success")
            setMessage(responseData.message);
            setShowNotification(true);

            fetchNoteDoc();
            setTimeout(() => {
                setShowNotification(false);
            }, 3000);

        } catch (error) {
            console.error('Failed to save note:', error);
        }
    };

    useEscapeKey(onClose);

    useEffect(() => {
        fetchNoteDoc();
    }, [selected, arrange, doc_id]);


    const handleEditReply = (replyData: { document_id: string; note_id: string; cache_time: number; title_note: string; content_note: string; }) => {
        console.log(replyData)
        handleEdit(replyData);
    };

    const handelDelete = (id: string) => {
        handleDelete(id);
    }
    return (
        <main className={styles.ContainerNote}>
            <header className={styles.headerNote}>
                <h4 className={styles.title}>Ghi chú của bạn</h4>
                <div className={styles.cta}>
                    <Tippy
                        visible={isSecledCate}
                        onClickOutside={toggleSecledCate}
                        interactive={true}
                        placement="bottom"
                        render={(attrs) => (
                            <div className={styles.tippyCataList} tabIndex={-1} {...attrs}>
                                <div className={styles.CataList} onClick={() => {
                                    setSelected('Bài học hiện tại')
                                    toggleSecledCate();
                                }
                                }>Bài học hiện tại</div>
                                <div className={styles.CataList} onClick={() => {
                                    setSelected('Chương hiện tại');
                                    toggleSecledCate()
                                }
                                }>Chương hiện tại</div>
                                <div className={styles.CataList} onClick={() => {
                                    setSelected('Khóa học hiện tại')
                                    toggleSecledCate();
                                }
                                }>Khóa học hiện tại</div>
                                <div className={styles.CataList} onClick={() => {
                                    setSelected('Tất cả')
                                    toggleSecledCate();
                                }}>Tất cả</div>
                            </div>
                        )}
                    >
                        <button className={styles.select} onClick={toggleSecledCate}>
                            <span>{selected}</span>
                            <Arrow deg="90" />
                        </button>
                    </Tippy>

                    <Tippy
                        visible={isSecledArrange}
                        onClickOutside={toggleSecledArrange}
                        interactive={true}
                        placement="bottom"
                        render={(attrs) => (
                            <div className={styles.tippyArrage} tabIndex={-1} {...attrs}>
                                <div className={styles.CataList} onClick={() => {
                                    setArrangeContent('Mới nhất');
                                    toggleSecledArrange()
                                }}>Mới nhất</div>
                                <div className={styles.CataList} onClick={() => {
                                    setArrangeContent('Cũ nhất')
                                    toggleSecledArrange()
                                }}>Cũ nhất</div>
                            </div>
                        )}
                    >
                        <button className={styles.selectArr} onClick={toggleSecledArrange}>
                            <span>{arrangeContent}</span>
                            <Arrow deg="90" />
                        </button>
                    </Tippy>
                    <div onClick={onClose} className={styles.IconCanxel}>
                        <IconX />
                    </div>
                </div>


            </header >

            <section className={styles.notesSection}>
                {isLoading ? (
                    <p className={styles.loading}>Đang tải ghi chú...</p>
                ) : notes && notes.length > 0 ? (
                    notes.map(note => (
                        <NoteItem key={note.note_id} note={note} onEdit={handleEditReply} onDelete={handelDelete} />
                    ))
                ) : (
                    <p className={styles.noNotes}>Chưa có ghi chú nào.</p>
                )}
            </section>


            {
                showNotification && (
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ duration: 1 }}
                        className={styles.noteTap}
                    >
                        <Notification type={type} message={message} position="bottom-left" />
                    </motion.div>
                )
            }
        </main >
    );
};

export default NoteContent;
