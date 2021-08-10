import React, {useEffect, useState} from 'react';
import config from "../../../config";
import useHttp from "../../../hooks/http.hook";
import {NavLink} from "react-router-dom";
import getRandomKey from "../../../utils/getRandomKey";

import './index.css'

const DeleteCoursePage = ({token}) => {
    const [courseList, setCourseList] = useState([])
    const [disabled, setDisabled] = useState(false)
    const request = useHttp()

    useEffect (() => {
        const fetchData = async () => {
            const {courses} = await request(`${config.baseUrl}/api/course`)
            setCourseList(courses)
        }

        fetchData()
    }, [request, setCourseList])

    const deleteHandlerClick = async courseKey => {
        setDisabled(true)
        await request(`${config.baseUrl}/api/course/${courseKey}`, 'DELETE', null, {Authorization: `Bearer ${token}`}, null, true)
        setDisabled(false)
        setCourseList(prev => prev.filter(({keyword}) => keyword !== courseKey))
    }

    return (
        <div className='container'>
            <h1 className='edit-course__title'>Список курсов</h1>
            <ul className='edit-course__list'>
                {courseList.map(({title, keyword}) => (
                    <li className='edit-course__wrapper' key={getRandomKey()}>
                        <NavLink onClick={() => window.scrollTo(0,0)} className='edit-course__elem' to={`/admin/courses/${keyword}`}>
                            <h3 className='edit-course__subtitle'>{title}</h3>
                            <p className='edit-course__description'>@{keyword}</p>
                        </NavLink>
                        <button disabled={disabled} className='edit-course__delete-btn' onClick={() => deleteHandlerClick(keyword)}></button>
                    </li>
                ))}
            </ul>
            <NavLink onClick={() => window.scrollTo(0, 0)} className='edit-course__add-btn' to='/admin/courses/create_course'></NavLink>
        </div>
    );
}

export default DeleteCoursePage;
