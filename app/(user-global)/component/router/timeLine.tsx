'use client'

import { Col, Container, Row } from "react-bootstrap"
import styles from '@public/styles/learningPath/TimeLine.module.css'

interface TimeLineProps {
    title: string;
    name1: string;
    name2: string;
    name3: string;
    name4: string;
    name5: string;
}

const TimeLine: React.FC<TimeLineProps> = ({
    title = '',
    name1 = '',
    name2 = '',
    name3 = '',
    name4 = '',
    name5 = ''
}) => {
    return (
        <>
            <Container className={styles.container}>
                <Row className={styles.conatiner__body}>
                    <Col className={styles.main}>
                        <h2 className={styles.title}>
                            THỜI GIAN DỰ KIẾN CHO LỘ TRÌNH {title}
                        </h2>
                        <div className={styles.body}>
                            <article className={styles.body__start}>
                                <div className={styles.content}>
                                    <div className={styles.content__left}>
                                        {name1}
                                    </div>
                                    <div className={styles.content__right}>
                                        2-3 tuần
                                    </div>
                                </div>
                                <div className={styles.content}>
                                    <div className={styles.content__left}>
                                        {name2}
                                    </div>
                                    <div className={styles.content__right}>
                                        4-6 tuần
                                    </div>
                                </div>
                                <div className={styles.content}>
                                    <div className={styles.content__left}>
                                        {name3}
                                    </div>
                                    <div className={styles.content__right}>
                                        4-6 tuần
                                    </div>
                                </div>
                                <div className={styles.content}>
                                    <div className={styles.content__left}>
                                        {name4}
                                    </div>
                                    <div className={styles.content__right}>
                                        6-8 tuần
                                    </div>
                                </div>
                                <div className={styles.content}>
                                    <div className={styles.content__left}>
                                        {name5}
                                    </div>
                                    <div className={styles.content__right}>
                                        6-8 tuần
                                    </div>
                                </div>
                            </article>
                            <section className={styles.stroke}></section>
                            <section className={styles.body__end}>
                                <div className={styles.content}>
                                    <div className={styles.content__left}>
                                        Tổng thời gian học
                                    </div>
                                    <div className={styles.content__right}>
                                        6-7 tháng
                                    </div>
                                </div>
                            </section>
                        </div>

                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default TimeLine