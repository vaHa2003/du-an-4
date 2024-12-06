'use client'

import { Col, Container, Image, Row } from "react-bootstrap"
import styles from '@public/styles/learningPath/ForWhom.module.css'

interface ForWhomProps {
    title1: string,
    title2: string,
    title3: string,
    content1: string,
    content2: string,
    content3: string
}

const ForWhom: React.FC<ForWhomProps> = ({
    title1 = '',
    title2 = '',
    title3 = '',
    content1 = '',
    content2 = '',
    content3 = '',
}) => {
    return (
        <>
            <Container className={styles.container}>
                <Row className={styles.container__body}>
                    <Col className={styles.main}>
                        <h1 className={styles.header__title}>
                            KHÓA HỌC NÀY DÀNH CHO AI
                        </h1>
                        <Row className={styles.bodyConatiner}>
                            <Col className={styles.bodyContainer__left}>
                                <section className={styles.menu}>
                                    <Image src="/img/Round Alt Arrow Right.svg" alt="icon menu" className={styles.menu__icon} />
                                    <div className={styles.menu__content}>
                                        <bdi className={styles.menu__content__b}>{title1} </bdi>{' '}
                                        {content1}
                                    </div>
                                </section>
                                <section className={styles.menu}>
                                    <Image src="/img/Round Alt Arrow Right.svg" alt="icon menu" className={styles.menu__icon} />
                                    <div className={styles.menu__content}>
                                        <bdi className={styles.menu__content__b}>{title2}</bdi>{' '}
                                        {content2}
                                    </div>
                                </section>
                                <section className={styles.menu}>
                                    <Image src="/img/Round Alt Arrow Right.svg" alt="icon menu" className={styles.menu__icon} />
                                    <div className={styles.menu__content}>
                                        <bdi className={styles.menu__content__b}>{title3}</bdi>{' '}
                                        {content3}
                                    </div>
                                </section>
                            </Col>
                            <Col className={styles.bodyContainer__right}>
                                <Image src="/img/forWhom.png" alt="for whom" className={styles.bodyContainer__right__img} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ForWhom