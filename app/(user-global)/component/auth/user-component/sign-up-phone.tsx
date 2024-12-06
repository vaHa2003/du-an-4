'use client'
import React, { useEffect, useState } from 'react';
import styles from '@public/styles/register/Register.module.css';
import { Button, Card, Form, Image } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useRouter } from 'next/navigation';

interface RegisterFormData {
    userName: string;
    phonenumber: string;
    password: string;
    confirmPassword: string;
    token: number | string;
    role: string;
}

const RegisterPhone: React.FC = () => {
    const [isCheckPass, setIsCheckPass] = useState(true);
    const [isRememberRegister, setIsRememberRegister] = useState(false);
    const router = useRouter();
    let errorShown = false;
    const [countdown, setCountdown] = useState(30);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [getTokenInput, setGetTokenInput] = useState(true)

    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const date = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const second = String(now.getSeconds()).padStart(2, '0');
    const milliseconds = String(now.getMilliseconds()).padStart(3, '0');

    const formik = useFormik({
        initialValues: {
            fullName: '',
            phonenumber: '',
            password: '',
            confirm_password: '',
            check: '',
        },
        validationSchema: Yup.object({
            fullName: Yup.string()
                .transform(value => value ? value.replace(/\b\w/g, (char: string) => char.toUpperCase()) : '')
                .required('Vui lòng nhập họ và tên')
                .min(2, "Họ và tên phải có ít nhất 2 ký tự"),
            phonenumber: Yup.string()
                .matches(/^(03[2-9]|05[6|8|9]|07[0|6-9]|08[1-9]|09[0-9]|02[0-9])\d{7}$/, 'Số điện thoại không hợp lệ')
                .required('Vui lòng nhập số điện thoại'),
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
                .required('Vui lòng nhập mã xác nhận từ số điện thoại'),
        }),
        onSubmit: async (values, { setSubmitting, setFieldError }) => {
            console.log(`${year}${month}${date}${hours}${minute}${second}${milliseconds}`);

            if (errorShown) return;
            try {
                const res = await fetch('/api/newUser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        fullname: values.fullName,
                        phonenumber: values.phonenumber,
                        password: values.password,
                        confirm_password: values.confirm_password,
                        verify: values.check,
                        email: `hellotto.${year}${month}${date}${hours}${minute}${second}${milliseconds}@gmail.com`
                    }),
                });

                if (!res.ok) {
                    const errorData = await res.json();
                    console.log(errorData);
                    console.log("Status:", res.status);
                    if (res.status === 422) {
                        if (errorData.errors && errorData.errors.phonenumber) {
                            alert(errorData.errors.phonenumber);
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

    const handleSendCode = async () => {
        setGetTokenInput(false)
        formik.setFieldTouched('phonenumber', true);

        if (!formik.values.phonenumber) {
            formik.setFieldError('phonenumber', 'Vui lòng nhập số điện thoại trước khi gửi mã');
            return;
        }

        if (formik.errors.phonenumber) {
            return;
        }

        try {
            const res = await fetch('/api/verifyPhone', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phonenumber: formik.values.phonenumber }),
            });

            const data = await res.json()
            console.log(data);


            if (res.ok) {
                alert('Mã xác nhận đã được gửi đến số điện thoại của bạn');
                setIsButtonDisabled(true);
                setCountdown(120);
            } else if (res.status === 429) {
                alert('vui lòng chờ cho lượt gửi tiếp theo')
                setIsButtonDisabled(true);
                setCountdown(120);
            }
            else {
                alert('Gửi mã thất bại. Vui lòng thử lại');
                formik.setFieldValue('check', '')
                console.log(await res.json());

            }
        } catch (error) {
            console.error('Lỗi khi gửi mã xác nhận:', error);
            alert('Có lỗi xảy ra khi gửi mã xác nhận');
            formik.setFieldValue('check', '')
        }
    };

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;
        if (isButtonDisabled && countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
        }

        if (countdown === 0) {
            setIsButtonDisabled(false);
        }

        return () => {
            if (timer) clearInterval(timer);
        };
    }, [isButtonDisabled, countdown]);

    useEffect(() => {
        setIsButtonDisabled(false);
        setCountdown(0);

    }, [formik.values.phonenumber]);

    const minutes = Math.floor(countdown / 60);
    const seconds = countdown % 60;

    const handleCheckPass = () => {
        setIsCheckPass(!isCheckPass);
    };

    const handleRememberRegister = () => {
        setIsRememberRegister(!isRememberRegister);
    };

    return (
        <>
            <Card.Body className={styles.bodyRegister}>
                <Form className={styles.formRegister} onSubmit={formik.handleSubmit}>
                    <section className={styles.validateRegister}>
                        <Form.Group className={styles.formControlRegister}>
                            <Form.Label htmlFor="fullName" className={styles.formControlRegister__label}>
                                Tên của bạn là gì?
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Họ và tên"
                                className={styles.formControlRegister__input}
                                name="fullName"
                                value={formik.values.fullName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.fullName && formik.errors.fullName && (
                                <div className={styles.feedBack}>{formik.errors.fullName}</div>
                            )}
                        </Form.Group>
                        <Form.Group className={styles.formControlRegister}>
                            <Form.Label htmlFor="phonenumber" className={styles.formControlRegister__label}>
                                Số điện thoại của bạn?
                            </Form.Label>
                            <Form.Control
                                type="tel"
                                placeholder="Số điện thoại"
                                className={styles.formControlRegister__input}
                                name="phonenumber"
                                value={formik.values.phonenumber}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.phonenumber && formik.errors.phonenumber && (
                                <div className={styles.feedBack}>{formik.errors.phonenumber}</div>
                            )}
                        </Form.Group>
                        <Form.Group className={styles.formControlRegister}>
                            <section className={styles.checkPass}>
                                <Form.Label htmlFor="password" className={styles.formControlRegister__label}>Mật khẩu</Form.Label>
                                <Button
                                    type="button"
                                    onClick={handleCheckPass}
                                    className={styles.checkPass__btn}
                                >
                                    {isCheckPass ? (
                                        <>
                                            <Image src="/img/eyeHidden.svg" alt="Ẩn mật khẩu" className={styles.checkPass__img} />
                                            <div className={styles.checkPass__text}>ẩn</div>
                                        </>
                                    ) : (
                                        <>
                                            <Image src="/img/eye.svg" alt="Hiện mật khẩu" className={styles.checkPass__img} />
                                            <div className={styles.checkPass__text}>hiện</div>
                                        </>
                                    )}
                                </Button>
                            </section>
                            <Form.Control
                                type={isCheckPass ? 'password' : 'text'}
                                placeholder="Mật khẩu"
                                className={styles.formControlRegister__input}
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                autoComplete="new-password"
                            />
                            <div className={styles.noteRegister}>
                                Sử dụng 8 ký tự trở lên kết hợp chữ cái, số và ký hiệu
                            </div>
                            {formik.touched.password && formik.errors.password && (
                                <div className={styles.feedBack}>{formik.errors.password}</div>
                            )}
                        </Form.Group>
                        <Form.Group className={styles.formControlRegister}>
                            <Form.Label htmlFor="confirm_password" className={styles.formControlRegister__label}>Nhập lại mật khẩu</Form.Label>
                            <Form.Control
                                type={isCheckPass ? 'password' : 'text'}
                                placeholder="Nhập lại mật khẩu"
                                className={styles.formControlRegister__input}
                                name="confirm_password"
                                value={formik.values.confirm_password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.confirm_password && formik.errors.confirm_password && (
                                <div className={styles.feedBack}>{formik.errors.confirm_password}</div>
                            )}
                        </Form.Group>
                        <Form.Group className={styles.userNameRetrieve}>
                            <Form.Label htmlFor="confirm_password" className={styles.userNameRetrieve__label}>Nhập mã xác nhận từ số điện thoại</Form.Label>
                            <Form.Control
                                type={'text'}
                                placeholder="Nhập mã xác nhận"
                                className={styles.userNameRetrieve__input}
                                name="check"
                                value={formik.values.check}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                disabled={getTokenInput}
                            />
                            {formik.touched.check && formik.errors.check && (
                                <div className={styles.feedBack}>{formik.errors.check}</div>
                            )}
                            <Button
                                type='button'
                                className={styles.sendCode}
                                onClick={handleSendCode}
                                disabled={isButtonDisabled}
                            >
                                {isButtonDisabled ? `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}` : 'Gửi mã'}
                            </Button>
                        </Form.Group>
                    </section>
                    <Button
                        type="button"
                        className={styles.rememberRegister}
                        onClick={handleRememberRegister}
                    >
                        <Image src={isRememberRegister ? "/img/checkBoxFalse.svg" : "/img/checkBoxTrue.svg"} alt="" className={styles.rememberRegister__img} />
                        <div className={styles.rememberRegister__div}>Bằng cách tạo tài khoản, bạn đồng ý với Điều khoản sử dụng và Chính sách quyền riêng tư.</div>
                    </Button>
                    <Button type="submit" className={styles.btnSubmit} disabled={formik.isSubmitting}>Đăng ký</Button>
                </Form>
            </Card.Body>
        </>
    );
};

export default RegisterPhone;
