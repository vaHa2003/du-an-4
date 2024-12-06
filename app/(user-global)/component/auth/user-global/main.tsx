import { Container } from "react-bootstrap"
import styles from '@public/styles/user/Main.module.css'

interface MainProps {
    children?: React.ReactNode
}

const Main: React.FC<MainProps> = ({ children }) => {
    return (
        <>
            <Container className={styles.container}>
                <section className={styles.main}>
                    {children}
                </section>
            </Container>
        </>
    )
}

export default Main 