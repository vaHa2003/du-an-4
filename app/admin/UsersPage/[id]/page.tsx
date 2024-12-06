"use client";

import { useEffect, useState } from "react";
import styles from "@public/style_admin/detail-user/UsersDetail.module.css";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Figure, Image } from "react-bootstrap";
import ReactLoading from 'react-loading';



interface UserDetailProps {
    params: {
        id: number|string;
    };
}

interface StatisticalDetailUser {
    courseInprogress: number;
    courseCompleted: number;
    totalCoursePurchaser: string;
    ratingCourses: string;
}

interface CourseForUser {
    courses: [
        {
            img_course: string;
            name_course: string;
            rating_course: string;
            views_course: number;
            chapters_count: number;
            documents_count: number;
        }
    ],
    user: {
        fullname: string;
        email: string;
        role: 'Học viên';
        avatar: string;
    }
}

const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
}

const UserDetail: React.FC<UserDetailProps> = ({ params }) => {
    const [dataCourse, setDataCourse] = useState<StatisticalDetailUser | null>(null)
    const [dataCoursezForUser, setDataCourseForUser] = useState<CourseForUser | null>(null)
    const token = getCookie('token')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch(`/api/statistical_detail_user/${params.id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(res => res.json())
            .then(data => {
                setDataCourse(data)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        setLoading(true)
        fetch(`/api/courseForUser/${params.id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(res => res.json())
            .then(data => {
                setDataCourseForUser(data.data)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
            })
    }, [])

    console.log(dataCoursezForUser);

    const numberValue = (data: string | undefined) => {
        if (data) {
            const numericValue = parseInt(data.replace(/[^\d]/g, ""), 10);
            return numericValue
        }
    }

    return (
        <div>
            <div className={styles.header_title}>Chi tiết người dùng</div>
            <div className={styles.header_body}>
                <div className={styles.card_notice}>
                    <span>
                        <p>Đang học</p>
                        {loading ? (
                            <ReactLoading type={"spokes"} color={'rgba(153, 153, 153, 1)'} height={'30%'} width={'30%'} delay={10} />
                        ) : (
                            <h3>{dataCourse?.courseInprogress}</h3>
                        )}
                    </span>
                    <Image
                        src={"/img_admin/boxvippro.png"}
                        alt="icon"
                        width={60}
                        height={60}
                    />
                </div>
                <div className={styles.card_notice}>
                    <span>
                        <p>Đã hoàn thành</p>
                        {loading ? (
                            <ReactLoading type={"spokes"} color={'rgba(153, 153, 153, 1)'} height={'30%'} width={'30%'} delay={10} />
                        ) : (
                            <h3>{dataCourse?.courseCompleted}</h3>
                        )}
                    </span>
                    <Image
                        src={"/img_admin/monneyvip.svg"}
                        alt="icon"
                        width={60}
                        height={60}
                    />
                </div>
                <div className={styles.card_notice}>
                    <span>
                        <p>Tổng tiền học</p>
                        {loading ? (
                            <ReactLoading type={"spokes"} color={'rgba(153, 153, 153, 1)'} height={'30%'} width={'30%'} delay={10} />
                        ) : (
                            <h3>{numberValue(dataCourse?.totalCoursePurchaser)} VND</h3>
                        )}
                    </span>
                    <Image
                        src={"/img_admin/comment.svg"}
                        alt="icon"
                        width={60}
                        height={60}
                    />
                </div>
                <div className={styles.card_notice}>
                    <span>
                        <p>Đánh giá khóa học</p>
                        {loading ? (
                            <ReactLoading type={"spokes"} color={'rgba(153, 153, 153, 1)'} height={'30%'} width={'30%'} delay={10} />
                        ) : (
                            <h3>{numberValue(dataCourse?.ratingCourses)}</h3>
                        )}
                    </span>
                    <Image
                        src={"/img_admin/total_view.svg"}
                        alt="icon"
                        width={60}
                        height={60}
                    />
                </div>
            </div>
            <div className={styles.body_user}>
                <div className={styles.body_avatar}>
                    <Figure>
                        {loading ? (
                            <ReactLoading type={"spokes"} color={'rgba(153, 153, 153, 1)'} height={'100%'} width={'100%'} delay={10} />
                        ) : (
                            <>
                                <Figure.Image
                                    width={110}
                                    height={110}
                                    alt="Avatar"
                                    src={`${dataCoursezForUser?.user?.avatar ? dataCoursezForUser?.user?.avatar : 'https://res.cloudinary.com/dnmc89c8b/image/upload/v1730106626/avatars/Component%2082.png'}`}
                                    roundedCircle
                                    className="mt-4"
                                />
                                <Figure.Caption className={styles.name_title}>{dataCoursezForUser?.user?.fullname}</Figure.Caption>
                                <Figure.Caption>Học viên</Figure.Caption>
                                <Figure.Caption>{dataCoursezForUser?.user?.email}</Figure.Caption>
                            </>
                        )}
                    </Figure>
                </div>
                <div className={styles.body_study}>
                    <Row md={12} className={styles.main__course}>
                        {

                            loading ? (
                                <ReactLoading type={"spokes"} color={'rgba(153, 153, 153, 1)'} height={'100%'} width={'100%'} delay={10} />
                            ) : (
                                dataCoursezForUser?.courses?.map((item) => (
                                    <Col md={4} className={styles.mainBox}>
                                        <Card className={styles.mainBox__content}>
                                            <Card.Header className={styles.headerContent}>
                                                <section className={styles.headerContent__text}>
                                                    <Card.Title className={styles.text__hedding2}>
                                                        {item.name_course}
                                                    </Card.Title>
                                                    <Card.Subtitle className={styles.text__hedding3}>
                                                        by My Team
                                                    </Card.Subtitle>
                                                    <Card.Img
                                                        src="/img/iconReact.svg"
                                                        alt=""
                                                        className={styles.text__img}
                                                    />
                                                </section>
                                                <Card.Img
                                                    src="/img/tuan.png"
                                                    alt=""
                                                    className={styles.headerContent__avt}
                                                />
                                            </Card.Header>
                                            <Card.Body className={styles.mainContent}>
                                                <section className={styles.bodyContent}>
                                                    <div className={styles.bodyContent__element}>
                                                        <Image
                                                            src="/img/bookoffgreen.svg"
                                                            alt=""
                                                            className={styles.element__img}
                                                        />
                                                        <Card.Text className={styles.element__text}>
                                                            {item.chapters_count}  Chương
                                                        </Card.Text>
                                                    </div>
                                                    <div className={styles.bodyContent__element}>
                                                        <Image
                                                            src="/img/bookopenblue.svg"
                                                            alt=""
                                                            className={styles.element__img}
                                                        />
                                                        <Card.Text className={styles.element__text}>
                                                            {item.documents_count} Bài tập
                                                        </Card.Text>
                                                    </div>
                                                    <div className={styles.bodyContent__element}>
                                                        <Image
                                                            src="/img/bookopenyellow.svg"
                                                            alt=""
                                                            className={styles.element__img}
                                                        />
                                                        <Card.Text className={styles.element__text}>
                                                            Đã học
                                                        </Card.Text>
                                                    </div>
                                                </section>
                                                <section className={styles.mainContent__headContent}>
                                                    <div className={styles.headContent__evaluete}>
                                                        <div className={styles.evaluete__main}>
                                                            <div className={styles.starGroup}>
                                                                {Array.from({ length: Math.round(Number(item.rating_course)) }).map((_, index) => (
                                                                    <Image key={index} src="/img/iconStar.svg" alt="" className={styles.starElement} />
                                                                ))}
                                                            </div>

                                                            <Card.Text className={styles.starNumber}>
                                                                {"("} {item.rating_course} {")"}
                                                            </Card.Text>
                                                        </div>
                                                    </div>
                                                    <div className={styles.headContent__percent}>
                                                        <Card.Text className={styles.evaluete__note}>
                                                            {"("} {item.views_course} phản hồi {")"}
                                                        </Card.Text>
                                                    </div>
                                                </section>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))
                            )}
                    </Row>
                </div>
            </div>
        </div>
    );
};
export default UserDetail;
