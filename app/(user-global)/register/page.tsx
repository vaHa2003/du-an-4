'use client'
import React, { useEffect, useState } from 'react';
import styles from '@public/styles/register/Register.module.css';
import Link from 'next/link';
import { Button, Card, Container, Form, Image } from 'react-bootstrap';
import * as Yup from 'yup'
import Body from '../component/globalControl/body';
import { useForm } from 'react-hook-form';
import FbLogin from '../component/auth/user-component/fbLogin';
import GgLogin from '../component/auth/user-component/ggLogin';
import { useFormik } from 'formik';

import { useRouter } from 'next/navigation';
import RegisterPhone from '@app/(user-global)/component/auth/user-component/sign-up-phone';
import RegisterEmail from '@app/(user-global)/component/auth/user-component/sign-up-email';

interface RegisterFormData {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
    token: number | string;
    role: string;
}

const Register: React.FC = () => {
    const [isCheckPass, setIsCheckPass] = useState(true);
    const [isRememberRegister, setIsRememberRegister] = useState(false);
    const router = useRouter();
    let errorShown = false;
    const [countdown, setCountdown] = useState(30);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [getTokenInput, setGetTokenInput] = useState(true)
    const [checkRegister, setCheckRegister] = useState(false);
    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            password: '',
            confirm_password: '',
            check: '',
        },
        validationSchema: Yup.object({
            fullName: Yup.string()
                .transform(value => value ? value.replace(/\b\w/g, (char: string) => char.toUpperCase()) : '')
                .required('Vui lòng nhập họ và tên')
                .min(2, "Họ và tên phải có ít nhất 2 ký tự"),
            email: Yup.string()
                .email('Email không hợp lệ')
                .required('Vui lòng nhập email'),
            password: Yup.string()
                .transform(value => value.replace(/\s+/g, ''))
                .required('Vui lòng nhập mật khẩu')
                .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
                .max(12, 'Mật khẩu tối đa là 12 ký tự')
                .matches(/[A-Z]/, 'Mật khẩu phải có ít nhất 1 ký tự viết hoa')
                .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Mật khẩu phải có ít nhất 1 ký tự đặc biệt'),
            confirm_password: Yup.string()
                .oneOf([Yup.ref('password')], 'Mật khẩu không khớp')
                .required('Vui lòng nhập lại mật khẩu'),
            check: Yup.string()
                .required('Vui lòng nhập mã xác nhận từ email'),
        }),
        onSubmit: async (values, { setSubmitting, setFieldError }) => {
            if (errorShown) return;
            try {
                const res = await fetch('/api/newUser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        fullname: values.fullName,
                        email: values.email,
                        password: values.password,
                        confirm_password: values.confirm_password,
                        token: values.check,
                        role: 'admin'
                    }),
                });

                if (!res.ok) {
                    const errorData = await res.json();
                    console.log(errorData);
                    console.log("Status:", res.status);
                    if (res.status === 422) {
                        if (errorData.errors && errorData.errors.email) {
                            alert(errorData.errors.email);
                        } else if (errorData.errors && errorData.errors.token.join()) {
                            alert(errorData.errors.token);
                        }
                        errorShown = true;
                    } else if (res.status === 400) {
                        alert(errorData.message);
                    } else {
                        throw new Error(errorData.message || 'Đăng ký thất bại');
                    }
                } else {
                    alert('Đăng ký thành công');
                    router.push('/login');
                }
            } catch (error) {
                if (error instanceof Error) {
                    setFieldError('general', error.message);
                } else {
                    setFieldError('general', 'Đã xảy ra lỗi không xác định');
                }
            } finally {
                setSubmitting(false);
            }
        }
    });

    const handleChangeRegister = () => {
        const newCheckRegister = !checkRegister;
        setCheckRegister(newCheckRegister);
        localStorage.setItem('register', newCheckRegister ? 'phone' : 'email');
    };
    return (
        <>
            <title>TTO - Đăng ký</title>
            <meta name="description" content="Được tạo bởi Taem TTO" />
            <Body>
                <Container className={styles.main}>
                    <div className={styles.main__container}>
                        <Image src="/img/pandaRegister.svg" alt="logo register" className={styles.logoRegister} />
                        <Card className={styles.form}>
                            <Card.Header className={styles.headerRegister}>
                                <Card.Title className={styles.headerRegister__title}>Đăng ký tài khoản</Card.Title>
                                <Link href="/login" className={styles.linkLogin}>Bạn đã có tài khoản? <bdi className={styles.link__bdi}> Đăng nhập</bdi></Link>
                                <div className={styles.linkLogin} onClick={() => handleChangeRegister()}>
                                    <div className={styles.link__bdi}>
                                        {checkRegister ? 'đăng nhập bằng email' : 'đăng nhập bằng số điện thoại'}
                                    </div>
                                </div>
                            </Card.Header>
                            {checkRegister ? <RegisterPhone></RegisterPhone> : <RegisterEmail></RegisterEmail>}
                            <Card.Footer className={styles.withRegister}>
                                <Card.Subtitle className={styles.headWithRegister}>
                                    Tiếp tục với
                                </Card.Subtitle>
                                <section className={styles.RegisterMedia}>
                                    <FbLogin />
                                    <GgLogin />
                                </section>
                            </Card.Footer>
                        </Card>
                    </div>
                </Container>
            </Body>
        </>
    );
};

export default Register;