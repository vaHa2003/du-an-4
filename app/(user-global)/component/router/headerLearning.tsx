import { Col, Container, Row } from "react-bootstrap"
import ButtonCpn from "../globalControl/btnComponent"
import styles from '@public/styles/learningPath/HeaderLearning.module.css'
import { useRouter } from "next/navigation"


const HeaderLearning: React.FC = () => {
    const router = useRouter()

    const handleCreateRouter = () => {
        router.push('/createLearningPath')
    }

    return (
        <>
            <Container className={styles.container}>
                <Row className={styles.main}>
                    <Col className={styles.header__title}>
                        <div className={styles.header__box__blue}>
                            <div className={styles.header__box_pink}></div>
                        </div>
                        <h2 className={styles.header__title__content}>
                            Lộ trình học
                        </h2>
                        <div className={styles.header__border__blue}>
                            <div className={styles.header__box__grayBlue}></div>
                        </div>
                    </Col>
                    <Col className={styles.body}>
                        <h3 className={styles.body__content}>
                            Lộ trình học cho Dev là kế hoạch hướng dẫn từ cơ bản đến chuyên sâu,
                            giúp xây dựng kỹ năng lập trình chuyên nghiệp.
                            Nó bao gồm học ngôn ngữ lập trình, thuật toán,
                            phát triển web {'('}Frontend, Backend{')'},
                            làm việc với cơ sở dữ liệu và nâng cao kiến thức về API,
                            kiến trúc microservices, và DevOps để sẵn sàng cho môi trường làm việc thực tế.
                        </h3>
                    </Col>
                    <Col className={styles.btn__group}>
                        <ButtonCpn
                            type="secondery"
                            width={264}
                            size="M"
                            rightIcon={false}
                            status="hover"
                            onClick={handleCreateRouter}
                        >
                            Tạo lộ trình của riêng bạn</ButtonCpn>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default HeaderLearning