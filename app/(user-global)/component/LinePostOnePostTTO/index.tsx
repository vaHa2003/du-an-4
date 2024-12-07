import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { Dispatch, SetStateAction } from 'react';
import ListPostTTO from '../ListPostTTO';
interface TypeProps {
    step?: string;
    setStep?: Dispatch<SetStateAction<string>>;
}
const LinePostOnePostTTO = (props: TypeProps) => {
    const listCount = props.step === "1" ? 2 : 3;
    return (
        <Container className="m-0">
            <Row style={{ padding: "0 55px" }}>
                {/* Left section */}
                <Col xs={12} lg={6} className="mb-4 mb-lg-0">
                    <Card className="border-0 position-relative w-100" style={{ height: "480px" }}>
                        <Card.Img
                            variant="top"
                            src="https://images.pexels.com/photos/669578/pexels-photo-669578.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="Xu hướng công nghệ"
                            className="w-100 h-100"
                            style={{ objectFit: 'cover', width: '638px', height: '480px', borderRadius: "10px" }}
                        />
                        <Card.Body className="position-absolute bottom-0 px-4 text-white">
                            <Card.Title className="fw-bold fs-2 fs-md-1">
                                Xu hướng công nghệ AI và Machine Learning năm 2024
                            </Card.Title>
                            <Card.Text className="fs-6 lh-base">
                                Trí tuệ nhân tạo (AI) và học máy (Machine Learning) đang trở thành công nghệ chủ chốt trong nhiều lĩnh vực, từ y tế, tài chính đến thương mại điện tử...
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Right section */}
                <ListPostTTO />
            </Row>
        </Container>
    )
}

export default LinePostOnePostTTO
