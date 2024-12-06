import styles from "@public/styles/post/CartPost.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

interface CardPosts {
  type?: "Horizontal" | "Vertical";
  direction?: "Left" | "Right";
  title: string;
  image: string;
  date?: string;
  content: string;
  author?: string;
}
const HeroColumnPost: React.FC<CardPosts> = ({
  type,
  direction,
  title,
  image,
  date,
  content,
  author,
}) => {
  return (
    <>
      <img src={image} height={480} width={630} />
      <Row className={`${styles.heroArticleText} d-flex flex-column`}>
        <h2 className={`${styles.heroTitleArticle} text-white fw-bold h2`}>
          {title}
        </h2>
        <p className={`${styles.heroArticle} text-white`}>{content}</p>
      </Row>
    </>
  );
};

export default HeroColumnPost;
