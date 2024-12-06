"use client";

import styles from "@public/styles/post/HeroPost.module.css";
import { Container, Row, Col, Image, Card } from 'react-bootstrap';
import PostTTO from "../LinePostOnePostTTO";
import ListPostTTO from "../ListPostTTO";
import ListPostLeftTTO from "../LinePostTwoPostTTO"
import LinePostOnePostTTO from "../LinePostOnePostTTO";
import LinePostTwoPostTTO from "../LinePostTwoPostTTO";
import ListSingle from "../ListSingle";

const HeroPost: React.FC = () => {
    return (
        <Container className={styles.container}>
            <h2 className={styles.title}>
                Bản tin TTO.SH
            </h2>
            <Row className={styles.Wapper} >
                <Col xs={6} md={3}>
                    <figure className={styles.itemList}>
                        <Image className={styles.image} src="https://images.unsplash.com/photo-1719937206341-38a6392dfdef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8" alt="Post hero" />
                        <figcaption className={styles.descImg}><span className={styles.content}>Xu hướng công nghệ</span></figcaption>
                    </figure>
                </Col>
                <Col xs={6} md={3}>
                    <figure className={styles.itemList}>
                        <Image className={styles.image} src="https://images.unsplash.com/photo-1719937206341-38a6392dfdef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8" alt="Post hero" />
                        <figcaption className={styles.descImg}><span className={styles.content}>Xu hướng công nghệ</span></figcaption>
                    </figure>
                </Col>
                <Col xs={6} md={3}>
                    <figure className={styles.itemList}>
                        <Image className={styles.image} src="https://images.unsplash.com/photo-1719937206341-38a6392dfdef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8" alt="Post hero" />
                        <figcaption className={styles.descImg}><span className={styles.content}>Xu hướng công nghệ</span></figcaption>
                    </figure>
                </Col>
                <Col xs={6} md={3}>
                    <figure className={styles.itemList}>
                        <Image className={styles.image} src="https://images.unsplash.com/photo-1719937206341-38a6392dfdef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8" alt="Post hero" />
                        <figcaption className={styles.descImg}><span className={styles.content}>Xu hướng công nghệ</span></figcaption>
                    </figure>
                </Col>
            </Row>
            <div>
                <h3 className={styles.title2}>
                    Cùng xem qua những bài viết nổi bật của TTO
                </h3>
                <LinePostOnePostTTO />
                <LinePostTwoPostTTO />


                <h3 className={styles.title2}>
                    Danh sách bài bài viết có lượt xem cao nhất
                </h3>

                <ListSingle />

                <LinePostOnePostTTO />
            </div>

        </Container>
    )
}

export default HeroPost;