import { Dispatch, SetStateAction } from 'react';
import { Col, Card, Row } from 'react-bootstrap';

interface TypeProps {
    step?: string;
    setStep?: Dispatch<SetStateAction<string>>;
}

const ListPostTTO = (props: TypeProps) => {
    const listCount = props.step === "1" ? 2 : 3;

    return (
        <Col xs={12} lg={6} className="d-flex flex-column">
            {[...Array(listCount)].map((_, index) => (
                <Card key={index} className="mb-4 border-0" style={{ height: "100%" }}>
                    <Row className="g-2" style={{ height: "100%" }}>
                        {/* Left column with image */}
                        <Col xs={6} className="d-flex align-items-stretch justify-content-end">
                            <Card.Img
                                style={{ width: '240px', height: '144px', objectFit: 'cover' }}
                                src="https://placehold.co/240x144"
                                alt={`Image ${index + 1}`}
                            />

                        </Col>

                        {/* Right column with text */}
                        <Col xs={6} className="d-flex flex-column justify-content-between">
                            <Card.Body className="p-0" style={{ margin: "0 12px", flex: 1 }}>
                                <Card.Title className="h6 fw-semibold">
                                    {props.step === "1" ? "Bài viết nhất trong tháng" : "Tầm quan trọng của bảo mật"}
                                </Card.Title>
                                <Card.Text className="text-black fs-6 lh-base fw-medium" style={{
                                    display: "-webkit-box",
                                    WebkitBoxOrient: "vertical",
                                    WebkitLineClamp: 4,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    maxHeight: "6rem"
                                }}>
                                    Phải mạnh dạn xây dựng, triển khai các chính sách với quan điểm nhìn xa, trông rộng, nghĩ lớn, làm lớn, hiệu quả tổng thể, lãnh đạo Chính phủ nêu quan điểm. Để thực hiện mục tiêu này, Thủ tướng yêu cầu các thành viên Chính phủ, người đứng đầu các bộ, ngành, địa phương phải có tư duy đổi mới, đột phá với quyết tâm cao, nỗ lực lớn, hành động quyết liệt với tinh thần 'dám nghĩ, dám làm, dám đột phá vì lợi ích chung'; 'đã nói là làm, đã cam kết là phải thực hiện; đã làm, đã thực hiện phải có hiệu quả'.
                                </Card.Text>
                            </Card.Body>
                            <Row className="text-muted align-items-center" style={{ fontSize: '0.8rem', padding: "0px 12px" }}>
                                <Col xs="auto">01-10-2024</Col>
                                <Col className="text-end">Tuấn huỳnh</Col>
                            </Row>
                        </Col>
                    </Row>
                </Card>
            ))}
        </Col>
    );
}

export default ListPostTTO;
