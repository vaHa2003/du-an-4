import React, { useState, useEffect, useRef } from 'react';
import Button from '../component/globalControl/btnComponent';
import styles from "@public/styles/Learning/NoteCourse.module.css";
import CKEditorComponent from "../component/globalControl/ckedditor";
import useCookie from '@app/(user-global)/component/hook/useCookie';
import Notification from "@app/(user-global)/component/globalControl/Notification";
import { motion } from 'framer-motion';
const NoteCourse: React.FC<NoteCourseProps> = ({ id, title, time, onClose }) => {
    const token = useCookie('token');
    const [noteContent, setNoteContent] = useState<string>(''); // State để lưu nội dung ghi chú
    const popupRef = useRef<HTMLDivElement | null>(null);
    // show thông báo
    const [showNotification, setShowNotification] = useState(false);
    const [type, setType] = useState<NotiType>("complete");
    const [message, setMessage] = useState<string>("");
    const formatTime = (seconds: number | string): string => {
        if (typeof seconds === 'string') {
            return seconds;
        }
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };
    // Hàm lưu ghi chú
    const noteData = {
        title_note: title,
        cache_time_note: Math.round(time),
        content_note: noteContent, // Sử dụng noteContent ở đây
    };
    // console.log(noteData); // In ra console để kiểm tra
    const handleSaveNote = async () => {
        // Xử lý lưu ghi chú qua API
        // console.log('TOKEN:', token);
        // console.log('Note Data:', noteData);
        try {
            const response = await fetch(`/api/addNote/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(noteData),
            });

            const responseData = await response.json();

            if (!responseData.ok) {
                setType("fail")
                setMessage(responseData.message);
                setShowNotification(true);

            } else {
                setType("success")
                setMessage(responseData.message);
                setShowNotification(true);

            }
            setTimeout(() => {
                onClose();
            }, 3000);
            // Đóng popup sau khi lưu thành công
        } catch (error) {
            console.error('Failed to save note:', error);
        }
    };

    // Hàm để đóng popup khi click ra ngoài
    const handleClickOutside = (event: MouseEvent) => {
        if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
            onClose(); // Đóng popup khi click ra ngoài
        }
    };

    // Lắng nghe sự kiện click ngoài popup
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const handleGetContent = (data: string) => {
        console.log('Dữ liệu từ CKEditor:', data);
        setNoteContent(data);
    }

    return (
        <div className={styles.popupNoteCourse} ref={popupRef}>
            <div className={styles.container}>
                <div className={styles.heading}>
                    <h4 className={styles.title}>Thêm ghi chú 2</h4>
                    <p className={styles.time}>{formatTime(time)}</p>
                </div>

                <div className={styles.editorWrapper}>
                    <CKEditorComponent course_Id={id} onClose={onClose} onSubmit={handleGetContent} />
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
                        onClick={() => {
                            handleSaveNote()
                        }}
                        type="premary"
                        status="hover"
                        size="S"
                        height={40} leftIcon={false}
                        rightIcon={false}
                    >
                        Thêm
                    </Button>
                </div>
            </div>
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
        </div>
    );
};

export default NoteCourse;
