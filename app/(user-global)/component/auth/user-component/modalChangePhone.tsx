'use client';

import React, { FC, useEffect, useState } from 'react';
import styles from '@public/styles/user-component/ModalChangePhone.module.css';
import { Button, Form, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { update } from '@/redux/slices/userSlice';

interface ModalChangePhoneProps {
    show: boolean;
    onClose: () => void;
}

const ModalChangePhone: React.FC<ModalChangePhoneProps> = ({ show, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);
    const userState = useSelector((state: RootState) => state.user);
    const token = localStorage.getItem('token');
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (show) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        } else {
            const timer = setTimeout(() => {
                setIsVisible(false);
                document.body.style.overflow = 'auto';
            }, 300);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [show]);

    const formik = useFormik({
        initialValues: {
            phoneNumber: userState.user?.phonenumber || '',
        },
        validationSchema: Yup.object({
            phoneNumber: Yup.string()
                .required('Bắt buộc nhập số điện thoại')
                .test(
                    'isValidVietnamPhoneNumber',
                    'Số điện thoại không hợp lệ. Vui lòng nhập số điện thoại hợp lệ của Việt Nam.',
                    (value) => {
                        if (!value) return true;
                        const regexVNPhone = /^(84\d{9}|0\d{9})$/;
                        return regexVNPhone.test(value);
                    }
                )
                .transform((value) => value.trim())
                .matches(/^\d+$/, 'Chỉ cho phép chữ số.'),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            try {
                const res = await fetch('/api/changePhone/', {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ phonenumber: values.phoneNumber })
                });

                if (res.ok) {
                    alert('Thay đổi thông tin thành công');
                    onClose();
                    dispatch(update({
                        phonenumber: values.phoneNumber
                    }))
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
    });

    useEffect(() => {
        if (userState.user?.phonenumber !== formik.values.phoneNumber) {
            formik.setFieldValue('phoneNumber', userState.user?.phonenumber || '');
        }
    }, [userState.user?.phonenumber]);

    return (
        <main className={`${styles.modalOverlay} ${show ? styles.show : styles.hide}`} onClick={onClose}>
            {isVisible && (
                <section className={`${styles.modal} ${show ? styles.show : styles.hide}`} onClick={(e) => e.stopPropagation()}>
                    <Button className={styles.closeBtn} onClick={onClose}>
                        <Image src="/img/closeBtn.svg" alt="" className={styles.closeBtn__img} />
                    </Button>
                    <Form className={styles.formChangeName} noValidate validated={formik.touched.phoneNumber && !formik.errors.phoneNumber} onSubmit={formik.handleSubmit}>
                        <fieldset className={styles.modalBody}>
                            <legend className={styles.modalBody__title}>Cập nhật số điện thoại của bạn</legend>
                            <legend className={styles.modalBody__subTitle}>
                                Số điện thoại sẽ được sử dụng cho các xác thực liên quan.
                            </legend>
                        </fieldset>
                        <Form.Group className={styles.formControlChangeName} controlId="validationPhoneNumber">
                            <Form.Label className={styles.formControlChangeName__label}>
                                Số điện thoại
                            </Form.Label>
                            <Form.Control
                                type="tel"
                                required
                                placeholder="Nhập số điện thoại"
                                className={styles.formControlChangeName__input}
                                value={formik.values.phoneNumber}
                                onChange={(e) => formik.setFieldValue('phoneNumber', e.target.value)}
                                onBlur={formik.handleBlur}
                                isInvalid={!!formik.errors.phoneNumber && formik.touched.phoneNumber}
                            />
                            <Form.Control.Feedback type="invalid" className={styles.feedBack}>
                                {formik.errors.phoneNumber}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button className={styles.closeBtn2} type="submit" disabled={loading}>
                            {loading ? 'Đang xử lý...' : 'Lưu lại'}
                        </Button>
                    </Form>
                </section>
            )}
        </main>
    );
};

export default ModalChangePhone;
