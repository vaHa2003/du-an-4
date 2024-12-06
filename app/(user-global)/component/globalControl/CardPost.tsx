import React from 'react';
import { Card } from "react-bootstrap";

const CardPosts: React.FC<CardPosts> = ({ type, title, image, date, content, author }) => {
    const getNotificationStyles = () => {
        switch (type) {
            case "Horizontal":
                return {
                    flex: "row" as const,
                    width: "240px",
                }
            case "Vertical":
                return {
                    flex: "column" as const,
                    width: "304px",
                }
            default:
                return {
                    flex: "column" as const,
                    width: "240px",
                };
        }
    }

    const { flex, width } = getNotificationStyles();
    return (
        <Card style={{ flexDirection: flex }}>
            <Card.Img variant="top" src={image} style={{ width: width }} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    {content}
                </Card.Text>
                <Card.Text>
                    <span>{date}</span>
                    <p>{author}</p>
                </Card.Text>
            </Card.Body>
        </Card>
    )

}

export default CardPosts;