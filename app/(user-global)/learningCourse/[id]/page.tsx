"use client";


import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useLogout } from '@app/(user-global)/component/auth/user-component/useLogout';
import useCookie from '@app/(user-global)/component/hook/useCookie';
import { Row, Col, Nav, Navbar } from "react-bootstrap";
import Tippy from '@tippyjs/react/headless';
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from 'framer-motion';

// thêm component
import CodeDev from "../codeDev";
import CodeDevLearning from "../CodeDevLearning";
import ProgressCircle from '@app/(user-global)/component/course/ProgressCircle';
import Button from "@app/(user-global)/component/globalControl/btnComponent";
import Faq from "../Faq";
import NoteContent from "../NoteContent";
import NoteCourse from "../NoteCourse";
import Questions from '../Questions';
import VideoPlayer from '../VideoPlayer';

import { Arrow, IconWhat, IconDoc, IconVideo, IconSun, IconNote, IconBell, IconSetting, IconLogout } from "@/app/(user-global)/component/icon/icons";
// thêm Comment thông báo 
import Notification from "@app/(user-global)/component/globalControl/Notification";
import { formatDateTime, formatTime } from "@/app/(user-global)/component/globalControl/commonC";

import DocumentStatus from '../statusDoc';

// thêm styles
import stylesNav from "@public/styles/globalControl/Nav.module.css";
import styles from "@public/styles/Learning/Learning.module.css";

type NotiType = 'success' | 'error' | 'fail' | 'complete';


const Learning: React.FC<{ params: { id: string } }> = ({ params }) => {
    const token = useCookie('token');
    const { id } = params;
    const course_Id = id;
    const userState = useSelector((state: RootState) => state.user);
    const user = userState?.user;
    const avatar: string = user?.avatar ?? '';
    const { handleLogout } = useLogout();

    const [isNoti, setNoti] = useState(false);
    const [isContent, setContent] = useState(true);
    const [typeNoti, setTypeNoti] = useState<NotiType | null>(null);
    const [messageNoti, setmessageNoti] = useState("");

    const [course, setCourse] = useState<Chapter[] | null>(null);

    const [question, setQuestion] = useState<QuestionsDocument['questions'] | null>(null);
    const [code, setCode] = useState<CodesDocument['codes'] | null>(null);
    const [progress, setprogress] = useState<Progress | null>(null);
    const [nameDocument, setnameDocument] = useState('');
    const [idDocument, setIdDocument] = useState('');
    const [typeDoc, settypeDoc] = useState<string | null>(null);
    const [descdocument, setdescdocument] = useState<string | null>(null);
    const [note, setNote] = useState<Note[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [doc_id, setdoc_id] = useState<string>("");
    const [chapter_id, setChapter_id] = useState<string>("");


    const [urlVideo, setUrlVideo] = useState('');
    const [type, setType] = useState<string | null>(null);
    const [playedSeconds, setPlayedSeconds] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);



    const [html, setHtml] = useState<string>('');
    const [css, setCss] = useState<string>('');
    const [js, setJs] = useState<string>('');



    const [visible, setVisible] = useState(false);

    const [isNote, setIsNote] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [tippyVisible, setTippyVisible] = useState(false);
    const [isFAQ, setFAQ] = useState(false);
    const [isNoteContent, setIsNoteContent] = useState(false);

    console.log(isNoteContent)
    const toggleSwitch = () => {
        setIsActive(!isActive);
        setTippyVisible(prev => !prev);
    };
    const show = () => setVisible(true);
    const hide = () => setVisible(false);






    const toggleNote = () => {
        setIsNote(prev => !prev);
        setIsPlaying(prev => !prev);
    };

    const toggleFaq = () => {
        setFAQ(prev => !prev);
    };
    const toggleNoteList = () => {
        setIsNoteContent(prev => !prev);
    };

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const handelIsPlaying = () => {
        setIsPlaying(!isPlaying);
    }
    // láy ra khóa học
    const fetchDocuments = async (retries = 3): Promise<CourseData | null> => {
        try {
            const response = await fetch(`/api/getdocforyou/${course_Id}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                if (response.status === 401 && retries > 0) {

                    console.log('Lỗi 401, thử lại lần nữa...');
                    return await fetchDocuments(retries - 1);
                }
                throw new Error("Không thể lấy dữ liệu");
            }

            const result = await response.json() as CourseData;
            setCourse(result.data)
            return result;
        } catch (err: any) {
            setError(err.message);
            return null;
        }
    };
    const fetchNotes = async () => {
        try {
            const response = await fetch(`/api/getnoteByCourse/${course_Id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch course");
            }

            const dataNote = await response.json();
            // console.log(dataNote)
            if (Array.isArray(dataNote.data)) {
                setNote(dataNote.data);
                return dataNote
            } else {
                console.error("data.data is not an array");
            }
        } catch (err: any) {
            setError(err.message);
        }
    };

    const fetchProgress = async () => {
        try {
            const response = await fetch(`/api/getProgress/${course_Id}`, {
                method: "GET",
                headers: {
                    Authorization: ` ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch course");
            }

            const dataProgress = await response.json();
            setprogress(dataProgress[0])
        } catch (err: any) {
            setError(err.message);
        }
    };

    const fetchCreatStatus = async () => {
        try {
            const response = await fetch(`/api/createStatusDoc/${doc_id}/${course_Id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch course");
            }
            const data = await response.json();
            // console.log(data, "trạng thái bài học");
        } catch (err: any) {
            setError(err.message);
        }
    };


    useEffect(() => {
        fetchProgress()
        fetchDocuments()
        fetchNotes();
    }, [course_Id]);

    // lấy ra note


    useEffect(() => {
        if (doc_id !== null) {
            fetchCreatStatus();
        }
    }, [doc_id]);



    const [openIndexes, setOpenIndexes] = useState<number[]>([]);

    const toggleItem = useCallback((index: number) => {
        setOpenIndexes(prev =>
            prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
        );
    }, []);

    // hàm định dạng ngày giờ
    const [timedocument, settimedocument] = useState('');





    // hàm sử lý tách nội dung câu hỏi


    const handleExport = (data: { html: string, css: string, js: string }) => {
        setHtml(data.html)
        setCss(data.css)
        setJs(data.js)
    };

    const handleProgressChange = (playedSeconds: number) => {
        // console.log("Thời gian đã xem:", playedSeconds, "giây");
        setPlayedSeconds(playedSeconds)
    };

    // useEffect(() => {
    //     if (course && Array.isArray(course)) {

    //         const findInactiveDocumentId = (course: Chapter[]): string | null => {
    //             for (const chapter of course) {
    //                 const inactiveDoc = chapter.documents.find(doc => doc.status_document === false);
    //                 if (inactiveDoc) {
    //                     return inactiveDoc.document_id;
    //                 }
    //             }
    //             return null;
    //         };

    //         const inactiveDocId = findInactiveDocumentId(course);
    //         if (inactiveDocId) {
    //             const initialDoc = course
    //                 .flatMap(chapter => chapter.documents)
    //                 .find(doc => doc.document_id === inactiveDocId);
    //             const innitChappter = course
    //                 .flatMap(chapter => chapter.documents)
    //             if (initialDoc) {
    //                 setdoc_id(initialDoc.document_id);
    //                 // setChapter_id(innitChappter.)
    //                 handleClickDoc(initialDoc)
    //                 setSelectedIndex(
    //                     course.findIndex(chapter => chapter.documents.includes(initialDoc)) +
    //                     "-" +
    //                     course[course.findIndex(chapter => chapter.documents.includes(initialDoc))].documents.indexOf(initialDoc)
    //                 );
    //                 toggleItem(course.findIndex(chapter => chapter.documents.includes(initialDoc)))
    //             }
    //         }
    //     }

    // }, [course]);
    useEffect(() => {
        if (course && Array.isArray(course)) {
            const findInactiveDocument = (course: Chapter[]): { document_id: string; chapter_id: string } | null => {
                for (const chapter of course) {
                    const inactiveDoc = chapter.documents.find(doc => !doc.status_document);
                    if (inactiveDoc) {
                        return {
                            document_id: inactiveDoc.document_id,
                            chapter_id: chapter.chapter_id,
                        };
                    }
                }
                return null;
            };

            const inactiveDoc = findInactiveDocument(course);

            if (inactiveDoc) {
                const { document_id, chapter_id } = inactiveDoc;

                // Tìm tài liệu không hoạt động dựa trên document_id
                const initialDoc = course
                    .find(chapter => chapter.chapter_id === chapter_id)
                    ?.documents.find(doc => doc.document_id === document_id);

                if (initialDoc) {
                    // Đặt trạng thái và gọi các hàm cần thiết
                    setdoc_id(initialDoc.document_id); // Gán document_id
                    setChapter_id(chapter_id); // Gán chapter_id
                    handleClickDoc(initialDoc);

                    // Tìm chỉ số của tài liệu và chương để đặt selectedIndex
                    const chapterIndex = course.findIndex(chapter => chapter.chapter_id === chapter_id);
                    const docIndex = course[chapterIndex]?.documents.findIndex(doc => doc.document_id === document_id);

                    if (chapterIndex >= 0 && docIndex >= 0) {
                        setSelectedIndex(`${chapterIndex}-${docIndex}`);
                        toggleItem(chapterIndex);
                    }
                }
            }
        }
    }, [course]);



    const handleClickDoc = (doc: CombinedDocument) => {
        setnameDocument(doc.name_document);
        settypeDoc(doc.type_document);
        setIdDocument(doc.document_id);
        settimedocument(formatDateTime(doc.updated_at));
        setdoc_id(doc.document_id);
        setdescdocument(doc.discription_document);
        switch (doc.type_document) {
            case "quiz":
                if (doc.questions) {
                    console.log(doc.questions)
                    setQuestion(doc.questions);
                    setContent(false);
                }
                break;
            case "code":
                if (doc.codes) {
                    setCode(doc.codes);
                    setContent(false);
                }
                break;
            case "video":
                setUrlVideo((doc as VideoDocument).url_video);
                setContent(true);
                break;
            default:
                console.error("Không xác định loại tài liệu:");
        }
    };

    const renderContent = () => {
        if (typeDoc === 'video') {
            console.log("Rendering Video Player");
            return (
                <VideoPlayer
                    course_id={course_Id}
                    document_id={doc_id}
                    urlVideo={urlVideo}
                    onProgressChange={handleProgressChange}
                    isPlaying={isPlaying}
                />
            );
        } else if (typeDoc === 'quiz') {
            console.log("Rendering Quiz");
            return (
                <Questions
                    course_id={course_Id}
                    documents_id={doc_id}
                    nameDocument={nameDocument}
                    timedocument={timedocument}
                    questions={question}
                />
            );
        } else if (typeDoc === 'code') {

            return (
                <div className={styles.wapperCode}>
                    {code && (
                        <CodeDevLearning
                            key={code.id}
                            onExport={handleExport}
                            answer_code={code.answer_code}
                            correct_answer={code.correct_answer}
                            question_code={code.question_code}
                            tutorial_code={code.tutorial_code}
                            name_document={nameDocument}
                            updated_at={code.updated_at}
                            course_id={course_Id}
                            documents_id={doc_id}
                        />
                    )}
                </div>
            );
        } else {
            console.log("No matching content type, rendering default message");
            return (
                <div className={styles.wapperQuestion}>Không phải video, quiz hoặc code</div>
            );
        }
    };

    const [selectedIndex, setSelectedIndex] = useState<string | null>(null);


    const handlePreviousLesson = ({
        course,
        selectedIndex,
        setSelectedIndex,
    }: {
        course: Chapter[];
        selectedIndex: string | null;
        setSelectedIndex: (index: string) => void;
    }) => {
        if (!selectedIndex) return;

        const [currentChapterIndex, currentDocIndex] = selectedIndex.split('-').map(Number);

        // Nếu không phải bài đầu tiên trong chapter
        if (currentDocIndex > 0) {
            setSelectedIndex(`${currentChapterIndex}-${currentDocIndex - 1}`);
            handleClickDoc(course[currentChapterIndex].documents[currentDocIndex - 1]);
        }
        // Nếu là bài đầu tiên, chuyển về chapter trước (nếu có)
        else if (currentChapterIndex > 0) {
            const previousChapter = course[currentChapterIndex - 1];
            const lastDocIndex = previousChapter.documents.length - 1;

            // Kiểm tra trạng thái bài cuối cùng của chapter trước
            if (!previousChapter.documents[lastDocIndex]?.status_document) {
                alert('Bạn cần hoàn thành bài trước đó để tiếp tục.');
                return;
            }

            toggleItem(currentChapterIndex - 1)
            setSelectedIndex(`${currentChapterIndex - 1}-${lastDocIndex}`);
            setdoc_id(previousChapter.documents[lastDocIndex].document_id);
            handleClickDoc(previousChapter.documents[lastDocIndex]);
        } else {
            alert('Không có bài học trước.');
        }
    };

    const handleNextLesson = ({
        course,
        selectedIndex,
        setSelectedIndex,
    }: {
        course: Chapter[];
        selectedIndex: string | null;
        setSelectedIndex: (index: string) => void;
    }) => {
        if (!selectedIndex) return;

        const [currentChapterIndex, currentDocIndex] = selectedIndex.split('-').map(Number);

        const currentChapter = course[currentChapterIndex];

        // Nếu không phải bài cuối cùng trong chapter
        if (currentDocIndex < currentChapter.documents.length - 1) {
            // Kiểm tra trạng thái bài hiện tại
            if (!currentChapter.documents[currentDocIndex]?.status_document) {
                alert('Bạn cần hoàn thành bài trước đó để tiếp tục.');
                return;
            }

            setSelectedIndex(`${currentChapterIndex}-${currentDocIndex + 1}`);
            handleClickDoc(currentChapter.documents[currentDocIndex + 1]);
        }
        // Nếu là bài cuối cùng, chuyển sang chapter tiếp theo (nếu có)
        else if (currentChapterIndex < course.length - 1) {
            const nextChapter = course[currentChapterIndex + 1];

            // Kiểm tra trạng thái bài đầu tiên của chapter tiếp theo
            if (!nextChapter.documents[0]?.status_document) {
                alert('Bạn cần hoàn thành bài trước đó để tiếp tục.');
                return;
            }

            toggleItem(currentChapterIndex + 1)
            setSelectedIndex(`${currentChapterIndex + 1}-0`);
            handleClickDoc(nextChapter.documents[0]);
        } else {
            alert('Không có bài học tiếp theo.');
        }
    };

    const renderChapterDocument = () => {
        // Trạng thái lưu chỉ số phần tử đã chọn
        if (course) {

            return (
                tippyVisible && isVisible ? (
                    <AnimatePresence>
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 2 }}
                            exit={{ x: '-100%' }}
                            transition={{ duration: 0.5 }}
                        >
                            <CodeDev />
                        </motion.div>
                    </AnimatePresence>
                ) : (
                    isVisible && (
                        <div className={`${styles.fixed} ${styles.listCourse}`}>
                            <div className={styles.searchContainer}>
                                <input
                                    className={styles.inputSearch}
                                    type="text"
                                    placeholder="Tìm kiếm bài học"
                                />
                            </div>
                            <div className={styles.coursesContent}>
                                {course?.map((item, index) => (
                                    <div key={index} className={styles.listItem}>
                                        <div className={styles.listItem__title} onClick={() => toggleItem(index)}>
                                            <div className={styles.listItem__titleText}>{index + 1}. {item.chapter_name}</div>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                className={`${styles.listItem__icon} ${openIndexes.includes(index) ? styles.rotated : ''}`}
                                            >
                                                <path
                                                    d="M18 15L12 9L6 15"
                                                    stroke="rgba(35, 125, 247, 1)"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </div>
                                        {openIndexes.includes(index) && (
                                            <ul className={styles.listItem__docs} key={index}>
                                                {item.documents.map((doc, subIndex) => {
                                                    // Kiểm tra xem bài học trước đã hoàn thành chưa


                                                    return (
                                                        <li
                                                            key={subIndex}
                                                            className={`${styles.listItem__doc}`}
                                                            style={{
                                                                backgroundColor:
                                                                    selectedIndex === `${index}-${subIndex}` ? "rgba(230, 240, 254, 1)" : "transparent",
                                                            }}
                                                            onClick={() => {
                                                                const isPreviousDocumentCompleted =
                                                                    subIndex > 0 && item.documents[subIndex - 1]?.status_document === true;

                                                                const isCurrentDocumentBlocked =
                                                                    subIndex > 0 && !isPreviousDocumentCompleted;

                                                                const lastCourse = course[index - 1];
                                                                const lastLesson =
                                                                    lastCourse?.documents?.[lastCourse.documents.length - 1]?.status_document;

                                                                // Kiểm tra điều kiện tài liệu bị khóa
                                                                if (lastLesson === false) {
                                                                    alert('Bạn cần hoàn thành bài trước đó để tiếp tục.');
                                                                    return;
                                                                } else if (isCurrentDocumentBlocked) {
                                                                    alert('Bạn cần hoàn thành bài trước đó để tiếp tục.');
                                                                    return;
                                                                }
                                                                setSelectedIndex(`${index}-${subIndex}`);
                                                                handleClickDoc(doc);
                                                            }}
                                                        >
                                                            <div className={styles.doc_title}>
                                                                {doc.type_document === "video" ? (
                                                                    <IconVideo />
                                                                ) : (
                                                                    <IconDoc />
                                                                )}
                                                                <div className={styles.listItem__docTitle}>
                                                                    <span className={styles.listItem__docIndex}>{`${index + 1}.${subIndex + 1}`}  </span>
                                                                    <span className={styles.listItem__docName}> {doc.name_document} </span>
                                                                </div>
                                                            </div>
                                                            <DocumentStatus status_document={doc.status_document} />
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>

                        </div>
                    ))
            )
        }


    }



    const ContentBody = () => {
        return (
            isContent ? (
                <div className={styles.body}>
                    {!isNote ? (
                        <>
                            <div className={styles.bodyTop}>
                                <div className={styles.bodyTitle}>
                                    <span className={styles.timeUpdate}>Cập nhật ngày {timedocument}</span>
                                    <h4 className={styles.titleCourse}>{nameDocument}</h4>
                                </div>
                                <Button
                                    onClick={() => {
                                        toggleNote();
                                        handelIsPlaying();
                                    }}
                                    type="premary" // Đã sửa thành "primary"
                                    status="hover"
                                    size="S"
                                    leftIcon={false}
                                    rightIcon={false}
                                    height={40}
                                >
                                    Thêm ghi chú {formatTime(playedSeconds)}
                                </Button>
                            </div>
                            <div className={styles.bodyContent}>
                                <p className={styles.content}>
                                    {descdocument}
                                    <a
                                        href="https://www.w3schools.com/css/css_pseudo_classes.asp"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        https://www.w3schools.com/css/css_pseudo_classes.asp
                                    </a>
                                </p>
                            </div>
                        </>
                    ) : (
                        <AnimatePresence>
                            <motion.div
                                initial={{ y: '100%' }}
                                animate={{ y: 0 }}
                                exit={{ y: '-100%' }}
                                transition={{ duration: 0.5 }}
                                className={styles.noteTap}
                            >
                                <NoteCourse id={idDocument} title={nameDocument} time={playedSeconds} onClose={toggleNote} />
                            </motion.div>
                        </AnimatePresence>
                    )}
                </div>
            ) : (
                null
            )
        )
    }

    const HandleFaq = () => {
        return (
            isFAQ && (
                <AnimatePresence>
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ duration: 0.5 }}
                        className={styles.FAQ}
                    >
                        <Faq course_Id={course_Id} userImage={avatar} onClose={toggleFaq} />
                    </motion.div>
                </AnimatePresence>
            )
        )
    }



    const mappedCourseNew = useMemo(() => {
        if (!course || !Array.isArray(course)) return <>Trờ TTO chút xíu nhé</>; // Trả về null nếu không có course

        const contentLearning = renderContent();
        const contentChapterDocument = renderChapterDocument();
        const contentBody = ContentBody();
        const Faq = HandleFaq();
        return (
            <div className={styles.container}>
                <div className={`${styles.row}`}>
                    <div className={`${styles.flexGrow} ${styles.videoContainer}`}>
                        {contentLearning}

                        {contentBody}
                        {Faq}

                    </div>

                    {contentChapterDocument}
                </div>

            </div>
        );
    }, [course, isNote, isFAQ, tippyVisible, isVisible, openIndexes, playedSeconds, urlVideo, nameDocument, typeDoc]);



    // user


    // Lấy dữ liệu từ localStorage


    // lấy ra tất cả note của người dùng


    return (
        <main className={styles.main}>
            {isNoti ? (<Notification type={typeNoti!} message={messageNoti} />) : null}

            <Navbar className={stylesNav.nav} >
                <div className={stylesNav.brandProgress}>
                    <Link href="/" className={stylesNav.brandHeader}>
                        <Image src="/img/logo.svg" alt="logo" className={stylesNav.imgBrandHeader} width={54} height={56} />
                    </Link>
                    <h4 className={stylesNav.heading}>{progress?.name_course}</h4>
                    <ProgressCircle progress={progress?.progress_percentage ?? 0} />
                </div>
                <div className={stylesNav.cta}>
                    <label className={stylesNav.switch} onClick={toggleSwitch}>
                        <span className={`${stylesNav.slider} ${isActive ? stylesNav.active : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <g filter="url(#filter0_i_4106_6840)">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M1.46447 1.46447C0 2.92893 0 5.28595 0 10C0 14.714 0 17.0711 1.46447 18.5355C2.92893 20 5.28595 20 10 20C14.714 20 17.0711 20 18.5355 18.5355C20 17.0711 20 14.714 20 10C20 5.28595 20 2.92893 18.5355 1.46447C17.0711 0 14.714 0 10 0C5.28595 0 2.92893 0 1.46447 1.46447ZM11.4881 4.44591C11.8882 4.55311 12.1256 4.96437 12.0184 5.36447L9.4302 15.0237C9.32299 15.4238 8.91174 15.6613 8.51164 15.5541C8.11154 15.4468 7.8741 15.0356 7.98131 14.6355L10.5695 4.97624C10.6767 4.57614 11.088 4.3387 11.4881 4.44591ZM12.9697 6.46967C13.2626 6.17678 13.7374 6.17678 14.0303 6.46967L14.2387 6.67801C14.874 7.3133 15.4038 7.84308 15.7678 8.32019C16.1521 8.82379 16.4216 9.35587 16.4216 10C16.4216 10.6441 16.1521 11.1762 15.7678 11.6798C15.4038 12.1569 14.874 12.6867 14.2387 13.322L14.0303 13.5303C13.7374 13.8232 13.2626 13.8232 12.9697 13.5303C12.6768 13.2374 12.6768 12.7626 12.9697 12.4697L13.1412 12.2981C13.8229 11.6164 14.2797 11.1574 14.5753 10.7699C14.8577 10.3998 14.9216 10.1843 14.9216 10C14.9216 9.81571 14.8577 9.60024 14.5753 9.23007C14.2797 8.84258 13.8229 8.38356 13.1412 7.70191L12.9697 7.53033C12.6768 7.23744 12.6768 6.76257 12.9697 6.46967ZM5.96986 6.46967C6.26275 6.17678 6.73762 6.17678 7.03052 6.46967C7.32341 6.76257 7.32341 7.23744 7.03052 7.53033L6.85894 7.70191C6.17729 8.38356 5.72052 8.84258 5.42488 9.23007C5.14245 9.60024 5.07861 9.81571 5.07861 10C5.07861 10.1843 5.14245 10.3998 5.42488 10.7699C5.72052 11.1574 6.17729 11.6164 6.85894 12.2981L7.03052 12.4697C7.32341 12.7626 7.32341 13.2374 7.03052 13.5303C6.73762 13.8232 6.26275 13.8232 5.96986 13.5303L5.76151 13.322C5.12617 12.6867 4.59638 12.1569 4.23235 11.6798C3.84811 11.1762 3.57861 10.6441 3.57861 10C3.57861 9.35587 3.84811 8.82379 4.23235 8.32019C4.59638 7.84308 5.12617 7.31331 5.76151 6.67801L5.96986 6.46967Z" />
                                </g>
                                <defs>
                                    <filter id="filter0_i_4106_6840" x="0" y="0" width="20" height="22" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                        <feOffset dy="2" />
                                        <feGaussianBlur stdDeviation="2" />
                                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_4106_6840" />
                                    </filter>
                                </defs>
                            </svg>
                        </span>
                    </label>

                    <div className={stylesNav.iconNotifition}>
                        <IconBell />
                    </div>

                    {/* <Tippy
                        visible={isNoteContent}
                        onClickOutside={toggleNoteList}
                        interactive={true}
                        placement="top-start" 
                        render={(attrs) => (
                            <div className={styles.tippyNoteList} tabIndex={-1} {...attrs}>
                                <div className={styles.NoteList}>
                                    Nọi dung cần được note
                                </div>
                            </div>
                        )}
                    >
                        <div className={stylesNav.iconNotifition} onClick={toggleNoteList}>
                            <IconNote />
                        </div>
                    </Tippy> */}
                    <div className={stylesNav.iconNotifition} onClick={toggleNoteList}>
                        <IconNote />
                    </div>



                    <Tippy visible={visible} onClickOutside={hide} interactive={true} render={attrs => (
                        <div className={stylesNav.tippyBox} tabIndex={-1} {...attrs}>
                            <div className={stylesNav.menuContent}>
                                <p className={stylesNav.menuTitle}>Tùy chọn</p>
                                <Link href="#!" className={stylesNav.menuLink}>
                                    <IconSun /> Bật giao diện tối
                                </Link>
                                <p className={stylesNav.menuTitle}>Cài đặt</p>
                                <Link href="#!" className={stylesNav.menuLink}>
                                    <IconSetting />
                                    Cài đặt
                                </Link>
                                <Link href="#!" className={stylesNav.menuLink} onClick={handleLogout}>
                                    <IconLogout />
                                    Đăng xuất
                                </Link>

                            </div>
                        </div>
                    )}>
                        <div className={stylesNav.menuOptions} onClick={visible ? hide : show}>
                            <Image src={avatar} alt="logo" className={stylesNav.userImage} width={34} height={80} />
                            <h4 className={stylesNav.titleName}>{user?.fullname}</h4>
                            <Arrow deg="-180" />
                        </div>
                    </Tippy>

                </div>
            </Navbar >


            {/* Video */}
            {mappedCourseNew}
            <div className={`${styles.actionBar}`}>
                <div className={styles.faq} onClick={
                    () => {
                        toggleFaq();
                        handelIsPlaying();
                    }
                }>
                    <IconWhat />
                </div>
                <div className={styles.ctaNextPev}>
                    <button
                        className={styles.nextPrevCourse}
                        onClick={() => {
                            if (course) {
                                handlePreviousLesson({ course, selectedIndex, setSelectedIndex });
                            }
                        }}
                    >
                        <Arrow deg="-180" />
                        <p className={styles.titleNextPrev}>Bài trước</p>
                    </button>
                    <button
                        className={styles.nextPrevCourse}
                        onClick={() => {
                            if (course) {
                                handleNextLesson({ course, selectedIndex, setSelectedIndex });
                            }
                        }}
                    >
                        <p className={styles.titleNextPrev}>Bài tiếp theo</p>
                        <Arrow deg="0" />
                    </button>

                </div>
                <div className={styles.cateSec}>
                    <span>Chương 1: Bắt đầu</span>
                    <div className={styles.iconCatesec} onClick={toggleVisibility}>
                        <svg className={isVisible ? styles.rotated : ''} xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="#234587">
                            <path fillRule="evenodd" clipRule="evenodd" d="M20.3892 0.803629C21.3558 1.46469 22 2.64499 22 4.0329V17.9671C22 19.355 21.3558 20.5353 20.3892 21.1964C19.4104 21.8658 18.1152 21.9826 16.9723 21.2446L6.18329 14.2775C5.03297 13.5346 4.5 12.2341 4.5 11C4.5 9.76587 5.03297 8.46536 6.18329 7.72253L16.9723 0.755426C18.1152 0.0173917 19.4104 0.134203 20.3892 0.803629Z" />
                        </svg>
                    </div>
                </div>
                {isNoteContent && (
                    <AnimatePresence>
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '-110%' }}
                            transition={{ duration: 0.5 }}
                            className={styles.NoteList}
                        >
                            <NoteContent course_Id={course_Id} chapter_Id={chapter_id} doc_id={doc_id} userImage={avatar} onClose={toggleNoteList} />
                        </motion.div>
                    </AnimatePresence>
                )}
            </div>

        </main>
    );
}
export default Learning;