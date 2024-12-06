"use client";
import useSWR from 'swr';
import { useState, useEffect } from 'react';
import { Container, Nav, Navbar, Row, Col } from "react-bootstrap";
import 'aos/dist/aos.css';
import AOS from 'aos';
import { Course } from "@/app/(user-global)/model/course";
import { User } from "@/app/(user-global)/model/user";

import styles from "@public/styles/course/coursedetail.module.css";
import stylesP from "@public/styles/course/coursePayment.module.css";
import Link from "next/link"
import Image from 'next/image';
import Button from "@app/(user-global)/component/globalControl/btnComponent";

const fetcher = (url: string) => fetch(url).then(res => res.json());

interface FaqCourse {
    question_faq: string;
    answer_faq: string;
}

interface ApiResponse<T> {
    status: string;
    message: string;
    data: T;
}

const CourseDetail: React.FC<{ params: { id: number|string } }> = ({ params }) => {
    const { id } = params;
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        AOS.init({
            duration: 1200,
        });
    }, []);

    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleContent = (index: number) => {
        setOpenIndex(prevIndex => (prevIndex === index ? null : index));
    };

    const { data: courseData, error: courseError } = useSWR<ApiResponse<Course>>(
        `/api/courseDetail/${id}`,
        fetcher
    );

    const { data: faqData, error: faqError } = useSWR<ApiResponse<FaqCourse[]>>(
        `/api/getFaqCourse/${id}/10`,
        fetcher
    );

    const token = localStorage.getItem('token');
    const fetchPayMentVn = async () => {
        try {
            const response = await fetch(`/api/paymentvn/${id}/${totalPrice}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data)
                const paymentUrl = data.data;

                if (paymentUrl) {
                    window.location.href = paymentUrl;
                } else {
                    throw new Error("Payment URL is missing");
                }
            } else if (!response.ok) {
                throw new Error("Thanh toán thất bại");
            }



        } catch (err: any) {
            setError(err.message);
        }
    };
    const fetchPayMentMomo = async () => {
        try {
            const response = await fetch(`/api/paymentmomo/${id}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            if (response.ok) {
                const data = await response.json();
                // const paymentUrl = data.payUrl;
                console.log(data);

                // if (paymentUrl) {
                //     window.location.href = paymentUrl;
                // } else {
                //     throw new Error("Payment URL is missing");
                // }
            } else if (!response.ok) {
                throw new Error("Thanh toán thất bại");
            }



        } catch (err: any) {
            setError(err.message);
        }
    };

    // Handle loading and error states
    if (courseError || faqError) return <div>Failed to load data</div>;
    if (!courseData || !faqData) return <div>Loading...</div>;


    const course = courseData.data;
    const faqs = faqData.data;
    const costDis = 100000;
    const priceString = course.price_course;
    const formattedPrice = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(priceString);
    const formattedcostDise = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(costDis);

    const totalPrice = priceString - costDis;
    return (
        <>


            <section className={`${styles.couserOverview}`}>
                <Container className={`${styles.container} ${styles.hero}`}>
                    <h2 className={`${styles.heading} ${stylesP.headingPayment} text-center`}>
                        Mua ngay với giá ưu đãI “vô cực” - Chỉ 399 slots!
                    </h2>

                    <Row className={`${stylesP.content}`}>
                        <Col md="4">
                            <div className={stylesP.LeftContent}>
                                <h4 className={stylesP.getYou}>Bạn sẽ nhận được gì?</h4>
                                <div className={stylesP.getYouBox}>
                                    <div className={stylesP.getYouBoxItem}>
                                        <img src="/img/iconcheck.svg" alt="" />
                                        <p className={stylesP.boxDesc}>Truy cập toàn bộ khóa học <span className={stylesP.boxDescStrong}>{course.name_course}</span></p>
                                    </div>
                                    <div className={stylesP.getYouBoxItem}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M15.3929 4.05365L14.8912 4.61112L15.3929 4.05365ZM19.3517 7.61654L18.85 8.17402L19.3517 7.61654ZM21.654 10.1541L20.9689 10.4592V10.4592L21.654 10.1541ZM3.17157 20.8284L3.7019 20.2981H3.7019L3.17157 20.8284ZM20.8284 20.8284L20.2981 20.2981L20.2981 20.2981L20.8284 20.8284ZM14 21.25H10V22.75H14V21.25ZM2.75 14V10H1.25V14H2.75ZM21.25 13.5629V14H22.75V13.5629H21.25ZM14.8912 4.61112L18.85 8.17402L19.8534 7.05907L15.8947 3.49618L14.8912 4.61112ZM22.75 13.5629C22.75 11.8745 22.7651 10.8055 22.3391 9.84897L20.9689 10.4592C21.2349 11.0565 21.25 11.742 21.25 13.5629H22.75ZM18.85 8.17402C20.2034 9.3921 20.7029 9.86199 20.9689 10.4592L22.3391 9.84897C21.9131 8.89241 21.1084 8.18853 19.8534 7.05907L18.85 8.17402ZM10.0298 2.75C11.6116 2.75 12.2085 2.76158 12.7405 2.96573L13.2779 1.5653C12.4261 1.23842 11.498 1.25 10.0298 1.25V2.75ZM15.8947 3.49618C14.8087 2.51878 14.1297 1.89214 13.2779 1.5653L12.7405 2.96573C13.2727 3.16993 13.7215 3.55836 14.8912 4.61112L15.8947 3.49618ZM10 21.25C8.09318 21.25 6.73851 21.2484 5.71085 21.1102C4.70476 20.975 4.12511 20.7213 3.7019 20.2981L2.64124 21.3588C3.38961 22.1071 4.33855 22.4392 5.51098 22.5969C6.66182 22.7516 8.13558 22.75 10 22.75V21.25ZM1.25 14C1.25 15.8644 1.24841 17.3382 1.40313 18.489C1.56076 19.6614 1.89288 20.6104 2.64124 21.3588L3.7019 20.2981C3.27869 19.8749 3.02502 19.2952 2.88976 18.2892C2.75159 17.2615 2.75 15.9068 2.75 14H1.25ZM14 22.75C15.8644 22.75 17.3382 22.7516 18.489 22.5969C19.6614 22.4392 20.6104 22.1071 21.3588 21.3588L20.2981 20.2981C19.8749 20.7213 19.2952 20.975 18.2892 21.1102C17.2615 21.2484 15.9068 21.25 14 21.25V22.75ZM21.25 14C21.25 15.9068 21.2484 17.2615 21.1102 18.2892C20.975 19.2952 20.7213 19.8749 20.2981 20.2981L21.3588 21.3588C22.1071 20.6104 22.4392 19.6614 22.5969 18.489C22.7516 17.3382 22.75 15.8644 22.75 14H21.25ZM2.75 10C2.75 8.09318 2.75159 6.73851 2.88976 5.71085C3.02502 4.70476 3.27869 4.12511 3.7019 3.7019L2.64124 2.64124C1.89288 3.38961 1.56076 4.33855 1.40313 5.51098C1.24841 6.66182 1.25 8.13558 1.25 10H2.75ZM10.0298 1.25C8.15538 1.25 6.67442 1.24842 5.51887 1.40307C4.34232 1.56054 3.39019 1.8923 2.64124 2.64124L3.7019 3.7019C4.12453 3.27928 4.70596 3.02525 5.71785 2.88982C6.75075 2.75158 8.11311 2.75 10.0298 2.75V1.25Z" fill="#237DF7" />
                                            <path opacity="0.5" d="M13 2.5V5C13 7.35702 13 8.53553 13.7322 9.26777C14.4645 10 15.643 10 18 10H22" stroke="#237DF7" stroke-width="1.5" />
                                            <path opacity="0.5" d="M7 14L6 15L7 16M11.5 16L12.5 17L11.5 18M10 14L8.5 18" stroke="#237DF7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        <p className={stylesP.boxDesc}>Hơn <span className={stylesP.boxDescStrong}>{course.documents_count}</span> bài học</p>
                                    </div>
                                    <div className={stylesP.getYouBoxItem}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4036 22.4807L10.6787 22.016C11.1195 21.2712 11.3399 20.8988 11.691 20.6911C12.0422 20.4834 12.5001 20.4688 13.4161 20.4395C14.275 20.412 14.8523 20.3371 15.3458 20.1326C16.385 19.7022 17.2106 18.8766 17.641 17.8374C17.9639 17.0581 17.9639 16.0701 17.9639 14.094V13.2458C17.9639 10.4693 17.9639 9.08103 17.3389 8.06121C16.9892 7.49056 16.5094 7.01078 15.9388 6.66108C14.919 6.03613 13.5307 6.03613 10.7542 6.03613H8.20964C5.43314 6.03613 4.04489 6.03613 3.02507 6.66108C2.45442 7.01078 1.97464 7.49056 1.62495 8.06121C1 9.08103 1 10.4693 1 13.2458V14.094C1 16.0701 1 17.0581 1.32282 17.8374C1.75326 18.8766 2.57886 19.7022 3.61802 20.1326C4.11158 20.3371 4.68882 20.412 5.5477 20.4395C6.46368 20.4688 6.92167 20.4835 7.27278 20.6911C7.6239 20.8988 7.84431 21.2712 8.28514 22.016L8.5602 22.4807C8.97002 23.1731 9.9938 23.1731 10.4036 22.4807ZM13.1928 14.5181C13.7783 14.5181 14.253 14.0434 14.253 13.4578C14.253 12.8723 13.7783 12.3976 13.1928 12.3976C12.6072 12.3976 12.1325 12.8723 12.1325 13.4578C12.1325 14.0434 12.6072 14.5181 13.1928 14.5181ZM10.5422 13.4578C10.5422 14.0434 10.0675 14.5181 9.48193 14.5181C8.89637 14.5181 8.42169 14.0434 8.42169 13.4578C8.42169 12.8723 8.89637 12.3976 9.48193 12.3976C10.0675 12.3976 10.5422 12.8723 10.5422 13.4578ZM5.77108 14.5181C6.35664 14.5181 6.83133 14.0434 6.83133 13.4578C6.83133 12.8723 6.35664 12.3976 5.77108 12.3976C5.18553 12.3976 4.71084 12.8723 4.71084 13.4578C4.71084 14.0434 5.18553 14.5181 5.77108 14.5181Z" fill="#237DF7" />
                                            <path opacity="0.5" d="M15.486 1C16.7529 0.999992 17.7603 0.999986 18.5683 1.07681C19.3967 1.15558 20.0972 1.32069 20.7212 1.70307C21.3632 2.09648 21.9029 2.63623 22.2963 3.27821C22.6787 3.90219 22.8438 4.60265 22.9226 5.43112C22.9994 6.23907 22.9994 7.24658 22.9994 8.51343V9.37869C22.9994 10.2803 22.9994 10.9975 22.9597 11.579C22.9191 12.174 22.8344 12.6848 22.6362 13.1632C22.152 14.3323 21.2232 15.2611 20.0541 15.7453C20.0249 15.7574 19.9955 15.7691 19.966 15.7804C19.8249 15.8343 19.7039 15.8806 19.5978 15.915H17.9477C17.9639 15.416 17.9639 14.8217 17.9639 14.093V13.2448C17.9639 10.4683 17.9639 9.08006 17.3389 8.06023C16.9892 7.48958 16.5094 7.0098 15.9388 6.66011C14.919 6.03516 13.5307 6.03516 10.7542 6.03516H8.20964C7.22423 6.03516 6.41369 6.03516 5.73242 6.06309V4.4127C5.76513 4.29934 5.80995 4.16941 5.86255 4.0169C5.95202 3.75751 6.06509 3.51219 6.20848 3.27821C6.60188 2.63623 7.14163 2.09648 7.78361 1.70307C8.40759 1.32069 9.10805 1.15558 9.93651 1.07681C10.7445 0.999986 11.7519 0.999992 13.0188 1H15.486Z" fill="#237DF7" />
                                        </svg>
                                        <p className={stylesP.boxDesc}>Hơn <span className={stylesP.boxDescStrong}>{course.chapters_count}</span> bài tập</p>
                                    </div>
                                    <div className={stylesP.getYouBoxItem}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <g clip-path="url(#clip0_3786_7964)">
                                                <path d="M20.25 0.545456C20.625 0.545456 21 0.954547 21 1.36364V3.81818H23.25C23.625 3.81818 24 4.22727 24 4.63636C24 5.0966 23.625 5.45455 23.25 5.45455H21V7.90909C21 8.36932 20.625 8.72727 20.25 8.72727C19.8281 8.72727 19.5 8.36932 19.5 7.90909V5.45455H17.25C16.8281 5.45455 16.5 5.0966 16.5 4.63636C16.5 4.22727 16.8281 3.81818 17.25 3.81818H19.5V1.36364C19.5 0.954547 19.8281 0.545456 20.25 0.545456ZM20.25 15.2727C20.625 15.2727 21 15.6818 21 16.0909V18.5455H23.25C23.625 18.5455 24 18.9545 24 19.3636C24 19.8239 23.625 20.1818 23.25 20.1818H21V22.6364C21 23.0965 20.625 23.4545 20.25 23.4545C19.8281 23.4545 19.5 23.0965 19.5 22.6364V20.1818H17.25C16.8281 20.1818 16.5 19.8239 16.5 19.3636C16.5 18.9545 16.8281 18.5455 17.25 18.5455H19.5V16.0909C19.5 15.6818 19.8281 15.2727 20.25 15.2727ZM5.76562 15.375L0.421876 12.7159C0.140625 12.5625 0 12.2557 0 11.9489C0 11.6421 0.140625 11.3352 0.421876 11.1818L5.76562 8.52273L8.25 2.69319C8.34376 2.38636 8.625 2.18182 8.90624 2.18182C9.1875 2.18182 9.46876 2.38636 9.60938 2.69319L12.0469 8.52273L17.3906 11.1818C17.6719 11.3352 17.8594 11.6421 17.8594 11.9489C17.8594 12.2557 17.6719 12.5625 17.3906 12.7159L12.0469 15.375L9.60938 21.2045C9.46876 21.5114 9.1875 21.7159 8.90624 21.7159C8.625 21.7159 8.34376 21.5114 8.25 21.2045L5.76562 15.375ZM2.53124 11.9489L6.375 13.8921C6.70312 14.0455 6.98438 14.3523 7.125 14.7102L8.90624 18.9034L10.6875 14.7102C10.8281 14.3523 11.1094 14.0455 11.4375 13.8921L15.2812 11.9489L11.4375 10.0057C11.1094 9.85226 10.8281 9.54545 10.6875 9.18751L8.90624 4.99431L7.125 9.18751C6.98438 9.54545 6.70312 9.85226 6.375 10.0057L2.53124 11.9489Z" fill="#237DF7" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_3786_7964">
                                                    <rect width="24" height="24" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        <p className={stylesP.boxDesc}>Dược cập nhật mãi mãi</p>
                                    </div>
                                    <div className={stylesP.getYouBoxItem}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M17.9062 2C15.0234 2 12.9141 7.18749 12 9.93749C11.0508 7.18749 8.94141 2 6.05859 2C3.10547 2 0.75 6.5 0.75 12C0.75 17.5625 3.10547 22 6.05859 22C8.94141 22 11.0508 16.875 12 14.125C12.9141 16.875 15.0234 22 17.9062 22C20.8593 22 23.25 17.5625 23.25 12C23.25 6.5 20.8593 2 17.9062 2ZM6.05859 20C3.73829 20 1.875 16.4375 1.875 12C1.875 7.62501 3.73829 4 6.05859 4C8.80079 4 10.8398 10.3125 11.3672 12C10.8398 13.75 8.80079 20 6.05859 20ZM17.9062 20C15.1641 20 13.125 13.75 12.6328 12C13.125 10.3125 15.1641 4 17.9062 4C20.2266 4 22.125 7.62501 22.125 12C22.125 16.4375 20.2266 20 17.9062 20Z" fill="#237DF7" />
                                        </svg>
                                        <p className={stylesP.boxDesc}>Mua 1 lần học mãi mãi</p>
                                    </div>

                                </div>
                            </div>
                        </Col>
                        <Col md="8">
                            <div className={stylesP.rightContent}>
                                <div className={stylesP.topRight}>
                                    <p className={stylesP.boxDesc}>Sở hữu ngay khóa học {course.name_course} với lộ trình bài bản và chi tiết nhất!</p>
                                    <ul className={stylesP.boxDescDiscount}>
                                        <li className={stylesP.boxDescDiscountItem}>
                                            <p className={stylesP.boxDesc}>
                                                <span className={stylesP.boxDescStrong}>Giảm ngay 100k</span>  cho tài khoản đã mua các khóa học trước đó                                            </p>
                                        </li>
                                        <li className={stylesP.boxDescDiscountItem} >
                                            <p className={stylesP.boxDesc}>
                                                <span className={stylesP.boxDescStrong}>Giảm ngay 100k</span> cho tài khoản đã mua các khóa học trước đó                                            </p>
                                        </li>
                                    </ul>
                                    <p className={`${stylesP.boxDesC} ${stylesP.boxDescStrong}  `}>
                                        Giá khóa học đang ở mức ưu đãi lên tới trên  {course.discount_price_course} %, đây sẽ là đợt giảm giá sâu duy nhất trong toàn bộ vòng đời khóa học!!
                                    </p>

                                </div>

                                <div className={stylesP.tablePrice}>
                                    <div className={stylesP.priceControl}>
                                        <h6 className={stylesP.titlePỉce}>Giá bán</h6>
                                        <p className={stylesP.titlePỉce}><span className={stylesP.boxDescStrong}>{formattedPrice}</span></p>
                                    </div>
                                    <div className={stylesP.priceControl}>
                                        <h6 className={stylesP.titlePỉce}>Đã là học viên khóa khác</h6>
                                        <p className={stylesP.titlePỉce}>-{formattedcostDise}</p>
                                    </div>
                                </div>
                                <button className={stylesP.btnTotal} onClick={fetchPayMentVn} name='redirect'>Thanh toán ngay bằng vnp</button>
                                <button className={stylesP.btnTotal} onClick={fetchPayMentMomo} name='payUrl'>Thanh toán ngay bằng momo</button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section >
            <section className={`${styles.FAQ}`} data-aos="fade-up">
                <Container className={`${styles.container} ${styles.containerFeedback}`}>
                    <Row className={`${styles.row} ${styles.rowHeading}  `}>
                        <h3 className={styles.titleWhy}>Câu hỏi thường gặp </h3>
                    </Row>
                    <Row className={`${styles.row} ${styles.rowFaq}`}>
                        <Col md="12">
                            <p className={styles.faqCata}>Đối tượng tham gia</p>

                            {Array.isArray(faqs) ? (faqs.map((faq, index) => (
                                <div key={index} className={styles.faqItem}>
                                    <div className={styles.faqItemWhat} onClick={() => toggleContent(index)}>
                                        <Image
                                            className={styles.imageMap}
                                            src={openIndex === index ? "/img/iconadd2.svg" : "/img/iconadd.svg"}
                                            alt="icon toggle"
                                            width={32}
                                            height={32}
                                        />
                                        <p className={styles.faqTitle}>{faq.question_faq} ?</p>
                                    </div>
                                    {openIndex === index && (
                                        <p className={styles.faqContent}>
                                            {faq.answer_faq}
                                        </p>
                                    )}
                                </div>
                            ))) : ("")}

                        </Col>
                    </Row>
                </Container>
            </section >
            <section className={`${styles.callHelp}`} >
                <Container className={`${styles.container} ${styles.containerCallHelp}`}>
                    <Row className={`${styles.row} ${styles.rowCallhelp}  `}>
                        <h3 className={styles.titleCallHelp}>Đăng ký tư vấn lộ trình học
                            hoàn toàn miễn phí!</h3>
                        <p className={styles.descCallHelp}>Tư vấn viên sẽ liên hệ và giải đáp mọi thắc mắc của bạn về lộ trình học để trở thành nhà phát triển chuyên nghiệp</p>
                    </Row>

                    <Button type="secondery" status="hover" size="S" leftIcon={false} rightIcon={false} chevron={4} width={145} height={40}>Nhận tư vấn miễn phí</Button>

                </Container>
            </section >
        </>
    );
};

export default CourseDetail;
