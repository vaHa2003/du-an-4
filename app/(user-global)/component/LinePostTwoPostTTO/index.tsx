import React, { useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import ListPostTTO from '../ListPostTTO'

const LinePostTwoPostTTO = () => {
    const [step, setStep] = useState("1")
    return (
        <Container className='m-0'>
            <Row style={{ padding: "0 55px" }}>
                {/* Left section */}
                <Col xs={12} lg={8}>
                    <Row className="g-4">
                        {[1, 2].map((item, index) => (
                            <Col xs={6} key={index}>
                                <Card className="mb-3 border-0">
                                    <Row className="g-3 d-flex flex-column">
                                        <Col xs={12}>
                                            <Card.Img
                                                className="w-100"
                                                style={{ height: '137px', objectFit: 'cover' }}
                                                src="https://placehold.co/304x144"
                                                alt={`Image ${index + 1}`}
                                            />
                                        </Col>
                                        <Col xs={12} className="d-flex flex-column justify-content-between">
                                            <Card.Body className="p-0">
                                                <Card.Title className="h6 fw-semibold">
                                                    Bài viết nhất trong tháng
                                                </Card.Title>
                                                <Card.Text className="text-black fs-6 lh-base fw-medium">
                                                    Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla
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
