import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CardPosts from "./CartPost";

import styles from "@public/styles/post/CartPost.module.css";
import HeroColumnPost from "./heroColumnPost";

interface ICardPosts {
  type: "Horizontal" | "Vertical";
  direction: "Left" | "Right";
  title: string;
  image: string;
  date: string;
  content: string;
  author: string;
}
const TwoColumnLayout: React.FC<ICardPosts> = ({
  type,
  direction,
  title,
  image,
  date,
  content,
  author,
}) => (
  <Container className={`${styles.mainContainer}`}>
    <Row xs={2} className="d-flex gap-5 px-2">
      <Col xs={8} className={`${styles.heroArticleContainer} position-relative`}>
        <HeroColumnPost title={title} image={image} content={content} />
      </Col>
      <Col xs={5} className="d-flex flex-column justify-content-end gap-4">
        <CardPosts
          type="Horizontal"
          title={title}
          image={image}
          date={date}
          content={content}
          author={author}
          direction={direction}
        />
        <CardPosts
          type="Horizontal"
          title={title}
          image={image}
          date={date}
          content={content}
          author={author}
          direction={direction}
        />
        <CardPosts
          type="Horizontal"
          title={title}
          image={image}
          date={date}
          content={content}
          author={author}
          direction={direction}
        />
      </Col>
    </Row>
  </Container>
);

export default TwoColumnLayout;
