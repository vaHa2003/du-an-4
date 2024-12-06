'use client'

import videoMod from "../../component/Course/VideoDetail/course-video.module.css";
import courseMod from "../../component/Course/course.module.css";
import { Button, Stack } from "react-bootstrap";
import Link from "next/link";
import {
    ChevronLeft,
    ChevronRight,
    PlayCircle,
    QuestionCircle,
    Search,
    SkipStart,
} from "react-bootstrap-icons";
import Accordion from "react-bootstrap/Accordion";
import { useCallback, useEffect, useRef, useState } from "react";
import useCookie from "@/app/(user-global)/component/hook/useCookie";
import useFormatDate from "@/app/(user-global)/component/globalControl/useFormatDate";
import ReactLoading from 'react-loading';
import { AccordionSelectCallback } from "react-bootstrap/esm/AccordionContext";

interface CourseDetailProps {
    params: {
        id: string;
    };
}

interface DataCourse {
    course_id: string
    chapter_id: string;
    chapter_name: string;
    documents: [
        {
            document_id: string;
            name_document: string;
            type_document: string;
            updated_at: string;
        }
    ];
    
}

interface ChapterAccordionProps {
    data: DataCourse[];
    setVideoDetails: React.Dispatch<React.SetStateAction<VideoDetailProps>>;
    currentDocumentId: string;
}

interface VideoDetailProps {
    id: string
    name: string;
    updated_at: string;
}

const ParentComponent: React.FC<CourseDetailProps> = ({ params }) => {
    const [data, setData] = useState<DataCourse[] | null>(null);
    const [loading, setLoading] = useState(false)
    const token = useCookie('token')
    const idCourse = params.id
    const [videoDetails, setVideoDetails] = useState<VideoDetailProps>({
        id: '',
        name: '',
        updated_at: '',
    });
    const videoRef = useRef<HTMLDivElement | null>(null);
    const [currentChapterIndex, setCurrentChapterIndex] = useState<number>(0);
    const [currentDocumentIndex, setCurrentDocumentIndex] = useState<number>(0);
    const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);


    useEffect(() => {
        setLoading(true)
        if (token) {
            fetch(`/api/courseDocumnets/${idCourse}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);

                    setLoading(false)
                    setData(data.data);
                    if (data.data && data.data.length > 0) {
                        const firstDocument = data.data[0].documents[0];
                        setVideoDetails({
                            id: firstDocument.document_id,
                            name: firstDocument.name_document,
                            updated_at: firstDocument.updated_at,
                        });
                        if (videoRef.current) {
                            videoRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }
                })
                .catch(error => {
                    setLoading(false)
                    console.log(error)
                });
        }
    }, [token, idCourse]);

    const goToPreviousDocument = useCallback(() => {
        if (data) {
            if (currentDocumentIndex > 0) {
                const previousDocument = data[currentChapterIndex].documents[currentDocumentIndex - 1];
                setCurrentDocumentIndex(currentDocumentIndex - 1);
                setVideoDetails({
                    id: previousDocument.document_id,
                    name: previousDocument.name_document,
                    updated_at: previousDocument.updated_at,
                });
            } else if (currentChapterIndex > 0) {
                setCurrentChapterIndex(currentChapterIndex - 1);
                const previousDocument = data[currentChapterIndex - 1].documents[data[currentChapterIndex - 1].documents.length - 1];
                setCurrentDocumentIndex(data[currentChapterIndex - 1].documents.length - 1);
                setVideoDetails({
                    id: previousDocument.document_id,
                    name: previousDocument.name_document,
                    updated_at: previousDocument.updated_at,
                });
                setActiveChapterIndex(currentChapterIndex - 1);
            }
        }
    }, [currentChapterIndex, currentDocumentIndex, data]);

    const goToNextDocument = useCallback(() => {
        if (data) {
            if (currentDocumentIndex < data[currentChapterIndex].documents.length - 1) {
                const nextDocument = data[currentChapterIndex].documents[currentDocumentIndex + 1];
                setCurrentDocumentIndex(currentDocumentIndex + 1);
                setVideoDetails({
                    id: nextDocument.document_id,
                    name: nextDocument.name_document,
                    updated_at: nextDocument.updated_at,
                });
            } else if (currentChapterIndex < data.length - 1) {
                setCurrentChapterIndex(currentChapterIndex + 1);
                setCurrentDocumentIndex(0);
                const nextDocument = data[currentChapterIndex + 1].documents[0];
                setVideoDetails({
                    id: nextDocument.document_id,
                    name: nextDocument.name_document,
                    updated_at: nextDocument.updated_at,
                });
                setActiveChapterIndex(currentChapterIndex + 1);
            }
        }
    }, [currentChapterIndex, currentDocumentIndex, data]);

    console.log('dữ liệu:', data);


    return (
        <>
            <div className={`${videoMod.content} d-flex flex-column flex-lg-row`}>
                {/*Video + bài viết*/}
                {loading ? (
                    <ReactLoading type={"bubbles"} color={'rgba(153, 153, 153, 1)'} height={'40%'} width={'40%'} delay={10} className={videoMod.align} />
                ) : (
                    <>
                        <div style={{ minHeight: '400px' }} className={`${videoMod.videoContainer} flex-shrink-1 align-items-start`}>
                            <VideoDetail id={videoDetails.id} name={videoDetails.name} updated_at={videoDetails.updated_at} />

                        </div>
                        {/*Accordion gồm chương và dấu thời gian*/}
                        <div style={{ maxWidth: '376px' }} className={`${videoMod.chapters} flex-md-shrink-1 flex-grow-1 p-2`}>
                            <ChapterSearchBar />
                            {data && <ChapterAccordion data={data} setVideoDetails={setVideoDetails} currentDocumentId={videoDetails.id} />}
                        </div>
                    </>
                )}
            </div >
            <footer className={`${videoMod.contentFooter} d-flex align-items-center justify-content-between px-3`}>
                <a href="/" className="">
                    <QuestionCircle size={32} className="text-primary" />
                </a>

                <div className="d-inline-flex gap-2">
                    <Button
                        variant="outline-primary"
                        className={`${courseMod.btnCTA} ${courseMod.btnCTAOutline} d-flex align-items-center gap-2`}
                        onClick={goToPreviousDocument}
                        disabled={currentChapterIndex === 0 && currentDocumentIndex === 0}
                    >
                        <ChevronLeft />
                        Bài trước
                    </Button>
                    <Button
                        variant="outline-primary"
                        className={`${courseMod.btnCTA} ${courseMod.btnCTAOutline} d-flex align-items-center gap-2`}
                        onClick={goToNextDocument}
                    >
                        Bài kế tiếp
                        <ChevronRight />
                    </Button>
                </div>
                <div className="d-inline-flex align-items-center gap-2">
                    <span className={`${videoMod.footerChapter} text-muted`}>
                        Chương {currentChapterIndex + 1}: {data ? data[currentChapterIndex].chapter_name : ''}
                    </span>
                    <Button variant="light" className={`${videoMod.footerBtnStart} rounded-circle p-1`}>
                        <SkipStart size={24} />
                    </Button>
                </div>
            </footer>
        </>
    )
}

const ChapterAccordion: React.FC<ChapterAccordionProps> = ({ data, setVideoDetails, currentDocumentId }) => {
    const firstDocumentRef = useRef<HTMLButtonElement | null>(null);
    const [activeChapterIndex, setActiveChapterIndex] = useState<string>("0");

    if (!data) {
        return <p>Không có dữ liệu.</p>;
    }

    useEffect(() => {
        const chapterIndex = data.findIndex(chapter =>
            chapter.documents.some(doc => doc.document_id === currentDocumentId)
        );

        if (chapterIndex !== -1) {
            setActiveChapterIndex(String(chapterIndex));
        }
    }, [currentDocumentId, data]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (firstDocumentRef.current) {
                firstDocumentRef.current.focus();
            }
        }, 0);

        return () => clearTimeout(timer);
    }, [data]);
    const handleDocumentClick = (document: { document_id: string, name_document: string, updated_at: string }) => {
        setVideoDetails({
            id: document.document_id,
            name: document.name_document,
            updated_at: document.updated_at,
        });
    };

    const handleAccordionSelect: AccordionSelectCallback = (eventKey) => {
        if (eventKey !== null) {
            setActiveChapterIndex(String(eventKey));
        } else {
            setActiveChapterIndex("0");
        }
    };
    return (
        <Accordion activeKey={activeChapterIndex} onSelect={handleAccordionSelect}>
            {
                data.map((item, index) => (
                    <Accordion.Item eventKey={`${index}`} key={index}>
                        <Accordion.Header>
                            <div className="d-flex flex-column">
                                <span className="fw-bold">{index + 1}. {item.chapter_name}</span>
                                <div className={`${videoMod.accordionHeaderInfo} d-flex gap-2`}>
                                    <span>{item.documents.length}/{item.documents.length}</span>
                                </div>
                            </div>
                        </Accordion.Header>
                        <Accordion.Body className="p-0">
                            <Stack gap={2}>
                                {item.documents.map((itemDocuments, indexDocuments) => (
                                    <Button
                                        variant="outline"
                                        className={`${videoMod.chapterBtn} ${itemDocuments.document_id === currentDocumentId ? videoMod.chapterBtn__blue : ''}`}
                                        key={indexDocuments}
                                        onClick={() => handleDocumentClick(itemDocuments)}
                                        ref={indexDocuments === 0 ? firstDocumentRef : null}
                                    >
                                        <div className="d-flex align-items-center gap-2">
                                            <PlayCircle size={17} className="text-muted" />
                                            <div
                                                className={`${videoMod.accordionChapter} d-flex flex-column align-items-start text-muted`}
                                            >
                                                <span>{index + 1}.{indexDocuments + 1} {itemDocuments.name_document}</span>
                                                <span>24.24</span>
                                            </div>
                                        </div>
                                    </Button>
                                ))}
                            </Stack>
                        </Accordion.Body>
                    </Accordion.Item>
                ))
            }

        </Accordion>
    );
};

const VideoDetail: React.FC<VideoDetailProps> = ({ name, updated_at }) => {
    const formattedDate = useFormatDate(updated_at);
    return (
        <>
            <video controls>
                <source src="/video/html-in-5-mins.mp4" type="video/mp4" />
            </video>
            <div className="d-flex flex-row p-3 gap-2">
                <div className="d-flex flex-column flex-grow-1">
                    <span className={`${videoMod.date} text-muted`}>
                        Cập nhật ngày <time dateTime={formattedDate}>{formattedDate}</time>
                    </span>
                    <h3>{name}</h3>
                    <p>
                        {name} Nội
                        dung bổ sung: https://www.w3schools.com/css/css_pseudo_classes.asp
                    </p>
                </div>
                <div
                    className={`${courseMod.actions} d-flex flex-column flex-shrink-0`}
                >
                    <Button className={`${courseMod.btnCTA}`}>Duyệt video</Button>
                    <Link href="/admin/StatisticalCourse">
                        <Button
                            variant="outline-primary"
                            className={`${courseMod.btnCTA} ${courseMod.btnCTAOutline}`}
                        >
                            Chi tiết
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    )
};


const ChapterSearchBar: React.FC = () => {
    return (
        <div className="input-group mb-3">
            <div className={`input-group-prepend ${courseMod.iconInput} rounded-start-4`}>
                <span
                    className={`input-group-text bg-transparent border-end-0 rounded-start-4 rounded-end-0 p-2 ${courseMod.iconInput}`}
                    id="inputGroup-sizing-default"
                >
                    {/* Search icon start */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 12 12"
                        fill="#dbdbdb"
                    >
                        <g clipPath="url(#clip0_3435_8010)">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M5.75 1.375C3.33375 1.375 1.375 3.33375 1.375 5.75C1.375 8.16625 3.33375 10.125 5.75 10.125C8.16625 10.125 10.125 8.16625 10.125 5.75C10.125 3.33375 8.16625 1.375 5.75 1.375ZM0.625 5.75C0.625 2.91954 2.91954 0.625 5.75 0.625C8.58046 0.625 10.875 2.91954 10.875 5.75C10.875 7.03026 10.4056 8.20087 9.62943 9.0991L11.2652 10.7348C11.4116 10.8813 11.4116 11.1187 11.2652 11.2652C11.1187 11.4116 10.8813 11.4116 10.7348 11.2652L9.0991 9.62943C8.20087 10.4056 7.03026 10.875 5.75 10.875C2.91954 10.875 0.625 8.58046 0.625 5.75Z"
                                fill="#4993f8"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_3435_8010">
                                <rect width="12" height="12" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    {/* Search icon end */}
                </span>
            </div>
            <input
                placeholder="Tìm kiếm bài học"
                type="text"
                className={`form-control rounded-end-4 border-start-0 p-2 ${courseMod.textInput}`}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
            />
        </div>
    );
};

export default ParentComponent;
