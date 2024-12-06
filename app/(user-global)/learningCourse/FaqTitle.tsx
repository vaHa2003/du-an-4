import styles from "@public/styles/Learning/Faq.module.css"
const FaqTitle: React.FC<CommentTitleProps> = ({ id, replies_count, title }) => {
    return (
        <div className={styles.ContainerTitle} >
            <p className={styles.contentTitle}>{title}</p>
            <span className={styles.repliesCount}>{replies_count}</span>
        </div>
    )
}

export default FaqTitle;