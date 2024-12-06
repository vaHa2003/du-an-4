'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button, Image, Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { ShowNameElement } from '@app/(user-global)/component/globalControl/commonC';
const LeftSlider: React.FC = () => {
    const pathName = usePathname();
    const [isMenu, setIsMenu] = useState(true);
    const [isCourseOpen, setIsCourseOpen] = useState(false);
    const [headerHeight, setHeaderHeight] = useState(0);
    const [isHidden, setIsHidden] = useState(false);
    const userState = useSelector((state: RootState) => state.user);
    const [clientHref, setClientHref] = useState('/login');
    const [idCourse, setIdCourse] = useState<string | null>("");

    useEffect(() => {
        // Lấy dữ liệu từ localStorage
        const storedProgress = localStorage.getItem('progress');

        if (storedProgress) {
            try {
                const data = JSON.parse(storedProgress); // Chuyển JSON thành object
                console.log(data.course_id); // Kiểm tra course_id
                setIdCourse(`/learningCourse/${data.course_id}`); // Lưu vào state
            } catch (error) {
                console.error("Lỗi parse JSON:", error);
                setIdCourse(`/#!`);
            }
        } else {
            console.log("Không có dữ liệu trong localStorage với key 'progress'");
            setIdCourse(`/#!`);
        }
    }, []);
    useEffect(() => {
        // Cập nhật URL sau khi client đã có trạng thái user
        setClientHref(userState?.user ? `/coursefor` : '/login');
    }, [userState]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const checkElementsAndSetHeight = () => {
                const header = document.querySelector('.header-over') as HTMLElement;
                const footer = document.querySelector('footer') as HTMLElement;

                if (header && footer) {
                    const setHeight = () => {
                        setHeaderHeight(header.offsetHeight);
                    };

                    const observer = new ResizeObserver(setHeight);
                    observer.observe(header);
                    setHeight();

                    const handleScroll = () => {
                        const footerRect = footer.getBoundingClientRect();
                        const isFooterVisible = footerRect.top <= window.innerHeight;

                        if (isFooterVisible && footerRect.top < window.innerHeight - headerHeight) {
                            setIsHidden(true);
                        } else {
                            setIsHidden(false);
                        }
                    };

                    window.addEventListener('scroll', handleScroll);

                    handleScroll();

                    return () => {
                        window.removeEventListener('scroll', handleScroll);
                        observer.unobserve(header);
                    };
                }
            };

            const timeout = setTimeout(checkElementsAndSetHeight, 100);

            return () => clearTimeout(timeout);
        }
    }, [headerHeight, pathName]);

    const openMenu = () => {
        setIsMenu(!isMenu);
    };

    const openCourses = () => {
        setIsCourseOpen(!isCourseOpen);
    };

    const offCourse = () => {
        setIsCourseOpen(false);
    }

    const isHome = pathName === '/' || pathName === '/home';

    return (
        <Nav
            className={`slider-bar ${isHidden ? 'hidden' : 'visible-menu'}`}
            style={{ top: `calc(${headerHeight}px + 120px)` }}
        >
            <section className={`slide-bar-categories`}>
                <ShowNameElement name='Trang chủ'>
                    <Link href="/" className={`btn-slide-bar ${isHome ? 'bg-blu-50' : ''} ${isMenu ? 'w-auto' : 'w-268'}`}>
                        <img src='/img/home-fill.svg' className={`img block ${isHome ? 'none-icon' : ''}`} />
                        <img src='/img/home.svg' className={`img none ${isHome ? 'block-icon' : ''}`} />
                        <div className={`btn-e ${isHome ? 'text-white-100' : ''} ${isMenu ? 'w-0px' : 'block-text'}`}>Trang chủ</div>
                    </Link>
                </ShowNameElement>
                <div className={`btn-slide-bar ${isMenu ? 'w-auto' : 'w-268'}`} onClick={openCourses}>

                    <img src='/img/box-fill.svg' className='img block' />
                    <img src='/img/box.svg' className='img none' />
                    <div className={`btn-e ${isMenu ? 'w-0px' : 'block-text'}`}>Khóa học</div>

                </div>

                <div
                    className={`course-submenu ${isCourseOpen ? 'active' : ''} ${isMenu ? 'p-as' : ''}`}
                    onClick={offCourse}
                >
                    <Image src="/img/index.svg" alt="" className={`logo-mini-menu`} />
                    <Link
                        href={`${userState.user ? `/coursefor` : `/login`}`}
                        className={`btn-slide-bar-mini`}
                    >
                        <div className={`btn-e`}>Khóa học của bạn</div>
                    </Link>
                    <Link
                        href="/CourseFa"
                        className={`btn-slide-bar-mini`}
                    >
                        <div className={`btn-e`}>Khóa học yêu thích</div>
                    </Link>
                    <Link
                        href="/course/1"
                        className={`btn-slide-bar-mini`}
                    >
                        <div className={`btn-e`}>Nhắc nhở học tập</div>
                    </Link>
                </div>
                <ShowNameElement name='Học ngay'>
                    <Link href={idCourse ? `${idCourse}` : '#'} className={`btn-slide-bar ${isMenu ? 'w-auto' : 'w-268'}`}>
                        <img src='/img/bagfill.svg' className='img block' />
                        <img src='/img/bag.svg' className='img none' />
                        <div className={`btn-e ${isMenu ? 'w-0px' : 'block-text'}`}>Học ngay</div>
                    </Link>
                </ShowNameElement>
                <ShowNameElement name='Lộ trình học tập'>
                    <Link href="/learningPath-FE" className={`btn-slide-bar ${isMenu ? 'w-auto' : 'w-268'}`}>
                        <img src='/img/roadfill.svg' className='img block' />
                        <img src='/img/road.svg' className='img none' />
                        <div className={`btn-e ${isMenu ? 'w-0px' : 'block-text'}`}>Lộ trình</div>
                    </Link>
                </ShowNameElement>
                <ShowNameElement name='Bản tin TTO.SH'>
                    <Link href="/post" className={`btn-slide-bar ${isMenu ? 'w-auto' : 'w-268'}`}>
                        <img src='/img/textnotefill.svg' className='img block' />
                        <img src='/img/textnote.svg' className='img none' />
                        <div className={`btn-e ${isMenu ? 'w-0px' : 'block-text'}`}>Tin tức</div>
                    </Link>
                </ShowNameElement>
            </section>
            <Button className='menu' onClick={openMenu}>
                {isMenu ? (
                    <Image src='/img/chevronFill-01.svg' className='menu-img' />
                ) : (
                    <Image src='/img/chevronFill-02.svg' className='menu-img' />
                )}
            </Button>
        </Nav>
    );
};

export default LeftSlider;
