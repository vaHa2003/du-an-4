"use client"
import { Col, Container, Image, Row } from "react-bootstrap";
import { useEffect, useState } from 'react';
import Button from "@app/(user-global)/component/globalControl/btnComponent";
import styles from '@public/styles/course/CourseFav.module.css';
import useSWR from 'swr';
import { Course } from "@/app/(user-global)/model/course";
import CourseCard from "@app/(user-global)/component/course/CardCourse";
import Body from '@app/(user-global)/component/globalControl/body';
import useCookie from '@app/(user-global)/component/hook/useCookie';


const CoursePro: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);

    const token = useCookie("token") as string | null;

    const fetcher = ([url, token]: [string, string | null]) =>
        fetch(url, {
            headers: {
                Authorization: token ? `Bearer ${token}` : "",
                "Content-Type": "application/json",
            },
        }).then((res) => {
            if (!res.ok) {
                throw new Error("Network response was not ok");
            }
            return res.json();
        });

    const { data, error } = useSWR<{ status: string; message: string; data: Course[] }>(
        token ? [`/api/favoriteCourses`, token] : null, // Key là một mảng
        fetcher,
        {
            revalidateOnFocus: true,
            revalidateOnReconnect: true,
            revalidateIfStale: false,
        }
    );

    useEffect(() => {
        if (data?.data) {
            setCourses(data.data);
        }
    }, [data]);





    if (error) return <div>Error loading courses</div>;

    return (
        <Body>
            <div className={styles.container}>
                <Container className={styles.main}>
                    <h2 className={styles.main__title__content}>Khóa học yêu thích</h2>
                    <div className={styles.main__subTitle}>
                        Các khóa học bạn đã thêm và yêu thích
                    </div>
                    <Row className={styles.main__course}>
                        {courses?.map((course, index) => (
                            <CourseCard course={course} key={index} showProgress={false} />
                        ))}
                    </Row>
                </Container>
            </div >
        </Body>
    );
}

export default CoursePro;
