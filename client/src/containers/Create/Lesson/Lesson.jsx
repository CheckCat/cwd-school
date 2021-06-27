import React, {useEffect, useState} from 'react'
import TextInput from './TextInput'
import TimecodeInput from './TimecodeInput'
import getRandomKey from '../../../utils/getRandomKey'
import {fillLesson, fillText, fillTimecode} from "../../../redux/actions/create.actions"
import {connect} from 'react-redux'

const Lesson = ({props: {indexBlock, indexLesson}, form, fillLesson, fillTimecode, fillText, theme}) => {
	form = form[indexBlock].lessons[indexLesson]
	
	const [timecodes, setTimecodes] = useState([])
	const [files, setFiles] = useState({})
	const [text, setText] = useState([])
	
	useEffect(() => {
		setTimecodes(prev => [...prev,
			<TimecodeInput key={getRandomKey()} props={{indexBlock, indexLesson, indexTimecode: 0}}/>])
		setText(prev => [...prev, <TextInput key={getRandomKey()} props={{indexBlock, indexLesson, indexText: 0}}/>])
	}, [indexBlock, indexLesson])
	
	const changeHandler = ({target: {name, value}}) => {
		fillLesson(name, value, indexBlock, indexLesson)
	}
	
	const fileHandler = ({target: {files, name}}) => {
		files = [...files].map(f => f.name)
		setFiles({[name]: files})
		fillLesson(name, files, indexBlock, indexLesson)
	}
	
	const createField = field => {
		switch (field) {
			case 'text':
				fillText(null, null, indexBlock, indexLesson, text.length)
				setText(prev => [...prev,
					<TextInput key={getRandomKey()} props={{indexBlock, indexLesson, indexText: prev.length}}/>])
				break
			case 'timecodes':
				fillTimecode(null, null, indexBlock, indexLesson, timecodes.length)
				setTimecodes(prev => [...prev,
					<TimecodeInput key={getRandomKey()} props={{indexBlock, indexLesson, indexTimecode: prev.length}}/>])
				break
			default:
				return
		}
	}
	
	return (
		<>
			<input
				className='create-form__input'
				type="text"
				name="title"
				value={form.title}
				placeholder='Заголовок урока (Что такое криптовалюта)'
				onChange={changeHandler}
			/>
			<input
				className='create-form__input'
				type="text"
				name="description"
				value={form.description}
				placeholder='Описание урока (Криптовалюта в нашей жизни...)'
				onChange={changeHandler}
			/>
			<input
				className='create-form__input'
				type="text"
				name="video"
				value={form.video}
				placeholder='ID ссылки на видео с Vimeo (42352323)'
				onChange={changeHandler}
			/>
			<div className='add create-form__add'>
				<p className='add-text'>Добавить таймкод</p>
				<button className='add-btn' type='button' onClick={() => createField('timecodes')}></button>
			</div>
			{timecodes}
			<label className='create-form__input-file'>
				<img src={`${theme}-images/pdf.png`} alt="Загрузить файл"/>
				{
					files.pdf
						?
						files.pdf.reduce((accum, f) => `${accum}, ${f}`)
						:
						<>
							PDF файлы
						</>
				}
				<input
					type="file"
					name="pdf"
					onChange={fileHandler}
					accept='application/pdf'
					multiple
				/>
			</label>
			<label className='create-form__input-file'>
				<img src={`${theme}-images/audio.png`} alt="Загрузить файл"/>
				{
					files.audio
						?
						files.audio.reduce((accum, f) => `${accum}, ${f}`)
						:
						<>
							Аудио файлы
						</>
				}
				<input
					type="file"
					name="audio"
					onChange={fileHandler}
					accept='audio/*'
					multiple
				/>
			</label>
			<div className='add create-form__add'>
				<p className='add-text'>Добавить текстовую информацию</p>
				<button className='add-btn' type='button' onClick={() => createField('text')}></button>
			</div>
			{text}
		</>
	);
}

const mapStateToProps = ({createForm, authData: {theme}}) => ({form: createForm.blocks, theme})
const mapDispatchToProps = {
	fillLesson,
	fillTimecode,
	fillText
}

export default connect(mapStateToProps, mapDispatchToProps)(Lesson)