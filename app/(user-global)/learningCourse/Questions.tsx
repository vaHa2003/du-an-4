import React, { useState } from 'react';
import useCookie from '@app/(user-global)/component/hook/useCookie';
import styles from '@public/styles/Learning/Question.module.css';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';

import { parseQues, parseFill } from "@/app/(user-global)/component/globalControl/commonC";

const Questions: React.FC<QuestionsProps> = ({ course_id, documents_id, timedocument, nameDocument, questions }) => {
    const token = useCookie('token');
    const [answers, setAnswers] = useState<Record<number, string[]>>({});
    const [result, setResult] = useState<string | null>(null);
    const [showConfetti, setShowConfetti] = useState(false);
    const questionId: string | undefined = questions?.find((question) => question.id)?.id;
    // Hàm phân tích câu hỏi và câu trả lời

    console.log(questions)
    ///Hàm xử lý sự kiện khi người dùng chọn câu trả lời
    const handleAnswerChange = (questionIndex: number, selectedAnswer: string, type: string) => {
        setAnswers((prevAnswers) => {
            const updatedAnswers = { ...prevAnswers };
            if (type === 'true_false') {
                // Câu hỏi đúng/sai: chỉ lưu một câu trả lời duy nhất
                updatedAnswers[questionIndex] = [selectedAnswer];
            } else if (type === 'multiple_choice') {
                // Câu hỏi nhiều đáp án đúng: cho phép chọn nhiều đáp án
                const selectedAnswers = updatedAnswers[questionIndex] || [];
                if (selectedAnswers.includes(selectedAnswer)) {
                    updatedAnswers[questionIndex] = selectedAnswers.filter((answer) => answer !== selectedAnswer);
                } else {
                    updatedAnswers[questionIndex] = [...selectedAnswers, selectedAnswer];
                }
            } else if (type === 'fill') {
                // Câu hỏi điền vào chỗ trống: chỉ lưu một câu trả lời duy nhất (dạng text)
                updatedAnswers[questionIndex] = [selectedAnswer];
            }
            return updatedAnswers;
        });
    };



    const checkAnswers = async () => {
        // Prepare the answers in the correct format
        const formattedAnswers = Object.keys(answers).map((questionIndex) => {
            const selectedAnswers = answers[parseInt(questionIndex)];
            return selectedAnswers ? selectedAnswers : [];
        });

        const payload = {
            user_answer: formattedAnswers.flat(),  // Flatten the array of arrays if needed
        };

        console.log(JSON.stringify(payload, null, 2), questionId);
        try {
            const response = await fetch(`/api/checkAnswer/${questionId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error('Đã xảy ra lỗi khi kiểm tra câu trả lời');
            const data = await response.json();
            console.log('Kết quả kiểm tra:', data);
            setResult(data.is_correct ? 'Bạn đã trả lời đúng!' : 'Bạn đã trả lời sai. Hãy thử lại!');
            updataStatus();
            if (data.is_correct === true) {

                handleCorrectAnswer();
            }
        } catch (error) {
            console.error('Lỗi khi kiểm tra câu trả lời:', error);
            setResult('Có lỗi xảy ra, vui lòng thử lại sau.');
        }
    };


    const updataStatus = async () => {
        // console.log(JSON.stringify(payload, null, 2));

        try {
            const data = {
                course_id: course_id,
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
            const datas = await response.json();
            console.log('Cập nhật trạng thái thàng công', datas);

        } catch (error) {
            console.error('Lỗi khi kiểm tra câu trả lời:', error);
            setResult('Có lỗi xảy ra, vui lòng thử lại sau.');
        }
    };


    const handleCorrectAnswer = () => {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
    };

    // Custom shape for confetti particles
    const customConfettiShape = (ctx: CanvasRenderingContext2D) => {
        // Set random colors for confetti
        const colors = ['#FF0000', '#00FF00', '#0000FF', '#FF00FF', '#FFFF00'];
        const color = colors[Math.floor(Math.random() * colors.length)];

        // Set random size for confetti
        const width = Math.random() * 20 + 5;
        const height = Math.random() * 10 + 5;

        // Draw rectangle (confetti piece)
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, width, height);
    };


    return (
        <div>
            {showConfetti && (
                <Confetti
                    drawShape={customConfettiShape}  // Use custom shape function
                />
            )}
            <div className={styles.wapperQuestion}>
                <div className={styles.bodyTitle}>
                    <span className={styles.timeUpdate}>Cập nhật ngày {timedocument}</span>
                    <h4 className={styles.titleCourse}>{nameDocument}</h4>
                </div>

                {questions?.map((question, index) => {
                    if (question.type_question === "multiple_choice") {
                        const parsedQuestion = parseQues(question.content_question);
                        console.log(parsedQuestion)
                        return (
                            <div key={index} className={styles.questionItem}>
                                {parsedQuestion ? (
                                    <>
                                        <p className={styles.titleQuestion}>Câu hỏi: {parsedQuestion.question}</p>
                                        <ul className={styles.listQuestion}>
                                            {parsedQuestion.answers.map((answer, idx) => {
                                                return (
                                                    <li key={`${index}-${idx}`} className={styles.itemQuestion}>
                                                        <label htmlFor={`submit${idx}`} className={styles.itemAnswer}>
                                                            <input
                                                                type={question.type_question === 'true_false' ? 'radio' : 'checkbox'}
                                                                name={`question_${index}`}
                                                                id={`submit${idx}`}
                                                                value={answer}
                                                                checked={answers[index]?.includes(answer) || false}
                                                                onChange={() => handleAnswerChange(index, answer, question.type_question)} // Đảm bảo bạn truyền đúng tham số vào hàm xử lý
                                                            />
                                                            {answer}
                                                        </label>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                        <div className={styles.ctaQuestion}>
                                            <button className={styles.btnAnswer}>Hủy</button>
                                            <button
                                                className={`${styles.btnAnswer} ${styles.btnAnswerActive}`}
                                                onClick={checkAnswers}
                                            >Trả lời</button>
                                        </div>
                                    </>
                                ) : (
                                    <p>Nội dung câu hỏi không hợp lệ.</p>
                                )}
                            </div>
                        );
                    } else {
                        const parsedQuestion = parseFill(question.content_question);
                        console.log(parsedQuestion)
                        return (
                            <div className={styles.fillQuestion}>
                                <p className={styles.titleQuestion}>Câu hỏi: {parsedQuestion?.question}</p>
                                <p className={styles.titleQuestion}>Điền vào phần còn trống</p>
                                <div className={styles.fiilContainer}>
                                    <label htmlFor={`fill_${index}`} className={styles.labelFill}>
                                        {parsedQuestion?.answers[0]}
                                    </label>
                                    <input
                                        placeholder='nhập câu trả lời'
                                        type="text"
                                        id={`fill_${index}`}
                                        className={styles.inputFill}
                                        value={answers[index]?.[0] || ''}
                                        onChange={(e) => handleAnswerChange(index, e.target.value, 'fill')}
                                    />
                                    <p className={styles.labelFill}>
                                        {parsedQuestion?.answers[1]}
                                    </p>
                                </div>
                            </div>
                        )
                    }

                })}
                <>{result}</>
            </div>
        </div >
    );
};

export default Questions;



