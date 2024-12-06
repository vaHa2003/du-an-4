// components/Notification.tsx
'use client'
import React, { useState } from 'react';
import styles from '@public/styles/globalControl/Notification.module.css';

import { IconXNoneFill } from "@app/(user-global)/component/icon/icons"

const Notification: React.FC<NotificationProps> = ({ type, message, position = 'bottom-right' }) => {
    const [visible, setVisible] = useState(true);
    const getNotificationStyles = () => {
        switch (type) {
            case 'success':
                return {
                    backgroundColor: '#D4EDDA',
                    textColor: '#155724',
                    Icon: "/icons/success.svg",
                    colorMain: '#28A745',
                };
            case 'error':
                return {
                    backgroundColor: '#F8D7DA',
                    textColor: '#721C24',
                    Icon: "/icons/error.svg",
                    colorMain: '#DC3545',
                };
            case 'fail':
                return {
                    backgroundColor: '#FFF3CD',
                    textColor: '#856404',
                    Icon: "/icons/fail.svg",
                    colorMain: '#FFC107',
                };
            case 'complete':
                return {
                    backgroundColor: '#D1ECF1',
                    textColor: '#0C5460',
                    Icon: '/icons/complete.svg',
                    colorMain: '#17A2B8',
                };

            default:
                return {
                    backgroundColor: '#000000',
                    textColor: '#FFFFFF',
                    Icon: '/icons/complete.svg',
                    colorMain: '#DA1E28',
                };
        }
    };
    const getPositionStyles = () => {
        switch (position) {
            case 'top-left':
                return { top: '100px', left: '10%' };
            case 'top-right':
                return { top: '100px', right: '10%' };
            case 'bottom-left':
                return { bottom: '100px', left: '10px' };
            case 'bottom-right':
                return { bottom: '100px', right: '10%' };
            default:
                return { bottom: '100px', right: '10%' }; // Mặc định là 'bottom-right'
        }
    };


    const { backgroundColor, textColor, Icon, colorMain } = getNotificationStyles();
    const positionStyles = getPositionStyles();
    // Hàm tắt thông báo
    const handleTurnOff = () => {
        setVisible(false);
    };

    return (
        visible ? (
            <div
                className={styles.wapper}
                style={{
                    backgroundColor,
                    color: textColor,
                    border: `1px solid ${colorMain}`,
                    zIndex: 100,
                    position: 'absolute',
                    ...positionStyles,
                }}
            >
                <div className={styles.content}>
                    <div
                        style={{
                            padding: '4px',
                            backgroundColor: colorMain,
                            borderRadius: '8px'
                        }}
                    >
                        <img src={Icon} alt="icon" style={{ width: '20px', height: '20px' }} />
                    </div>

                    <span>{message}</span>
                </div>

                <div className={styles.IconCancel} onClick={handleTurnOff}>
                    <IconXNoneFill />
                </div>
            </div>
        ) : null
    );
};

export default Notification;
