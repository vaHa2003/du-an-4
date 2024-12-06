import { useEffect, useRef } from 'react'
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import Button from "../globalControl/btnComponent";
import styleFor from "@public/styles/course/coursefor.module.css";
import useSWR from "swr";
import useCookie from '@app/(user-global)/component/hook/useCookie';
import { Course } from "@app/(user-global)/model/course";
import Link from "next/link";
import ProgressCircle from './ProgressCircle';
import CourseCard from "../course/CardCourseProgress"
interface CourseCardProps extends Course {
    progress_percentage: number;
    watchedVideos: number;
}
interface ApiResponseCourse<T> {
    data: T[];
}
interface CourseForProps {
    onCoursesLoad: (ids: string[]) => void;
}

const fetcher = (url: string, token: string | null) => {
    return fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`, // Thêm token vào tiêu đề nếu có
            'Content-Type': 'application/json',
        },
    }).then((res) => {
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        return res.json();
    });
};


const CourseFor: React.FC<CourseForProps> = ({ onCoursesLoad }) => {
    const token = useCookie("token");
    const { data, error } = useSWR<ApiResponseCourse<CourseCardProps>>(
        "/api/courseFor",
        (url) => fetcher(url, token),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

    const courses = Array.isArray(data?.data) ? data.data : [];
    const previousCourses = useRef<string[]>([]);
    useEffect(() => {
        const courseIds = courses.map((course) => course.id);
        // Chỉ gọi onCoursesLoad nếu courseIds thay đổi
        if (courseIds.length > 0 && JSON.stringify(courseIds) !== JSON.stringify(previousCourses.current)) {
            onCoursesLoad(courseIds);
            previousCourses.current = courseIds; // Lưu giá trị mới của courseIds
        }
    }, [courses, onCoursesLoad]);

    return (
        <Container className={styleFor.container}>
            <section className={styleFor.main}>
                <h2 className={styleFor.main__title} aria-hidden={true}>Khóa học của bạn</h2>
                <p className={styleFor.main__subTitle}>
                    Khóa học của bạn là khóa học mà bạn đang học, bao gồm các khóa học mà bạn đã mua hoặc các khóa học miễn phí.
                </p>
            </section>
            <section className={styleFor.cta}>
                <div className={styleFor.ctaLeft}>
                    <Button type="premary" status="hover" size="S" leftIcon={false} rightIcon={false} height={40}>Khóa học có phí</Button>
                    <Button type="premary" status="hover" size="S" leftIcon={false} rightIcon={false} height={40}>Khóa học miễn phí</Button>
                </div>
                <Button type="secondery" status="hover" size="S" leftIcon={false} rightIcon={true} chevron={4} width={145} height={40}>Xem tất cả</Button>
            </section>

            <Row className={styleFor.mainCard}>
                {courses.map((course, index) => (

                    <CourseCard course={course} key={index} showProgress={true} />
                ))
                }
            </Row >

        </Container >
    );
};

export default CourseFor;
