import React, { useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import ListPostTTO from '../ListPostTTO'

const LinePostTwoPostTTO = () => {
    const [step, setStep] = useState("1")
    return (
        <Container className='m-0'>
            <Row style={{ padding: "0 55px" }}>
                {/* Left section */}
                <Col xs={12} lg={6}>
                    <Row className="g-4">
                        {[1, 2].map((item, index) => (
                            <Col xs={6} key={index}>
                                <Card className="mb-3 border-0">
                                    <Row className="g-3 d-flex flex-column">
                                        <Col xs={12}>
                                            <Card.Img
                                                style={{
                                                    height: '144px',
                                                    maxWidth: '304px',
                                                    objectFit: 'cover',
                                                }}
                                                src="https://placehold.co/304x144"
                                                alt={`Image ${index + 1}`}
                                            />
                                        </Col>
                                        <Col xs={12} className="d-flex flex-column justify-content-between">
                                            <Card.Body className="p-0">
                                                <Card.Title className="h6 fw-semibold">
                                                    Bài viết nhất trong tháng
                                                </Card.Title>
                                                <Card.Text className="text-black fs-6 lh-base mb-2 fw-medium" style={{
                                                    display: "-webkit-box",
                                                    WebkitBoxOrient: "vertical",
                                                    WebkitLineClamp: 4,
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    maxHeight: "6rem"
                                                }}>
                                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore nostrum nobis, alias incidunt accusantium adipisci, doloremque perspiciatis veritatis quisquam debitis hic deserunt? Debitis sint inventore nulla officia saepe assumenda nisi.
                                                    Aperiam autem possimus consectetur dolor saepe quaerat dolores magnam repellendus perspiciatis corrupti at veritatis suscipit, labore dignissimos porro iusto commodi ut voluptatibus aliquid dolorem minima qui perferendis? Distinctio, dolorum eos.
                                                </Card.Text>
                                            </Card.Body>
                                            <Row className="text-muted align-items-center" style={{ fontSize: '0.8rem' }}>
                                                <Col xs="auto">01-10-2024</Col>
                                                <Col className="text-end">Tuấn huỳnh</Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>



                {/* Right section */}
                <ListPostTTO step={step} setStep={setStep} />
            </Row>
        </Container>

    )
}

export default LinePostTwoPostTTO
