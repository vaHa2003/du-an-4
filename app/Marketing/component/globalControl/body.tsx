'use client'

import ProfileDispatch from '@/app/(user-global)/component/auth/user-component/profileDispatch';
import ScrollToTop from '@/app/(user-global)/component/globalControl/scrollToTop';
import { useEffect, useState } from "react";
import Header from '@/app/admin/component/Header/header';
import { Col, Row, Spinner } from 'react-bootstrap';
import Sidebar from '../Sidebar/sidebar';
import styles from "../../layout.module.css";
import '../../globals.css'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { usePathname, useRouter } from 'next/navigation';
import { clear } from '@/redux/slices/userSlice';

interface BodyProps {
    children?: React.ReactNode;
}

const Body: React.FC<BodyProps> = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const userState = useSelector((state: RootState) => state.user.user)
    const router = useRouter()

    useEffect(() => {
        if (userState?.role === 'admin' || userState?.role === 'marketing') {
            setLoading(false)
        } else {
            router.push('/home');
        }
    }, [userState]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <Spinner animation="border" />
            </div>
        );
    }

    return (
        <>
            <ScrollToTop />
            <ProfileDispatch></ProfileDispatch>
            <div className={styles.header}>
                <Header />
            </div>
            <Row className={`${styles.mainContent} m-0`}>
                <Col md={0} xl={2} sm={0} xs={0} className={`d-none d-md-none d-xl-block`}>
                    <Sidebar />
                </Col>
                <Col className={styles.article} xs={12} sm={12} md={12} xl={10}>
                    {children}
                </Col>
            </Row>
        </>
    );
};

export default Body;
