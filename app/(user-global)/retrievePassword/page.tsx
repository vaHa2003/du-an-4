'use client'

import styles from '@public/styles/retrievePassword/RetrievePassword.module.css'
import Link from 'next/link'
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Container, Image } from 'react-bootstrap';
import Body from '../component/globalControl/body';
import NewPasswordPage from '../component/auth/user-component/newPasswordPage';
import { useEffect, useState } from 'react';

const RetrievePassword: React.FC = () => {
    const [userId, setUserId] = useState<number | string>(0)
    const [countdown, setCountdown] = useState(30);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const validationSchema = Yup.object().shape({
        userName: Yup.string()
            .email('Hãy nhập đúng định dạng mail')
            .required('Hãy nhập tên đăng nhập hoặc email'),
        check: Yup.string()
            .required('Hãy nhập mã xác nhận')
            .matches(/^[a-zA-Z0-9]{6}$/, 'Mã xác nhận phải gồm 6 ký tự, không chứa ký tự đặc biệt và khoảng trắng'),
    });

    const handleGetToken = (userName: string, setFieldValue: any) => {
        if (userName) {
            fetch('/api/getToken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: userName })
            })
                .then(response => {
                    if (response.status == 404) {
                        alert('Email không tồn tại. Xin vui lòng nhập lại!')
                        setFieldValue('userName', '')
                    }
                    else if (response.status === 429) {
                        alert('Vui lòng chờ 2 phút sau để nhận mã mới')
                        setIsButtonDisabled(true);
                        setCountdown(30);
                    }
                    else if (response.status == 200) {
                        alert('Đã gửi mã về email')
                        setIsButtonDisabled(true);
                        setCountdown(30);
                    }
                    return response.json()
                })
                .then(data => {
                    console.log(data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }

    const handleSubmit = (values: { userName: string; check: string }, { setFieldValue, setSubmitting }: any) => {
        if (values.check) {
            fetch('/api/verifyToken/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: values.check })
            })
                .then(res => {

                    if (res.status === 400) {
                        alert('Mã xác thực không hợp lệ hoặc hết hiệu lực')
                        setFieldValue('check', '')
                    }
                    else if (res.status === 200) {
                        alert('Hoàn thành xác thực')
                    }
                    return res.json()
                })
                .then(data => {
                    console.log(data.user_id);
                    setUserId(data.user_id)
                })
                .catch(error => {
                    console.log('Error: ', error);
                    values.check = '';
                })
                .finally(() => {
                    setSubmitting(false);
                });
        }
    }

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;
        if (isButtonDisabled && countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
        }

        if (countdown === 0) {
            setIsButtonDisabled(false); // Mở lại nút khi hết thời gian
        }

        return () => {
            if (timer) clearInterval(timer); // Dọn dẹp timer khi component unmount hoặc countdown thay đổi
        };
    }, [isButtonDisabled, countdown]);
    // console.log('đây là user_id: ', userId);
    const minutes = Math.floor(countdown / 60);
    const seconds = countdown % 60;

    return (
        <>
            <Body>
                {
                    !userId ? (<>
                        <title>TTO - Quên mật khẩu</title>
                        <meta name="description" content="Được tạo bởi Team TTO" />
                        <Container className={styles.main}>
                            <div className={styles.main__container}>

                                <Formik
                                    initialValues={{ userName: '', check: '' }}
                                    validationSchema={validationSchema}
                                    onSubmit={(values, { setFieldValue, setSubmitting }) => {
                                        handleSubmit(values, { setFieldValue, setSubmitting });
                                    }}
                                >
                                    {({ values, isSubmitting, setFieldValue }) => (
                                        <FormikForm className={styles.formRetrieve}>
                                            <fieldset className={styles.headerRetrieve}>
                                                <legend className={styles.headerRetrieve__title}>Quên mật khẩu</legend>
                                                <legend className={styles.headerRetrieve__subTitle}>
                                                    Nhập email hoặc username của bạn và chúng tôi sẽ gửi cho bạn mã khôi phục mật khẩu.
                                                </legend>
                                                <Link href={'/login'} className={styles.back}>Quay về trang đăng nhập</Link>
                                            </fieldset>

                                            <section className={styles.validateRetrieve}>
                                                <div className={styles.userNameRetrieve}>
                                                    <label htmlFor="userName" className={styles.userNameRetrieve__label}>
                                                        Email hoặc tên người dùng
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        name="userName"
                                                        placeholder="Tên đăng nhập hoặc email"
                                                        className={styles.userNameRetrieve__input}
                                                    />
                                                    <ErrorMessage name="userName" component="div" className={styles.feedBack} />
                                                </div>

                                                <div className={styles.userNameRetrieve}>
                                                    <label htmlFor="check" className={styles.userNameRetrieve__label}>
                                                        Nhập mã xác nhận
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        name="check"
                                                        placeholder="Mã xác nhận"
                                                        className={styles.userNameRetrieve__input}
                                                    />
                                                    <ErrorMessage name="check" component="div" className={styles.feedBack} />
                                                    <Button
                                                        type="button"
                                                        className={styles.sendCode}
                                                        onClick={() => {
                                                            if (values.userName) {
                                                                handleGetToken(values.userName, setFieldValue);
                                                            } else {
                                                                console.log('Vui lòng nhập tên đăng nhập hoặc email');
                                                            }
                                                        }}
                                                        disabled={isButtonDisabled}
                                                    > {isButtonDisabled ? `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}` : 'Gửi mã'}</Button>
                                                </div>
                                            </section>

                                            <Button
                                                disabled={isSubmitting}
                                                type="submit"
                                                className={styles.btnSubmit}
                                            >
                                                Đặt lại mật khẩu
                                            </Button>
                                        </FormikForm>
                                    )}
                                </Formik>
                                <Image src="/img/pandaRetrieve.svg" alt="logo retrieve password" className={styles.logoRetrieve} />
                            </div>
                        </Container>
                    </>) : (<>
                        <NewPasswordPage user_id={userId}></NewPasswordPage>
                    </>)
                }
            </Body>
        </>
    )
}

export default RetrievePassword;
