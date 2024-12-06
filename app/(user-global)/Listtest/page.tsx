"use client"
import React, { useState } from 'react';
import styles from '@public/styles/test.module.css'; // Đường dẫn đến file CSS của bạn

interface ListItem {
    title: string;
    content: string[];
}

const listData: ListItem[] = [
    {
        title: 'Mục 1',
        content: ['Phần tử 1', 'Phần tử 2', 'Phần tử 3'],
    },
    {
        title: 'Mục 2',
        content: ['Phần tử A', 'Phần tử B', 'Phần tử C'],
    },
    {
        title: 'Mục 3',
        content: ['Phần tử X', 'Phần tử Y', 'Phần tử Z'],
    },
];

const ListComponent: React.FC = () => {
    const [openIndexes, setOpenIndexes] = useState<number[]>([]);

    // Hàm xử lý khi bấm vào đầu mục
    const toggleItem = (index: number) => {
        if (openIndexes.includes(index)) {
            setOpenIndexes(openIndexes.filter((i) => i !== index));
        } else {
            setOpenIndexes([...openIndexes, index]);
        }
    };

    return (
        <div className={styles.listContainer}>
            {listData.map((item, index) => (
                <div key={index} className={styles.listItem}>
                    {/* Phần đầu mục - bấm vào đây sẽ ẩn hiện các phần tử */}
                    <div className={styles.listTitle} onClick={() => toggleItem(index)}>
                        {item.title}
                    </div>

                    {/* Hiển thị các phần tử nếu mục được mở */}
                    {openIndexes.includes(index) && (
                        <ul className={styles.subList}>
                            {item.content.map((subItem, subIndex) => (
                                <li key={subIndex}>{subItem}</li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ListComponent;
