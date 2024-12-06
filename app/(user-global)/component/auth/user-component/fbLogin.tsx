import { signIn } from 'next-auth/react'; 
import styles from '@public/styles/login/LoginBtn.module.css';

const FbLogin = () => {
    return (
        <button className={styles.RegisterMedia__btn}
            onClick={() => signIn("facebook")}>
            <img src="/img/fb.svg" alt="" className={styles.RegisterMedia__img} />
            <div className={styles.RegisterMedia__title}>
                Facebook
            </div>
        </button>
    )
}

export default FbLogin;
