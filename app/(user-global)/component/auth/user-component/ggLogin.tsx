'use client'

import { signIn, useSession } from 'next-auth/react';
import { useEffect, useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@public/styles/login/LoginBtn.module.css';
import { useDispatch } from 'react-redux';
import { login } from '@/redux/slices/userSlice';

const GgLogin = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const dispatch = useDispatch()

    useLayoutEffect(() => {
        if (status === "authenticated" && session) {

            // Gọi API sau khi đã xác thực
            const loginGoogle = async () => {
                try {
                    const res = await fetch(`/api/login-google`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name: session.user.name,
                            email: session.user.email,
                            image: session.user.image,
                            accessToken: session.user.accessToken,
                        })
                    });

                    const data = await res.json();
                    if (res.ok) {
                        console.log("User session data:", session);
                        if (session.user.image) {
                            dispatch(login({
                                fullname: session.user.name,
                                email: session.user.email,
                                avatar: session.user.image,
                                ...data,
                            }));
                            router.push("/info-user");
                        } else {
                            console.error("Ảnh đại diện chưa sẵn sàng");
                        }
                        document.cookie = `token=${data.access_token}; path=/; SameSite=Strict`;
                        router.push("/info-user");
                        console.log('Đăng nhập thành công:', data);
                    } else {
                        console.log('Đăng nhập thất bại:', data);
                    }
                } catch (error) {
                    console.error('Lỗi khi đăng nhập:', error);
                }
            };

            setTimeout(loginGoogle, 100);
        }
    }, [status, session, router, dispatch]);

    const handleLogin = async () => {
        if (status !== "authenticated") {
            await signIn("google", { redirect: false });
        }
    };

    return (
        <button className={styles.RegisterMedia__btn} onClick={handleLogin}>
            <img src="/img/google.svg" alt="Google logo" className={styles.RegisterMedia__img} />
            <div className={styles.RegisterMedia__title}>
                Google
            </div>
        </button>
    );
};

export default GgLogin;

// 'use client'

// import { signIn, useSession } from 'next-auth/react';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import styles from '@public/styles/login/LoginBtn.module.css';

// const GgLogin = () => {
    // const { data: session, status } = useSession();
    // const router = useRouter();
    // const [data, setData] = useState(null)
    // const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    // const GOOGLE_REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;

    // useEffect(() => {
    //     if (status === "authenticated") {
    //         console.log("User session data:", session);
    //         router.push("/info-user");
    //     }
    // }, [status, session, router]);

    // const handleLogin = async () => {
        // try {
        //     const response = await fetch('/api/loginGg', {
        //         method: 'GET',
        //         mode:'no-cors'
        //     });

        //     if (response.ok) {
        //         const data = await response.json()
        //         setData(data)
        //     } else {
        //         console.error("API login-google failed:", response.statusText);
        //     }
        // } catch (error) {
        //     console.error("Error calling login-google API:", error);
        // }

        // const googleOAuthURL = `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&scope=openid%20profile%20email&response_type=code&state=secure_random_state_value`;
//         window.location.href = '/api/loginGg';
//     };

//     return (
//         <button className={styles.RegisterMedia__btn} onClick={handleLogin}>
//             <img src="/img/google.svg" alt="Google logo" className={styles.RegisterMedia__img} />
//             <div className={styles.RegisterMedia__title}>
//                 Google
//             </div>
//         </button>
//     );
// };

// export default GgLogin;
