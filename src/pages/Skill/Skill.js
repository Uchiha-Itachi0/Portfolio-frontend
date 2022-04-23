import React, { useState, useEffect } from 'react'
import SkillStyle from './SkillStyle'
import SectionHeading from "../../components/SectionHeading/SectionHeading"
import PercentageDisplayer from '../../components/PercentageDisplayer/PercentageDisplayer'
import axios from "../../axios/axiosInstance"
import { motion } from "framer-motion";


const skillAnimate = {
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

const Skill = () => {

    const [skills, setSkills] = useState([])

    const fetchSkills = async () => {
        try {
            const data = await axios.get("/skills")
            setSkills(data.data.skills);
        }
        catch (error) {
            alert("FAILEd TO LOAD DATA");
        }
    }

    useEffect(() => {
        fetchSkills();
    }, [])

    return (
        <SkillStyle as={motion.section} 
        initial="initial" 
        animate="animate" 
        exit="exit"
        variants={skillAnimate}>
            <SectionHeading isSecondary>SKILLS</SectionHeading>
            <p className="skill_subheading">Click or hover any to know the percentage</p>
            {skills.map((skill, index) => {
                return <PercentageDisplayer
                key={skill._id}
                index_number={index + 1}
                title={skill.title}
                percentage={skill.percentage}>
                    {skill.title}
                </PercentageDisplayer>
            })}
        </SkillStyle>
    )
}

export default Skill