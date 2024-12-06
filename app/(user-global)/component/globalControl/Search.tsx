import HeadlessTippy from '@tippyjs/react/headless';
import { useState, useRef, useEffect, useCallback } from 'react';
import { Image } from 'react-bootstrap';
import Itemsearch from "../item/itemSearch";
import debounce from 'lodash.debounce';
import Link from 'next/link'

import styles from "@/public/styles/globalControl/search.module.css";
const Search = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [valueInput, setValueInput] = useState('');
    const [visible, setVisible] = useState(false);
    const [dataSearch, setDataSearch] = useState<ApiResponseSearch>({
        routes: [],
        courses: [],
        posts: []
    });
    const [loading, setLoading] = useState(false); // Loading state

    // Hiển thị Tippy khi input có dữ liệu
    const onFocus = () => {
        if (inputRef.current) {
            inputRef.current.focus();
            setVisible(valueInput.trim().length > 0);
            console.log(valueInput.trim().length > 0)
        }
    };

    // Hiển thị Tippy khi có dữ liệu trong input
    useEffect(() => {
        setVisible(valueInput.trim().length > 0);
    }, [valueInput]);

    // Hàm fetch dữ liệu tìm kiếm với debounce
    const fetchSearchData = debounce(async (value: string) => {
        try {
            if (value.trim().length === 0) return;

            setLoading(true); // Start loading
            const response = await fetch(`api/search/${value}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data: ApiResponseSearch = await response.json();
            console.log('Search data:', data);
            setDataSearch(data);
        } catch (error) {
            console.error('Error fetching search data:', error);
        } finally {
            setLoading(false); // Stop loading
        }
    }, 300);
    const debouncedFetchData = useCallback(debounce(fetchSearchData, 500), []);

    // Cập nhật giá trị input và gọi hàm fetch dữ liệu
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValueInput(newValue);
        console.log(newValue);
    };

    useEffect(() => {
        if (valueInput) {
            debouncedFetchData(valueInput);

        }
    }, [valueInput, debouncedFetchData]);

    return (
        <HeadlessTippy
            visible={visible}
            interactive={true}
            placement="bottom"
            onClickOutside={(instance, event) => {
                const isClickOutside = !inputRef.current?.contains(event.target as Node);
                if (isClickOutside) {
                    setVisible(false);
                    setDataSearch({
                        courses: [],
                        posts: [],
                        routes: [],
                    })
                };
            }}
            render={attrs => (
                <div {...attrs} className={styles.searchResult}>
                    {loading ? (
                        <p className={styles.searchTitle}>Đang tìm kiếm...</p>
                    ) : (
                        dataSearch.courses.length === 0 && dataSearch.routes.length === 0 && dataSearch.posts.length === 0 ? (
                            <p className={styles.searchTitle}>Không tìm thấy kết quả nào cho "{valueInput}"</p>
                        ) : (
                            <p className={styles.searchTitle}>Kết quả tìm kiếm "{valueInput}"</p>
                        )
                    )}
                    <div className={styles.searchResultList}>

                        {/* Hiển thị kết quả tìm kiếm */}
                        <div className={styles.listItems}>
                            {dataSearch.courses.length > 0 && (
                                <>
                                    <p className={styles.listTitleSearch}>Khóa học</p>
                                    <div className={styles.listItem}>
                                        {dataSearch.courses.map(course => (
                                            <Link href={`/course/${course.id}`} >
                                                <Itemsearch
                                                    key={course.id}
                                                    id={course.id}
                                                    title={course.title}
                                                    image={course.image}
                                                />
                                            </Link>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                        <div className={styles.listItems}>
                            {dataSearch.posts.length > 0 && (
                                <>
                                    <p className={styles.listTitleSearch}>Bài viết</p>
                                    <div className={styles.listItem}>
                                        {dataSearch.posts.map(post => (
                                            <Link href={`/course/${post.id}`} >
                                                <Itemsearch
                                                    key={post.id}
                                                    id={post.id}
                                                    title={post.title}
                                                    image={post.image}
                                                />
                                            </Link>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        <div className={styles.listItems}>
                            {dataSearch.routes.length > 0 && (
                                <>
                                    <p className={styles.listTitleSearch}>Lộ trình</p>
                                    <div className={styles.listItem}>

                                        {dataSearch.routes.map(route => (
                                            <Link href={`/course/${route.id}`} >
                                                <Itemsearch
                                                    key={route.id}
                                                    id={route.id}
                                                    title={route.title}
                                                    image={route.image}
                                                />
                                            </Link>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div >

            )
            }
        >
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    className={styles.SearchInput}
                    aria-label="Search"
                    ref={inputRef}
                    value={valueInput}
                    onChange={handleChange}
                    onFocus={onFocus}
                    placeholder='Tìm kiếm bài viết, khóa học, lộ trình,...'
                />
                <div className={styles.loading}>
                    {loading && (
                        <div className={styles.loadingContainer}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512" fill="none" className={styles.rotatingIcon}>
                                <path d="M304 48C304 35.2696 298.943 23.0606 289.941 14.0589C280.939 5.05713 268.73 0 256 0C243.27 0 231.061 5.05713 222.059 14.0589C213.057 23.0606 208 35.2696 208 48C208 60.7304 213.057 72.9394 222.059 81.9411C231.061 90.9429 243.27 96 256 96C268.73 96 280.939 90.9429 289.941 81.9411C298.943 72.9394 304 60.7304 304 48ZM304 464C304 451.27 298.943 439.061 289.941 430.059C280.939 421.057 268.73 416 256 416C243.27 416 231.061 421.057 222.059 430.059C213.057 439.061 208 451.27 208 464C208 476.73 213.057 488.939 222.059 497.941C231.061 506.943 243.27 512 256 512C268.73 512 280.939 506.943 289.941 497.941C298.943 488.939 304 476.73 304 464ZM48 304C60.7304 304 72.9394 298.943 81.9411 289.941C90.9429 280.939 96 268.73 96 256C96 243.27 90.9429 231.061 81.9411 222.059C72.9394 213.057 60.7304 208 48 208C35.2696 208 23.0606 213.057 14.0589 222.059C5.05713 231.061 0 243.27 0 256C0 268.73 5.05713 280.939 14.0589 289.941C23.0606 298.943 35.2696 304 48 304ZM512 256C512 243.27 506.943 231.061 497.941 222.059C488.939 213.057 476.73 208 464 208C451.27 208 439.061 213.057 430.059 222.059C421.057 231.061 416 243.27 416 256C416 268.73 421.057 280.939 430.059 289.941C439.061 298.943 451.27 304 464 304C476.73 304 488.939 298.943 497.941 289.941C506.943 280.939 512 268.73 512 256ZM142.9 437C147.358 432.542 150.895 427.249 153.308 421.424C155.721 415.598 156.963 409.355 156.963 403.05C156.963 396.745 155.721 390.502 153.308 384.676C150.895 378.851 147.358 373.558 142.9 369.1C138.442 364.642 133.149 361.105 127.324 358.692C121.498 356.279 115.255 355.037 108.95 355.037C96.2163 355.037 84.0041 360.096 75 369.1C65.9959 378.104 60.9375 390.316 60.9375 403.05C60.9375 415.784 65.9959 427.996 75 437C84.0041 446.004 96.2163 451.063 108.95 451.063C121.684 451.063 133.896 446.004 142.9 437ZM142.9 142.8C147.58 138.394 151.327 133.092 153.919 127.21C156.511 121.328 157.896 114.985 157.99 108.558C158.084 102.13 156.887 95.7497 154.468 89.794C152.05 83.8384 148.46 78.4292 143.911 73.8873C139.363 69.3454 133.948 65.7634 127.989 63.3537C122.03 60.9441 115.647 59.7559 109.22 59.8597C102.793 59.9634 96.4522 61.3571 90.5739 63.9579C84.6956 66.5587 79.3996 70.3136 75 75C65.9959 84.0041 60.9375 96.2163 60.9375 108.95C60.9375 121.684 65.9959 133.896 75 142.9C84.0041 151.904 96.2163 156.963 108.95 156.963C121.684 156.963 133.896 151.904 142.9 142.9V142.8ZM369.1 437C373.558 441.458 378.851 444.995 384.676 447.408C390.502 449.821 396.745 451.063 403.05 451.063C409.355 451.063 415.598 449.821 421.424 447.408C427.249 444.995 432.542 441.458 437 437C441.458 432.542 444.995 427.249 447.408 421.424C449.821 415.598 451.063 409.355 451.063 403.05C451.063 396.745 449.821 390.502 447.408 384.676C444.995 378.851 441.458 373.558 437 369.1C432.542 364.642 427.249 361.105 421.424 358.692C415.598 356.279 409.355 355.037 403.05 355.037C396.745 355.037 390.502 356.279 384.676 358.692C378.851 361.105 373.558 364.642 369.1 369.1C364.642 373.558 361.105 378.851 358.692 384.676C356.279 390.502 355.037 396.745 355.037 403.05C355.037 409.355 356.279 415.598 358.692 421.424C361.105 427.249 364.642 432.542 369.1 437Z" fill="#237DF7" />
                            </svg>
                        </div>
                    )}
                    <span className={styles.SearchBtn}>
                        <Image src="/img/searchBlue.svg" alt="Search icon" />
                    </span>
                </div>

            </div>
        </HeadlessTippy >
    );
};

export default Search;
