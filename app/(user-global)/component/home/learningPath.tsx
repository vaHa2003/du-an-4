import { Button, Card, Col, Container, Row } from "react-bootstrap";
import ButtonComponet from "../globalControl/btnComponent";
import styles from '@public/styles/home/LearningPath.module.css';
import { useRef, useState } from "react";
import useSWR from "swr";
import Link from "next/link";

interface Route {
    route_id: string;
    name_route: string;
    img_route: string;
    discription_route: string;
    status: 'default' | 'customize';
    del_flag: boolean;
    created_at: string;
    updated_at: string;
}

interface RouteResponse {
    status: string;
    message: string;
    data: Route[];
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

const LearningPath: React.FC = () => {
    const rightBodyRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const { data, error } = useSWR<RouteResponse>('/api/routes', fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    const handleMouseDown = (e: React.MouseEvent) => {
        if (rightBodyRef.current) {
            setIsDragging(true);
            setStartX(e.pageX - rightBodyRef.current.offsetLeft);
            setScrollLeft(rightBodyRef.current.scrollLeft);
        }
    };

    const handleMouseLeaveOrUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !rightBodyRef.current) return;
        e.preventDefault();
        const x = e.pageX - rightBodyRef.current.offsetLeft;
        const walk = (x - startX) * 2; // * 2 for faster scrolling
        rightBodyRef.current.scrollLeft = scrollLeft - walk;
    };

    const scrollRightHandler = () => {
        if (rightBodyRef.current) {
            rightBodyRef.current.scrollLeft += 300; // Scroll by 300 pixels to the right
        }
    };

    if (error) return <div>Error loading routes</div>; // Display error message
    if (!data) return <div>Loading...</div>; // Display loading state

    // Extract routes from the API response
    const routes = data?.data
    return (
        <Container className={styles.container}>
            <Row className={styles.body__container}>
                <Col className={styles.container__header}>
                    <section className={styles.header__title}>
                        <div className={styles.header__box__blue}>
                            <div className={styles.header__box_pink}></div>
                        </div>
                        <h2 className={styles.header__title__content}>
                            Lộ trình của TTO.SH
                        </h2>
                        <div className={styles.header__border__blue}>
                            <div className={styles.header__box__grayBlue}></div>
                        </div>
                    </section>
                </Col>
                <Col
                    className={styles.container__main}
                    ref={rightBodyRef}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeaveOrUp}
                    onMouseUp={handleMouseLeaveOrUp}
                    onMouseMove={handleMouseMove}
                >
                    {routes.map(route => (
                        <Card className={styles.box} key={route.route_id}>
                            <Card.Img src={route.img_route} className={styles.box__img} alt="Hình Router" />
                            <Card.Body className={styles.box__body}>
                                <Card.Title className={styles.box__body__title}>{route.name_route}</Card.Title>
                                <Button className={styles.box__body__btn}>Xem chi tiết lộ trình</Button>
                            </Card.Body>
                        </Card>
                    ))}
                </Col>
                <Button className={styles.btn__next} onClick={scrollRightHandler}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 18L15 12L9 6" stroke="#15C8E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Button>
            </Row>
        </Container>
    );
};

export default LearningPath;
