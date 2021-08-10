import React, {useEffect, useRef, useState} from 'react'
import getRandomKey from '../../../utils/getRandomKey'
import useHttp from "../../../hooks/http.hook";
import config from "../../../config";
import {useHistory, useParams} from "react-router-dom";
import './index.css'


const EditLessonPage = ({token, theme}) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [video, setVideo] = useState('')
    const [disabled, setDisabled] = useState(false)
    const [timecodes, setTimecodes] = useState([{time: '', description: ''}])
    const [audio, setAudio] = useState([])
    const [pdf, setPdf] = useState([])
    const [textInfo, setTextInfo] = useState([])

    const auxiliary = useRef()

    const {courseKey, blockKey, index} = useParams()
    const {goBack} = useHistory()
    const request = useHttp()

    useEffect(() => {
        const getFetch = async () => {
            const data = await request(`${config.baseUrl}/api/course/${courseKey}/${blockKey}/${+index+1}`, 'GET', null, {Authorization: `Bearer ${token}`})
            console.log(data)
            if(!data) return
            const {lesson} = data
            if(!lesson || Object.keys(lesson).length === 0) return
            setTitle(lesson.title)
            setDescription(lesson.description)
            setVideo(lesson.video)
            lesson.timecodes && setTimecodes(lesson.timecodes)
            const audioFileNames = lesson.audio.map(p => p.split('/').slice(-1)[0])
            setAudio(audioFileNames)
            const pdfFileNames = lesson.pdf.map(p => p.split('/').slice(-1)[0])
            setPdf(pdfFileNames)
            setTextInfo(lesson.text.map(({title, text, image}) => image ? ({title, text, image: image.split('/').slice(-1)[0]}) : ({title, text, image: ''})))
        }
        getFetch()
    }, [request, setTitle, setDescription, setVideo, setTimecodes, setAudio, setPdf, setTextInfo, courseKey, blockKey, index, token])


    const sendHandler = async (ev) => {
        ev.preventDefault()
        setDisabled(true)
        const dataToSend = {title, description, video, timecodes, audio, pdf, textInfo}
        const submissionForm = JSON.parse(JSON.stringify(dataToSend))
        auxiliary.current.value = JSON.stringify(submissionForm)
        const additionalFormData = new FormData(ev.target)
        const data = await request(`${config.baseUrl}/api/course/${courseKey}/${blockKey}/${index}`, 'PUT', additionalFormData, {Authorization: `Bearer ${token}`}, 'SENDFILES')
        if(data) {
            setDisabled(false)
            window.scrollTo(0,0)
            goBack()
        }
    }

    return (
        <div className='container'>
            <h1 style={{marginTop: 50, fontSize: '3rem'}}>Редактирование урока №{+index+1} блока {blockKey} курса {courseKey}</h1>
            <a onClick={() => {
                window.scrollTo(0,0)
                goBack()
            }} className='switch switch_back switch_back-to-block' style={{marginTop: 40, fontSize: '2rem', cursor: 'pointer'}}>Назад</a>
            <form onSubmit={sendHandler} style={{marginTop: 40, display: 'flex', flexDirection: 'column'}}>
                <input type="hidden" name='data' ref={auxiliary}/>
                <input
                    className='create-form__input'
                    type="text"
                    name="title"
                    value={title}
                    placeholder='Заголовок урока (Что такое криптовалюта)'
                    onChange={({target}) => setTitle(target.value)}
                    required
                />
                <textarea
                    className='create-form__textarea'
                    onChange={({target}) => setDescription(target.value)}
                    style={{marginTop: 15, overflow: 'auto'}}
                    name="description"
                    value={description}
                    placeholder='Описание урока (Криптовалюта в нашей жизни...)'
                />
                <div className='create-form__border create-form__border_course' style={{marginTop: 20}}>
                    <input
                        className='create-form__input'
                        type="text"
                        name="video"
                        value={video}
                        placeholder='ID ссылки на видео с Vimeo (42352323)'
                        onChange={({target}) => setVideo(target.value)}
                    />
                    <div className='add create-form__add'>
                        <p className='add-text'>Добавить таймкод</p>
                        <button className='add-btn' type='button' onClick={() => {
                            setTimecodes(prev => [...prev, {time: '', description: ''}])
                        }}></button>
                    </div>
                        {timecodes.map(({time, description},i) => (
                            <div className='create-form__timecode' style={{position: 'relative', marginTop: 30}}>
                                <input
                                    className='create-form__input'
                                    type="text"
                                    name="time"
                                    onChange={({target}) => setTimecodes(prev => {
                                        const next = [...prev]
                                        next[i].time = target.value
                                        return next
                                    })
                                    }
                                    placeholder='Время таймкода (02:05)'
                                    value={time}
                                />
                                <input
                                    className='create-form__input'
                                    type="text"
                                    name="description"
                                    onChange={({target}) => setTimecodes(prev => {
                                        const next = [...prev]
                                        next[i].description = target.value
                                        return next
                                    })
                                    }
                                    placeholder='Описание таймкода (Виды криптовалюты)'
                                    value={description}
                                />
                                <button className='delete-field-btn' type='button' onClick={() => setTimecodes(prev => prev.filter((_, I) => i !== I))} data-name='prices' data-index={index}></button>
                            </div>
                        ))}
                </div>
                <div className='footnote'>
                    <p>Старайтесь загружать файлы с названием одним словом на латинице, без специальных символов (@, #, $, -, _ и тд) и пробелов</p>
                    <p>Примеры правильных названий файлов: "file1.png", "coolPDF.pdf", "bestaudio.ogg", "fIrsTLesson.mp3", "BestLesson.jpg"</p>
		    <p>Строго запрещается загружать на сервер файлы с одинаковым названием!!!</p>
		</div>
                <div className='create-form__input-file' style={{cursor: 'default'}}>
                    <label style={{cursor: 'pointer'}}>
                        <img src={`${config.clientUrl}/${theme}-images/pdf.png`} alt="Загрузить файл"/>

                        <input
                            type="file"
                            name="pdf"
                            onInput={event => setPdf(prev => {
                                const {target} = event
                                return [...new Set([...prev, [...target.files].map(f => f.name)].flat())]
                            })}
                            accept='application/pdf'
                            multiple
                        />
                    </label>
                    <div className='create-form__input-file' style={{cursor: 'default'}}>
                        {
                            pdf.length !== 0
                                ?
                                pdf.map((f, i) =>
                                    <span
                                        key={getRandomKey()}
                                        onClick={() => setPdf(prev => prev.filter((_, I) => i !== I))}
                                        className='delete-file'
                                    >
                                        {f}
                                    </span>)
                                :
                                <>
                                    PDF файлы
                                </>
                        }
                    </div>
                </div>
                <div className='create-form__input-file' style={{cursor: 'default'}}>
                    <label style={{cursor: 'pointer'}}>
                        <img src={`${config.clientUrl}/${theme}-images/audio.png`} alt="Загрузить файл"/>

                        <input
                            type="file"
                            name="audio"
                            onInput={event => setAudio(prev => {
                                const {target} = event

                                return [...new Set([...prev, [...target.files].map(f => f.name)].flat())]
                            })}
                            accept={['audio/ogg', 'audio/mp3']}
                            multiple
                        />
                    </label>
                    <div className='create-form__input-file' style={{cursor: 'default'}}>
                        {
                            audio.length !== 0
                                ?
                                audio.map((f, i) =>
                                    <span
                                        key={getRandomKey()}
                                        onClick={() => setAudio(prev => prev.filter((_, I) => i !== I))}
                                        className='delete-file'
                                    >
                                        {f}
                                    </span>)
                                :
                                <>
                                    Audio файлы
                                </>
                        }
                    </div>
                </div>
                <div className='create-form__border create-form__border_course' style={{marginTop: 20}}>
                <div className='add create-form__add'>
                    <p className='add-text'>Добавить текстовую информацию</p>
                    <button className='add-btn' type='button' onClick={() => setTextInfo(prev => [...prev, {text: '', title: '', image: ''}])}></button>
                </div>
                {textInfo.map(({title, text, image}, i) => (
                    <div className='create-form__timecode' style={{position: 'relative', marginTop: 30}}>
                        <input
                            className='create-form__input'
                            type="text"
                            name="title"
                            onChange={({target}) => setTextInfo(prev => {
                                const next = [...prev]
                                next[i].title = target.value
                                return next
                            })
                            }
                            placeholder='Заголовок'
                            value={title}
                        />
                        <textarea
                            className='create-form__textarea'
                            type="text"
                            name="text"
                            onChange={({target}) => setTextInfo(prev => {
                                const next = [...prev]
                                next[i].text = target.value
                                return next
                            })
                            }
                            placeholder='Текст'
                            value={text}
                        />
                        <div className='create-form__input-file'>
                            <label style={{cursor: 'pointer'}}>
                                <img src={`${config.clientUrl}/${theme}-images/image.png`} alt="Загрузить файл"/>
                                <input
                                    type="file"
                                    name="image"
                                    onChange={event => setTextInfo(prev => {
                                        const {target} = event
                                        const file = [...target.files].map(f => f.name)[0]
                                        const next = [...prev]
                                        next[i].image = file
                                        return next
                                    })}
                                    accept='image/*'
                                />
                            </label>
                            <div style={{cursor: 'default'}} className='create-form__input-file'>
                                {
                                    image
                                        ?
                                        <span
                                            key={getRandomKey()}
                                            onClick={() => setTextInfo(prev => {
                                                const next = [...prev]
                                                next[i].image = ''
                                                return next
                                            })}
                                            className='delete-file'
                                        >
                                            {image}
                                        </span>
                                        :
                                        <>
                                            Картинка
                                        </>
                                }
                            </div>
                    </div>
                        <button className='delete-field-btn' type='button' style={{top: 'calc((100% + 26px) / 2)'}} onClick={() => setTextInfo(prev => prev.filter((_, I) => i !== I))} data-name='prices' data-index={index}></button>
                    </div>
                    ))}
                </div>
                <button disabled={disabled} className='create-form__button' type='submit' style={{alignSelf: 'center', height: '5.5rem', borderRadius: '50px'}}>Сохранить изменения</button>
            </form>
        </div>
    );
}

export default EditLessonPage
