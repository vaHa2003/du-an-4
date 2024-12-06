import React from "react";
import { Card, Image } from "react-bootstrap";
import styles from "@public/styles/post/CartPost.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

interface CardPosts {
  type: "Horizontal" | "Vertical";
  direction: "Left" | "Right";
  title: string;
  image: string;
  date: string;
  content: string;
  author: string;
}
const AltCardPost: React.FC<CardPosts> = ({
  type,
  direction,
  title,
  image,
  date,
  content,
  author,
}) => {
  const getNotificationStyles = () => {
    switch (type) {
      case "Horizontal":
        return {
          flex: "row" as const,
          width: "240px",
          height: "144px",
        };
      case "Vertical":
        return {
          flex: "column" as const,
          width: "300px",
          height: "144px",
        };
      default:
        return {
          flex: "column" as const,
          width: "240px",
          height: "144px",
        };
    }
  };

  const { flex, width, height } = getNotificationStyles();
  return (
    <>
      <span
        className={`d-flex align-items-center gap-3 ${
          direction === "Left" ? "justify-content-between" : ""
        } ${styles.articleLRHeader}`}
      >
        <span className="d-flex align-items-center gap-3">
          <h3 className="h4">{title}</h3>

          <span
            className={`${styles.articleLRColorText} ${styles.articleLRInfo}`}
          >
            {date}
          </span>
          <span className={`${styles.articleLRInfo}`}>{author}</span>
        </span>
        <span
          className={`${styles.articleLRColorText} ${styles.articleLRInfo}`}
        >
          #Công nghệ mới
        </span>
      </span>
      <Container
        className={`${
          type === "Horizontal" ? "d-flex flex-row gap-4 my-5 mt-2 p-0" : "h-100"
        } ${direction === "Right" ? "text-end flex-row-reverse" : ""} ${
          styles.mainContainer
        } `}
      >
        <Image src={image} style={{ width: width, height: height }} />
        <Row className={`${styles.altContent}`}>
          <span>{content}</span>
        </Row>
      </Container>
    </>
  );
};

export default AltCardPost;
