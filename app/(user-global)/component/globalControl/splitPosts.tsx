import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CardPosts from "./CartPost";

import styles from "@public/styles/post/CartPost.module.css";

interface ICardPosts {
  type: "Horizontal" | "Vertical";
  direction: "Left" | "Right";
  title: string;
  image: string;
  date: string;
  content: string;
  author: string;
}

const SplitOrientationLayout: React.FC<CardPosts> = ({
  type,
  direction,
  title,
  image,
  date,
  content,
  author,
}) => (
  <Container className={`${styles.mainContainer}`}>
    <Row xs={3} className="d-flex gap-5">
      <Col xs={3}>
        <CardPosts
          type="Vertical"
          title={title}
          image={image}
          date={date}
          content={content}
          author={author}
          direction={"Left"}
        />
      </Col>
      <Col xs={3}>
        <CardPosts
          type="Vertical"
          title={title}
          image={image}
          date={date}
          content={content}
          author={author}
          direction={"Left"}
        />
      </Col>
      <Col className="d-flex flex-column gap-4 p-0">
        <CardPosts
          type="Horizontal"
          title={title}
          image={image}
          date={date}
          content={content}
          author={author}
          direction={"Left"}
        />
        <CardPosts
          type="Horizontal"
          title={title}
          image={image}
          date={date}
          content={content}
          author={author}
          direction={"Left"}
        />
      </Col>
    </Row>
  </Container>
);

export default SplitOrientationLayout;
