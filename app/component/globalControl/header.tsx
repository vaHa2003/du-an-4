'use client'
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { Container, Button, Nav, Navbar, Form, Image, Row, Col } from 'react-bootstrap';

const Header: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();

    const inputRef = useRef<HTMLInputElement>(null)
    const [showHeader, setShowHeader] = useState(true);
    const [lastScroll, setLastScroll] = useState(0);
    const [showSearch, setShowSearch] = useState(false);
    const [valueInput, setValueInput] = useState('')

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.pageYOffset;
            setShowHeader(currentScroll <= lastScroll);
            setLastScroll(currentScroll);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScroll]);

    const onFocus = () => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }

    const handleLogin = () => {
        router.push('/login');
    };

    const handleShowSearch = () => {
        setShowSearch(!showSearch)
    }

    const isLogin = pathname === '/login';
    const isUser = pathname === '/user';

    return (
        <>
            <Navbar className={`header-nav ${showHeader ? 'visible' : 'hidden'}`}>
                <section className='header-nav-head'>
                    <Navbar.Brand href="/" className='brand-header'>
                        <Image src="/img/LogoPage.jpg" alt="logo" className='img-brand-header' />
                    </Navbar.Brand>
                    <Nav className="btn-header">
                        <Row md={12} className='btn-header-container'>
                            <Col md={4} className='btn-header-container-element'>
                                <Link href='/' className='btn-header-container-element-link'>
                                    <div>Về chúng tôi</div>
                                    <Image src="/img/chervonblue-02.svg" alt="" className='btn-header-container-element-img' />
                                </Link>
                            </Col>
                            <Col md={4} className='btn-header-container-element'>
                                <Link href='/' className='btn-header-container-element-link'>
                                    <div>Liên hệ với TTO.SH</div>
                                    <Image src="/img/chervonblue-02.svg" alt="" className='btn-header-container-element-img' />
                                </Link>
                            </Col>
                            {isUser ? (
                                <Col md={4} className='btn-header-container-element'>
                                    <section className='user-group'>
                                        <div className='user-notification'>
                                            <Image src="/img/Bell.svg" alt="" className='icon-notification' />
                                            <Image src="/img/ChatTick.svg" alt="" className='icon-notification' />
                                        </div>
                                        <div className='user'>
                                            <Image src="/img/avt.jpg" alt="" className='avt' />
                                            <section className='title-group'>
                                                <h4 className='title-1'>Xin chào</h4>
                                                <h4 className='title-name'>Huỳnh Võ Hoàng Tuấn</h4>
                                            </section>
                                            <svg className='right-icon-user' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6 9L12 15L18 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className='right-icon-user-stroke' />
                                            </svg>
                                        </div>
                                    </section>
                                </Col>
                            ) : (
                                <Col md={4} className='btn-header-container-element'>
                                    <Button
                                        onClick={handleLogin}
                                        className={`btn-navbar border-blue-1 ${isLogin ? 'light-check' : ''}`}
                                    >
                                        Đăng nhập
                                    </Button>
                                </Col>
                            )}
                        </Row>
                        <Row md={12} className='btn-header-btn-group'>
                            <Col md={3} className='btn-header-btn-group-element'>
                                <Button className='btn-header-btn-group-main'>
                                    <Image src="/img/phoneBlue.svg" alt="" className='btn-header-btn-group-main-img' />
                                    <div className='btn-header-btn-group-main-content'>
                                        Liên hệ với chúng tôi
                                    </div>
                                </Button>
                            </Col>
                            <Col md={3} className='btn-header-btn-group-element'>
                                <Button className='btn-header-btn-group-main'>
                                    <Image src="/img/mailBlue.svg" alt="" className='btn-header-btn-group-main-img' />
                                    <div className='btn-header-btn-group-main-content'>
                                        Email hỗ trợ
                                    </div>
                                </Button>
                            </Col>
                            <Col md={3} className='btn-header-btn-group-element'>
                                <Button className='btn-header-btn-group-main'>
                                    <Image src="/img/chatBlue.svg" alt="" className='btn-header-btn-group-main-img' />
                                    <div className='btn-header-btn-group-main-content'>
                                        Để lại thông tin nhận hỗ trợ
                                    </div>
                                </Button>
                            </Col>
                            <Col md={3} className='btn-header-btn-group-element'>
                                <Button onClick={handleShowSearch} className='btn-header-btn-group-main2'>
                                    <Image src={`${showSearch ? '/img/Canxel.svg' : '/img/searchBlue.svg'}`} alt="" className={`btn-header-btn-group-main-img1`} />
                                </Button>
                            </Col>
                        </Row>
                    </Nav>
                </section>

                <Nav className={`box-search ${showSearch ? '' : 'box-search-h0'}`}>
                    <Form className={`search-bar ${showSearch ? '' : 'opct-0'} ${valueInput ? 'has-value' : ''}`} >
                        <Form.Control
                            type="text"
                            className="search"
                            aria-label="Search"
                            ref={inputRef}
                            value={valueInput}
                            onChange={(e) => setValueInput(e.target.value)}
                        />
                        <span className='search-span' onClick={onFocus}>Nhập thông tin cần tìm</span>
                        <Button variant="outline-secondary" className='btn-search-icon'>
                            <Image src="/img/searchBlue.svg" alt="" className='search-icon' />
                        </Button>
                    </Form>
                </Nav>
            </Navbar>
        </>
    );
};

export default Header;