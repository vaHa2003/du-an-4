'use client';

import React, { FC, useEffect, useState, Suspense } from 'react';
import styles from '@public/styles/user-component/ModalChangePass.module.css';
import { Button, Form, Image } from 'react-bootstrap';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';



const ModalChangePassContent: React.FC<ModalChangePassProps> = ({ show, onClose }) => {
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const [isVisible, setIsVisible] = useState(false);
    const showModal = searchParams.get('showModal');
    const token = localStorage.getItem('token');

    const isUser1 = pathName === '/info-user';
    const isUser2 = pathName === '/intro-user';

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (show || showModal === 'change-password') {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        } else {
            const timer = setTimeout(() => {
                setIsVisible(false);
                document.body.style.overflow = '';
            }, 300);
            return () => {
                clearTimeout(timer);
                document.body.style.overflow = '';
            };
        }
    }, [show, showModal]);

    const handleCloseModal = () => {
        onClose();
        if (isUser1) {
            window.history.replaceState({}, '', '/info-user');
        } else if (isUser2) {
            window.history.replaceState({}, '', '/intro-user');
        } else {
            window.history.replaceState({}, '', '/wallet-user');
        }
    };

    const formik = useFormik({
        initialValues: {
            nowPassword: '',
            newPassword: '',
            newPasswordConfirm: '',
        },
        validationSchema: Yup.object({
            nowPassword: Yup.string()
                .required('Vui lòng nhập mật khẩu hiện tại'),
            newPassword: Yup.string()
                .required('Vui lòng nhập mật khẩu mới')
                .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
                .max(12, 'Mật khẩu tối đa là 12 ký tự')
                .matches(/[A-Z]/, 'Mật khẩu phải có ít nhất 1 ký tự viết hoa')
                .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Mật khẩu phải có ít nhất 1 ký tự đặc biệt')
                .test('not-the-same', 'Mật khẩu mới không được trùng với mật khẩu cũ', function (value) {
                    const { nowPassword } = this.parent;
                    return value !== nowPassword;
                }),
            newPasswordConfirm: Yup.string()
                .oneOf([Yup.ref('newPassword')], 'Mật khẩu xác nhận không khớp')
                .required('Vui lòng nhập lại mật khẩu mới'),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            try {
                const res = await fetch('/api/changePassword/', {
                    method: 'PATCH',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        old_password: values.nowPassword,
                        new_password: values.newPassword,
                        new_confirm_password: values.newPasswordConfirm,
                    }),
                });

                if (res.ok) {
                    alert('Thay đổi mật khẩu thành công');
                    formik.resetForm();
                    onClose();
                } else if (res.status === 400 || 422) {
                    alert('Sai mật khẩu cũ vui lòng thử lại');
                    formik.resetForm();
                } else {
                    alert('Có lỗi xảy ra vui lòng thử lại')
                    formik.resetForm();
                }
            } catch (error) {
                console.error('Error:', error);
                formik.resetForm();
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <main className={`${styles.modalOverlay} ${isVisible ? styles.show : styles.hide}`} onClick={handleCloseModal}>
            {isVisible && (
                <section className={`${styles.modal} ${isVisible ? styles.show : styles.hide}`} onClick={(e) => e.stopPropagation()}>
                    <Button className={styles.closeBtn} onClick={handleCloseModal}>
                        <Image src="/img/closeBtn.svg" alt="" className={styles.closeBtn__img} />
                    </Button>
                    <Form className={styles.formChangePass} onSubmit={formik.handleSubmit}>
                        <fieldset className={styles.modalBody}>
                            <legend className={styles.modalBody__title}>Thay đổi mật khẩu</legend>
                            <legend className={styles.modalBody__subTitle}>
                                Mật khẩu của bạn phải có tối thiểu 8 ký tự, bao gồm cả chữ số, chữ cái và ký tự đặc biệt (!$@%...).
                            </legend>
                        </fieldset>
                        <Form.Group className={styles.formControlChangePass} controlId="nowPassword">
                            <Form.Label className={styles.formControlChangePass__label}>
                                Nhập mật khẩu hiện tại
                            </Form.Label>
                            <Form.Control
                                type="text"
                                required
                                placeholder="Nhập mật khẩu hiện tại"
                                className={styles.formControlChangePass__input}
                                value={formik.values.nowPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.nowPassword && formik.errors.nowPassword ? (
                                <div className={styles.feedBack}>{formik.errors.nowPassword}</div>
                            ) : null}
                        </Form.Group>
                        <Form.Group className={styles.formControlChangePass} controlId="newPassword">
                            <Form.Label className={styles.formControlChangePass__label}>
                                Nhập mật khẩu mới
                            </Form.Label>
                            <Form.Control
                                type="text"
                                required
                                placeholder="Nhập mật khẩu mới"
                                className={styles.formControlChangePass__input}
                                value={formik.values.newPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.newPassword && formik.errors.newPassword ? (
                                <div className={styles.feedBack}>{formik.errors.newPassword}</div>
                            ) : null}
                        </Form.Group>
                        <Form.Group className={styles.formControlChangePass} controlId="newPasswordConfirm">
                            <Form.Label className={styles.formControlChangePass__label}>
                                Nhập lại mật khẩu mới
                            </Form.Label>
                            <Form.Control
                                type="text"
                                required
                                placeholder="Nhập lại mật khẩu mới"
                                className={styles.formControlChangePass__input}
                                value={formik.values.newPasswordConfirm}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.newPasswordConfirm && formik.errors.newPasswordConfirm ? (
                                <div className={styles.feedBack}>{formik.errors.newPasswordConfirm}</div>
                            ) : null}
                            <Link href={'/retriePassword'} className={styles.link}>
                                Bạn quên mật khẩu ?
                            </Link>
                        </Form.Group>
                        <Button className={styles.closeBtn2} type="submit" disabled={loading}>
                            {loading ? 'Đang xử lý...' : 'Thay đổi'}
                        </Button>
                    </Form>
                </section>
            )}
        </main>
    );
};

export default function ModalChangePass(props: ModalChangePassProps) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ModalChangePassContent {...props} />
        </Suspense>
    );
}
