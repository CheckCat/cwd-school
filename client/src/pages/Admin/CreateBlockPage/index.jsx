import React, {useState} from 'react';
import config from "../../../config";
import useHttp from "../../../hooks/http.hook";
import {useHistory, useParams} from "react-router-dom";

const CreateBlockPage = ({token}) => {
    const [keyword, setKeyword] = useState('')
    const [title, setTitle] = useState('')
    const {courseKey, index} = useParams()
    const {goBack} = useHistory()

    const request = useHttp()

    const sendHandler = async ev => {
        ev.preventDefault()
        const dataToSend = {keyword, title, index}
        const data = await request(`${config.baseUrl}/api/course/create_block/${courseKey}`, 'POST', dataToSend, {Authorization: `Bearer ${token}`}, null, true)
        if (data) {
            window.scrollTo(0,0)
            goBack()
        }
    }

    return (
        <div className='container'>
            <h1 style={{marginTop: 70, fontSize: '3rem'}}>Создать блок</h1>
            <a onClick={() => {
                window.scrollTo(0,0)
                goBack()
            }} className='switch switch_back switch_back-to-block'
               style={{marginTop: 40, fontSize: '2rem', cursor: 'pointer'}}>Назад</a>
            <p style={{marginTop: 40, fontSize: '1.5rem', color: 'var(--main-green-color)'}}>Ключевое слово должно быть
                указано строго на латинице без лишних знаков</p>
            <form onSubmit={sendHandler} style={{display: 'flex', flexDirection: 'column'}}>
                <input
                    className='create-form__input'
                    type="text"
                    style={{marginTop: 50}}
                    onChange={({target}) => setKeyword(target.value.trim().toLowerCase())}
                    value={keyword}
                    placeholder='Ключевое слово блока (gloss)'
                    required
                />
                <input
                    className='create-form__input'
                    type="text"
                    onChange={({target}) => setTitle(target.value)}
                    value={title}
                    placeholder='Заголовок блока'
                    required
                />
                <button
                    className='create-form__button'
                    type='submit'
                    style={{marginTop: 20, alignSelf: 'center', height: '5.5rem', borderRadius: '50px'}}
                >
                    Сохранить изменения
                </button>
            </form>
            <p style={{fontSize: '2.2rem', color: 'var(--main-green-color)'}}>После создания блока вас перебросит
                обратно к списку блоков. Там вы сможете отредактировать созданный блок</p>
        </div>
    )
}

export default CreateBlockPage;
