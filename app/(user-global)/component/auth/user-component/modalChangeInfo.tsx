'use client';

import React, { useEffect, useState } from 'react';
import styles from '@public/styles/user-component/ModalChangeInfo.module.css';
import { Button, Form, Image } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { update } from '@/redux/slices/userSlice';
import useCookie from '../../hook/useCookie';



const ModalChangeInfo: React.FC<ModalChangeInfoProps> = ({ show, onClose }) => {
    const userState = useSelector((state: RootState) => state.user);
    const [isVisible, setIsVisible] = useState(false);
    const token = useCookie('token');
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
            discriptionUser: userState.user?.discription_user || '',
        },
        validationSchema: Yup.object({
            discriptionUser: Yup.string()
                .required('Bắt buộc nhập thông tin giới thiệu')
                .min(3, 'Tối thiểu 3 ký tự')
                .max(150, 'Tối đa 150 ký tự')
        }),
        onSubmit: async (values) => {
            setLoading(true);
            try {
                const res = await fetch('/api/changeDiscription/', {
                    method: 'PATCH',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ discription_user: values.discriptionUser })
                });

                if (res.ok) {
                    alert('Thay đổi thông tin thành công');
                    onClose();
                    dispatch(update({
                        discription_user: values.discriptionUser
                    }))
                } else {
                    console.log(await res.json());
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
    });

    useEffect(() => {
        if (userState.user?.discription_user !== formik.values.discriptionUser) {
            formik.setFieldValue('discriptionUser', userState.user?.discription_user || '');
        }
    }, [userState.user?.discription_user]);

    return (
        <main className={`${styles.modalOverlay} ${show ? styles.show : styles.hide}`} onClick={onClose}>
            {isVisible && (
                <section className={`${styles.modal} ${show ? styles.show : styles.hide}`} onClick={(e) => e.stopPropagation()}>
                    <Button className={styles.closeBtn} onClick={onClose}>
                        <Image src="/img/closeBtn.svg" alt="Close" className={styles.closeBtn__img} />
                    </Button>
                    <Form className={styles.formChangeInfo} noValidate validated={formik.touched.discriptionUser && !formik.errors.discriptionUser} onSubmit={formik.handleSubmit}>
                        <fieldset className={styles.modalBody}>
                            <legend className={styles.modalBody__title}>Cập nhật thông tin giới thiệu</legend>
                            <legend className={styles.modalBody__subTitle}>
                                Phần giới thiệu (tiểu sử) được hiển thị tại trang cá nhân của bạn,
                                giúp mọi người hiểu rõ hơn về bạn.
                            </legend>
                        </fieldset>
                        <Form.Group className={styles.formControlChangeInfo} controlId="validationUserName">
                            <Form.Label className={styles.formControlChangeInfo__label}>
                                Giới thiệu
                            </Form.Label>
                            <Form.Control
                                type="text"
                                required
                                placeholder="Nhập nội dung"
                                className={styles.formControlChangeInfo__input}
                                value={formik.values.discriptionUser}
                                onChange={(e) => formik.setFieldValue('discriptionUser', e.target.value)}
                                onBlur={formik.handleBlur}
                                isInvalid={!!formik.errors.discriptionUser && formik.touched.discriptionUser}
                            />
                            <Form.Control.Feedback type="invalid" className={styles.feedBack}>
                                {formik.errors.discriptionUser}
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

export default ModalChangeInfo;
