import React, {useEffect, useState} from 'react';
import useHttp from "../../hooks/http.hook";
import {Link, useHistory, useParams} from "react-router-dom";
import Loader from "../../components/Loader";
import config from "../../config";
import getRandomKey from "../../utils/getRandomKey";
import Timecodes from "./Timecodes";
import './index.css'
import {connect} from "react-redux";

const LessonPage = ({courseKey, token, isLoading, theme}) => {
	const request = useHttp()
	const {blockKey, lessonKey} = useParams()
	const {location: {pathname}} = useHistory()
	const blockUrl = pathname.slice(0, -2)

	const [lessonData, setLessonData] = useState({audio: [], pdf: [], text: [], timecodes: []})
	const [images, setImages] = useState([])
	const [audioUrl, setAudioUrl] = useState('')
	const [pdfUrl, setPdfUrl] = useState('')
	const [audioIsOpen, setAudioIsOpen] = useState(false)
	const [frameIsOpen, setFrameIsOpen] = useState(false)
	const [prevUrl, setPrevUrl] = useState('')
	const [nextUrl, setNextUrl] = useState('')


	const clickHandler = async ({target}) => {
		const {value, type} = target.dataset
		try {
			const blob = await request(`${config.baseUrl}/${value}`, 'GET', null, {Authorization: `Bearer ${token}`}, 'GETFILES', true)
			const url = window.URL.createObjectURL(blob)
			switch (type) {
				case 'audio':
					setAudioUrl(url)
					setAudioIsOpen(true)
					break
				case 'pdf':
					setPdfUrl(url)
					setFrameIsOpen(true)
					break
				default:
					return
			}
		} catch (e) {
			console.log(e)
		}
	}

	const disableHandler = (event) => {
		let notDisabled = event.target.href.split('/')
		notDisabled = notDisabled[notDisabled.length - 1]
		if (!notDisabled) event.preventDefault()
	}

	useEffect(() => {
		let isMounted = true
		const fetchData = async () => {
			try {
				const data = await request(`${config.baseUrl}/api/course/${courseKey}/${blockKey}/${lessonKey}`, 'GET', null, {Authorization: `Bearer ${token}`})
				const indexLesson = pathname.slice(-1)
				const prevLessonUrl = (() => indexLesson - 1 === 0 ? null : `${blockUrl}/${indexLesson - 1}`)()
				const nextLessonUrl = (() => +indexLesson === data.lessonsLength ? null : `${blockUrl}/${indexLesson + 1}`)()
				setPrevUrl(prevLessonUrl)
				setNextUrl(nextLessonUrl)

				if (isMounted) {
					setImages(await Promise.all(data.lesson.text.map(async ({title, text, image}) => {
						const blob = await request(`${config.baseUrl}/${image}`, 'GET', null, {Authorization: `Bearer ${token}`}, 'GETFILES')
						const url = window.URL.createObjectURL(blob)
						return {image: url, text, title}
					})))
					setLessonData(data.lesson)
				}
			} catch (e) {
				console.log(e)
			}
		}
		fetchData()
		return () => {
			isMounted = false
		}
	}, [blockUrl, pathname, blockKey, courseKey, lessonKey, request, token])
	return (
		<>
			{
				isLoading
					?
					<Loader/>
					:
					<>
						<Link className='switch switch_back switch_back-to-block' to='/'>Назад</Link>
						<div className='lesson__title-wrapper'>
							<h1 className='lesson__header'>{lessonData.title}</h1>
							<h2 className='lesson__description'>{lessonData.description}</h2>
						</div>
						<div className='video-wrapper'>
							{/*<Vimeo videoId={lessonData.video} controls={true}/>*/}
							<div className='a'></div>
							{lessonData.video && <Timecodes timecodes={lessonData.timecodes}/>}
						</div>
						<div className='lesson__files'>
							<h3 className='lesson__files-title'>Дополнительные материалы к уроку</h3>
							<div className='lesson__files-buttons'>
								Доступно:
								{lessonData.audio.map((url, index) => <button className='lesson__files-elem lesson__files-elem_audio'
																															key={getRandomKey()}
																															onClick={clickHandler} data-value={url}
																															data-type='audio'>{lessonData.audio.length === 1 ? 'Аудио-файл' : `${index + 1} Аудио-файл`}</button>)}
								{lessonData.pdf.map((url, index) => <button className='lesson__files-elem lesson__files-elem_pdf'
																														key={getRandomKey()}
																														onClick={clickHandler} data-value={url}
																														data-type='pdf'>{lessonData.pdf.length === 1 ? 'PDF-файл' : `${index + 1} PDF-файл`}</button>)}
							</div>
						</div>
						{audioIsOpen && <audio className='lesson__audio' src={audioUrl} controls/>}
						{frameIsOpen && <iframe className='lesson__pdf' src={pdfUrl} title={getRandomKey()}/>}
						{frameIsOpen && <button className='lesson__pdf-btn-close' onClick={() => setFrameIsOpen(false)}></button>}
						{images.map(({title, text, image}) => (
								<div key={getRandomKey()}>
									{title && <h4 className='lesson__title'>{title}</h4>}
									{text && <p className='lesson__text'>{text}</p>}
									{image && <img className='lesson__image' src={image} alt='Картинка'/>}
								</div>
							)
						)}
						<div className='switch-wrapper'>
							<Link className={prevUrl ? 'switch switch_back' : 'switch switch_back switch_disabled'} to={prevUrl || ''}
										onClick={disableHandler}>Предыдущий урок</Link>
							<Link className={nextUrl ? 'switch switch_next' : 'switch switch_next switch_disabled'} to={nextUrl || ''}
										onClick={disableHandler}>Следующий урок</Link>
						</div>
					</>
			}
		</>
	)
}

const mapStateToProps = ({authData: {token, theme}, addition: {isLoading}}) => ({token, theme, isLoading})

export default connect(mapStateToProps)(LessonPage);
