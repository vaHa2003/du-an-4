'use client'

import { useState, useEffect } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';

import Body from "../component/globalControl/body"
import About from "../component/home/about"
import CourseFree from "../component/home/courseFree"
import CoursePro from "../component/home/coursePro"
import FeedBack from "../component/globalControl/FeedBack"
import LearningPath from "../component/home/learningPath"
import Post from "../component/home/post"
import ProductStudent from "../component/home/productStudent"
import SliderShow from "../component/home/sliderShow"
import Why from "../component/home/why"
import FeedBackToStudent from "../component/home/feedBackToStudent"

const Home: React.FC = () => {
    return (
        <>

            <Body>
                <SliderShow />
                <LearningPath />
                <CoursePro />
                <CourseFree />
                <Why />
                <About />
                <ProductStudent />
                <FeedBackToStudent />
                <Post />
                <FeedBack />
            </Body>
        </>
    )
}

export default Home