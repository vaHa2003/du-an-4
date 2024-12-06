'use client';

import React, { FC, useEffect, useState } from 'react';
import styles from '@public/styles/user-component/ModalChangeName.module.css';
import { Button, Form, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { update } from '@/redux/slices/userSlice';
import useCookie from '../../hook/useCookie';


const ModalChangeName: React.FC<ModalChangeNameProps> = ({ show, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);
    const userState = useSelector((state: RootState) => state.user);
    const token = useCookie('token')
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
            fullName: userState.user?.fullname || '',
        },
        validationSchema: Yup.object({
            fullName: Yup.string()
                .required('Bắt buộc nhập thông tin giới thiệu')
                .min(3, 'Tối thiểu 3 ký tự')
                .max(150, 'Tối đa 150 ký tự')
                .test('capitalize', 'Chữ cái đầu tiên của mỗi từ phải viết hoa', (value) => {
                    if (!value) return true;
                    return value
                        .split(' ')
                        .every(word => /^[\p{Lu}]/u.test(word.charAt(0)));
                })
                .transform((value) => value.trim())
                .matches(/^[\p{L}\s]+$/u, 'Chỉ cho phép chữ cái và khoảng trắng.'),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            try {
                const res = await fetch('/api/changeFullName/', {
                    method: 'PATCH',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ fullname: values.fullName })
                });

                if (res.ok) {
                    alert('Thay đổi thông tin thành công');
                    onClose();
                    dispatch(update({
                        fullname: values.fullName
                    }))
                } if (!res.ok) {
                    console.log('lỗi: ', await res.json());
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
    });

    useEffect(() => {
        if (userState.user?.fullname !== formik.values.fullName) {
            formik.setFieldValue('fullName', userState.user?.fullname || '');
        }
    }, [userState.user?.fullname]);

    return (
        <main className={`${styles.modalOverlay} ${show ? styles.show : styles.hide}`} onClick={onClose}>
            {isVisible && (
                <section className={`${styles.modal} ${show ? styles.show : styles.hide}`} onClick={(e) => e.stopPropagation()}>
                    <Button className={styles.closeBtn} onClick={onClose}>
                        <Image src="/img/closeBtn.svg" alt="" className={styles.closeBtn__img} />
                    </Button>
                    <Form className={styles.formChangeName} noValidate validated={formik.touched.fullName && !formik.errors.fullName} onSubmit={formik.handleSubmit}>
                        <fieldset className={styles.modalBody}>
                            <legend className={styles.modalBody__title}>Cập nhật tên của bạn</legend>
                            <legend className={styles.modalBody__subTitle}>
                                Tên sẽ được hiển thị trên trang cá nhân,
                                trong các bình luận và bài viết của bạn.
                            </legend>
                        </fieldset>
                        <Form.Group className={styles.formControlChangeName} controlId="validationUserName">
                            <Form.Label className={styles.formControlChangeName__label}>
                                Họ và tên
                            </Form.Label>
                            <Form.Control
                                type="text"
                                required
                                placeholder="Nhập họ và tên"
                                className={styles.formControlChangeName__input}
                                value={formik.values.fullName}
                                onChange={(e) => formik.setFieldValue('fullName', e.target.value)}
                                onBlur={formik.handleBlur}
                                isInvalid={!!formik.errors.fullName && formik.touched.fullName}
                            />
                            <Form.Control.Feedback type="invalid" className={styles.feedBack}>
                                {formik.errors.fullName}
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

export default ModalChangeName;
