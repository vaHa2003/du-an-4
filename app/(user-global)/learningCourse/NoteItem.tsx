import React, { useState } from "react";
import { calculateTimeAgo } from "@app/(user-global)/component/globalControl/commonC";
import styles from "@public/styles/Learning/NoteContent.module.css";
import Button from "../component/globalControl/btnComponent";
import { IconPush, IconPen, IconVideo } from "@/app/(user-global)/component/icon/icons";
import CkediterCustom from "@app/custom-editor";



const NoteItem: React.FC<NoteItemProps> = ({ note, onEdit, onDelete }) => {
    const [showCkEdit, setShowCkEdit] = useState<boolean>(false);
    const [noteContent, setNoteContent] = useState<string>(note.content_note);

    const handleGetData = (data: string) => {
        setNoteContent(data);
    };

    const handleEdit = () => {
        onEdit({
            document_id: note.document_id, // Cập nhật đúng document_id nếu cần
            note_id: note.note_id,
            cache_time: note.cache_time_note,
            content_note: noteContent,
            title_note: note.title_note
        });
        setShowCkEdit(false);
    };

    const toggleShowCkEdit = () => {
        setShowCkEdit((prev) => !prev);
    };

    const handelDelete = () => {
        onDelete(note.note_id)
    }

    return (
        <div key={note.note_id} className={styles.noteItem}>
            <div className={styles.headerContent}>
                <div className={styles.title}>
                    <h4 className={styles.noteTitle1}>{note.chapter_name}</h4>
                    <h5 className={styles.noteTitle2}>{note.title_note}</h5>
                </div>
                <div className={styles.cta}>
                    <div onClick={toggleShowCkEdit}>
                        <IconPen />
                    </div>
                    <div onClick={handelDelete}>
                        <IconPush />
                    </div>
                </div>
            </div>
            <div className={styles.bodyContent}>
                <p className={styles.bodyContentTitle}>Nội dung</p>
                {!showCkEdit ? (
                    <div
                        dangerouslySetInnerHTML={{ __html: note.content_note }}
                        className={styles.noteContent}
                    />
                ) : (
                    <CkediterCustom
                        initialData={note.content_note}
                        onChange={handleGetData}
                    />
                )}
                <div className={styles.ctaContent}>
                    {showCkEdit ? (
                        <div className={styles.cta}>
                            <Button
                                onClick={toggleShowCkEdit}
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
                                onClick={handleEdit}
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
                    ) : (<p className={styles.noteTime}> <IconVideo />Xem lại video</p>)}


                </div>
            </div>
        </div>
    );
};

export default NoteItem;
