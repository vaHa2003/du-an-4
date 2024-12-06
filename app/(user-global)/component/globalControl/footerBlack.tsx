'use client'

import React from 'react';
import { useEffect } from 'react';
import { Container, Row, Col, Image, Nav } from 'react-bootstrap';
import Link from "next/link";
import styles from '@public/styles/globalControl/Footer.module.css';
import 'aos/dist/aos.css';
import AOS from 'aos';
import Body from './body';

const FooterBlack: React.FC = () => {
    useEffect(() => {
        AOS.init({
            duration: 1200,
        });
    }, []);
    return (
        <Body>
            <footer className={styles.footerContainer} data-aos="fade-up">
                <Container className={styles.container}>
                    <Row className={styles.footerContent}>
                        <Col md={3} >
                            <section className={styles.logo}  >
                                <Image src="/img/logoambantto.png" alt="Logo" className={styles.logoFooter} />
                                <span>"Khám phá, học hỏi, vươn xa"</span>
                            </section>
                            <section className={styles.contact}>
                                <div className={styles.contactItem}><Image src="/img/phone.svg" alt="" /> <span className={styles.contactItem}>090 7578 881</span></div>
                                <div className={styles.contactItem}><Image src="/img/mail.svg" alt="" /> <span className={styles.contactItem}>contact@tto.edu.vn</span></div>
                                <div className={styles.contactItem}><Image src="/img/map.svg" alt="" /> <span className={styles.contactItem}>720A Điện Biên Phủ, Vinhomes Tân Cảng, Bình Thạnh, Hồ Chí Minh 72300 </span></div>
                            </section>
                        </Col>
                        <Col md={9}>
                            <section className={styles.listMenu}>
                                <Col md={3} className={styles.listItem}>
                                    <h5 className={styles.title}>Về TTO</h5>
                                    <ul className={styles.menu}>
                                        <Link className={styles.link} href="/#">Giới thiệu</Link>
                                        <Link className={styles.link} href="/#">Liên hệ</Link>
                                        <Link className={styles.link} href="/#">Điều khoản</Link>
                                        <Link className={styles.link} href="/#">Bảo mật</Link>
                                        <Link className={styles.link} href="/#">Cơ hội việc làm</Link>
                                    </ul>
                                </Col>
                                <Col md={3} className={styles.listItem}>
                                    <h5 className={styles.title}>Hỗ trợ học viên</h5>
                                    <ul className={styles.menu}>
                                        <Link className={styles.link} href="/#">Facebook</Link>
                                        <Link className={styles.link} href="/#">Zalo</Link>
                                        <Link className={styles.link} href="/#">Instagram</Link>
                                        <Link className={styles.link} href="/#">TTCHAT</Link>
                                        <Link className={styles.link} href="/#">Trực tuyến</Link>
                                    </ul>
                                </Col>
                                <Col md={3} className={styles.listItem}>
                                    <h5 className={styles.title}>CÔNG TY CỔ PHẦN CÔNG NGHỆ GIÁO DỤC TTO</h5>
                                    <section className={styles.menu}>
                                        <p className={styles.link}>Mã số thuế:999999999</p>
                                        <p className={styles.link}>Ngày thành lập: 20/08/2024</p>
                                        <p className={styles.link}>Lĩnh vực hoạt động: Giáo dục, công nghệ - lập trình. Chúng tôi tập trung xây dựng và phát triển các sản phẩm mang lại giá trị cho cộng đồng lập trình viên Việt Nam.</p>
                                    </section>
                                </Col>
                            </section>
                        </Col>

                    </Row>
                    <Row className={styles.footerContent}>
                        <Nav className={styles.socials}>
                            <Nav.Link href="/" className={styles.social}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <g clipPath="url(#clip0_3786_12205)">
                                        <path d="M24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 17.9895 4.3882 22.954 10.125 23.8542V15.4688H7.07812V12H10.125V9.35625C10.125 6.34875 11.9166 4.6875 14.6576 4.6875C15.9701 4.6875 17.3438 4.92188 17.3438 4.92188V7.875H15.8306C14.34 7.875 13.875 8.80008 13.875 9.75V12H17.2031L16.6711 15.4688H13.875V23.8542C19.6118 22.954 24 17.9895 24 12Z" fill="#1877F2" />
                                        <path d="M16.6711 15.4688L17.2031 12H13.875V9.75C13.875 8.80102 14.34 7.875 15.8306 7.875H17.3438V4.92188C17.3438 4.92188 15.9705 4.6875 14.6576 4.6875C11.9166 4.6875 10.125 6.34875 10.125 9.35625V12H7.07812V15.4688H10.125V23.8542C11.3674 24.0486 12.6326 24.0486 13.875 23.8542V15.4688H16.6711Z" fill="white" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_3786_12205">
                                            <rect width="24" height="24" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </Nav.Link>
                            <Nav.Link href="/" className={styles.social}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 2.16094C15.2063 2.16094 15.5859 2.175 16.8469 2.23125C18.0188 2.28281 18.6516 2.47969 19.0734 2.64375C19.6313 2.85938 20.0344 3.12188 20.4516 3.53906C20.8734 3.96094 21.1313 4.35938 21.3469 4.91719C21.5109 5.33906 21.7078 5.97656 21.7594 7.14375C21.8156 8.40937 21.8297 8.78906 21.8297 11.9906C21.8297 15.1969 21.8156 15.5766 21.7594 16.8375C21.7078 18.0094 21.5109 18.6422 21.3469 19.0641C21.1313 19.6219 20.8687 20.025 20.4516 20.4422C20.0297 20.8641 19.6313 21.1219 19.0734 21.3375C18.6516 21.5016 18.0141 21.6984 16.8469 21.75C15.5813 21.8062 15.2016 21.8203 12 21.8203C8.79375 21.8203 8.41406 21.8062 7.15313 21.75C5.98125 21.6984 5.34844 21.5016 4.92656 21.3375C4.36875 21.1219 3.96563 20.8594 3.54844 20.4422C3.12656 20.0203 2.86875 19.6219 2.65313 19.0641C2.48906 18.6422 2.29219 18.0047 2.24063 16.8375C2.18438 15.5719 2.17031 15.1922 2.17031 11.9906C2.17031 8.78438 2.18438 8.40469 2.24063 7.14375C2.29219 5.97187 2.48906 5.33906 2.65313 4.91719C2.86875 4.35938 3.13125 3.95625 3.54844 3.53906C3.97031 3.11719 4.36875 2.85938 4.92656 2.64375C5.34844 2.47969 5.98594 2.28281 7.15313 2.23125C8.41406 2.175 8.79375 2.16094 12 2.16094ZM12 0C8.74219 0 8.33438 0.0140625 7.05469 0.0703125C5.77969 0.126563 4.90313 0.332812 4.14375 0.628125C3.35156 0.9375 2.68125 1.34531 2.01563 2.01562C1.34531 2.68125 0.9375 3.35156 0.628125 4.13906C0.332812 4.90313 0.126563 5.775 0.0703125 7.05C0.0140625 8.33437 0 8.74219 0 12C0 15.2578 0.0140625 15.6656 0.0703125 16.9453C0.126563 18.2203 0.332812 19.0969 0.628125 19.8563C0.9375 20.6484 1.34531 21.3188 2.01563 21.9844C2.68125 22.65 3.35156 23.0625 4.13906 23.3672C4.90313 23.6625 5.775 23.8687 7.05 23.925C8.32969 23.9812 8.7375 23.9953 11.9953 23.9953C15.2531 23.9953 15.6609 23.9812 16.9406 23.925C18.2156 23.8687 19.0922 23.6625 19.8516 23.3672C20.6391 23.0625 21.3094 22.65 21.975 21.9844C22.6406 21.3188 23.0531 20.6484 23.3578 19.8609C23.6531 19.0969 23.8594 18.225 23.9156 16.95C23.9719 15.6703 23.9859 15.2625 23.9859 12.0047C23.9859 8.74688 23.9719 8.33906 23.9156 7.05938C23.8594 5.78438 23.6531 4.90781 23.3578 4.14844C23.0625 3.35156 22.6547 2.68125 21.9844 2.01562C21.3188 1.35 20.6484 0.9375 19.8609 0.632812C19.0969 0.3375 18.225 0.13125 16.95 0.075C15.6656 0.0140625 15.2578 0 12 0Z" fill="white" />
                                    <path d="M12 5.83594C8.59688 5.83594 5.83594 8.59688 5.83594 12C5.83594 15.4031 8.59688 18.1641 12 18.1641C15.4031 18.1641 18.1641 15.4031 18.1641 12C18.1641 8.59688 15.4031 5.83594 12 5.83594ZM12 15.9984C9.79219 15.9984 8.00156 14.2078 8.00156 12C8.00156 9.79219 9.79219 8.00156 12 8.00156C14.2078 8.00156 15.9984 9.79219 15.9984 12C15.9984 14.2078 14.2078 15.9984 12 15.9984Z" fill="white" />
                                    <path d="M19.8469 5.59239C19.8469 6.38926 19.2 7.03145 18.4078 7.03145C17.6109 7.03145 16.9688 6.38457 16.9688 5.59239C16.9688 4.79551 17.6156 4.15332 18.4078 4.15332C19.2 4.15332 19.8469 4.8002 19.8469 5.59239Z" fill="white" />
                                </svg>
                            </Nav.Link>
                            <Nav.Link href="/" className={styles.social}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <g clipPath="url(#clip0_3786_12213)">
                                        <path d="M22.2283 0H1.77167C1.30179 0 0.851161 0.186657 0.518909 0.518909C0.186657 0.851161 0 1.30179 0 1.77167V22.2283C0 22.6982 0.186657 23.1488 0.518909 23.4811C0.851161 23.8133 1.30179 24 1.77167 24H22.2283C22.6982 24 23.1488 23.8133 23.4811 23.4811C23.8133 23.1488 24 22.6982 24 22.2283V1.77167C24 1.30179 23.8133 0.851161 23.4811 0.518909C23.1488 0.186657 22.6982 0 22.2283 0ZM7.15333 20.445H3.545V8.98333H7.15333V20.445ZM5.34667 7.395C4.93736 7.3927 4.53792 7.2692 4.19873 7.04009C3.85955 6.81098 3.59584 6.48653 3.44088 6.10769C3.28591 5.72885 3.24665 5.31259 3.32803 4.91145C3.40941 4.51032 3.6078 4.14228 3.89816 3.85378C4.18851 3.56529 4.55782 3.36927 4.95947 3.29046C5.36112 3.21165 5.77711 3.25359 6.15495 3.41099C6.53279 3.56838 6.85554 3.83417 7.08247 4.17481C7.30939 4.51546 7.43032 4.91569 7.43 5.325C7.43386 5.59903 7.38251 5.87104 7.27901 6.1248C7.17551 6.37857 7.02198 6.6089 6.82757 6.80207C6.63316 6.99523 6.40185 7.14728 6.14742 7.24915C5.893 7.35102 5.62067 7.40062 5.34667 7.395ZM20.4533 20.455H16.8467V14.1933C16.8467 12.3467 16.0617 11.7767 15.0483 11.7767C13.9783 11.7767 12.9283 12.5833 12.9283 14.24V20.455H9.32V8.99167H12.79V10.58H12.8367C13.185 9.875 14.405 8.67 16.2667 8.67C18.28 8.67 20.455 9.865 20.455 13.365L20.4533 20.455Z" fill="#0A66C2" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_3786_12213">
                                            <rect width="24" height="24" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </Nav.Link>
                            <Nav.Link href="/" className={styles.social}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 22 20" fill="none">
                                    <path d="M17.244 0.25H20.552L13.325 8.51L21.827 19.75H15.17L9.956 12.933L3.99 19.75H0.679998L8.41 10.915L0.253998 0.25H7.08L11.793 6.481L17.244 0.25ZM16.083 17.77H17.916L6.084 2.126H4.117L16.083 17.77Z" fill="white" />
                                </svg>
                            </Nav.Link>
                        </Nav>
                        <section className={styles.bottomFooter}>
                            <div className={styles.copyright}>
                                <p>Copyright © 2024 tto.sh</p>
                            </div>
                            <Nav className={styles.policys}>
                                <Nav.Link href="/" className={styles.policy}>Quyền lợi</Nav.Link> |
                                <Nav.Link href="/" className={styles.policy}>Điều khoản điều kiện</Nav.Link> |
                                <Nav.Link href="/" className={styles.policy}> Chính sách bảo mật</Nav.Link>
                            </Nav>
                        </section>
                    </Row>
                </Container>
            </footer >
        </Body>
    );
}

export default FooterBlack;
