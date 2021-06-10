import React, {useEffect, useState} from 'react';
import useHttp from "../../hooks/http.hook";
import {useHistory, useParams} from "react-router-dom";
import {Loader} from "../../components/Loader";
import {connect} from 'react-redux'
import config from "../../config";

const LessonPage = ({courseKey, token, isLoading}) => {
	const request = useHttp()
	const {blockKey, lessonKey} = useParams()
	const {location: {pathname}} = useHistory()
	const [lessonData, setLessonData] = useState({audio: [], pdf: [], text: [], timecodes: []})
	const [audioIsOpen, setAudioIsOpen] = useState(false)
	const [frameIsOpen, setFrameIsOpen] = useState(false)
	
	const clickHandler = async ({target}) => {
		const {value, type} = target.dataset
		try {
			const blob = await request(`${config.baseUrl}/${value}`, 'GET', null, {Authorization: `Bearer ${token}`}, 'GETFILES')
			const url = window.URL.createObjectURL(blob)
			switch (type) {
				case 'audio':
					setAudioIsOpen(true)
					document.querySelector('audio').src = url
					break
				case 'pdf':
					setFrameIsOpen(true)
					document.querySelector('iframe').src = url
					break
				default:
					return
			}
		} catch (e) {
			console.log(e)
		}
	}
	
	useEffect(() => {
		let isMounted = true
		const fetchData = async () => {
			try {
				const data = await request(`${config.baseUrl}/api/course/${courseKey}/${blockKey}/${lessonKey}`, 'GET', null, {Authorization: `Bearer ${token}`})
				isMounted && setLessonData(data.lesson)
			} catch (e) {
				console.log(e)
			}
		}
		fetchData()
		return () => {
			isMounted = false
		}
	}, [])
	return (
		<>
			{
				isLoading
					?
					<Loader/>
					:
					<>
						{/*<Vimeo videoId={lessonData.video} controls={true}/>*/}
						{lessonData.video && <ul>
							{lessonData.timecodes.map(({time, description}) => {
								return (
									<li>
										<ul>
											<li>{time}</li>
											<li>{description}</li>
										</ul>
									</li>
								)
							})}
						</ul>}
						{lessonData.audio.map(url => {
							return (
								<button onClick={clickHandler} data-value={url} data-type='audio'>Аудио</button>
							)
						})}
						{lessonData.pdf.map(url => {
							return (
								<button onClick={clickHandler} data-value={url} data-type='pdf'>PDF</button>
							)
						})}
						{audioIsOpen && <audio controls={true}></audio>}
						{frameIsOpen && <iframe/>}
						{lessonData.text.map(({title, text, image}) => {
							return (
								<>
									{title && <h3>{title}</h3>}
									{text && <p>{text}</p>}
									{image && <img src={`${config.baseUrl}/${image}`} alt="Картинка"/>}
								</>
							)
						})
						}
					</>
			}
		</>
	)
}


const mapStateToProps = ({authData, addition}) => (
	{
		token: authData.token,
		isLoading: addition.isLoading
	}
)

export default connect(mapStateToProps)(LessonPage);