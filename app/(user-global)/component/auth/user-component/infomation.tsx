'use client'
import dynamic from "next/dynamic";
import { Col, Container, Image, Row } from "react-bootstrap";
import styles from '@public/styles/user-component/Infomation.module.css';
import { useState, useEffect } from "react";
import { RootState } from '../../../../../redux/store';
import { useSelector } from "react-redux";
import Button from "../../globalControl/btnComponent";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

// Dùng dynamic import để tắt SSR cho component này
const ModalChangeImg = dynamic(() => import("./modalChangeImg"), { ssr: false });
const ModalChangeName = dynamic(() => import("./modalChangeName"), { ssr: false });
const ModalChangeInfo = dynamic(() => import("./modalChangeInfo"), { ssr: false });
const ModalChangePhone = dynamic(() => import("./modalChangePhone"), { ssr: false });

const Infomation: React.FC = () => {
    const router = useRouter()
    const [isRole, setIsRole] = useState(false)
    const userState = useSelector((state: RootState) => state.user);
    useEffect(() => {
        if (userState?.user) {
            // console.log("Fullname:", userState.user);
        }
    }, [userState]);

    useEffect(() => {
        if (userState.user?.role === 'admin') {
            setIsRole(true)
        } else {
            setIsRole(false)
        }
    }, [userState])

    const [showChangeImg, setShowChangeImg] = useState(false);
    const [showChangeName, setShowChangeName] = useState(false);
    const [showChangeInfo, setShowChangeInfo] = useState(false);
    const [showChangePhone, setShowChangePhone] = useState(false);

    const handleChangeImg = () => setShowChangeImg(true);
    const handleChangeName = () => setShowChangeName(true);
    const handleChangeInfo = () => setShowChangeInfo(true);
    const handleChangePhone = () => setShowChangePhone(true);

    const handleToAdmin = () => {
        router.push('/admin')
    }

    return (
        <>
            <Container className={styles.container}>
                <Row className={styles.header}>
                    <Col className={styles.header__main}>
                        <h3 className={styles.titleGroup__title}>Thông tin cá nhân</h3>
                        <h5 className={styles.titleGroup__subTitle}>Quản lý tên hiển thị, tên người dùng, bio và avatar của bạn.</h5>
                    </Col>
                </Row>
                {userState?.user ? (
                    <Row className={styles.body}>
                        <Col className={styles.change__img} onClick={handleChangeImg}>
                            <div className={styles.change__img__group}>
                                <h4 className={styles.change__img__group__title}>Ảnh đại diện</h4>
                                <Image
                                    src={userState?.user?.avatar ? userState.user.avatar : "/img/avtDefault.jpg"}
                                    alt="avt"
                                    className={styles.change__img__group__img}
                                />
                            </div>
                            <Image src="/img/chevronLeft-black.svg" alt="" className={styles.change__img__icon} />
                        </Col>
                        <Col className={styles.change__more} onClick={handleChangeName}>
                            <div className={styles.change__more__group}>
                                <h4 className={styles.change__more__group__title}>Họ và tên</h4>
                                <h3 className={styles.change__more__group__subTitle}>{userState?.user?.fullname ? userState.user.fullname : 'Không có dữ liệu'}</h3>
                            </div>
                            <Image src="/img/chevronLeft-black.svg" alt="" className={styles.change__more__icon} />
                        </Col>
                        <Col className={styles.change__more} onClick={handleChangePhone}>
                            <div className={styles.change__more__group}>
                                <h4 className={styles.change__more__group__title}>Số điện thoại</h4>
                                <h3 className={styles.change__more__group__subTitle}>{userState?.user?.phonenumber || 'Chưa có số điện thoại'}</h3>
                            </div>
                            <Image src="/img/chevronLeft-black.svg" alt="" className={styles.change__more__icon} />
                        </Col>
                        <Col className={styles.change__more} onClick={handleChangeInfo}>
                            <div className={styles.change__more__group}>
                                <h4 className={styles.change__more__group__title}>Giới thiệu</h4>
                                <h3 className={styles.change__more__group__subTitle}>{userState?.user?.discription_user ? userState?.user?.discription_user : 'Chưa có giới thiệu'}</h3>
                            </div>
                            <Image src="/img/chevronLeft-black.svg" alt="" className={styles.change__more__icon} />
                        </Col>
                        {userState?.user?.role === 'admin' ? (
                            <Col className={styles.change__more} onClick={handleToAdmin}>
                                <div className={styles.change__more__group}>
                                    <h4 className={styles.change__more__group__title}>Quyền</h4>
                                    <h3 className={styles.change__more__group__subTitle}>{userState?.user?.role}</h3>
                                </div>
                                <Image src="/img/chevronLeft-black.svg" alt="" className={styles.change__more__icon} />
                            </Col>
                        ) : ''}
                    </Row>
                ) : null}
            </Container>
            <ModalChangeImg
                show={showChangeImg}
                onClose={() => setShowChangeImg(false)}
            />
            <ModalChangeName
                show={showChangeName}
                onClose={() => setShowChangeName(false)}
            />
            <ModalChangeInfo
                show={showChangeInfo}
                onClose={() => setShowChangeInfo(false)}
            />
            <ModalChangePhone
                show={showChangePhone}
                onClose={() => setShowChangePhone(false)}
            />
        </>
    );
};

export default Infomation;
