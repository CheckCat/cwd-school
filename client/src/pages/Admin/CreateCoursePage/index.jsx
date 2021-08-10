import React, {useState} from 'react';
import config from "../../../config";
import useHttp from "../../../hooks/http.hook";
import {useHistory} from "react-router-dom";

const CreateCoursePage = ({token}) => {
    const [keyword, setKeyword] = useState('')
    const [title, setTitle] = useState('')
    const [prices, setPrices] = useState([])
    const [descriptions, setDescriptions] = useState([])
    const {goBack} = useHistory()

    const request = useHttp()

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

    const sendHandler = async ev => {
        ev.preventDefault()
        const dataToSend = {keyword, title, prices, descriptions}
        const data = await request(`${config.baseUrl}/api/course/create_course`, 'POST', dataToSend, {Authorization: `Bearer ${token}`}, null, true)
        if (data) window.location.reload()
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
            <h1 style={{marginTop: 70, fontSize: '3rem'}}>Создать курс</h1>
            <a onClick={() => {
                window.scrollTo(0,0)
                goBack()
            }} className='switch switch_back switch_back-to-block' style={{marginTop: 40, fontSize: '2rem', cursor: 'pointer'}}>Назад</a>
            <p style={{marginTop: 40, fontSize: '1.5rem', color: 'var(--main-green-color)'}}>Ключевое слово должно быть указано строго на латинице без лишних знаков</p>
            <form onSubmit={sendHandler} style={{display: 'flex', flexDirection: 'column'}}>
                <input
                    className='create-form__input'
                    type="text"
                    style={{marginTop: 50}}
                    onChange={({target}) => setKeyword(target.value.trim().toLowerCase())}
                    value={keyword}
                    placeholder='Ключевое слово курса (base)'
                    required
                />
                <input
                    className='create-form__input'
                    type="text"
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
                                style={{marginTop: 15, overflow: 'auto'}}
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
                <button
                    className='create-form__button'
                    type='submit'
                    style={{marginTop: 20, alignSelf: 'center', height: '5.5rem', borderRadius: '50px'}}
                >
                    Сохранить изменения
                </button>
            </form>
            <p style={{fontSize: '2.2rem', color: 'var(--main-green-color)'}}>После создания курса вас перебросит на главную страницу</p>
        </div>
    )
}

export default CreateCoursePage;
