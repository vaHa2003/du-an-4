"use client"
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { useCallback, useEffect, useState } from 'react';
import Button from "../globalControl/btnComponent";
import styles from '@public/styles/home/CoursePro.module.css';
import useSWR from 'swr';
import { Course } from "@/app/(user-global)/model/course";
import Link from "next/link";
import ReactLoading from 'react-loading';
import CourseCard from "../course/CardCourse";

const fetcher = (url: string) => fetch(url).then(res => res.json());

const CoursePro: React.FC = () => {

    const [routerId, setRouterId] = useState<number | string>(8)
    const [cache, setCache] = useState<Record<number | string, Course[]>>({});
    const [courses, setCourses] = useState<Course[]>([]);
    const [isCount, setIsCount] = useState(false)

    const { data, error, isValidating } = useSWR<{ status: string; message: string; data: Course[] }>(
        `/api/coursetype/pro/${routerId}`,
        fetcher,
        {
            revalidateOnFocus: true,
            revalidateOnReconnect: true,
            revalidateIfStale: false
        }
    );
    useEffect(() => {
        if (data?.data && !cache[routerId]) {
            setCache(prevCache => ({ ...prevCache, [routerId]: data.data }));
        }
    }, [data, routerId, cache]);

    const handleCount = useCallback((count: number | string) => {
        if (count !== routerId) {
            setRouterId(count);
            setCourses(cache[count] || []);
        }
    }, [routerId, cache]);

    const handleCountAll = useCallback(() => {
        setIsCount(prevState => {
            const newState = !prevState;
            if (newState) {
                setRouterId('');
                const allCourses = Object.values(cache).flat();
                setCourses(allCourses);
            } else {
                setRouterId(8);
                setCourses(cache[8]?.slice(0, 4) || []);
            }
            return newState;
        });
    }, [cache]);


    useEffect(() => {
        console.log('Cache:', cache[routerId]);
        console.log('Data from API:', data?.data);
        if (cache[routerId]) {
            setCourses(cache[routerId]);
        } else if (data?.data) {
            setCourses(data.data);
        }
    }, [data, routerId, cache]);

    if (error) return <div>Error loading courses</div>;

    return (
        <Container className={styles.container}>
            <Row className={styles.header}>
                <Col className={styles.header__content}>
                    <Image src="/img/GroupLeft.svg" alt="group left" className={styles.header__content__leftIcon} />
                    <section className={styles.main}>
                        <div className={styles.main__title}>
                            <div className={styles.main__title__strokeLeft}>
                                <div className={styles.strokeLeft__element}></div>
                            </div>
                            <h2 className={styles.main__title__content} aria-hidden={true}>Khóa học Pro</h2>
                            <div className={styles.main__title__strokeRight}>
                                <div className={styles.strokeRight__element}></div>
                            </div>
                        </div>
                        <div className={styles.main__subTitle}>
                            Chương trình học đa dạng sẽ giúp bạn tiến gần hơn đến ước mơ của mình.
                            Dù học trực tiếp hay trực tuyến,
                            bạn chắc chắn sẽ tìm thấy khóa học phù hợp với mục tiêu của mình.
                        </div>
                    </section>
                    <Image src="/img/GroupRight.svg" alt="group right" className={styles.header__content__rightIcon} />
                </Col>
            </Row>

            <Row className={styles.nav}>
                <Col className={styles.nav__btn__muti}>
                    <Button type="premary" status="hover" size="S" leftIcon={false} rightIcon={false} height={40} onClick={() => handleCount(1)}>Khóa học lộ trình FE</Button>
                    <Button type="premary" status="hover" size="S" leftIcon={false} rightIcon={false} height={40} onClick={() => handleCount(2)}>Khóa học lộ trình BE</Button>
                    <Button type="premary" status="hover" size="S" leftIcon={false} rightIcon={false} width={225} height={40} onClick={() => handleCount(3)}>Khóa học lộ trình Tester</Button>
                    <Button type="premary" status="hover" size="S" leftIcon={false} rightIcon={false} width={245} height={40} onClick={() => handleCount(4)}>Khóa học lộ trình Designer</Button>
                </Col>
                <Col className={styles.nav__btn__single}>
                    <Button type="secondery" status="hover" size="S" leftIcon={false} rightIcon={true} chevron={isCount ? 3 : 4} width={145} height={40} onClick={() => handleCountAll()}>{isCount ? 'Ẩn bớt' : 'Xem thêm'}</Button>
                </Col>
            </Row>

            <Row className={styles.main__course}>
                {/* {isValidating && (<ReactLoading type={"bubbles"} color={'rgba(153, 153, 153, 1)'} height={'10%'} width={'10%'} className={styles.align} />)} */}
                {courses?.map((course, index) => (
                    <CourseCard course={course} key={index} showProgress={false} />
                ))}
            </Row>
        </Container >
    );
}

export default CoursePro;
