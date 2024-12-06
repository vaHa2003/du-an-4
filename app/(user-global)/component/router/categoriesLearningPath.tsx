'use client'

import { Button, Container, Image } from "react-bootstrap"
import styles from '@public/styles/learningPath/CategoriesLearningPath.module.css'
import { useEffect, useRef, useState } from "react";

const CategoriesLearningPath: React.FC = () => {
    const cateMainRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (cateMainRef.current) {
            setIsDragging(true);
            setStartX(e.pageX - cateMainRef.current.offsetLeft);
            setScrollLeft(cateMainRef.current.scrollLeft);
        }
    };

    const handleMouseLeaveOrUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !cateMainRef.current) return;
        e.preventDefault();
        const x = e.pageX - cateMainRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        cateMainRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleWheel = (e: WheelEvent) => {
        if (cateMainRef.current) {
            e.preventDefault();
            cateMainRef.current.scrollLeft += e.deltaY;
        }
    };

    useEffect(() => {
        const currentRef = cateMainRef.current;
        if (currentRef) {
            currentRef.addEventListener('wheel', handleWheel);
        }
        return () => {
            if (currentRef) {
                currentRef.removeEventListener('wheel', handleWheel);
            }
        };
    }, [cateMainRef]);

    const scrollLeftHandler = () => {
        if (cateMainRef.current) {
            cateMainRef.current.scrollLeft -= 300;
        }
    };

    const scrollRightHandler = () => {
        if (cateMainRef.current) {
            cateMainRef.current.scrollLeft += 300;
        }
    };
    return (
        <>
            <Container className={styles.conatiner}>
                <Button className={styles.btn__prev}
                    onClick={scrollLeftHandler}
                >
                    <svg width="auto" height="auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 18L9 12L15 6" stroke="#15C8E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.stroke__icon} />
                    </svg>
                </Button>
                <article className={styles.cateMain}
                    ref={cateMainRef}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeaveOrUp}
                    onMouseUp={handleMouseLeaveOrUp}
                    onMouseMove={handleMouseMove}
                >
                    <section className={styles.cateBox}>
                        <section className={styles.cateSec}>
                            <section className={styles.secTitle__group}>
                                <h2 className={styles.secTitle}>FRONT-END</h2>
                                <h2 className={styles.secBlueTitle}>WEB DEVELOPMENT</h2>
                            </section>
                            <section className={styles.img__group}>
                                <Image src="/img/htmlIcon.svg" className={styles.img__elenment} />
                                <Image src="/img/jsIcon.svg" className={styles.img__elenment} />
                                <Image src="/img/cssIcon.svg" className={styles.img__elenment} />
                                <Image src="/img/reactIcon.svg" className={styles.img__elenment} />
                                <Image src="/img/figmaIcon.svg" className={styles.img__elenment} />
                            </section>
                        </section>
                        <Image src="/img/aboutBe.svg" className={styles.img__about} />
                    </section>
                    <section className={styles.cateBox}>
                        <section className={styles.cateSec}>
                            <section className={styles.secTitle__group}>
                                <h2 className={styles.secTitle}>BACK-END</h2>
                                <h2 className={styles.secBlueTitle}>WEB DEVELOPMENT</h2>
                            </section>
                            <section className={styles.img__group}>
                                <Image src="/img/Document.svg" className={styles.img__elenment} />
                                <Image src="/img/phpIcon.svg" className={styles.img__elenment} />
                                <Image src="/img/nodejsIcon.svg" className={styles.img__elenment} />
                                <Image src="/img/mysqlIcon.svg" className={styles.img__elenment} />
                                <Image src="/img/apiIcon.svg" className={styles.img__elenment} />
                            </section>
                        </section>
                        <Image src="/img/aboutFe.svg" className={styles.img__about} />
                    </section>
                    <section className={styles.cateBox}>
                        <section className={styles.cateSec}>
                            <section className={styles.secTitle__group}>
                                <h2 className={styles.secTitle}>UIUX DESIGNER</h2>
                                <h2 className={styles.secBlueTitle}>WEB DEVELOPMENT</h2>
                            </section>
                            <section className={styles.img__group}>
                                <Image src="/img/Paint.svg" className={styles.img__elenment} />
                                <Image src="/img/figmaIcon.svg" className={styles.img__elenment} />
                                <Image src="/img/Rocket1h.svg" className={styles.img__elenment} />
                                <Image src="/img/iPhone.svg" className={styles.img__elenment} />
                                <Image src="/img/Bug.svg" className={styles.img__elenment} />
                            </section>
                        </section>
                        <Image src="/img/Design.svg" className={styles.img__about} />
                    </section>
                    <section className={styles.cateBox}>
                        <section className={styles.cateSec}>
                            <section className={styles.secTitle__group}>
                                <h2 className={styles.secTitle}>KHÓA HỌC CỦA BẠN</h2>
                                <h2 className={styles.secBlueTitle}>WEB DEVELOPMENT</h2>
                            </section>
                            <section className={styles.img__group}>
                                <Image src="/img/Paint.svg" className={styles.img__elenment} />
                                <Image src="/img/figmaIcon.svg" className={styles.img__elenment} />
                                <Image src="/img/Rocket1h.svg" className={styles.img__elenment} />
                                <Image src="/img/iPhone.svg" className={styles.img__elenment} />
                                <Image src="/img/Bug.svg" className={styles.img__elenment} />
                            </section>
                        </section>
                        <Image src="/img/Design.svg" className={styles.img__about} />
                    </section>
                </article>
                <Button className={styles.btn__next}
                    onClick={scrollRightHandler}
                >
                    <svg width="auto" height="auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 18L15 12L9 6" stroke="#15C8E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Button>
            </Container>
        </>
    )
}

export default CategoriesLearningPath