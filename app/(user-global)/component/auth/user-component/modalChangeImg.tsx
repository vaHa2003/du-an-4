'use client';

import React, { FC, useEffect, useState } from 'react';
import styles from '@public/styles/user-component/ModalChangeImg.module.css';
import { Button, Form, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { update } from '@/redux/slices/userSlice';
import useCookie from '../../hook/useCookie';


const ModalChangeImg: FC<ModalChangeImgProps> = ({ show, onClose }) => {
    const userState = useSelector((state: RootState) => state.user);
    const [isVisible, setIsVisible] = useState(false);
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const token = useCookie('token');
    const disPatch = useDispatch()
    const [loading, setLoading] = useState(false)

    // Validation schema với Yup
    const validationSchema = Yup.object({
        avatar: Yup.mixed()
            .nullable()
            .test(
                'fileFormat',
                'Chỉ cho phép các định dạng ảnh (jpg, jpeg, png, gif)',
                (value) =>
                    !value || (value instanceof File && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type))
            ),
    });

    // Reset trạng thái khi đóng modal
    useEffect(() => {
        if (show) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        } else {
            const timer = setTimeout(() => {
                setIsVisible(false);
                setSelectedFile(null);
                document.body.style.overflow = 'auto';
            }, 300);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [show]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: any) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(URL.createObjectURL(file));
            setFieldValue('avatar', file);
        }
    };

    const handleSubmit = async (values: { avatar: File | null }) => {
        if (!values.avatar) {
            alert('Giữ nguyên ảnh hiện tại.');
            onClose();
            return;
        }
        console.log(values.avatar);
        try {
            setLoading(true)
            const formData = new FormData();
            formData.append('avatar', values.avatar);
            console.log('Form Data:', Array.from(formData.entries()));
            if (token) {
                const response = await fetch('/api/changeImg/', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                });
                if (response.ok) {
                    const data = await response.json()
                    alert('Ảnh đã được cập nhật thành công');
                    setLoading(false)
                    disPatch(update({
                        avatar: data?.avatar
                    }))
                    onClose();
                } else {
                    alert('Cập nhật ảnh thất bại');
                    console.log(formData);
                    console.log(await response.json());
                    setLoading(false)

                }
            }
        } catch (error) {
            console.error('Có lỗi xảy ra:', error);
            setLoading(false)
        }
    };

    return (
        <main className={`${styles.modalOverlay} ${show ? styles.show : styles.hide}`} onClick={onClose}>
            {isVisible && (
                <section className={`${styles.modal} ${show ? styles.show : styles.hide}`} onClick={(e) => e.stopPropagation()}>
                    <Button className={styles.closeBtn} onClick={onClose}>
                        <Image src="/img/closeBtn.svg" alt="" className={styles.closeBtn__img} />
                    </Button>
                    <Formik
                        initialValues={{ avatar: null }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ setFieldValue }) => (
                            <FormikForm className={styles.formChangeImg} noValidate encType="multipart/form-data">
                                <fieldset className={styles.modalBody}>
                                    <legend className={styles.modalBody__title}>Thay đổi ảnh đại diện</legend>
                                    <legend className={styles.modalBody__subTitle}>
                                        Ảnh đại diện giúp giảng viên và người dùng dễ nhận biết bạn qua các tin nhắn và câu hỏi
                                    </legend>
                                </fieldset>
                                <Form.Group className={styles.formControlChangeImg} controlId="avatar">
                                    <Form.Label className={styles.formControlChangeImg__label}>
                                        Ảnh đại diện
                                    </Form.Label>
                                    <input
                                        id="avatar"
                                        type="file"
                                        accept="image/*"
                                        name='avatar'
                                        onChange={(event) => handleFileChange(event, setFieldValue)}
                                        className={styles.hiddenInput}
                                    />
                                    <ErrorMessage name="avatar" component="div" className={styles.feedBack} />
                                    <section className={styles.inputGroup}>
                                        <section
                                            className={styles.uploadButtonContainer}
                                            onClick={() => document.getElementById('avatar')?.click()}
                                        >
                                            <Image src="/img/upload.svg" alt="" className={styles.iconContainer} />
                                            <p className={styles.uploadButton__title}>Tải ảnh lên</p>
                                        </section>
                                        <Image
                                            src={selectedFile || userState.user?.avatar || "/img/avtDefault.jpg"}
                                            alt="Avatar"
                                            className={styles.img__index}
                                        />
                                    </section>
                                </Form.Group>
                                <Button
                                    disabled={loading}
                                    className={styles.closeBtn2}
                                    type="submit">
                                    {loading ? 'Đang xử lý ...' : 'Lưu lại'}
                                </Button>
                            </FormikForm>
                        )}
                    </Formik>
                </section>
            )}
        </main>
    );
};

export default ModalChangeImg;
