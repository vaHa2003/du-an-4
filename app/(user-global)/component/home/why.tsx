
import styles from '@public/styles/home/Why.module.css'
import { Col, Container, Image, Row } from 'react-bootstrap'

const Why: React.FC = () => {
    return (
        <>
            <Container className={styles.container}>
                <Row className={styles.container__row}>
                    <Col className={styles.header}>
                        <div className={styles.main__title}>
                            <div className={styles.main__title__strokeLeft}>
                                <div className={styles.strokeLeft__element}> </div>
                            </div>
                            <h2 className={styles.main__title__content}>Tại sao nên chọn TTO.SH ?</h2>
                            <div className={styles.main__title__strokeRight}>
                                <div className={styles.strokeRight__element}></div>
                            </div>
                        </div>
                    </Col>
                    <Col className={styles.nav}>
                        <section className={styles.header__title}>
                            <div className={styles.header__box__blue}>
                                <div className={styles.header__box_pink}></div>
                            </div>
                            <h2 className={styles.header__title__content}>
                                Chúng tôi tạo ra các khóa học dựa trên các yêu cầu của các chứng
                                chỉ quốc tế để mang tạo cho học viên khóa học tốt nhất
                            </h2>
                            <div className={styles.header__border__blue}>
                                <div className={styles.header__box__grayBlue}></div>
                            </div>
                        </section>
                    </Col>
                    <Col className={styles.boxChat}>
                        <section className={styles.leftChat}>
                            <div className={styles.main__content__wrap}>
                                <div className={styles.main__content__imgWrap}>
                                    <Image src="/img/tesla.jpg" width="360" height="360" alt="" className={styles.main__content__imgBg} />
                                </div>
                            </div>
                            <div className={styles.leftChat__container}>
                                <div className={styles.leftChat__container__content}>
                                    <div className={styles.boom}>
                                        <h3 className={styles.leftChat__container__content__title}>
                                            Chất lượng khóa học chuẩn quốc tế
                                        </h3>
                                        <h5 className={styles.leftChat__container__content__subTitle}>
                                            Chúng tôi cung cấp các khóa học chất lượng cao được thiết kế bởi những
                                            chuyên gia hàng đầu trong ngành công nghệ thông tin,
                                            đảm bảo bạn luôn cập nhật kiến thức mới nhất.
                                        </h5>
                                    </div>
                                    <img src="/img/bgChat.svg" alt="" className={styles.leftChat__container__content__img} />
                                </div>
                            </div>
                        </section>
                        <section className={styles.leftChat}>
                            <div className={styles.rightChat__container}>
                                <div className={styles.rightChat__container__content}>
                                    <div className={styles.boom2}>
                                        <h3 className={styles.leftChat__container__content__title}>
                                            Lộ trình học rõ ràng và khoa học
                                        </h3>
                                        <h5 className={styles.leftChat__container__content__subTitle}>
                                            Các khóa học của chúng tôi được xây dựng với lộ trình học cụ thể,
                                            giúp bạn nắm vững từng kiến thức theo từng cấp độ từ cơ bản đến nâng cao,
                                            phù hợp cho cả người mới bắt đầu lẫn những người đã có kinh nghiệm.
                                        </h5>
                                    </div>
                                    <img src="/img/chatRight.svg" alt="" className={styles.rightChat__container__content__img} />
                                </div>
                            </div>
                            <div className={styles.main__content__wrap}>
                                <div className={styles.main__content__imgWrap}>
                                    <Image src="/img/tesla.jpg" width="360" height="360" alt="" className={styles.main__content__imgBg} />
                                </div>
                            </div>
                        </section>
                        <section className={styles.leftChat}>
                            <div className={styles.main__content__wrap}>
                                <div className={styles.main__content__imgWrap}>
                                    <Image src="/img/tesla.jpg" width="360" height="360" alt="" className={styles.main__content__imgBg} />
                                </div>
                            </div>
                            <div className={styles.leftChat__container}>
                                <div className={styles.leftChat__container__content}>
                                    <div className={styles.boom}>
                                        <h3 className={styles.leftChat__container__content__title}>
                                            Thực hành ngay trong quá trình học
                                        </h3>
                                        <h5 className={styles.leftChat__container__content__subTitle}>
                                            Ngoài lý thuyết, chúng tôi tập trung vào các bài tập thực hành và dự án thực tế,
                                            giúp bạn áp dụng kiến thức vào công việc ngay sau khi hoàn thành khóa học.
                                        </h5>
                                    </div>
                                    <img src="/img/bgChat.svg" alt="" className={styles.leftChat__container__content__img} />
                                </div>
                            </div>
                        </section>
                        <section className={styles.leftChat}>
                            <div className={styles.rightChat__container}>
                                <div className={styles.rightChat__container__content}>
                                    <div className={styles.boom2}>
                                        <h3 className={styles.leftChat__container__content__title}>
                                            Tương tác trực tiếp với giảng viên
                                        </h3>
                                        <h5 className={styles.leftChat__container__content__subTitle}>
                                            Bạn có thể đặt câu hỏi, thảo luận và nhận sự hỗ trợ trực tiếp từ giảng viên trong quá trình học,
                                            đảm bảo không bỏ lỡ bất kỳ kiến thức quan trọng nào.
                                        </h5>
                                    </div>
                                    <img src="/img/chatRight.svg" alt="" className={styles.rightChat__container__content__img} />
                                </div>
                            </div>
                            <div className={styles.main__content__wrap}>
                                <div className={styles.main__content__imgWrap}>
                                    <Image src="/img/tesla.jpg" width="360" height="360" alt="" className={styles.main__content__imgBg} />
                                </div>
                            </div>
                        </section>
                        <section className={styles.leftChat}>
                            <div className={styles.main__content__wrap}>
                                <div className={styles.main__content__imgWrap}>
                                    <Image src="/img/tesla.jpg" width="360" height="360" alt="" className={styles.main__content__imgBg} />
                                </div>
                            </div>
                            <div className={styles.leftChat__container}>
                                <div className={styles.leftChat__container__content}>
                                    <div className={styles.boom}>
                                        <h3 className={styles.leftChat__container__content__title}>
                                            Chứng chỉ uy tín sau khóa học
                                        </h3>
                                        <h5 className={styles.leftChat__container__content__subTitle}>
                                            Sau khi hoàn thành khóa học, bạn sẽ nhận được chứng chỉ được công nhận bởi các doanh nghiệp và tổ chức,
                                            giúp tăng cơ hội việc làm và phát triển sự nghiệp trong lĩnh vực công nghệ thông tin.
                                        </h5>
                                    </div>
                                    <img src="/img/bgChat.svg" alt="" className={styles.leftChat__container__content__img} />
                                </div>
                            </div>
                        </section>
                    </Col>

                </Row>

            </Container>
        </>
    )
}

export default Why