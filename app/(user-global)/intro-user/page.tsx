'use client'

import Body from "../component/globalControl/body"
import Introduce from "../component/auth/user-component/introduce"
import HeaderUser from "../component/auth/user-global/headerUser"
import Main from "../component/auth/user-global/main"
import MenuSetting from "../component/auth/user-global/menuSetting"
import { useEffect, useState } from "react"

const IntroUser: React.FC = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);
    if (!isClient) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <title>TTO - Giới thiệu người dùng</title>
            <meta name="description" content="Được tạo bởi Taem TTO" />
            <Body>
                <HeaderUser></HeaderUser>
                <Main>
                    <MenuSetting></MenuSetting>
                    <Introduce></Introduce>
                </Main>
            </Body>
        </>
    )
}

export default IntroUser