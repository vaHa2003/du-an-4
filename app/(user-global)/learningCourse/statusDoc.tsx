const DocumentStatus = ({ status_document }: { status_document: boolean }) => {
    return status_document ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <g clipPath="url(#clip0_4331_7659)">
                <circle cx="6" cy="6" r="5" stroke="#24A148" strokeWidth="1.5" />
                <path d="M4.25 6.25L5.25 7.25L7.75 4.75" stroke="#24A148" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <defs>
                <clipPath id="clip0_4331_7659">
                    <rect width="12" height="12" fill="white" />
                </clipPath>
            </defs>
        </svg>
    ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <g clipPath="url(#clip0_4979_2333)">
                <path d="M1 8C1 6.58579 1 5.87868 1.43934 5.43934C1.87868 5 2.58579 5 4 5H8C9.41421 5 10.1213 5 10.5607 5.43934C11 5.87868 11 6.58579 11 8C11 9.41421 11 10.1213 10.5607 10.5607C10.1213 11 9.41421 11 8 11H4C2.58579 11 1.87868 11 1.43934 10.5607C1 10.1213 1 9.41421 1 8Z" stroke="#B3B3B3" strokeWidth="1.5" />
                <path d="M6 7V9" stroke="#B3B3B3" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M3 5V4C3 2.34315 4.34315 1 6 1C7.65685 1 9 2.34315 9 4V5" stroke="#B3B3B3" strokeWidth="1.5" strokeLinecap="round" />
            </g>
            <defs>
                <clipPath id="clip0_4979_2333">
                    <rect width="12" height="12" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};


export default DocumentStatus;