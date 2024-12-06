'use client'

import { Card, Col, Container, Image, Row } from "react-bootstrap"
import Button from "../globalControl/btnComponent"
import styles from '@public/styles/home/CourseFree.module.css'
import useSWR from 'swr';
import { Course } from "@/app/(user-global)/model/course";
import Link from "next/link";
import { useState, useCallback, useEffect } from "react";
import ReactLoading from 'react-loading';
import CourseCard from "../course/CardCourse"
const fetcher = (url: string) => fetch(url).then(res => res.json());

const CourseFree: React.FC = () => {

    const [routerId, setRouterId] = useState<number | string>(8);
    const [cache, setCache] = useState<Record<number | string, Course[]>>({});
    const [courses, setCourses] = useState<Course[]>([]);
    const [isCount, setIsCount] = useState(false)

    const { data, error, isValidating } = useSWR<{ status: string; message: string; data: Course[] }>(
        `/api/coursetype/free/${routerId}`,
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

    const handleCountAll = useCallback((count: number | string) => {
        if (count !== routerId) {
            setRouterId(count);
            setCourses(cache[count] || []);
            setIsCount(true);
        }
        else if (isCount) {
            setCourses(cache[8] || []);
            setIsCount(false);
        }
        else {
            setCourses(cache[count] || []);
            setIsCount(true);
        }
    }, [routerId, cache, isCount]);

    useEffect(() => {
        if (cache[routerId]) {
            setCourses(cache[routerId]);
        } else if (data?.data) {
            setCourses(data.data);
        }
    }, [data, routerId, cache]);

    if (error) return <div>Error loading courses</div>;


    return (
        <>
            <div className={styles.body}>
                <svg width="100%" height="714" viewBox="0 0 1440 714" fill="none"
                    xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className={styles.imgBg}>
                    <g>
                        <path
                            d="M1441 312.147C1221 48.6752 842 332.38 0 0.291504V713.292L1439.5 712.852L1441 312.147Z"
                            fill="url(#paint0_linear_1862_4564)" />
                    </g>
                    <defs>
                        <filter id="filter0_i_1862_4564" x="0" y="0.291504" width="1441" height="713.5"
                            filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feColorMatrix in="SourceAlpha" type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="0.5" />
                            <feGaussianBlur stdDeviation="2" />
                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                            <feColorMatrix type="matrix"
                                values="0 0 0 0 0.376471 0 0 0 0 0.380392 0 0 0 0 0.439216 0 0 0 0.32 0" />
                            <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1862_4564" />
                        </filter>
                        <linearGradient id="paint0_linear_1862_4564" x1="720.5" y1="0.291504" x2="720.5"
                            y2="713.292" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#DDF8FC" />
                            <stop offset="1" stopColor="white" />
                        </linearGradient>
                    </defs>
                </svg>
                <Container className={styles.container}>
                    <Row className={styles.header}>
                        <Col className={styles.header__content__left}>
                            <Image src="/img/GroupLeft2.svg" alt="group left" className={styles.header__content__leftIcon} />
                            <section className={styles.main}>
                                <h2 className={styles.main__title__content}>Khóa học miễn phí</h2>
                                <h4 className={styles.main__subTitle__content}>
                                    Khóa học được xây dựng bởi đội ngũ TTO.SH
                                </h4>
                            </section>
                            <Image src="/img/GroupRight2.svg" alt="group right" className={styles.header__content__rightIcon} />
                        </Col>
                        <Col className={styles.header__content__right}>
                            <h3 className={styles.header__content__right__title}>
                                Chương trình học đa dạng sẽ giúp bạn tiến gần hơn đến ước mơ của mình. Dù học trực tiếp hay trực tuyến,
                                bạn chắc chắn sẽ tìm thấy khóa học phù hợp với mục tiêu của mình.
                            </h3>
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
                            <Button type="secondery" status="hover" size="S" leftIcon={false} rightIcon={true} chevron={isCount ? 3 : 4} width={145} height={40} onClick={() => handleCountAll(20)}>{isCount ? 'Ẩn bớt' : 'Xem thêm'}</Button>
                        </Col>
                    </Row>
                    <Row md={12} className={styles.main__course}>
                        {isValidating && (<ReactLoading type={"bubbles"} color={'rgba(153, 153, 153, 1)'} height={'10%'} width={'10%'} className={styles.align} />)}
                        {courses?.map((course, index) => (
                            <CourseCard course={course} key={index} showProgress={false} />
                        ))}
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default CourseFree