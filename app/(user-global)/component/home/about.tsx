
import styles from '@public/styles/home/About.module.css'
import { Container, Image } from 'react-bootstrap'
import ButtonCpn from '../globalControl/btnComponent'

const About: React.FC = () => {
    return (
        <>
            <Container className={styles.container}>
                <div className={styles.container__main}>
                    <div className={styles.container__bg}></div>
                    <section className={styles.left__container}>
                        <h3 className={styles.left__container__h3}>
                            Đội ngũ sáng lập đầy nhiệt hiếu và trách nhiệm
                        </h3>
                        <h2 className={styles.left__container__h2}>
                            Hiểu hơn cơ duyên thành lập của TTO.SH
                        </h2>
                        <h4 className={styles.left__container__h4}>
                            Đội ngũ sáng lập TTO.SH gồm những chuyên gia nhiệt huyết trong lĩnh vực giáo dục và công nghệ.
                            <br />
                            Họ cam kết phát triển nền tảng học tập trực tuyến chất lượng, cung cấp khóa học đa dạng và hấp dẫn.
                            <br />
                            Đội ngũ chịu trách nhiệm xây dựng chương trình học, phát triển công nghệ và triển khai chiến lược tiếp thị nhằm thu hút học viên.
                            <br />
                            Với tầm nhìn chung, họ hướng đến việc giúp người học nâng cao kỹ năng và thăng tiến trong sự nghiệp.
                        </h4>
                        <div className={styles.left__container__btnGroup}>
                            <ButtonCpn leftIcon={false} width={143} chevron={2}>Xem thêm</ButtonCpn>
                        </div>
                    </section>
                    <section className={styles.right__container}>
                        <Image src="/img/aboutImg.svg" alt="" className={styles.right__container__img} />
                        <div className={styles.right__container__bg}></div>
                    </section>
                </div>
            </Container>
        </>
    )
}

export default About