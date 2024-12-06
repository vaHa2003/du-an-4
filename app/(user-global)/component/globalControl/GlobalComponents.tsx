import ScrollToTop from "./scrollToTop";
import LeftSlider from "./leftSlider";
import ProfileDispatch from "../auth/user-component/profileDispatch";
import { usePathname } from 'next/navigation';

const GlobalComponents: React.FC = () => {
    const pathname = usePathname();
    const isLearningCoursePage = /^\/learningCourse(\/.*)?$/.test(pathname);
    return (
        <>
            <ScrollToTop />
            {isLearningCoursePage ? "" : <LeftSlider />}
            <ProfileDispatch />
        </>
    );
};

export default GlobalComponents;
