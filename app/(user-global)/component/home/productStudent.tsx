
import styles from '@public/styles/home/ProductStudent.module.css'
import { useEffect, useRef, useState } from 'react';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap'

const ProductStudent: React.FC = () => {
    const rightBodyRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

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
        const walk = (x - startX) * 2;
        rightBodyRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleWheel = (e: WheelEvent) => {
        if (rightBodyRef.current) {
            e.preventDefault();
            rightBodyRef.current.scrollLeft += e.deltaY;
        }
    };

    // useEffect(() => {
    //     const currentRef = rightBodyRef.current;
    //     if (currentRef) {
    //         currentRef.addEventListener('wheel', handleWheel);
    //     }
    //     return () => {
    //         if (currentRef) {
    //             currentRef.removeEventListener('wheel', handleWheel);
    //         }
    //     };
    // }, [rightBodyRef]);

    const scrollLeftHandler = () => {
        if (rightBodyRef.current) {
            rightBodyRef.current.scrollLeft -= 300;
        }
    };

    const scrollRightHandler = () => {
        if (rightBodyRef.current) {
            rightBodyRef.current.scrollLeft += 300;
        }
    };
    return (
        <>
            <div className={styles.container}>
                <Image src="/img/productStudentIcon.svg" alt="" className={styles.imgIcon} />
                <div className={styles.bgTop}></div>
                <Row className={styles.main}>
                    <Col className={styles.header}>
                        <h2 className={styles.header__heading}>
                            Một số sản phẩm của học viên
                        </h2>
                        <h4 className={styles.header__title}>
                            Product
                        </h4>
                    </Col>
                    <Col className={styles.group__post}
                        ref={rightBodyRef}
                        onMouseDown={handleMouseDown}
                        onMouseLeave={handleMouseLeaveOrUp}
                        onMouseUp={handleMouseLeaveOrUp}
                        onMouseMove={handleMouseMove}
                    >
                        <Card className={styles.post}>
                            <Card.Img src="/img/productStudent.svg" className={styles.post__img} />
                            <Card.Body className={styles.post__body}>
                                <Card.Title className={styles.post__title}>Website Audi clone Website Audi cloneWebsite Audi clone</Card.Title>
                                <Button className={styles.btn__post}>
                                    <svg width="auto" height="auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 18L15 12L9 6" stroke="#15C8E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </Button>
                            </Card.Body>
                        </Card>
                        <Card className={styles.post}>
                            <Card.Img src="/img/productStudent.svg" className={styles.post__img} />
                            <Card.Body className={styles.post__body}>
                                <Card.Title className={styles.post__title}>Website Audi clone Website Audi cloneWebsite Audi clone</Card.Title>
                                <Button className={styles.btn__post}>
                                    <svg width="auto" height="auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 18L15 12L9 6" stroke="#15C8E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </Button>
                            </Card.Body>
                        </Card>
                        <Card className={styles.post}>
                            <Card.Img src="/img/productStudent.svg" className={styles.post__img} />
                            <Card.Body className={styles.post__body}>
                                <Card.Title className={styles.post__title}>Website Audi clone Website Audi cloneWebsite Audi clone</Card.Title>
                                <Button className={styles.btn__post}>
                                    <svg width="auto" height="auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 18L15 12L9 6" stroke="#15C8E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </Button>
                            </Card.Body>
                        </Card>
                        <Card className={styles.post}>
                            <Card.Img src="/img/productStudent.svg" className={styles.post__img} />
                            <Card.Body className={styles.post__body}>
                                <Card.Title className={styles.post__title}>Website Audi clone Website Audi cloneWebsite Audi clone</Card.Title>
                                <Button className={styles.btn__post}>
                                    <svg width="auto" height="auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 18L15 12L9 6" stroke="#15C8E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </Button>
                            </Card.Body>
                        </Card>
                        <Card className={styles.post}>
                            <Card.Img src="/img/productStudent.svg" className={styles.post__img} />
                            <Card.Body className={styles.post__body}>
                                <Card.Title className={styles.post__title}>Website Audi clone Website Audi cloneWebsite Audi clone</Card.Title>
                                <Button className={styles.btn__post}>
                                    <svg width="auto" height="auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 18L15 12L9 6" stroke="#15C8E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </Button>
                            </Card.Body>
                        </Card>
                        <Card className={styles.post}>
                            <Card.Img src="/img/productStudent.svg" className={styles.post__img} />
                            <Card.Body className={styles.post__body}>
                                <Card.Title className={styles.post__title}>Website Audi clone Website Audi cloneWebsite Audi clone</Card.Title>
                                <Button className={styles.btn__post}>
                                    <svg width="auto" height="auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 18L15 12L9 6" stroke="#15C8E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <div className={styles.bgBottom}></div>
                <div className={styles.btn__group}>
                    <Button className={styles.btn__prev}
                        onClick={scrollLeftHandler}
                    >
                        <svg width="auto" height="auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 18L9 12L15 6" stroke="#15C8E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.stroke__icon} />
                        </svg>
                    </Button>
                    <Button className={styles.btn__next}
                        onClick={scrollRightHandler}
                    >
                        <svg width="auto" height="auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 18L15 12L9 6" stroke="#15C8E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Button>
                </div>
            </div>
        </>
    )
}

export default ProductStudent 