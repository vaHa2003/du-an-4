'use client'
import React, { useState } from 'react';
import '@app/(user-global)/global.css';

const Button: React.FC<ButtonProps> = ({
    type = 'secondery',
    size = 'M',
    status = 'default',
    leftIcon = true,
    rightIcon = true,
    chevron = 1,
    hover = true,
    hoverType = 'default',
    typeButton = 'btn',
    width = 198,
    height = 48,
    widthText = 'auto',
    children,
    onClick
}) => {
    const [isIconLeft, setIsIconLeft] = useState(leftIcon);
    const [isIconRight, setIsIconRight] = useState(rightIcon);
    const [isHovered, setIsHovered] = useState(false);

    const getTypeClass = () => {
        switch (type) {
            case 'secondery':
                return 'btn-secondery';
            case 'premary':
                return 'btn-premary';
            case 'disable':
                return 'btn-dsb'
            default:
                return 'btn-secondery';
        }
    }

    const getSizeClass = () => {
        switch (size) {
            case 'S':
                return 'btn-s';
            case 'M':
            default:
                return 'btn-m';
        }
    };

    const getStatusClass = () => {
        if (status === 'hover' && hover && isHovered) {
            if (hoverType === 'default') {
                return 'btn-default';
            }
            if (hoverType === 'other') {
                return 'btn-no-border'
            }
        }
        if (status === 'default' && hover && isHovered) {
            if (hoverType === 'default') {
                return 'btn-hover';
            }
            if (hoverType === 'other') {
                return 'btn-no-border'
            }
        }
        if (status === 'noBorder' && hover && isHovered) {
            if (hoverType === 'default') {
                return 'btn-default';
            }
            if (hoverType === 'other') {
                return 'btn-hover'
            }
        }
        switch (status) {
            case 'default':
                return 'btn-default';
            case 'disable':
                return 'btn-disable';
            case 'hover':
                return 'btn-hover';
            case 'noBorder':
                return 'btn-no-border';
            default:
                return 'btn-default';
        }
    };

    const getChevronIcon = () => {
        switch (chevron) {
            case 1:
                return (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='icon-right'>
                        <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                );
            case 2:
                return (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='icon-right'>
                        <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                );
            case 3:
                return (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='icon-right'>
                        <path d="M18 15L12 9L6 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                );
            case 4:
                return (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='icon-right'>
                        <path d="M6 9L12 15L18 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                );
            default:
                return null;
        }
    }

    const getTypeBtnClass = () => {
        switch (typeButton) {
            case 'btn':
                return 'button';
            case 'sm':
                return 'submit';
            case 'rs':
                return 'reset';
            default:
                return 'button';
        }
    }

    return (
        <button
            className={`  ${getTypeClass()}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            type={getTypeBtnClass()}
            onClick={onClick}

        >
            <div className={` ${getStatusClass()} ${getSizeClass()}`}>
                <div className='left-icon-container'>
                    {isIconLeft ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='icon-left' >
                            <path d="M12.125 11.0669V11.5669H12.625H16.375C16.4439 11.5669 16.5 11.623 16.5 11.6919C16.5 11.7608 16.4439 11.8169 16.375 11.8169H12.625H12.125V12.3169V16.0669C12.125 16.1358 12.0689 16.1919 12 16.1919C11.9311 16.1919 11.875 16.1358 11.875 16.0669V12.3169V11.8169H11.375H7.625C7.55614 11.8169 7.5 11.7608 7.5 11.6919C7.5 11.623 7.55614 11.5669 7.625 11.5669H11.375H11.875V11.0669V7.31689C11.875 7.24804 11.9311 7.19189 12 7.19189C12.0689 7.19189 12.125 7.24804 12.125 7.31689V11.0669Z" fill="white" stroke="white" />
                        </svg>

                    ) : ''
                    }
                </div>
                <div className='btn-title'>
                    {children}
                </div>
                <div className='right-icon-container'>
                    {isIconRight && getChevronIcon()}
                </div>
            </div>

        </button>
    );
};

export default Button;
