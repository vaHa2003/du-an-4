import React from 'react'
import { Col, Card, Row, Container } from 'react-bootstrap';
import ListPostTTO from '../ListPostTTO';

const ListSingle = () => {
    return (
        // style={{ fontSize: "0.8rem" }}
        <Container className="m-0">
            <Row style={{ padding: "0 55px" }}>
                {[1, 2, 3].map((item, index) => (
                    <Row key={index} className="align-items-center mb-5">
                        <Row className="text-muted align-items-center">
                            <Col xs="auto" className="pb-3">
                                <span
                                    style={{
                                        borderLeft: "2px solid black",
                                        height: "100px",
                                        marginRight: "10px",
                                    }}
                                ></span>
                                <span
                                    className="fw-bold fs-5 text-black"
                                    style={{ color: "#88e8f4", marginRight: "10px" }}
                                >
                                    Tên bài viết {index + 1}
                                </span>
                                <span style={{ color: "#88e8f4", marginRight: "10px" }}>
                                    01-10-2024
                                </span>
                                <span>Tuấn Huỳnh</span>
                            </Col>
                            <Col className="text-end">
                                <span style={{ color: "#88e8f4", marginLeft: "10px" }}>#</span>Công
                                nghệ mới
                            </Col>
                        </Row>

                        {/* Left-Right Logic */}
                        {index % 2 === 0 ? (
                            <>
                                {/* Ảnh bên trái */}
                                <Col xs={12} lg={4} className="mb-4 mb-lg-0">
                                    <Card
                                        className="border-0 position-relative w-100"
                                    >
                                        <Card.Img
                                            className="w-100"
                                            style={{ objectFit: "cover", height: "144px" }}
                                            src="https://placehold.co/204x144"
                                            alt={`img ${index + 1}`}
                                        />
                                    </Card>
                                </Col>

                                {/* Nội dung bên phải */}
                                <Col xs={12} lg={8}>
                                    <Card.Text className="text-black fs-6 lh-base fw-medium text-start m-0">
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem quis incidunt eius pariatur blanditiis sapiente eaque quaerat quidem magni, facilis, modi omnis eos totam odio voluptate reiciendis corrupti rerum laboriosam!
                                        Dolores blanditiis asperiores nihil. Pariatur cum commodi, facilis eveniet doloremque eum expedita nemo, adipisci, incidunt tempora dolores necessitatibus illum reiciendis deserunt suscipit tempore dolorum. Quam soluta nostrum dicta modi magnam.
                                        Quod, eligendi. Numquam doloribus impedit facilis commodi. Consectetur delectus quasi odit culpa error dolores quisquam fugiat impedit deleniti ratione pariatur...
                                    </Card.Text>
                                </Col>

                            </>
                        ) : (
                            <>
                                {/* Nội dung bên trái */}
                                <Col xs={12} lg={8}>
                                    <Card.Text className="text-black fs-6 lh-base fw-medium">
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem quis incidunt eius pariatur blanditiis sapiente eaque quaerat quidem magni, facilis, modi omnis eos totam odio voluptate reiciendis corrupti rerum laboriosam!
                                        Dolores blanditiis asperiores nihil. Pariatur cum commodi, facilis eveniet doloremque eum expedita nemo, adipisci, incidunt tempora dolores necessitatibus illum reiciendis deserunt suscipit tempore dolorum. Quam soluta nostrum dicta modi magnam.
                                        Quod, eligendi. Numquam doloribus impedit facilis commodi. Consectetur delectus quasi odit culpa error dolores quisquam fugiat impedit deleniti ratione pariatur...
                                    </Card.Text>
                                </Col>

                                {/* Ảnh bên phải */}
                                <Col xs={12} lg={4} className="mb-4 mb-lg-0">
                                    <Card
                                        className="border-0 position-relative w-100"
                                    >
                                        <Card.Img
                                            className="w-100"
                                            style={{ height: "144px", objectFit: "cover" }}
                                            src="https://placehold.co/204x144"
                                            alt={`img ${index + 1}`}
                                        />

                                    </Card>
                                </Col>
                            </>
                        )}
                    </Row>
                ))}
            </Row>
        </Container>


    )
}

export default ListSingle
