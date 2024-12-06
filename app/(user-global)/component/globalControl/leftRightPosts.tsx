import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import styles from "@public/styles/post/CartPost.module.css";
import AltCardPost from "./altCardPost";

interface CardPosts {
  type: "Horizontal" | "Vertical";
  direction: "Left" | "Right";
  title: string;
  image: string;
  date: string;
  content: string;
  author: string;
}

const LeftRightLayout: React.FC<CardPosts> = ({
  type,
  direction,
  title,
  image,
  date,
  content,
  author,
}) => (
  <Container className={`${styles.mainContainer} d-flex flex-column gap-5`}>
    <h2 className="h1">Danh sách bài bài viết có lượt xem cao nhất</h2>
    <Col>
      <AltCardPost
        type="Horizontal"
        title={title}
        image={image}
        date={date}
        content={content}
        author={author}
        direction={"Left"}
      />
      <AltCardPost
        type="Horizontal"
        title={title}
        image={image}
        date={date}
        content={content}
        author={author}
        direction={"Right"}
      />
      <AltCardPost
        type="Horizontal"
        title={title}
        image={image}
        date={date}
        content={content}
        author={author}
        direction={"Left"}
      />
      <AltCardPost
        type="Horizontal"
        title={title}
        image={image}
        date={date}
        content={content}
        author={author}
        direction={"Right"}
      />
    </Col>
  </Container>
);

export default LeftRightLayout;
