//hàm chuyển đỏi ngày giờ
import { useEffect } from "react";
// HoverElement.tsx
import React from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

interface HoverElementProps {
    name: string; // Tên phần tử cần hiển thị
    children: React.ReactNode; // Phần tử con (nội dung của phần tử)
}

const ShowNameElement: React.FC<HoverElementProps> = ({ name, children }) => {
    return (
        <Tippy content={name} placement="top" arrow={true}>
            <div style={{ display: 'inline-block', cursor: 'pointer' }}>
                {children}
            </div>
        </Tippy>
    );
};



const formatDateTime = (datetimeStr: string): string => {
    const date = new Date(datetimeStr);
    // Lấy các thành phần ngày, tháng, năm, giờ, phút
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    // Kết hợp các thành phần thành chuỗi ngày giờ (không bao gồm giây)
    return `${day}-${month}-${year} ${hours}:${minutes}`;
};

// hàm lọc câu hỏi
const parseQues = (input: string): QuestionAnswer | null => {
    const [questionPart, answerPart] = input.split('?');
    if (!questionPart || !answerPart) return null;
    const answers = answerPart.split('/').map((str) => str.trim());
    return { question: questionPart.trim(), answers };
};
const parseFill = (input: string): QuestionAnswer | null => {
    const [questionPart, rest] = input.split('?');
    if (!questionPart || !rest) return null;

    // Tách đoạn trước và sau dấu '...'
    const [answerPart, remainingPart] = rest.split('...').map((str) => str.trim());

    // Trả về đối tượng với các phần đã tách
    return {
        question: questionPart.trim(),
        answers: [answerPart || '', remainingPart || '']
    };
};
const parseCode = (input: string): codeAnswer | null => {
    if (!input.includes('?') || input.trim() === '') return null;
    const [question, ...contentParts] = input.split('?');
    const content = contentParts.join('?').trim();
    if (!question.trim() || !content) return null;
    return { question: question.trim(), content };
};
// định dạng thời gian từ float sang 21 numbar
const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};
const cleaneds = (content: string[]) => {
    return content.map(item =>
        item.replace(/\s+/g, '') // Thay thế tất cả khoảng trắng bằng chuỗi rỗng
    );
};
const cleaned = (content: string) => {
    return content.replace(/\s+/g, ''); // Thay thế tất cả khoảng trắng bằng chuỗi rỗng
};


const calculateTimeAgo = (createdAt: string): string => {
    const currentDate = new Date();
    const commentDate = new Date(createdAt);
    const differenceInMilliseconds = currentDate.getTime() - commentDate.getTime();

    const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    if (differenceInDays > 0) {
        return `${differenceInDays} ngày${differenceInDays > 1 ? "" : ""} trước`;
    }

    const differenceInHours = Math.floor(differenceInMilliseconds / (1000 * 60 * 60));
    if (differenceInHours > 0) {
        return `${differenceInHours} giờ${differenceInHours > 1 ? "" : ""} trước`;
    }

    const differenceInMinutes = Math.floor(differenceInMilliseconds / (1000 * 60));
    if (differenceInMinutes > 0) {
        return `${differenceInMinutes} phút${differenceInMinutes > 1 ? "" : ""} trước`;
    }

    return "Just now";
};

const scrollToElementBottom = (element: HTMLElement | null) => {
    if (element) {
        element.scrollTo({
            top: element.scrollHeight,
            behavior: 'smooth', // Cuộn mượt mà
        });
    }
};

const useEscapeKey = (onEsc: () => void): void => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent): void => {
            if (event.key === "Escape") { // Kiểm tra phím Escape
                onEsc();
            }
        };

        // Thêm sự kiện lắng nghe
        window.addEventListener("keydown", handleKeyDown);

        // Cleanup khi unmount
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onEsc]); // Chỉ re-run effect khi `onEsc` thay đổi
};

export { parseQues, formatTime, formatDateTime, parseCode, parseFill, cleaneds, cleaned, calculateTimeAgo, scrollToElementBottom, useEscapeKey, ShowNameElement };