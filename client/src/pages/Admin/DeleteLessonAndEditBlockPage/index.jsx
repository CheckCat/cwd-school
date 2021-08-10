import React, {useEffect, useState} from 'react';
import config from "../../../config";
import useHttp from "../../../hooks/http.hook";
import {NavLink, useHistory, useParams} from "react-router-dom";
import getRandomKey from "../../../utils/getRandomKey";

const DeleteLessonAndEditBlockPage = ({token}) => {
    const [lessonList, setLessonList] = useState([])
    const [disabled, setDisabled] = useState(false)
    const [title, setTitle] = useState('')
    const {courseKey, blockKey} = useParams()
    const {goBack} = useHistory()
    const request = useHttp()

    useEffect (() => {
        const fetchData = async () => {
            const block = await request(`${config.baseUrl}/api/course/${courseKey}/${blockKey}`, 'GET', null, {Authorization: `Bearer ${token}`})
            if(!block) return
            setLessonList(block.lessons)
            setTitle(block.blockTitle)
        }

        fetchData()
    }, [request, token, setLessonList, setTitle])

    const deleteHandlerClick = async index => {
        setDisabled(true)
        const data = await request(`${config.baseUrl}/api/course/${courseKey}/${blockKey}/${index}`, 'DELETE', null, {Authorization: `Bearer ${token}`}, null, true)
        setDisabled(false)
        if(data) setLessonList(prev => prev.filter((_, i) => i !== index))
    }

    const sendHandler = async (ev) => {
        ev.preventDefault()
        const dataToSend = {title}
        const data = await request(`${config.baseUrl}/api/course/${courseKey}/${blockKey}`, 'PUT', dataToSend, {Authorization: `Bearer ${token}`}, null, true)
        if (data) window.scrollTo(0, 0)
    }

    return (
        <div className='container'>
            <h1 style={{marginTop: 70, fontSize: '3rem'}}>Редактирование {blockKey} блока {courseKey} курса</h1>
            <a onClick={() => {
                window.scrollTo(0,0)
                goBack()
            }} className='switch switch_back switch_back-to-block' style={{marginTop: 40, fontSize: '2rem', cursor: 'pointer'}}>Назад</a>
            <form onSubmit={sendHandler} style={{display: 'flex', flexDirection: 'column'}}>
                <input
                    className='create-form__input'
                    type="text"
                    style={{marginTop: 50}}
                    onChange={({target}) => setTitle(target.value)}
                    value={title}
                    placeholder='Заголовок блока'
                    required
                />
                <button className='create-form__button' type='submit' style={{alignSelf: 'center', height: '5.5rem', borderRadius: '50px'}}>Сохранить изменения</button>
            </form>
            <h2 className='edit-course__title'>Список уроков</h2>
            <ul className='edit-course__list'>
                <NavLink onClick={() => window.scrollTo(0, 0)} className='edit-course__add-btn' style={{margin: '30px 0'}} to={`/admin/courses/${courseKey}/${blockKey}/new/1`}></NavLink>
                {lessonList.map(({title, description, index: lessonIndex}, index) => (
                    <React.Fragment key={getRandomKey()}>
                        <li className='edit-course__wrapper' key={getRandomKey()}>
                            <NavLink  onClick={() => window.scrollTo(0,0)} className='edit-course__elem' to={`/admin/courses/${courseKey}/${blockKey}/${index}`}>
                                <h3 className='edit-course__subtitle' style={{fontSize: '2rem', color: 'var(--main-color)'}}>№{index+1}</h3>
                                <h4 className='edit-course__subtitle'>{title}</h4>
                                <p className='edit-course__description'>{description}</p>
                            </NavLink>
                            <button disabled={disabled} className='edit-course__delete-btn' onClick={() => deleteHandlerClick(index)}></button>
                        </li>
                        <li>
                            <NavLink onClick={() => window.scrollTo(0, 0)} className='edit-course__add-btn' style={{margin: '30px 0'}} to={`/admin/courses/${courseKey}/${blockKey}/new/${index+2}`}></NavLink>
                        </li>
                    </React.Fragment>
                ))}
            </ul>
        </div>
    );
}

export default DeleteLessonAndEditBlockPage;
