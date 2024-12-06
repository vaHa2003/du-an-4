import React, { useState } from 'react';
import styles from '@public/styles/globalControl/FeedBack.module.css';
import Notification from "@app/(user-global)/component/globalControl/Notification";
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';
import { motion } from 'framer-motion';
const FeedBack: React.FC = () => {
    const [name, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [content, setQuest] = useState('');
    const [validated, setValidated] = useState(false);
    const [type, setType] = useState<NotiType>("complete");
    const [message, setMessage] = useState<string>("");
    const [showNotification, setShowNotification] = useState(false);
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        setValidated(true);

        // Tạo đối tượng dữ liệu từ form
        const formData = {
            name,
            email,
            content,
            name_course: ""
        };
        try {
            const response = await fetch('/api/addGoogleSheet/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (!response.ok) {
                setType("fail");
                setMessage(result.message || "Có lỗi xảy ra");
            } else {
                setType("success");
                setMessage("Thông tin đã được gửi bạn sẽ nhận được email phản hồi từ TTO.SH");
            }

            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 3000);
        } catch (error) {
            alert('Có lỗi xảy ra khi kết nối với server.');
        }
    };

    return (
        <Container className={styles.container}>
            <Row className={styles.body}>
                <Col className={styles.header}>
                    <h2 className={styles.heading}>Liên hệ tư vấn</h2>
                    <h4 className={styles.subTitle}>Call me</h4>
                </Col>
                <Col className={styles.main}>
                    <Image src="/img/imageSup.svg" alt="" className={styles.imgLeft} />
                    <Form className={styles.formRegister} noValidate validated={validated} onSubmit={handleSubmit}>
                        <fieldset className={styles.fieldsetLogin}>
                            <legend className={styles.fieldsetLogin__title}>Nhập thông tin của bạn</legend>
                            <legend className={styles.fieldsetLogin__subTitle}>Bạn sẽ nhận được hỗ trợ từ nhân viên của TTO.SH qua email !</legend>
                        </fieldset>
                        <section className={styles.gap1}>
                            <section className={styles.gap2}>
                                <Form.Group className={styles.formControlRegister} controlId="validationUserName">
                                    <Form.Label className={styles.formControlRegister__label}>
                                        Tên của bạn là gì?
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        required
                                        className={styles.formControlRegister__input}
                                        value={name}
                                        onChange={(e) => setUserName(e.target.value)}
                                    />
                                    <Form.Control.Feedback type="invalid" className={styles.feedBack}>
                                        Hãy nhập tên đăng nhập
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className={styles.formControlRegister} controlId="validationEmail">
                                    <Form.Label className={styles.formControlRegister__label}>
                                        Email của bạn?
                                    </Form.Label>
                                    <Form.Control
                                        type="email"
                                        required
                                        className={styles.formControlRegister__input}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <Form.Control.Feedback type="invalid" className={styles.feedBack}>
                                        Hãy nhập email hợp lệ
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className={styles.formControlRegister} controlId="validationQuest">
                                    <Form.Label className={styles.formControlRegister__label}>
                                        Nhập câu hỏi của bạn?
                                    </Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={4}
                                        required
                                        className={styles.formControlRegister__input__text}
                                        value={content}
                                        onChange={(e) => setQuest(e.target.value)}
                                    />
                                    <Form.Control.Feedback type="invalid" className={styles.feedBack}>
                                        Chưa nhập câu hỏi
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </section>
                            <div className={styles.note}>
                                Bằng cách nhấn gửi bạn sẽ thông thông tin của bạn đến TTO.SH.
                                Bạn sẽ nhận được các email thông báo khuyến mãi của TTO.SH
                            </div>
                            <Button type='submit' className={styles.btn__submit}>Gửi</Button>
                        </section>
                    </Form>
                </Col>
            </Row>
            {
                showNotification && (
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ duration: 1 }}
                        className={styles.noteTap}
                    >
                        <Notification type={type} message={message} position="bottom-left" />
                    </motion.div>
                )
            }
        </Container>
    );
};

export default FeedBack;
