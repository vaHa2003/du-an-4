import { Card, Col, Container, Image, Row } from "react-bootstrap";
import Button from "../globalControl/btnComponent";
import styles from '@public/styles/home/CoursePro.module.css';
import styleFor from "@public/styles/course/coursefor.module.css";
import { Course } from "@app/(user-global)/model/course";
import Link from "next/link";

interface CourseForProps {
    id: string[];
}

const CourseForNext: React.FC<CourseForProps> = ({ id }) => {
    console.log(id);
    return (
        <Container className={styleFor.containerNext}>
            <svg width="100%" height="714" viewBox="0 0 1440 714" fill="none"
                xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className={styleFor.bg}>
                <g transform="scale(-1, 1) translate(-1440, 0)">
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

            <section className={styleFor.main}>
                <h2 className={styleFor.main__title} aria-hidden={true}>Khóa học nên mua kế tiếp</h2>
                <p className={styleFor.main__subTitle}>
                    Khóa học nên mua kế tiếp là các khóa học cần được học trong lộ trình học
                </p>
            </section>
            <section className={styleFor.cta}>

                <div className={styleFor.ctaLeft}>
                    <Button type="premary" status="hover" size="S" leftIcon={false} rightIcon={false} height={40}>Khóa học có phí</Button>
                    <Button type="premary" status="hover" size="S" leftIcon={false} rightIcon={false} height={40}>Khóa học miễn phí</Button>
                </div>
                <Button type="secondery" status="hover" size="S" leftIcon={false} rightIcon={true} chevron={4} width={145} height={40}>Xem thêm</Button>
            </section>
            <section>
                <Row className={styleFor.mainCard}>
                </Row>
            </section>
        </Container>

    )
}

export default CourseForNext;