import React, {useState} from 'react';
import config from "../../../config";
import useHttp from "../../../hooks/http.hook";
import {useHistory, useParams} from "react-router-dom";

const CreateLessonPage = ({token}) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const {courseKey, blockKey, index} = useParams()
    const {goBack} = useHistory()

    const request = useHttp()

    const sendHandler = async ev => {
        ev.preventDefault()
        const dataToSend = {description, title, index: index-1}
        const data = await request(`${config.baseUrl}/api/course/create_lesson/${courseKey}/${blockKey}`, 'POST', dataToSend, {Authorization: `Bearer ${token}`}, null, true)
        if (data) {
            window.scrollTo(0,0)
            goBack()
        }
    }

    return (
        <div className='container'>
            <h1 style={{marginTop: 70, fontSize: '3rem'}}>Создать урок</h1>
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
                    placeholder='Заголовок урока'
                    required
                />
                <textarea
                    className='create-form__textarea'
                    onChange={({target}) => setDescription(target.value)}
                    style={{marginTop: 15, overflow: 'auto'}}
                    value={description}
                    placeholder='Описание урока'
                />
                <button
                    className='create-form__button'
                    type='submit'
                    style={{marginTop: 20, alignSelf: 'center', height: '5.5rem', borderRadius: '50px'}}
                >
                    Сохранить изменения
                </button>
            </form>
            <p style={{fontSize: '2.2rem', color: 'var(--main-green-color)'}}>После создания урока вас перебросит обратно к списку уроков. Там вы сможете отредактировать созданный урок</p>
        </div>
    )
}

export default CreateLessonPage;
