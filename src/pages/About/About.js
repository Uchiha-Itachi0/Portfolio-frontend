import { motion } from 'framer-motion'
import React, { useState, useEffect } from 'react'
import SectionHeading from '../../components/SectionHeading/SectionHeading'
import AboutStyle from './AboutStyle';
import axios from "../../axios/axiosInstance"


const aboutAnimate = {
    initial: {
        x: "-100vw",
        opacity: 0,
        transition: {
            duration: 1,
            type: "spring"
        }
    },
    animate: {
        x: "0",
        opacity: 1,
        transition: {
            duration: 1,
            type: "spring"
        }
    },
    exit: {
        x: "100vw",
        opacity: 0,
        transition: {
            duration: 1,
            type: "spring"
        }
    }
}
const About = () => {

    const [about, setAbout] = useState("");

    useEffect(() => {
        const fetchAbout = async () => {
            try {
                const data = await axios.get("about");
                setAbout(data.data.about[0].about);
            }
            catch (error) {
                alert("Failed to fetch the data");
            }

        }

        fetchAbout();

    }, []);


    return (
        <AboutStyle as={motion.div}
            animate="animate"
            initial="initial"
            exit="exit"
            variants={aboutAnimate}>
            <SectionHeading isSecondary>ABOUT</SectionHeading>
            <p className="about_content">
                {about}
            </p>
            <p className="about_footer">Interested in working togather</p>
            <a href="mailto:anubhav008shukla@gmail.com" className="about_link">Drop a note</a>
        </AboutStyle>
    )
}

export default About