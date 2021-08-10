import React, {useEffect, useRef, useState} from 'react';
import useHttp from "../../hooks/http.hook";
import {Link, useHistory, useParams} from "react-router-dom";
import Vimeo from "react-vimeo";
import Loader from "../../components/Loader";
import config from "../../config";
import getRandomKey from "../../utils/getRandomKey";
import Timecodes from "./Timecodes";
import AudioPlayer from 'react-modular-audio-player'
import './index.css'
import {connect} from "react-redux";

const LessonPage = ({token, isLoading, theme}) => {
	const request = useHttp()
	const {location: {pathname}} = useHistory()
	const {courseKey, blockKey, index: lessonKey} = useParams()
	const history = useHistory()
	const blockUrl = `courses/${courseKey}/${blockKey}`
	const [initialState, setInitialState] = useState([])
	const [lessonData, setLessonData] = useState({audio: [''], pdf: [], text: [{title: '', text: '', image: ''}], timecodes: [], video: ''})
	const [loaderOn, setLoaderOn] = useState(true)
	const [images, setImages] = useState([])
	const [currentPdf, setCurrentPdf] = useState('')
	const [audioUrls, setAudioUrls] = useState([])
	const [pdfUrls, setPdfUrls] = useState([''])
	const [audioIsOpen, setAudioIsOpen] = useState(false)
	const [frameIsOpen, setFrameIsOpen] = useState(false)
	const [imageIsOpen, setImageIsOpen] = useState(false)
	const [prevUrl, setPrevUrl] = useState('')
	const [nextUrl, setNextUrl] = useState('')
	const audioEl = useRef()
	let rearrangedPlayer = [
		{
			className: "tier-top",
			style: {margin: "0.3rem"},
			innerComponents: [
				{
					type: "play",
					style: {width: "fit-content"}
				},
				{
					type: "rewind",
					style: {display: "none"}
				},
				{
					type: "forward",
					style: {display: "none"}
				},
				{
					type: "volume"
				},
				{
					type: "time",
					style: {width: "fit-content"}
				},
				{
					type: "seek"
				}
			]
		}
	]

	// const ctx = new AudioContext()
	//
	// const playAudio = (audio) => {
	// 	const play = ctx.createBufferSource()
	// 	play.buffer = audio
	// 	play.connect(ctx.destination)
	// 	play.start(ctx.currentTime)
	// }

	const clickHandler = async ({target}) => {
		const {index, type} = target.dataset
		try {
			switch (type) {
				case 'audio':
					if (window.screen.width > 1024) {
						setAudioIsOpen(true)
					} else {
						const downloadBtn = document.createElement('a')
						downloadBtn.href = lessonData.audio[0]
						downloadBtn.download = `${courseKey}-${initialState.audio[0].split('/').pop()}`
						document.querySelector('html').append(downloadBtn)
						downloadBtn.click()
						downloadBtn.remove()
					}
					break
				case 'pdf':
					if (window.screen.width > 1024) {
						setFrameIsOpen(true)
						setCurrentPdf(lessonData.pdf[index])
					} else {
						const downloadBtn = document.createElement('a')
						downloadBtn.href = lessonData.pdf[index]
						downloadBtn.download = `${courseKey}-${initialState.pdf[index].split('/').pop()}`
						document.querySelector('html').append(downloadBtn)
						downloadBtn.click()
						downloadBtn.remove()
					}
					break
				default:
					return
			}
		} catch (e) {
		}
	}

	const disableHandler = (event) => {
		const notDisabled = event.target.href.split('/').pop()
		if (!notDisabled) return event.preventDefault()
		window.scrollTo(0,0)
	}

	useEffect(() => {
		const fetchData = async () => {
			let isMount = true
			try {
				if(isMount) {
				const data = await request(`${config.baseUrl}/api/course/${courseKey}/${blockKey}/${lessonKey}`, 'GET', null, {Authorization: `Bearer ${token}`})
				setFrameIsOpen(false)
					setAudioIsOpen(false)
				const indexLesson = pathname.split('/').pop()
				const prevLessonUrl = indexLesson - 1 === 0 ? null : `/${blockUrl}/${indexLesson - 1}`
				const nextLessonUrl = +indexLesson === data.lessonsLength ? null : `/${blockUrl}/${+indexLesson + 1}`
				setPrevUrl(prevLessonUrl)
				setNextUrl(nextLessonUrl)
				const {title, description, video, timecodes, audio, pdf, text} = data.lesson
				setInitialState({title, description, video, timecodes, audio, pdf, text})
				setLessonData({title, description, video, timecodes, audio: audio.map(() => ''), pdf: pdf.map(() => ''), text: text.map(({title, text}) => ({title, text, image: ''}))})
					const fetchFile = async (f) => {
						let count = 0;
						const fetchFileClosure = async () => {
							try {
								const response = await fetch(`${config.baseUrl}/${f}`,{method: 'GET', body: null, headers: {Authorization: `Bearer ${token}`}})
								const blob = await response.blob()
								const url = window.URL.createObjectURL(blob)
								return url
							} catch(e) {
								console.error(e)
								count++
								return count > 5 ? '' : fetchFileClosure()
							}
						}
						const response = await fetchFileClosure()
						return response
					}

					const audioUrls = await Promise.all(data.lesson.audio.map(fetchFile))
					setLessonData(prev => {
						const next = {...prev}
						next.audio = audioUrls
						return next
					})

				const pdfUrls = await Promise.all(data.lesson.pdf.map(fetchFile))
				setLessonData(prev => {
					const next = {...prev}
					next.pdf = pdfUrls
					return next
				})
				const imageUrls = await Promise.all(data.lesson.text.map(async ({image}, i) => ({image: image ? await fetchFile(image) : '', i})))
				setLessonData(prev => {
					const next = {...prev}
					next.text = next.text.map(({text, title}, index) => ({text, title, image: imageUrls.find(({i}) => i === index)?.image}))
					return next
				})
				setLoaderOn(false)
				}
				return () => {
					isMount = false
				}
			} catch (e) {
				history.goBack()
			}
		}
		fetchData()
	}, [blockUrl, pathname, blockKey, courseKey, lessonKey, request, token, setPdfUrls, setAudioUrls, setImageIsOpen, setInitialState])


	return (
		<div className='container'>
			{
				(isLoading || loaderOn)
					?
					<Loader/>
					:
					<>
						<Link onClick={() => window.scrollTo(0,0)} style={{cursor: 'pointer'}} className='switch switch_back switch_back-to-block'
							  to={`/${blockUrl}`}>Назад</Link>
						<div className='lesson__title-wrapper'>
							<h1 className='lesson__header'>{lessonData.title}</h1>
							<h2 className='lesson__description'>{lessonData.description}</h2>
						</div>
						<div className='video-wrapper'>
							{lessonData.video &&
							<iframe className='vimeo-wrapper' src={`https://player.vimeo.com/video/${lessonData.video}`}
									frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen/>}
							{(lessonData.video && lessonData.timecodes.length !== 0) &&
							<Timecodes timecodes={lessonData.timecodes}/>}
						</div>
						{
							(lessonData.audio.length !== 0 || lessonData.pdf.length !== 0) &&
							<div className='lesson__files'>
								<h3 className='lesson__files-title'>Дополнительные материалы к уроку</h3>
								<div className='lesson__files-buttons'>
									Доступно:
									{lessonData.audio.length !== 0 && !lessonData.audio.find(f => f === '') && <button
										className='lesson__files-elem lesson__files-elem_audio'
										key={getRandomKey()}
										onClick={clickHandler}
										data-type='audio'>Аудио-файл</button>}
									{lessonData.pdf.map((_, index) => lessonData.pdf[index] &&  <button
										className='lesson__files-elem lesson__files-elem_pdf'
										key={getRandomKey()}
										onClick={clickHandler} data-index={index}
										data-type='pdf'>{lessonData.pdf.length === 1 ? 'PDF-файл' : `${index + 1} PDF-файл`}</button>)}
								</div>
							</div>
						}
						{audioIsOpen && lessonData.audio.length !== 0 && (
							<AudioPlayer
								rearrange={rearrangedPlayer}
								audioFiles={[...lessonData.audio.map(f => ({src: f}))]}
								// audioFiles={[...audioUrls.map(({url}) => ({src: url}))]}
								playerWidth="40rem"
								fontSize="2rem"
								iconSize="3rem"
							/>
						)
						}
						{frameIsOpen && <iframe className='lesson__pdf' src={currentPdf} title={getRandomKey()}/>}
						{frameIsOpen &&
						<button className='lesson__pdf-btn-close' onClick={() => setFrameIsOpen(false)}></button>}
						{/*{images.map(({title, text, image}) => (*/}
						{lessonData.text.map(({title, text, image}) => (
								<div key={getRandomKey()}>
									{title && <h4 className='lesson__title'>{title}</h4>}
									{text && <p className='lesson__text'>{text}</p>}
									{image && <img className='lesson__image' src={image} alt='Картинка'/>}
								</div>
							)
						)}
						<div className='switch-wrapper'>
							<Link className={prevUrl ? 'switch switch_back' : 'switch switch_back switch_disabled'}
								  to={prevUrl || ''}
								  onClick={disableHandler}>Предыдущий урок</Link>
							<Link className={nextUrl ? 'switch switch_next' : 'switch switch_next switch_disabled'}
								  to={nextUrl || ''}
								  onClick={disableHandler}>Следующий урок</Link>
						</div>
					</>
			}
		</div>
	)
}

const mapStateToProps = ({authData: {token, theme}, addition: {isLoading}}) => ({token, theme, isLoading})

export default connect(mapStateToProps)(LessonPage);
