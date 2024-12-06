import Image from 'next/image'
import styles from '@public/styles/globalControl/itemSearch.module.css'

type itemSearchProps = RouteSearch | CourseSearch | PostSearch;

const Itemsearch: React.FC<itemSearchProps> = ({ id, title, image }) => {
    return (
        <div className={styles.item} key={id}>
            <Image src={image} alt={title} width={40} height={40} className={styles.image} />
            <p className={styles.title}>{title}</p>
        </div>
    )
}

export default Itemsearch;