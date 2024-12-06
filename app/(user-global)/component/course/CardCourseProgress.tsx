import React from 'react';
import Link from 'next/link';
// import Image from 'next/image';
import { Card, Col, Image } from 'react-bootstrap';
import ProgressCircle from './ProgressCircle'; // Component vòng tròn tiến độ
import styles from '@public/styles/globalControl/CourseCard.module.css';// CSS module

interface CourseCardProps {
    course: {
        id: string;
        name_course: string;
        rating_course: number;
        views_course: number;
        progress_percentage: number;
        instructor_avatar: string;
        num_chapter: number;
        num_document: number;
    };
    onCourseClick?: (course: any) => void;
    showProgress?: boolean; // Prop để quyết định hiển thị ProgressCircle
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onCourseClick, showProgress = true }) => {

    const handleCourseClick = () => {
        if (onCourseClick) onCourseClick(course);
    };

    return (
        <Col md={3} className={styles.mainBox} key={course.id}>
            <Card className={styles.mainBox__content}>
                <Card.Header className={styles.headerContent}>
                    <section className={styles.headerContent__text}>
                        <Link href={`/course/${course.id}`}>
                            <Card.Title className={styles.text__hedding2}>
                                {course.name_course}
                            </Card.Title>
                        </Link>
                        <Card.Subtitle className={styles.text__hedding3}>by My Team</Card.Subtitle>
                        <Card.Img src="/img/iconReact.svg" alt="" className={styles.text__img} />
                    </section>
                    <Card.Img src="/img/tuan.png" alt="" className={styles.headerContent__avt} />
                </Card.Header>
                <Card.Body className={styles.mainContent}>
                    <section className={styles.mainContent__headContent}>
                        <div className={styles.topHeader}>
                            <div className={`${styles.headContent__evaluete} ${styles.headContent__evalueteFor}`}>
                                <div className={styles.evaluete__main}>
                                    <div className={styles.starGroup}>
                                        {/* Star rating */}
                                        {Array.from({ length: Math.round(course.rating_course) }).map((_, index) => (
                                            <Image key={index} src="/img/iconStar.svg" alt="" className={styles.starElement} />
                                        ))}

                                    </div>
                                    <Card.Text className={styles.starNumber}>
                                        {'('} {course.rating_course} {')'}
                                    </Card.Text>
                                </div>
                                <div className={styles.headContent__percent}>
                                    <Card.Text className={styles.evaluete__note}>
                                        {'('} {course.views_course} phản hồi {')'}
                                    </Card.Text>
                                </div>
                            </div>
                        </div>
                        <ProgressCircle progress={course.progress_percentage} />
                    </section>
                    <section className={styles.bodyContent}>
                        <div className={styles.bodyContent__element}>
                            <Image src="/img/bookoffgreen.svg" alt="" className={styles.element__img} />
                            <Card.Text className={styles.element__text}>{course.num_chapter} Chương</Card.Text>
                        </div>
                        <div className={styles.bodyContent__element}>
                            <Image src="/img/bookopenblue.svg" alt="" className={styles.element__img} />
                            <Card.Text className={styles.element__text}>{course.num_document} Bài tập</Card.Text>
                        </div>
                        <div className={styles.bodyContent__element}>
                            <Link href={`/learningCourse/${course.id}`} className={styles.linkCta} onClick={handleCourseClick}>
                                <Image src="/img/bookopenyellow.svg" alt="" className={styles.element__img} />
                                <Card.Text className={styles.element__text}>Học ngay</Card.Text>
                            </Link>
                        </div>
                    </section>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default CourseCard;
