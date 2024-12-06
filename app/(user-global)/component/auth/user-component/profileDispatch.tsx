'use client';

import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clear, login, logout } from '../../../../../redux/slices/userSlice';
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from 'react-redux';
import { RootState, persistor } from '@/redux/store';
import useCookie from "../../hook/useCookie";
import { Token } from "ckeditor5";
import { signOut } from "next-auth/react";

interface User {
    age: number;
    avatar: string;
    created_at: string;
    del_flag: boolean;
    discription_user: string;
    email: string;
    fullname: string;
    id: string;
    phonenumber: string;
    provider_id: string;
    role: string;
}

const getCookie = (name: string) => {
    if (typeof window === 'undefined') {
        return null;
    }
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
};

const ProfileDispatch = () => {
    const userState = useSelector((state: RootState) => state.user.user)
    const dataState = useSelector((state: RootState) => state.user.data)
    const dispatch = useDispatch();
    const router = useRouter();
    const pathName = usePathname()
    const isRegister = pathName === '/register'
    const isLogin = pathName === '/login'
    const isRetrievePassword = pathName === '/retrievePassword'
    const isInfo = pathName === '/info-user'
    const isIntro = pathName === '/intro-user'
    const isWallet = pathName === '/wallet-user'
    const isHome = pathName === '/home'
    const isPokemon = pathName === '/pokemon'
    const isCreateLearningPath = pathName === '/createLearningPath'
    const isCourse = pathName === '/course'
    const isCourseFor = pathName === '/coursefor'
    const isAdmin = /^\/(admin)(\/.*)?$/.test(pathName);
    const isPage = /^\/(home|)(\/.*)?$/.test(pathName);
    const [dataUser, setDataUser] = useState<User | null>(null)
    const [hasLoggedOut, setHasLoggedOut] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedRegister = localStorage.getItem('register');
            if (isRegister) {
                if (savedRegister) {
                    return;
                } else {
                    localStorage.setItem('register', 'email');
                }
            }
            else if (pathName === 'profiledispatch') {
                localStorage.setItem('register', 'phone');
            }
            else {
                localStorage.removeItem('register');
            }
        }
    }, [pathName, isRegister]);




    const handleLogout = async () => {
        localStorage.removeItem('token');
        localStorage.removeItem('progress_percentages');
        localStorage.setItem('isLoggedIn', 'false');
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        document.cookie = "authjs.session-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        document.cookie = "authjs.csrf-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        localStorage.removeItem('persist:root');
        persistor.pause();
        dispatch(logout());
        signOut(
            { redirect: false, }
        );
    };

    const isTokenExpired = (token: string) => {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const expiration = payload.exp;

            // console.log('Token exp:', expiration, 'Current time:', Math.floor(Date.now() / 1000));

            return expiration < Math.floor(Date.now() / 1000);
        } catch (error) {
            // console.error('Không thể phân tích token:', error);
            return true;
        }
    };


    const fetchUserInfo = async (tokenValue: string) => {
        if (!tokenValue) return;  // Nếu không có token, không cần thực hiện gì

        // Kiểm tra các trạng thái nếu cần
        if (isRegister || isLogin || isRetrievePassword) {
            if (!localStorage.getItem('isLoggedIn')) {
                localStorage.setItem('isLoggedIn', 'true');
                router.push('/info-user');
            }
            return;
        }

        if (isTokenExpired(tokenValue)) {
            // console.error("Token đã hết hạn");
            handleLogout()
            signOut(
                { redirect: false, }
            );
            if (isInfo || isIntro || isWallet) {
                router.push('/login');
            } else if (isAdmin) {
                router.push('/home');
            }
            return;
        }

        // Gọi API để lấy thông tin người dùng
        try {
            const res = await fetch('/api/profile', {
                cache: "no-cache",
                headers: {
                    Authorization: `Bearer ${tokenValue}`,
                },
            });

            if (!res.ok) {
                // console.log(await res.json());
                return;
            }

            const data = await res.json();
            // console.log(data);

            dispatch(login(data));
            setDataUser(data)

            localStorage.setItem('isLoggedIn', 'true');

            // Chuyển hướng sau khi lấy thông tin
            if (isLogin || isRegister || isRetrievePassword) {
                router.push('/info-user');
            }
        } catch (error) {
            // console.error("Lỗi khi lấy thông tin người dùng:", error);
            if (isAdmin) {
                router.push('/home');
            }
        }
    };

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         const token = getCookie('token')
    //         if (token) {
    //             localStorage.setItem('isLoggedIn', 'true');
    //             fetchUserInfo(token);
    //         }
    //         if (token && isTokenExpired(token)) {
    //             console.error("Token đã hết hạn trong quá trình kiểm tra định kỳ");
    //             handleLogout();
    //             alert('Đăng nhập lại để kiểm tra thông tin vì lý do bảo mật');
    //             if (isAdmin) {
    //                 router.push('/home');
    //             }
    //             return;
    //         }
    //         if (dataUser && dataUser.del_flag === false && !hasLoggedOut) {
    //             handleLogout();
    //             setHasLoggedOut(true);
    //             localStorage.setItem('isLoggedIn', 'false');
    //         } else if (dataUser && dataUser.del_flag === true) {
    //             setHasLoggedOut(false);
    //         }
    //         console.log('check:', dataUser);
    //         console.log(dataUser);

    //     }, 30000);
    //     return () => clearInterval(interval);
    // }, [dataUser, hasLoggedOut, isAdmin, router])

    useEffect(() => {
        if (pathName !== `/admin/AccessPage/${dataState?.id}`) {
            console.log("Đang gọi clear");
            dispatch(clear());
        }
    }, [pathName]);

    useEffect(() => {
        setDataUser(null)
        const interval = setInterval(() => {
            const token = getCookie('token');
            if (token) {
                localStorage.setItem('isLoggedIn', 'true');
                fetchUserInfo(token);
            }
            if (token && isTokenExpired(token)) {
                // console.error("Token đã hết hạn trong quá trình kiểm tra định kỳ");
                handleLogout();
                alert('Đăng nhập lại để kiểm tra thông tin vì lý do bảo mật');
                if (isAdmin) {
                    router.push('/home');
                }
                return;
            }
            // console.log('check');

        }, 30000);
        return () => clearInterval(interval);
    }, [isAdmin, router]);

    useEffect(() => {
        if (dataUser) {
            if (dataUser.del_flag === false && !hasLoggedOut) {
                handleLogout();
                signOut(
                    { redirect: false, }
                );
                setHasLoggedOut(true);
                localStorage.setItem('isLoggedIn', 'false');
                router.push('/')
            } else if (dataUser.del_flag === true) {
                setHasLoggedOut(false);
            }
        }

    }, [dataUser, hasLoggedOut]);

    useEffect(() => {
        const tokenCookie = getCookie('token');
        if (tokenCookie) {
            fetchUserInfo(tokenCookie);
        } else {
            // console.error('Không tìm thấy token');
            if (isInfo || isWallet || isIntro) {
                handleLogout()
                signOut(
                    { redirect: false, }
                );
                router.push('/login');
            }
        }
        const handleLogin = (event: Event) => {
            const customEvent = event as CustomEvent;
            const { token } = customEvent.detail;
            if (token) {
                fetchUserInfo(token);
            } else {
                // console.error("Token không hợp lệ từ sự kiện login");
            }
        };
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === 'isLoggedIn') {
                const isLoggedIn = event.newValue;

                if (isLoggedIn === 'false') {
                    handleLogout()
                    signOut(
                        { redirect: false, }
                    );
                    if (isAdmin) {
                        router.push('/home');
                    }
                } else if (isLoggedIn === 'true') {
                    const tokenValue = getCookie('token')
                    if (tokenValue) {
                        fetchUserInfo(tokenValue);

                    }
                }
            }
        };
        window.addEventListener('login', handleLogin);
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('login', handleLogin);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [isLogin, isAdmin]);



    useEffect(() => {
        const checkTokenCookie = () => {
            const tokenCookie = getCookie('token');
            localStorage.setItem('returnPath', pathName);
            if (!tokenCookie) {
                // console.error('Token cookie is missing. Logging out...');
                handleLogout();
                signOut(
                    { redirect: false, }
                );
                if (isInfo || isIntro || isWallet) {
                    localStorage.setItem('returnPath', '');
                    router.push('login')
                }
                else if (isAdmin) { router.push('/home') }
            }
        };

        const interval = setInterval(checkTokenCookie, 10000);

        return () => clearInterval(interval);
    }, [dispatch, router, pathName]);

    return null;

};

export default ProfileDispatch;