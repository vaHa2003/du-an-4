import ReactPlayer from 'react-player/youtube';
import { useRef, useState, useEffect } from "react";
import useCookie from '@app/(user-global)/component/hook/useCookie';
import { updateStatus } from '@app/(user-global)/component/Api/apiHoock'
import styles from '@public/styles/Learning/Video.module.css'

type NotiType = 'success' | 'error' | 'fail' | 'complete';

interface VideoProp {
    course_id: string | null;
    document_id: string | null;
    urlVideo: string;
    onProgressChange: (playedSeconds: number) => void;
    isPlaying: boolean;
}

const VideoPlayer: React.FC<VideoProp> = ({ course_id, document_id, urlVideo, onProgressChange, isPlaying }) => {
    const token = useCookie('token');
    const playerRef = useRef<any>(null);
    const lastValidTimeRef = useRef<number>(0);
    const [videoDuration, setVideoDuration] = useState<number>(0);
    const [playedSeconds, setPlayedSeconds] = useState(0);
    const isWarningShown = useRef(false);
    const [statusUpdated, setStatusUpdated] = useState(false);
    const [type, setType] = useState<string | null>(null);
    const [isNoti, setNoti] = useState(false);
    const [isContent, setContent] = useState(true);
    const [typeNoti, setTypeNoti] = useState<NotiType | null>(null);
    const [messageNoti, setmessageNoti] = useState("");

    const handleProgress = (progress: { playedSeconds: number }) => {
        const { playedSeconds } = progress;
        setPlayedSeconds(playedSeconds);
        onProgressChange(playedSeconds);
        if (Math.abs(playedSeconds - lastValidTimeRef.current) > 15) {
            // Quay về thời gian hợp lệ trước đó
            if (playedSeconds < lastValidTimeRef.current) {
                // Người dùng đang tua ngược, chỉ cập nhật lastValidTime
                lastValidTimeRef.current = playedSeconds;
            } else {
                // Quay về thời gian hợp lệ trước đó
                if (playerRef.current) {
                    playerRef.current.seekTo(lastValidTimeRef.current);
                }
            }
        } else {
            // Cập nhật thời gian hợp lệ cuối cùng trong ref
            lastValidTimeRef.current = playedSeconds;
        }
        if (videoDuration - playedSeconds <= 30 && !isWarningShown.current) {

            isWarningShown.current = true; // Đảm bảo chỉ hiện thông báo một lần
        }

    };

    const handleDuration = (duration: number) => {
        setVideoDuration(duration); // Save the video duration
        const minutes = Math.floor(duration / 60); // Calculate minutes
        const seconds = Math.floor(duration % 60); // Calculate remaining seconds
        console.log(`Thời gian kết thúc video: ${minutes} phút ${seconds} giây`);
        isWarningShown.current = false;
    };

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            // Ngăn hành động thoát trình duyệt và hiển thị hộp thoại xác nhận (chỉ một số trình duyệt hỗ trợ)
            event.preventDefault();
            event.returnValue = '';  // Cần trả về chuỗi rỗng để kích hoạt hành động thoát

            const url = "/api/upStatusDoc";
            const data = JSON.stringify({
                course_id: course_id,
                status_doc: false,
                cache_time_video: videoDuration,
                document_id: document_id,
            });
            localStorage.setItem(`Video`, data);
            console.log(data); // Gửi dữ liệu khi trang được tải lại
            navigator.sendBeacon(url, data); // Gửi dữ liệu mà không ảnh hưởng đến việc thoát trang
        };
        // Thêm sự kiện `beforeunload` khi component mount
        window.addEventListener('beforeunload', handleBeforeUnload);

        // Xóa sự kiện khi component unmount
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);
    // Thêm các phụ thuộc để đảm bảo các giá trị cập nhật
    const formatTime = (seconds: number | string): number | string => {
        if (typeof seconds === 'string') {
            return seconds;
        }
        return Math.floor(seconds); // Trả về phần nguyên của số giây
    };
    const handleUpdateStatus = async () => {
        const courseId = course_id || 'default_course_id'; // Giá trị mặc định nếu null
        const documentId = document_id || 'default_document_id'; // Giá trị mặc định nếu null// Chuyển đổi number thành string
        const cacheTimeVideo = Math.floor(videoDuration);
        try {
            const response = await updateStatus(
                courseId, // courseId
                documentId, // documentId
                token,
                cacheTimeVideo// token
                // cacheTimeVideo
            );
            console.log('Kết quả trả về:', response);
        } catch (error) {
            console.error('Cập nhật thất bại:', error);
        }
    };
    // const updataStatus = async () => {
    //     // console.log(JSON.stringify(payload, null, 2));
    //     try {
    //         const data = {
    //             course_id: course_id,
    //             status_doc: true,
    //             cache_time_video: formatTime(playedSeconds),
    //             document_id: document_id,
    //         };

    //         const response = await fetch(`/api/upStatusDoc`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 Authorization: `Bearer ${token}`,
    //             },
    //             body: JSON.stringify(data),
    //         });

    //         if (!response.ok) throw new Error('Đã xảy ra lỗi khi kiểm tra câu trả lời');
    //         const datas = await response.json();
    //         console.log('Cập nhật trạng thái thàng công', datas);
    //     } catch (error) {
    //         console.error('Lỗi khi kiểm tra câu trả lời:', error);
    //     }
    // };

    useEffect(() => {
        if (!statusUpdated && playedSeconds >= videoDuration - 60 && playedSeconds < videoDuration) {
            handleUpdateStatus(); // Gọi hàm cập nhật
            setStatusUpdated(true); // Đánh dấu đã cập nhật
        }
    }, [playedSeconds, statusUpdated]);

    const handleEnded = () => { //hàm sử lý khi video kết thúc

    }
    return (
        <div className={styles.Video}>
            <ReactPlayer
                ref={playerRef}
                url={urlVideo}
                controls
                width="100%"
                height="100%"
                onProgress={handleProgress}
                onDuration={handleDuration}
                playing={isPlaying}
                autoPlay
                onEnded={handleEnded} // Tự động phát
            />
        </div>
    )
}

export default VideoPlayer