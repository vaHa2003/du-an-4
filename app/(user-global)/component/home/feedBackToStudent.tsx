import Link from "next/link";
import { Col, Container, Image, Row } from "react-bootstrap";
import styles from '@public/styles/home/FeedBackToStudent.module.css';
import useSWR from 'swr';


const fetcher = (url: string) => fetch(url).then(res => res.json());

const FeedBackToStudent: React.FC = () => {
    const { data: dataFeedback, error: Feedbackerror } = useSWR<FeedbackResponse>('/api/feedbackhome/4/10', fetcher, {
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
    });

    if (Feedbackerror) return <div>Error loading courses</div>;
    if (!dataFeedback) return <div>Loading...</div>;

    const FeedBack = Array.isArray(dataFeedback.data) ? dataFeedback.data : [];

    return (
        <Container className={styles.container}>
            <section className={styles.main}>
                <Row className={styles.header}>
                    <Col className={styles.header__group}>
                        <div className={styles.left__box}>
                            <Image src="/img/blue-green.svg" alt="" className={styles.left__box__img} />
                        </div>
                        <h3 className={styles.heading}>Phản hồi từ học viên TTO.SH</h3>
                        <div className={styles.right__box}></div>
                    </Col>
                </Row>
                <Row className={styles.body}>
                    {FeedBack.map((feedback, index) => {
                        if (feedback.feedback_text === null) {
                            return null;
                        }
                        const previewText = feedback.feedback_text.slice(0, 50);

                        return (
                            <Row key={index} className={styles.body__container}>
                                <Col className={styles.body__container__feedBack}>
                                    <section className={styles.body__feedBack__title}>
                                        <div className={styles.feedBack__icon__group}>
                                            {Array.from({ length: feedback.rating_course }).map((_, starIndex) => (
                                                <Image
                                                    key={starIndex}
                                                    src="/img/iconStar.svg"
                                                    alt=""
                                                    className={styles.feedBack__star}
                                                />
                                            ))}
                                        </div>
                                        <div className={styles.feedBack__content}>
                                            " {previewText} " {/* Hiển thị 10 ký tự đầu tiên */}
                                        </div>
                                    </section>
                                    <section className={styles.feedBack__tagName__group}>
                                        <div className={styles.tagName__icon}>
                                            <Image src="/img/box-blue.svg" alt="" className={styles.tagName__img} />
                                        </div>
                                        <div className={styles.tagName__box1}>
                                            <Link href={'/'} className={styles.tagName__content}>
                                                <bdi className={styles.tagName__content__black}>#</bdi>{' '}
                                            </Link>
                                        </div>
                                    </section>
                                </Col>
                                <Col className={styles.post__feedBack}>
                                    <section className={styles.post__feedBack__container}>
                                        <div className={styles.left__post__feedBack}>
                                            <Image src={feedback.img_course} alt="" className={styles.left__post__feedBack__img} />
                                        </div>
                                        <div className={styles.right__post__feedBack}>
                                            <div className={styles.right__post__feedBack__content}>
                                                {feedback.feedback_text} {/* Hiển thị toàn bộ nội dung */}
                                            </div>
                                        </div>
                                    </section>
                                </Col>
                            </Row>
                        );
                    })}
                </Row>
            </section>
        </Container>
    );
}

export default FeedBackToStudent;
