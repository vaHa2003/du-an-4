'use client'

import styles from '@public/styles/learningPath/LearningPathSection.module.css'
import { Card, Col, Container, Image, Row } from "react-bootstrap"

interface LearningPathSectionProps {
    title: string;
    contentTitle: string,
    contentSkill: string,
    imgLearningPath: string;
    webImg: string;
    icon1: string,
    icon2: string,
    icon3: string,
    icon4: string,
    icon5: string,
    content1: string,
    content2: string,
    content3: string,
    content4: string,
    content5: string
}

const LearningPathSection: React.FC<LearningPathSectionProps> = ({
    title = '',
    contentTitle = '',
    contentSkill = '',
    imgLearningPath = '',
    webImg = '',
    icon1 = '',
    icon2 = '',
    icon3 = '',
    icon4 = '',
    icon5 = '',
    content1 = '',
    content2 = '',
    content3 = '',
    content4 = '',
    content5 = '',
}) => {
    return (
        <>
            <Container className={styles.container}>
                <Row className={styles.skillContainer}>
                    <Col className={styles.skillMain}>
                        <section className={styles.skill__header}>
                            <section className={styles.skill__header__title}>
                                <h2 className={styles.header__title}>
                                    Lộ Trình Học {title} Development
                                </h2>
                                <h4 className={styles.header__subTitle}>
                                    {contentTitle}
                                </h4>
                            </section>
                            <Image src={`${imgLearningPath}`} alt='ảnh lộ trình' className={styles.imgHeader} />
                        </section>
                        <section className={styles.skill__body}>
                            <section className={styles.skill__body__header}>
                                <h2 className={styles.body__title}>
                                    Những kĩ năng đạt được sau kết thúc lộ trình
                                </h2>
                                <h4 className={styles.body__subTitle}>
                                    {contentSkill}
                                </h4>
                            </section>
                            <section className={styles.body__main}>
                                <Card className={styles.box}>
                                    <Card.Img alt='icon fe' className={styles.box__icon} src={`${icon1}`} />
                                    <Card.Body className={styles.box__body}>
                                        <Card.Title className={styles.box__title}>
                                            {content1}
                                        </Card.Title>
                                    </Card.Body>
                                </Card>
                                <Card className={styles.box}>
                                    <Card.Img alt='icon fe' className={styles.box__icon} src={`${icon2}`} />
                                    <Card.Body className={styles.box__body}>
                                        <Card.Title className={styles.box__title}>
                                            {content2}
                                        </Card.Title>
                                    </Card.Body>
                                </Card>
                                <Card className={styles.box}>
                                    <Card.Img alt='icon fe' className={styles.box__icon} src={`${icon3}`} />
                                    <Card.Body className={styles.box__body}>
                                        <Card.Title className={styles.box__title}>
                                            {content3}
                                        </Card.Title>
                                    </Card.Body>
                                </Card>
                                <Card className={styles.box}>
                                    <Card.Img alt='icon fe' className={styles.box__icon} src={`${icon4}`} />
                                    <Card.Body className={styles.box__body}>
                                        <Card.Title className={styles.box__title}>
                                            {content4}
                                        </Card.Title>
                                    </Card.Body>
                                </Card>
                                <Card className={styles.box}>
                                    <Card.Img alt='icon fe' className={styles.box__icon} src={`${icon5}`} />
                                    <Card.Body className={styles.box__body}>
                                        <Card.Title className={styles.box__title}>
                                            {content5}
                                        </Card.Title>
                                    </Card.Body>
                                </Card>
                            </section>
                            <section className={styles.webDemo}>
                                <div className={styles.bg}></div>
                                <Image src={`${webImg}`} alt='demo skill' className={styles.demoImg} />
                            </section>
                        </section>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default LearningPathSection