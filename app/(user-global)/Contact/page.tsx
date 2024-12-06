import { Container, Col, Row } from 'react-bootstrap'
import c from '@public/styles/Contact/contact.module.css'
import { Hero, Form, Map } from './Content';
import { Main } from 'next/document';
const Contact = () => {
    return (
        <main className={c.main}>
            <Hero />
            <Form />
            <Map />
        </main>
    )
}
export default Contact;