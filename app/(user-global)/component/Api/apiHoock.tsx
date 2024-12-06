import React, { useState } from 'react';



const UpdateStatusComponent: React.FC<UpdateStatusComponentProps> = ({
    course_id,
    documents_id,
    token,
    onSuccess,
    onError,
}) => {
    const [result, setResult] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const updateStatus = async () => {
        setLoading(true);
        try {
            const data = {
                course_id,
                status_doc: true,
                cache_time_video: null,
                document_id: documents_id,
            };

            const response = await fetch(`/api/upStatusDoc`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error('Đã xảy ra lỗi khi kiểm tra câu trả lời');
            const responseData = await response.json();
            setResult('Cập nhật trạng thái thành công');
            console.log('Cập nhật trạng thái thành công', responseData);

            // Gọi callback onSuccess nếu được truyền vào
            if (onSuccess) onSuccess(responseData);
        } catch (error: any) {
            console.error('Lỗi khi kiểm tra câu trả lời:', error);
            setResult('Có lỗi xảy ra, vui lòng thử lại sau.');

            // Gọi callback onError nếu được truyền vào
            if (onError) onError(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button onClick={updateStatus} disabled={loading}>
                {loading ? 'Đang xử lý...' : 'Cập nhật trạng thái'}
            </button>
            {result && <p>{result}</p>}
        </div>
    );
};

const updateStatus = async (
    courseId: string | null,
    documentId: string | null,
    token: string | null,
    cacheTimeVideo: number | null
): Promise<any> => {
    try {
        const data = {
            course_id: courseId,
            status_doc: true,
            cache_time_video: cacheTimeVideo,
            document_id: documentId,
        };

        const response = await fetch(`/api/upStatusDoc`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error('Đã xảy ra lỗi khi kiểm tra câu trả lời');

        const responseData = await response.json();
        console.log('Cập nhật trạng thái thành công', responseData);

        return responseData; // Trả về kết quả
    } catch (error) {
        console.error('Lỗi khi kiểm tra câu trả lời:', error);
        throw error; // Ném lỗi để xử lý ở nơi gọi hàm
    }
};



export { UpdateStatusComponent, updateStatus };
