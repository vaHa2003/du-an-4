'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/slices/userSlice';
import { useLogout } from './useLogout';

const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
};

const GgLogoutHeader = () => {
    const { data: session, status } = useSession();
    const dispatch = useDispatch()
    const router = useRouter();
    const token = getCookie('token');


    const handleLogout = async () => {
        if (confirm('Bạn có muốn đăng xuất không !!!')) {
            if (!token) {
                console.error("Token not found");
                return;
            }
            const deleteCookie = (name: string) => {
                document.cookie = `${name}=; path=/; domain=localhost; expires=Thu, 01 Jan 1970 00:00:00 UTC; Secure; SameSite=Lax`;
            };

            try {
                const res = await fetch('/api/logout/', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = await res.json()
                if (res.ok) {
                    deleteCookie("token");
                    deleteCookie("authjs.callback-url");
                    deleteCookie("authjs.csrf-token");
                    deleteCookie("tto_session");
                    deleteCookie("authjs.session-token");
                    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                    localStorage.removeItem('token');
                    localStorage.removeItem('progress_percentages')
                    localStorage.clear()
                    dispatch(logout());
                    if (session) {
                        signOut();
                    }
                    router.replace("/home")
                } else {
                    console.error("Failed to log out:", res.status);
                    console.log(data)
                }
                if (typeof window !== 'undefined' && session) {
                    signOut(
                        { redirect: false, }
                    );
                    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                    useLogout()
                }

            } catch (error) {
                console.error("Logout error:", error);
            }
            console.log(token);
        }
    };

    return (
        <button className='subMenu-body-link' onClick={handleLogout}>
            <img src='/img/infoLogout-black.svg' className='subMenu-body-img-black' />
            <img src='/img/infoLogout-white.svg' className='subMenu-body-img-white' />
            <div className='subMenu-body-link-title'>
                Đăng xuất
            </div>
        </button>

    )
}

export default GgLogoutHeader