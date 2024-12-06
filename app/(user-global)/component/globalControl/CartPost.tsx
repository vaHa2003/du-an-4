import React from "react";
import { Card } from "react-bootstrap";
import styles from "@public/styles/post/CartPost.module.css";

interface CardPosts {
  type: "Horizontal" | "Vertical";
  direction: "Left" | "Right";
  title: string;
  image: string;
  date: string;
  content: string;
  author: string;
}
const CardPosts: React.FC<CardPosts> = ({
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
    <Card
      className={`${
        type === "Horizontal"
          ? "d-flex flex-row"
          : "d-flex flex-column justify-content-center h-100"
      } ${direction === "Right" ? "text-end" : ""} border-0 w-25`}
    >
      <Card.Img
        variant="top"
        src={image}
        style={{ width: width, height: height }}
      />
      <Card.Body className={styles.body}>
        <span>
          <Card.Title className={styles.title}>{title}</Card.Title>
          <Card.Text className={styles.content}>{content}</Card.Text>
        </span>
        <div className="d-flex justify-content-between">
          <Card.Text className={styles.footer}>{date}</Card.Text>
          <Card.Text className={styles.footer}>{author}</Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardPosts;
