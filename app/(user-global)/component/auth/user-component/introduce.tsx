'use client'

import styles from '@public/styles/user-component/Introduce.module.css'
import { Card, Col, Container, Row } from 'react-bootstrap'

const Introduce: React.FC = () => {
    return (
        <>
            <Container className={styles.container}>
                <Row className={styles.header__introduce}>
                    <Col md={6} className={styles.header__introduce__box}>
                        <section className={styles.title__group}>
                            <h3 className={styles.title__group__heading}>
                                Giới thiệu
                            </h3>
                            <h3 className={styles.title__group__subTitle}>
                                Ngày gia nhập TTO.SH:{' '}<bdi className={styles.title__group__subTitle__blue}>22 tháng 10 năm 2021</bdi>
                            </h3>
                        </section>
                    </Col>
                    <Col md={6} className={styles.header__introduce__box}>
                        <section className={styles.title__group}>
                            <h3 className={styles.title__group__heading}>
                                Hoạt động gần đây
                            </h3>
                            <h3 className={styles.title__group__subTitle}>
                                Chưa thấy hoạt động gần nhất
                            </h3>
                        </section>
                    </Col>
                </Row>
                <Row className={styles.body__introduct}>
                    <Col md={12} className={styles.body__introduct__header}>
                        <h3 className={styles.body__introduct__header__title}>Các khóa học đã tham gia</h3>
                    </Col>
                    <Col md={12} className={styles.body__introduct__main}>
                        <Card className={styles.main__box}>
                            <Row className={styles.main__box__container}>
                                <Col className={styles.main__box__container__left}>
                                    <Card.Header className={styles.card__header}>
                                        <section className={styles.headerContent__text}>
                                            <Card.Title className={styles.text__hedding2}>
                                                WEBSITE DESIGN UI/UX
                                            </Card.Title>
                                            <Card.Subtitle className={styles.text__hedding3}>
                                                by My Team
                                            </Card.Subtitle>
                                            <Card.Img src="/img/iconReact.svg" alt="" className={styles.text__img} />
                                        </section>
                                        <Card.Img src="/img/tuan.png" alt="" className={styles.headerContent__avt} />
                                    </Card.Header>
                                </Col>
                                <Col className={styles.main__box__container__right}>
                                    <Card.Body className={styles.card__body}>
                                        <Card.Title className={styles.card__body__title}>Ui/Ux Design</Card.Title>
                                        <Card.Text className={styles.card__body__text}>
                                            Từ cơ bản tới chuyên sâu, thực hành 8 dự án,
                                            hàng trăm bài tập, trang hỏi đáp riêng,
                                            cấp chứng chỉ sau khóa học và mua một lần học mãi mãi.
                                        </Card.Text>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                        <Card className={styles.main__box}>
                            <Row className={styles.main__box__container}>
                                <Col className={styles.main__box__container__left}>
                                    <Card.Header className={styles.card__header}>
                                        <section className={styles.headerContent__text}>
                                            <Card.Title className={styles.text__hedding2}>
                                                WEBSITE DESIGN UI/UX
                                            </Card.Title>
                                            <Card.Subtitle className={styles.text__hedding3}>
                                                by My Team
                                            </Card.Subtitle>
                                            <Card.Img src="/img/iconReact.svg" alt="" className={styles.text__img} />
                                        </section>
                                        <Card.Img src="/img/tuan.png" alt="" className={styles.headerContent__avt} />
                                    </Card.Header>
                                </Col>
                                <Col className={styles.main__box__container__right}>
                                    <Card.Body className={styles.card__body}>
                                        <Card.Title className={styles.card__body__title}>Ui/Ux Design</Card.Title>
                                        <Card.Text className={styles.card__body__text}>
                                            Từ cơ bản tới chuyên sâu, thực hành 8 dự án,
                                            hàng trăm bài tập, trang hỏi đáp riêng,
                                            cấp chứng chỉ sau khóa học và mua một lần học mãi mãi.
                                        </Card.Text>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                        <Card className={styles.main__box}>
                            <Row className={styles.main__box__container}>
                                <Col className={styles.main__box__container__left}>
                                    <Card.Header className={styles.card__header}>
                                        <section className={styles.headerContent__text}>
                                            <Card.Title className={styles.text__hedding2}>
                                                WEBSITE DESIGN UI/UX
                                            </Card.Title>
                                            <Card.Subtitle className={styles.text__hedding3}>
                                                by My Team
                                            </Card.Subtitle>
                                            <Card.Img src="/img/iconReact.svg" alt="" className={styles.text__img} />
                                        </section>
                                        <Card.Img src="/img/tuan.png" alt="" className={styles.headerContent__avt} />
                                    </Card.Header>
                                </Col>
                                <Col className={styles.main__box__container__right}>
                                    <Card.Body className={styles.card__body}>
                                        <Card.Title className={styles.card__body__title}>Ui/Ux Design</Card.Title>
                                        <Card.Text className={styles.card__body__text}>
                                            Từ cơ bản tới chuyên sâu, thực hành 8 dự án,
                                            hàng trăm bài tập, trang hỏi đáp riêng,
                                            cấp chứng chỉ sau khóa học và mua một lần học mãi mãi.
                                        </Card.Text>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                        <Card className={styles.main__box}>
                            <Row className={styles.main__box__container}>
                                <Col className={styles.main__box__container__left}>
                                    <Card.Header className={styles.card__header}>
                                        <section className={styles.headerContent__text}>
                                            <Card.Title className={styles.text__hedding2}>
                                                WEBSITE DESIGN UI/UX
                                            </Card.Title>
                                            <Card.Subtitle className={styles.text__hedding3}>
                                                by My Team
                                            </Card.Subtitle>
                                            <Card.Img src="/img/iconReact.svg" alt="" className={styles.text__img} />
                                        </section>
                                        <Card.Img src="/img/tuan.png" alt="" className={styles.headerContent__avt} />
                                    </Card.Header>
                                </Col>
                                <Col className={styles.main__box__container__right}>
                                    <Card.Body className={styles.card__body}>
                                        <Card.Title className={styles.card__body__title}>Ui/Ux Design</Card.Title>
                                        <Card.Text className={styles.card__body__text}>
                                            Từ cơ bản tới chuyên sâu, thực hành 8 dự án,
                                            hàng trăm bài tập, trang hỏi đáp riêng,
                                            cấp chứng chỉ sau khóa học và mua một lần học mãi mãi.
                                        </Card.Text>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                        <Card className={styles.main__box}>
                            <Row className={styles.main__box__container}>
                                <Col className={styles.main__box__container__left}>
                                    <Card.Header className={styles.card__header}>
                                        <section className={styles.headerContent__text}>
                                            <Card.Title className={styles.text__hedding2}>
                                                WEBSITE DESIGN UI/UX
                                            </Card.Title>
                                            <Card.Subtitle className={styles.text__hedding3}>
                                                by My Team
                                            </Card.Subtitle>
                                            <Card.Img src="/img/iconReact.svg" alt="" className={styles.text__img} />
                                        </section>
                                        <Card.Img src="/img/tuan.png" alt="" className={styles.headerContent__avt} />
                                    </Card.Header>
                                </Col>
                                <Col className={styles.main__box__container__right}>
                                    <Card.Body className={styles.card__body}>
                                        <Card.Title className={styles.card__body__title}>Ui/Ux Design</Card.Title>
                                        <Card.Text className={styles.card__body__text}>
                                            Từ cơ bản tới chuyên sâu, thực hành 8 dự án,
                                            hàng trăm bài tập, trang hỏi đáp riêng,
                                            cấp chứng chỉ sau khóa học và mua một lần học mãi mãi.
                                        </Card.Text>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Introduce