// usePopup.ts
import { useEffect, useRef, useState } from 'react';

const usePopup = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const popupRef = useRef<HTMLDivElement | null>(null);

    const togglePopup = () => {
        setIsVisible((prev) => !prev);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return {
        isVisible,
        togglePopup,
        popupRef,
    };
};

export default usePopup;
