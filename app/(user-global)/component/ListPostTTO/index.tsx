import { Dispatch, SetStateAction } from 'react';
import { Col, Card, Row } from 'react-bootstrap';

interface TypeProps {
    step?: string;
    setStep?: Dispatch<SetStateAction<string>>;
}

const ListPostTTO = (props: TypeProps) => {
    const listCount = props.step === "1" ? 2 : 3;

    return (
        <Col xs={12} lg={4}>
            {[...Array(listCount)].map((_, index) => (
                <Card key={index} className="mb-3 border-0">
                    <Row className="g-2">
                        <Col xs={4}>
                            <Card.Img
                                className="w-100"
                                style={{ height: '100%', objectFit: 'cover' }}
                                src="https://placehold.co/240x144"
                                alt={`Image ${index + 1}`}
                            />
                        </Col>
                        <Col xs={8} className="d-flex flex-column justify-content-between">
                            <Card.Body className="p-0">
                                <Card.Title className="h6 fw-semibold">
                                    {
                                        props.step === "1" ? "Bài viết nhất trong tháng" : "Tầm quan trọng của bảo mật"
                                    }
                                </Card.Title>
                                <Card.Text className="text-black fs-6 lh-base fw-medium">
                                    Trong thời đại số hóa, bảo mật phần mềm trở thành một yếu tố không thể thiếu. Việc tích hợp các quy trình bảo mật ngay từ...
                                </Card.Text>
                            </Card.Body>
                            <Row className="text-muted align-items-center" style={{ fontSize: '0.8rem' }}>
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
