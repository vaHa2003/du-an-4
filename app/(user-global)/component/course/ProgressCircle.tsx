import React from 'react';
import styles from "@public/styles/course/ProgressCircle.module.css";

interface ProgressCircleProps {
    progress: number;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({ progress }) => {
    const radius = 20; // Bán kính của vòng tròn
    const strokeWidth = 4; // Độ dày của viền
    const circumference = 2 * Math.PI * radius; // Chu vi vòng tròn
    const strokeDashoffset = circumference - (progress / 100) * circumference; // Tính toán độ dài viền

    return (
        <div className={styles.progressContainer}>
            <svg width="50" height="50">
                <circle
                    className={styles.progressBackground}
                    cx="25"
                    cy="25"
                    r={radius}
                    strokeWidth={strokeWidth}
                />
                <circle
                    className={styles.progressCircle}
                    cx="25"
                    cy="25"
                    r={radius}
                    strokeWidth={strokeWidth}
                    style={{
                        strokeDasharray: circumference,
                        strokeDashoffset,
                        transform: 'rotate(-90deg)', // Quay -90 độ để bắt đầu từ trên
                        transformOrigin: 'center', // Đặt gốc quay tại trung tâm
                    }}
                />
            </svg>
            <div className={styles.innerCircle}>
                <span className={styles.progressText}>{progress}%</span>
            </div>
        </div>
    );
};

export default ProgressCircle;
