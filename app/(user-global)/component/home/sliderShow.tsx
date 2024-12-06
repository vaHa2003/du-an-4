'use client'
import styles from '@public/styles/home/SliderShow.module.css'
import { useEffect, useRef, useState } from 'react'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'

const array = [
    {
        id: '1',
        img: '/img/avt_thuan.jpg',
        course: 'HTML/CSS',
        name: 'Đỗ Xuân Minh Thuận',
        note: 'Người có ý chí học tập luôn biết cách vượt qua khó khăn, không ngừng phấn đấu để hoàn thiện bản thân. Quan trọng hơn, học tập phải đi đôi với việc áp dụng kiến thức vào thực tế, đem lại lợi ích cho bản thân, gia đình và cộng đồng. "Học để biết, học để làm, học để chung sống và học để làm người" - đó là mục tiêu cao cả của quá trình học tập mà mỗi người cần hướng đến.'
    },
    {
        id: '2',
        img: '/img/avt_tuan.jpg',
        course: 'UI/UX Designer',
        name: 'Huỳnh Võ Hoàng Tuấn',
        note: 'Học không chỉ để thành tài mà còn để trở thành người tử tế, biết phân biệt đúng sai và đóng góp cho xã hội. “Hiền tài là nguyên khí của quốc gia” – câu nói ấy nhắc nhở chúng ta rằng học tập không chỉ vì bản thân mà còn là trách nhiệm với cộng đồng và đất nước. Một khi giữ vững đạo lý học tập, mỗi cá nhân sẽ trở thành phiên bản tốt nhất của chính mình.'
    },
    {
        id: '3',
        img: '/img/avt_tam.jpg',
        course: 'PHP/Lavabel',
        name: 'Nguyễn Minh Tâm',
        note: 'Học để hiểu biết, học để trưởng thành và học để đóng góp cho xã hội. Điều quan trọng là biết ứng dụng kiến thức đã học vào cuộc sống, làm những điều tốt đẹp cho bản thân và cộng đồng. Như một câu nói nổi tiếng: “Học vấn là chiếc chìa khóa mở ra cánh cửa tương lai”, việc học tập không chỉ giúp mỗi cá nhân phát triển mà còn góp phần xây dựng một xã hội văn minh và tiến bộ.'
    },
    {
        id: '4',
        img: '/img/avt_lam.jpg',
        course: 'SQL/CSDL',
        name: 'Lê Công Lam',
        note: 'Người có đạo lý học tập luôn hiểu rằng, việc học không bao giờ là đủ, và mỗi ngày đều là cơ hội để trau dồi thêm. Bởi tri thức không chỉ giúp mở mang tư duy mà còn tạo nên giá trị con người. "Học không chỉ để sống, mà để sống tốt hơn" – đây chính là thông điệp mà mọi người cần ghi nhớ trên hành trình học vấn của mình.'
    },
    {
        id: '5',
        img: '/img/avt_thanh.jpg',
        course: 'REACT/NEXT',
        name: 'Trịnh Gia Thành',
        note: 'Học tập đòi hỏi sự kiên trì, lòng nhẫn nại và khát khao khám phá. Tri thức không bao giờ tự đến, mà cần sự nỗ lực và niềm đam mê. "Không thầy đố mày làm nên" – lời dạy này nhắc nhở chúng ta về tầm quan trọng của người dạy và tinh thần học hỏi suốt đời. Hãy học với một trái tim rộng mở và một tinh thần biết ơn, để mỗi bài học trở thành hành trang quý báu trong cuộc sống.'
    },
    {
        id: '6',
        img: '/img/avt_thao.jpg',
        course: 'C++/JAVA',
        name: 'Trần Hiếu Thảo',
        note: 'Học không phải để khoe mẽ, mà để biết cách ứng xử, để xây dựng cuộc sống tốt đẹp và cống hiến cho xã hội. Mỗi ngày, dù lớn hay nhỏ, đều là cơ hội để học thêm điều mới. Như người xưa từng nói: “Học một biết mười”, chỉ cần có ý chí và sự bền bỉ, con người sẽ chinh phục được những điều tưởng chừng không thể. Hãy xem học tập là niềm vui và trách nhiệm, bởi đó chính là chìa khóa mở ra tương lai tươi sáng.'
    }
]

const SliderShow: React.FC = () => {
    const [isFocus1, setIsFocus1] = useState(true)
    const [isFocus2, setIsFocus2] = useState(false)
    const [isFocus3, setIsFocus3] = useState(false)
    const rightBodyRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [focusedId, setFocusedId] = useState<string | null>('1');
    const [note, setNote] = useState<string>('')
    const [course, setCourse] = useState<string>('')


    const handleFocus = (id: string) => {
        setFocusedId(id);
        const data = array.find(item => item.id === id);
        if (data) {
            setNote(data?.note);
            setCourse(data?.course)
        }
    };

    useEffect(() => {
        const defaultData = array.find(item => item.id === '1');
        if (defaultData) {
            setNote(defaultData.note);
            setCourse(defaultData.course)
            setFocusedId('1');
        }
    }, []);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (rightBodyRef.current) {
            setIsDragging(true);
            setStartX(e.pageX - rightBodyRef.current.offsetLeft);
            setScrollLeft(rightBodyRef.current.scrollLeft);
        }
    };

    const handleMouseLeaveOrUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !rightBodyRef.current) return;
        e.preventDefault();
        const x = e.pageX - rightBodyRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        rightBodyRef.current.scrollLeft = scrollLeft - walk;
    };

    const scrollLeftHandler = () => {
        if (rightBodyRef.current) {
            rightBodyRef.current.scrollLeft -= 300;
        }
    };

    const scrollRightHandler = () => {
        if (rightBodyRef.current) {
            rightBodyRef.current.scrollLeft += 300;
        }
    };


    return (
        <>
            <div className={styles.container}>
                <div className={styles.top__gaden}>

                </div>

                <div className={styles.white}>

                </div>
                <section className={styles.container__body}>
                    <Row className={styles.body__header}>
                        <div className={styles.blue}>

                        </div>
                        <Col className={styles.title}>
                            <div className={styles.title__main}>
                                <h4 className={styles.title__subTitle}>COURSE</h4>
                                <h2 className={styles.title__mainTitle}>{course}</h2>
                            </div>
                        </Col>
                        <Col className={styles.main}>
                            <section className={styles.main__container}>
                                <div className={styles.main__container__header}>
                                    <Image src='/img/main_hero_mos.svg' alt='' className={styles.main__container__header__img} />
                                    <div className={styles.main__container__header__bg}></div>
                                </div>
                                <div className={styles.main__container__footer}>
                                    {note}
                                </div>
                            </section>
                        </Col>
                        <Col className={styles.under}>
                            <div className={styles.under__box}>
                                <Image src="/img/img_cpuse_mos.svg" alt="" className={styles.under__box__img} />
                                <div className={styles.under__box__bg}></div>
                            </div>
                        </Col>
                    </Row>
                    <section className={styles.footer}>
                        <Button
                            onClick={scrollLeftHandler}
                            className={styles.btn__prev}
                        >
                            <svg width="auto" height="auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 18L9 12L15 6" stroke="#15C8E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.stroke__icon} />
                            </svg>
                        </Button>
                        <section
                            className={styles.body__footer}
                            ref={rightBodyRef}
                            onMouseDown={handleMouseDown}
                            onMouseLeave={handleMouseLeaveOrUp}
                            onMouseUp={handleMouseLeaveOrUp}
                            onMouseMove={handleMouseMove}
                        >
                            {
                                array.map((item, index) => (
                                    <Col
                                        key={index}
                                        className={styles.box__user}
                                        onClick={() => handleFocus(item.id)}
                                    >
                                        <Image
                                            src={`${item.img}`}
                                            alt="avt"
                                            className={`${styles.box__user__img} ${focusedId === item.id ? styles.border__cyan : ''}`}
                                        />
                                        <h3
                                            className={`${styles.box__user__title} ${focusedId === item.id ? styles.color__cyan : ''}`}
                                        >
                                            {item.name}</h3>
                                        <div className={styles.box__user__border}>
                                            <div className={`${styles.box__user__element} ${focusedId === item.id ? styles.active : ''}`}></div>
                                        </div>
                                    </Col>
                                ))
                            }
                        </section>
                        <Button
                            onClick={scrollRightHandler}
                            className={styles.btn__next}>
                            <svg width="auto" height="auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 18L15 12L9 6" stroke="#15C8E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Button>
                    </section>
                </section>
                <div className={styles.bottom__gaden}>
                </div>
            </div>
        </>
    )
}

export default SliderShow