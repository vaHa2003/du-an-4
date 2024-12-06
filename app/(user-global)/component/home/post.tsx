import styles from '@public/styles/home/Post.module.css';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import ButtonComponet from '../globalControl/btnComponent';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Post as PostModel } from "@/app/(user-global)/model/post";
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const Post: React.FC = () => {
    const { data, error } = useSWR<{ status: string; message: string; data: PostModel[] }>('/api/posthighest/6', fetcher);

    const router = useRouter();
    const rightBodyRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

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

    const handleNavigation = (id: number|string) => {
        router.push(`/post/${id}`);
    };

    if (error) return <div>Error loading posts</div>;
    if (!data) return <div>Loading...</div>;

    const posts = Array.isArray(data.data) ? data.data : [];

    return (
        <Container className={styles.container}>
            <Row className={styles.body}>
                <Image src="/img/postIcon.svg" alt="" className={styles.img__logo} />
                <Col className={styles.left__body}>
                    <Card className={styles.left__body__card}>
                        <Card.Body className={styles.left__body__card__main}>
                            <Card.Title className={styles.left__body__card__title}>Bản tin TTO.SH</Card.Title>
                            <Card.Subtitle className={styles.left__body__card__subTitle}>Post</Card.Subtitle>
                            <Card.Text className={styles.left__body__card__content}>
                                Phát triển kỹ năng chuyên môn với các khóa học đa lĩnh vực,
                                thực hành qua dự án thực tế và chứng chỉ giá trị.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <ButtonComponet type='secondery' size='M' status='default' leftIcon={false} chevron={2}>Xem thêm tin tức</ButtonComponet>
                    <div className={styles.left__body__card__groupBtn}>
                        <Button className={styles.btn__prev} onClick={scrollLeftHandler}>
                            <svg width="auto" height="auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 18L9 12L15 6" stroke="#15C8E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.stroke__icon} />
                            </svg>
                        </Button>
                        <Button className={styles.btn__next} onClick={scrollRightHandler}>
                            <svg width="auto" height="auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 18L15 12L9 6" stroke="#15C8E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Button>
                    </div>
                </Col>
                <Col
                    className={styles.right__body}
                    ref={rightBodyRef}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeaveOrUp}
                    onMouseUp={handleMouseLeaveOrUp}
                    onMouseMove={handleMouseMove}
                >
                    {posts.map(post => (
                        <Card key={post.id} className={styles.right__body__box} onClick={() => handleNavigation(post.id)}>
                            <Card.Img src={post.img_post} className={styles.right__body__img} />
                            <Card.Body className={styles.right__body__main}>
                                <Card.Subtitle className={styles.right__body__subTitle}>{new Date(post.created_at).toLocaleDateString()}</Card.Subtitle>
                                <Card.Title className={styles.right__body__title}>{post.title_post}</Card.Title>
                                <Card.Text className={styles.right__body__content}>
                                    {post.content_post}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </Col>
            </Row>
        </Container>
    );
}

export default Post;
