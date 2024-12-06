'use client'
import { useState, useEffect } from "react"
import { Container, Col, Row } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {
    IconIntagarm, IconLinked, IconFb, IconTiktok,
    IconBG1, IconPhoneBlu, IconEmail, IconMapBlu,
    IconElip, IconElip1, IconElip2
} from '../component/icon/icons';
import c from '@public/styles/Contact/contact.module.css';
import Button from "../component/globalControl/btnComponent";
import { motion } from 'framer-motion';
import Notification from "@app/(user-global)/component/globalControl/Notification";

const Hero = () => {
    return (
        <Container className={c.Container}>
            <Row className={c.content}>
                <Col md={6} className={c.LeftHero}>
                    <h6 className={c.subHeading}>/Bắt đầu</h6>
                    <h2 className={c.heading}>Hãy liên lạc với chúng tôi.<br /> Chúng tôi ở đây để hỗ trợ bạn.</h2>
                </Col>
                <Col md={6} className={c.RightHero}>
                    <div className={c.bgDecor}>
                        <div><IconBG1 /></div>

                    </div>
                    <div className={c.bgDecor1}>
                        <div><IconBG1 /></div>
                    </div>
                    <IconIntagarm />
                    <IconLinked />
                    <IconFb />
                    <IconTiktok />
                </Col>
            </Row>
        </Container >
    )
}


const Form = () => {
    const [type, setType] = useState<NotiType>("complete");
    const [message, setMessage] = useState<string>("");
    const [showNotification, setShowNotification] = useState(false);
    const [formData, setFormData] = useState<{
        name: string;
        email: string;
        content: string;
        interests: string[];
    }>({
        name: '',
        email: '',
        content: '',
        interests: [],
    });
    // State để lưu lỗi của form
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        content: '',
    });

    // Hàm xử lý khi người dùng thay đổi input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Hàm xử lý khi thay đổi checkbox
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            interests: checked
                ? [...prev.interests, id]
                : prev.interests.filter((item) => item !== id),
        }));
    };

    // Hàm kiểm tra lỗi
    const validateForm = () => {
        const newErrors = {
            name: '',
            email: '',
            content: '',
        };

        if (!formData.name) {
            newErrors.name = 'Tên đăng nhập là bắt buộc.';
        }

        if (!formData.email) {
            newErrors.email = 'Email là bắt buộc.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email không hợp lệ.';
        }

        if (!formData.content) {
            newErrors.content = 'Nội dung là bắt buộc.';
        }

        setErrors(newErrors);
        return Object.values(newErrors).every((error) => error === '');
    };

    // Hàm submit form

    const handleSubmit = async () => {
        // Chuyển đổi interests thành chuỗi
        const payload = {
            name: formData.name,
            content: formData.content,
            email: formData.email,
            name_course: formData.interests.join(', '),
        };
        console.log(payload)
        try {
            const response = await fetch('/api/addGoogleSheet/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
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

    useEffect(() => {
        const hasData = Object.values(formData).some((value) => value !== '');
        if (hasData) {
            validateForm();
        }
    }, [formData]);


    return (
        <Container className={c.Container}>
            <Row className={c.content}>
                <Col md={6} className={c.LeftHero}>
                    <h6 className={c.subHeading}>/Để lại thông tin</h6>
                </Col>
                <Col md={6} className={c.RightHero}>
                </Col>
            </Row >

            <Row className={c.form}>
                <Col md={4} className={c.LeftForm}>

                    <div className={c.ContentInfo}>
                        <div className={c.topInfoForm}>
                            <h4 className={c.titleForm}>Thông tin liên hệ</h4>
                            <p className={c.subTitleForm}>Hãy liên hệ với chúng tôi để biết thêm nhiều thông tin</p>
                        </div>
                        <div className={c.contactItems}>
                            <div className={c.contactItem}><IconPhoneBlu /> 0907578881</div>
                            <div className={c.contactItem}><IconEmail /> contact@tto.edu.vn</div>
                            <div className={c.contactItem}><IconMapBlu /> 720A Đ. Điện Biên Phủ, Vinhomes Tân Cảng, Bình Thạnh, Hồ Chí Minh 72300</div>
                        </div>
                    </div>

                    <div className={c.socials}>
                        <IconLinked />
                        <IconIntagarm />
                        <IconFb />
                        <IconTiktok />
                        <div className={c.ElipSocial}><IconElip /></div>
                        <div className={c.ElipSocial1}><IconElip1 /></div>
                        <div className={c.ElipSocial2}><IconElip2 /></div>
                    </div>
                </Col>
                <Col md={8} className={c.RightForm}>
                    <h5 className={c.titleRForm}>Nhập thông tin để được chỗ trợ</h5>
                    <form className={c.formContainer} onSubmit={handleSubmit}>
                        <Row className={c.topForm}>
                            <Col md={6} className={`${c.formGroup} ${c.formItem}`}>
                                <label className={c.formLabel}>Tên của bạn</label>
                                <input className={c.formControl}
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange} />
                                {errors.name && <span className={c.formMessage}>{errors.name}</span>}
                                <span className={c.formMessage}></span>
                            </Col>

                            <Col md={6} className={`${c.formGroup} ${c.formItem}`}>
                                <label className={c.formLabel}>Email</label>
                                <input className={c.formControl}
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                {errors.email && (<span className={c.formMessage}>{errors.email}</span>)}
                            </Col>
                        </Row>

                        <div className={c.formGroup}>
                            <label className={c.formLabel}>Nội dung</label>
                            <textarea className={`${c.formControl} ${c.formControlTextAre}`}
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                            />
                            {errors.content && (<span className={c.formMessage}>{errors.content}</span>)}
                        </div>

                        <div className={c.formCheckBox}>
                            {['Ui/Ux Designer', 'HTML CSS PRO', 'PHP 1'].map((item) => (
                                <label key={item} htmlFor={item}>
                                    <input
                                        type="checkbox"
                                        id={item}
                                        checked={formData.interests.includes(item)}
                                        onChange={handleCheckboxChange}
                                    />
                                    {item}
                                </label>
                            ))}
                        </div>
                        <div className={c.ctaForm}>

                            <Button
                                type="premary"
                                status="noBorder"
                                size="S"
                                height={40}
                                leftIcon={false}
                                rightIcon={false}
                            >
                                Hủy
                            </Button>
                            <Button
                                type="premary"
                                status="hover"
                                size="S"
                                height={40}
                                leftIcon={false}
                                rightIcon={false}
                                onClick={handleSubmit}
                            >
                                Gửi
                            </Button>
                        </div>
                    </form>
                </Col>
            </Row>
            {
                showNotification && (
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ duration: 1 }}
                        className={c.noteTap}
                    >
                        <Notification type={type} message={message} position="bottom-left" />
                    </motion.div>
                )
            }
        </Container>
    );
};
const Map = () => {
    return (
        <Container className={c.Container}>
            <Row className={c.content}>
                <Col md={12} className={c.LeftHero}>
                    <h6 className={c.subHeading}>/Vị trí</h6>
                </Col>
                <Col md={12} >
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15673.775552610829!2d106.61577860969324!3d10.853803803453262!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752b6c59ba4c97%3A0x535e784068f1558b!2zVHLGsOG7nW5nIENhbyDEkeG6s25nIEZQVCBQb2x5dGVjaG5pYw!5e0!3m2!1svi!2s!4v1733215726648!5m2!1svi!2s" width="100%" height="450" loading="lazy" ></iframe>
                </Col>
            </Row >
        </Container>
    )
}

export { Hero, Form, Map };