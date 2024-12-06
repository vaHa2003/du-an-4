'use client'
import { useState, useEffect } from "react";
import Body from "@app/(user-global)/component/globalControl/body";
import CourseFor from "@app/(user-global)/component/course/courseFor";
import CourseForNext from "@app/(user-global)/component/course/CourseForNext";
import TimeLine from "@app/(user-global)/component/router/timeLine";
import LearningPathSection from "@app/(user-global)/component/router/learningPathSection";

const CourseForYou: React.FC = () => {
    const [courseIds, setCourseIds] = useState<string[]>([]);

    const handleCoursesLoad = (ids: string[]) => {
        setCourseIds(ids);
    };

    return (
        <Body>
            <CourseFor onCoursesLoad={handleCoursesLoad} />
            {/* Chỉ truyền courseIds cho CourseForNext khi có dữ liệu mới */}
            {courseIds.length > 0 && <CourseForNext id={courseIds} />}
        </Body>
    );
}

export default CourseForYou;

{/* <LearningPathSection
                title='UI/UX Design'
                contentTitle='Thiết kế UI/UX luôn là một lĩnh vực hấp dẫn và thời thượng.
                     Chỉ cần tìm kiếm từ khóa "Tuyển dụng Designer UI/UX," 
                      bạn sẽ ngay lập tức nhận thấy các nhà tuyển dụng đang
                       tích cực tìm kiếm ứng viên với mức lương rất cạnh tranh.
                        Nếu bạn có đam mê với việc tạo ra những giao diện người dùng độc đáo và sáng tạo,
                         thì việc trau dồi kỹ năng thiết kế UI/UX là điều cần thiết.
                     Hãy để khóa học này giúp bạn phát triển và hiện thực hóa những ý tưởng của mình!'
                contentSkill='Sau khi hoàn thành lộ trình học này,
                     bạn sẽ có khả năng tạo ra các sản phẩm thiết kế UI/UX hiện đại và thu hút,
                      từ những giao diện cơ bản cho đến các nguyên mẫu phức tạp,
                     cùng với kỹ năng tối ưu hóa trải nghiệm người dùng.'
                imgLearningPath='/img/learningPathDS.svg'
                webImg="/img/webDS.svg"
                icon1="/img/adobeIcon.svg"
                icon2="/img/figmaIcon.svg"
                icon3="/img/fireBaseIcon.svg"
                icon4="/img/reactIcon.svg"
                icon5="/img/psIcon.svg"
                content1="Nền tảng thiết kế"
                content2="Thiết kế giao diện cơ bản"
                content3="Giao diện phức tạp và trải nghiệm người dùng nâng cao."
                content4="Nguyên mẫu tương tác"
                content5="Đánh giá và cải thiện trải nghiệm người dùng"
            />
            <TimeLine
                title="UI/UX DESIGNER"
                name1="Introduction to Design"
                name2="Advanced UI/UX Design"
                name3="Prototyping with Figma "
                name4="MySQL"
                name5="Usability Testing"
            /> */}