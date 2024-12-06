'use client'

import { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, Image, InputGroup, Row } from "react-bootstrap";
import styles from '@public/styles/learningPath/CreateRouter.module.css';
import ButtonCpn from "../globalControl/btnComponent";

interface MyData {
    route_id: string|number;
    name_route: string;
}

type MyDataArray = MyData[];

const CreateRouter: React.FC = () => {
    const inputRef1 = useRef<HTMLInputElement>(null);
    const inputRef2 = useRef<HTMLInputElement>(null);
    const [isFocused1, setIsFocused1] = useState(false);
    const [isFocused2, setIsFocused2] = useState(false);
    const [open1, SetOpen1] = useState(false)
    const [open2, SetOpen2] = useState(false)
    const [routerList, setRouterList] = useState<MyDataArray>([])
    const [uniqueCourses, setUniqueCourses] = useState<MyDataArray>([]);
    const [selectedRoutes, setSelectedRoutes] = useState<number[]>([]);

    const handleFocus1 = () => {
        if (inputRef1.current) {
            inputRef1.current.focus();
        }
    };

    const handleFocus2 = () => {
        if (inputRef2.current) {
            inputRef2.current.focus();
        }
    };

    const handleOpenMenu1 = () => {
        SetOpen1(!open1)
    }

    const handleOpenMenu2 = () => {
        SetOpen2(!open2)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/routerAll/');
                const data = await res.json();
                setRouterList(data.data)
                setUniqueCourses(uniqueCourses);
            } catch (error) {
                console.log('errer: ', error);
            }
        }
        fetchData()
    }, [])

    return (
        <>
            <Container className={styles.conatiner}>
                <Row className={styles.body}>
                    <Col className={styles.header}>
                        <h1 className={styles.title}>Tạo lộ trình mới </h1>
                        <h3 className={styles.subTitle}>
                            Tạo lộ trình mới giúp bạn xây dựng kế hoạch học tập cá nhân hóa, sắp xếp các kỹ năng theo thứ tự hợp lý và theo dõi tiến độ để đạt được mục tiêu nhanh chóng.
                        </h3>
                    </Col>
                    <Col className={styles.main}>
                        <Form className={styles.form__container}>
                            <Row className={styles.form__container__top}>
                                <Col className={styles.form__container__top__left}>
                                    <Form.Group controlId="validationCustomUsername" className={styles.formGroup__top}>
                                        <Form.Label className={styles.formGroup__top__title}>Nhập tên lộ trình của riêng bạn</Form.Label>
                                        <InputGroup
                                            hasValidation
                                            className={`${styles.inputGroup} ${isFocused1 ? styles.border__blue : styles.border__black}`}
                                            tabIndex={0}
                                            onClick={handleFocus1}
                                        >
                                            <InputGroup.Text id="inputGroupPrepend" className={styles.inputGroup__text}>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.inputGroup__text__icon}>
                                                    <g clip-path="url(#clip0_590_6710)">
                                                        <path d="M4 19L8 5" stroke="#DBDBDB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${isFocused1 ? styles.blue : styles.black}`} />
                                                        <path d="M16 5L20 19" stroke="#DBDBDB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${isFocused1 ? styles.blue : styles.black}`} />
                                                        <path d="M12 8V6" stroke="#DBDBDB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${isFocused1 ? styles.blue : styles.black}`} />
                                                        <path d="M12 13V11" stroke="#DBDBDB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${isFocused1 ? styles.blue : styles.black}`} />
                                                        <path d="M12 18V16" stroke="#DBDBDB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${isFocused1 ? styles.blue : styles.black}`} />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_590_6710">
                                                            <rect width="24" height="24" fill="white" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </InputGroup.Text>
                                            <Form.Control
                                                type="text"
                                                placeholder="Nhập tên lộ trình của riêng bạn"
                                                aria-describedby="inputGroupPrepend"
                                                required
                                                className={styles.form__control__top}
                                                ref={inputRef1}
                                                onFocus={() => setIsFocused1(true)}
                                                onBlur={() => setIsFocused1(false)}
                                            />
                                        </InputGroup>
                                        <Form.Control.Feedback type="invalid" className={styles.feedBack__top}>
                                            Vui lòng nhập đầy đủ thông tin
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col className={styles.form__container__top__right}>
                                    <Form.Group controlId="validationCustomUsername" className={styles.formGroup__top}>
                                        <Form.Label className={styles.formGroup__top__title}>Nhập tên lộ trình của riêng bạn</Form.Label>
                                        <InputGroup
                                            hasValidation
                                            className={`${styles.inputGroup} ${isFocused2 ? styles.border__blue : styles.border__black}`}
                                            tabIndex={0}
                                            onClick={handleFocus2}
                                        >
                                            <InputGroup.Text id="inputGroupPrepend" className={styles.inputGroup__text}>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.inputGroup__text__icon}>
                                                    <g clip-path="url(#clip0_590_6710)">
                                                        <path d="M4 19L8 5" stroke="#DBDBDB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${isFocused2 ? styles.blue : styles.black}`} />
                                                        <path d="M16 5L20 19" stroke="#DBDBDB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${isFocused2 ? styles.blue : styles.black}`} />
                                                        <path d="M12 8V6" stroke="#DBDBDB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${isFocused2 ? styles.blue : styles.black}`} />
                                                        <path d="M12 13V11" stroke="#DBDBDB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${isFocused2 ? styles.blue : styles.black}`} />
                                                        <path d="M12 18V16" stroke="#DBDBDB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${isFocused2 ? styles.blue : styles.black}`} />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_590_6710">
                                                            <rect width="24" height="24" fill="white" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </InputGroup.Text>
                                            <Form.Control
                                                type="text"
                                                placeholder="Nhập tên lộ trình của riêng bạn"
                                                aria-describedby="inputGroupPrepend"
                                                required
                                                className={styles.form__control__top}
                                                ref={inputRef2}
                                                onFocus={() => setIsFocused2(true)}
                                                onBlur={() => setIsFocused2(false)}
                                            />
                                        </InputGroup>
                                        <Form.Control.Feedback type="invalid" className={styles.feedBack__top}>
                                            Vui lòng nhập đầy đủ thông tin
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className={styles.form__container__bottom}>
                                <Col className={styles.form__container__bottom__left}>
                                    <h3 className={styles.formGroup__bottom__title}>Chọn khóa học để thêm vào lộ trình</h3>
                                    <Button
                                        onClick={handleOpenMenu1}
                                        className={`${styles.btn__bottom} ${open1 ? styles.bd__blue : styles.bd__black}`}
                                    >
                                        <Image src='/img/box-black.svg' alt="" className={`${styles.btn__bottom__left} ${styles.icon1__l} ${open1 ? styles.none : styles.block}`} />
                                        <Image src='/img/box-blue.svg' alt="" className={`${styles.btn__bottom__left} ${styles.icon2__l} ${open1 ? styles.block : styles.none}`} />
                                        <div className={`${styles.btn__bottom__content} ${open1 ? styles.cl__black : styles.cl__gray}`}>
                                            Chọn khóa học muốn thêm vào lộ trình
                                        </div>
                                        <Image src="/img/chevron-black.svg" alt="" className={`${styles.btn__bottom__right} ${styles.icon1__r} ${open1 ? styles.none : styles.block}`} />
                                        <Image src="/img/chevronBlue-04.svg" alt="" className={`${styles.btn__bottom__right} ${styles.icon2__r} ${open1 ? styles.block : styles.none}`} />
                                    </Button>
                                    <div className={`${open1 ? styles.box : styles.h__0}`}>
                                        <article className={`${styles.box__r} ${open1 ? '' : styles.h__hidden}`}>
                                            {Array.isArray(routerList) ? (routerList.map((item) => (
                                                <Form.Group className={styles.formGroup__bottom} key={item.route_id}>
                                                    <Form.Check
                                                        type="checkbox"
                                                        label={`${item.name_route}`}
                                                        value={`${item.name_route}`}
                                                        id={`checkbox${item.route_id}`}
                                                        aria-describedby="inputGroupPrepend"
                                                        className={styles.customCheckbox}
                                                    />
                                                </Form.Group>
                                            ))) : (
                                                ''
                                            )}
                                        </article>
                                    </div>
                                </Col>
                                <Col className={styles.form__container__bottom__right}>
                                    <h3 className={styles.formGroup__bottom__title}>Chọn môn học để thêm vào lộ trình</h3>
                                    <Button
                                        onClick={handleOpenMenu2}
                                        className={`${styles.btn__bottom} ${open2 ? styles.bd__blue : styles.bd__black}`}
                                    >
                                        <Image src='/img/box-black.svg' alt="" className={`${styles.btn__bottom__left} ${styles.icon1__l} ${open2 ? styles.none : styles.block}`} />
                                        <Image src='/img/box-blue.svg' alt="" className={`${styles.btn__bottom__left} ${styles.icon2__l} ${open2 ? styles.block : styles.none}`} />
                                        <div className={`${styles.btn__bottom__content} ${open2 ? styles.cl__black : styles.cl__gray}`}>
                                            Chọn môn học muốn thêm vào lộ trình
                                        </div>
                                        <Image src="/img/chevron-black.svg" alt="" className={`${styles.btn__bottom__right} ${styles.icon1__r} ${open2 ? styles.none : styles.block}`} />
                                        <Image src="/img/chevronBlue-04.svg" alt="" className={`${styles.btn__bottom__right} ${styles.icon2__r} ${open2 ? styles.block : styles.none}`} />
                                    </Button>
                                    <section className={`${open2 ? styles.box__a : styles.h__0}`}>
                                        <article className={`${styles.box__r} ${open2 ? '' : styles.h__hidden}`}>
                                            <Form.Group className={styles.formGroup__bottom}>
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Javascript"
                                                    value="Javascript"
                                                    id="checkboxJavascript"
                                                    aria-describedby="inputGroupPrepend"
                                                    className={styles.customCheckbox}
                                                />
                                            </Form.Group>
                                            <Form.Group className={styles.formGroup__bottom}>
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Html"
                                                    value="Html"
                                                    id="checkboxHtml"
                                                    aria-describedby="inputGroupPrepend"
                                                    className={styles.customCheckbox}
                                                />
                                            </Form.Group>
                                            <Form.Group className={styles.formGroup__bottom}>
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Css"
                                                    value="Css"
                                                    id="checkboxCss1"
                                                    aria-describedby="inputGroupPrepend"
                                                    className={styles.customCheckbox}
                                                />
                                            </Form.Group>
                                            <Form.Group className={styles.formGroup__bottom}>
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Css Advanced"
                                                    value="CssAdvanced"
                                                    id="checkboxCss2"
                                                    aria-describedby="inputGroupPrepend"
                                                    className={styles.customCheckbox}
                                                />
                                            </Form.Group>
                                            <Form.Group className={styles.formGroup__bottom}>
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Css Responsive"
                                                    value="CssResponsive"
                                                    id="checkboxCss3"
                                                    aria-describedby="inputGroupPrepend"
                                                    className={styles.customCheckbox}
                                                />
                                            </Form.Group>
                                        </article>
                                    </section>
                                    <section className={styles.btn__group}>
                                        <ButtonCpn type="disable" hover={false} leftIcon={false} rightIcon={false} width={120}>Hủy</ButtonCpn>
                                        <ButtonCpn type="premary" hover={true} status="hover" leftIcon={false} rightIcon={false} width={142}>Thêm lộ trình</ButtonCpn>
                                    </section>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default CreateRouter;
