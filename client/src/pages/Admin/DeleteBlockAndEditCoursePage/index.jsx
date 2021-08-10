import React, {useEffect, useState} from 'react';
import config from "../../../config";
import useHttp from "../../../hooks/http.hook";
import {NavLink, useHistory, useParams} from "react-router-dom";
import getRandomKey from "../../../utils/getRandomKey";

import './index.css'

const DeleteBlockAndEditCoursePage = ({token}) => {
    const [blockList, setBlockList] = useState([])
    const [title, setTitle] = useState('')
    const [prices, setPrices] = useState([])
    const [disabled, setDisabled] = useState(false)
    const [descriptions, setDescriptions] = useState([])
    const {goBack} = useHistory()
    const {courseKey} = useParams()
    const request = useHttp()

    useEffect (() => {
        const fetchData = async () => {
            const course = await request(`${config.baseUrl}/api/course/${courseKey}`, 'GET', null, {Authorization: `Bearer ${token}`})
            if(!course) return
            setBlockList(course.blocks)
            setTitle(course.title)
            setPrices(course.subscriptionPrices)
            setDescriptions(course.subscriptionDescription)
        }

        fetchData()
    }, [request, token, setBlockList, setTitle, setPrices, setDescriptions])
    const deleteHandlerClick = async blockKey => {
        setDisabled(true)
        const data = await request(`${config.baseUrl}/api/course/${courseKey}/${blockKey}`, 'DELETE', null, {Authorization: `Bearer ${token}`}, null, true)
        if(data) {
            setBlockList(prev => prev.filter(({keyword}) => keyword !== blockKey))
            setDisabled(false)
        }
    }

    const changeHandler = ({target}) => {
        const {name, value} = target
        const index = target.dataset.index
        if(name === 'description') {
            return setDescriptions(prev => {
                const next = [...prev]
                next[index] = value

                return next
            })
        }
        setPrices(prev => {
            const next = [...prev]
            next[index][name] = value

            return next
        })
    }

    const sendHandler = async (ev) => {
        ev.preventDefault()
        const dataToSend = {descriptions, title, prices}
        const data = await request(`${config.baseUrl}/api/course/${courseKey}`, 'PUT', dataToSend, {Authorization: `Bearer ${token}`}, null, true)
        if (data) window.scrollTo(0, 0)
    }

    const deleteFieldHandler = ({target}) => {
        const {index, name} = target.dataset
        if(name === 'descriptions') {
            return setDescriptions(prev => prev.filter((_, i) => i !== +index))
        }
        setPrices(prev => prev.filter((_, i) => i !== +index))
    }

    return (
        <div className='container'>
            <h1 style={{marginTop: 70, fontSize: '3rem'}}>Редактирование {courseKey} курса</h1>
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
                    placeholder='Заголовок курса'
                    required
                />
                <div className='create-form__border create-form__border_course'>
                    <div className='add create-form__add'>
                        <p className='add-text'>Добавить информацию подписки</p>
                        <button className='add-btn' type='button' onClick={() => {
                            setDescriptions(prev => [...prev, ''])
                        }}></button>
                    </div>
                    {descriptions.map((d, index) => (
                        <div style={{position: 'relative'}}>
                            <textarea
                                className='create-form__textarea'
                                onChange={changeHandler}
                                style={{marginTop: 15}}
                                name='description'
                                value={d}
                                data-index={index}
                                placeholder='Информация подписки'
                            />
                            <button className='delete-field-btn' type='button' onClick={deleteFieldHandler} data-name='descriptions' data-index={index}></button>
                        </div>))}
                </div>
                <div className='create-form__border create-form__border_course'>
                    <div className='add create-form__add'>
                        <p className='add-text'>Добавить время подписки</p>
                        <button className='add-btn' type='button' onClick={() => {
                            setPrices(prev => [...prev, {price: '', duration: ''}])
                        }}></button>
                    </div>
                    {prices.map(({price, duration}, index) => (
                        <div style={{position: 'relative'}}>
                            <input
                                className='create-form__input'
                                type="number"
                                name="price"
                                value={price}
                                data-index={index}
                                onChange={changeHandler}
                                placeholder='Цена подписки'
                                />
                            <input
                                className='create-form__input'
                                type="number"
                                name="duration"
                                value={duration}
                                data-index={index}
                                onChange={changeHandler}
                                placeholder='Длительность подписки'
                            />
                            <button className='delete-field-btn' type='button' onClick={deleteFieldHandler} data-name='prices' data-index={index}></button>
                        </div>
                    ))}
                </div>
                <button className='create-form__button' type='submit' style={{alignSelf: 'center', height: '5.5rem', borderRadius: '50px'}}>Сохранить изменения</button>
            </form>
            <h2 className='edit-course__title'>Список блоков</h2>
            <ul className='edit-course__list'>
                <NavLink onClick={() => window.scrollTo(0, 0)} className='edit-course__add-btn' style={{margin: '30px 0'}} to={`/admin/courses/${courseKey}/new/0`}></NavLink>
                {blockList.map(({title, keyword}, i) => (
                    <React.Fragment key={getRandomKey()}>
                        <li className='edit-course__wrapper' key={getRandomKey()}>
                            <NavLink onClick={() => window.scrollTo(0,0)} className='edit-course__elem' to={`/admin/courses/${courseKey}/${keyword}`}>
                                <h3 className='edit-course__subtitle'>{title}</h3>
                                <p className='edit-course__description'>@{keyword}</p>
                            </NavLink>
                            <button disabled={disabled} className='edit-course__delete-btn' onClick={() => deleteHandlerClick(keyword)}></button>
                        </li>
                        <li>
                            <NavLink onClick={() => window.scrollTo(0, 0)} className='edit-course__add-btn' style={{margin: '30px 0'}} to={`/admin/courses/${courseKey}/new/${i+1}`}></NavLink>
                        </li>
                    </React.Fragment>
                ))}
            </ul>
        </div>
    );
}

export default DeleteBlockAndEditCoursePage;
