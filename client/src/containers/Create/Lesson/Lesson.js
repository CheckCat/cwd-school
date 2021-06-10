import React, {useEffect, useState} from 'react'
import TextInput from './TextInput'
import TimecodeInput from './TimecodeInput'
import getRandomKey from '../../../utils/getRandomKey'
import {fillLesson, fillText, fillTimecode} from "../../../redux/actions/create.actions"
import {connect} from "react-redux";

const Lesson = ({props: {indexBlock, indexLesson}, form, fillLesson, fillTimecode, fillText}) => {
	form = form[indexBlock].lessons[indexLesson]
	
	const [timecodes, setTimecodes] = useState([])
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
			<label className='auth-form__label'>
				Заголовок урока
				<input
					className='auth-form__input'
					type="text"
					name="title"
					value={form.title}
					onChange={changeHandler}
				/>
			</label>
			<label className='auth-form__label'>
        Описание урока
				<input
					className='auth-form__input'
					type="text"
					name="description"
					value={form.description}
					onChange={changeHandler}
				/>
			</label>
			<label className='auth-form__label'>
				Видео УРОКА
				<input
					className='auth-form__input'
					type="text"
					name="video"
					value={form.video}
					onChange={changeHandler}
				/>
			</label>
			<button type='button' onClick={() => createField('timecodes')}>+ timecode</button>
			{timecodes}
			<label className='auth-form__label'>
				PDF УРОКА
				<input
					type="file"
					name="pdf"
					onChange={fileHandler}
					accept='application/pdf'
					multiple
				/>
			</label>
			<label className='auth-form__label'>
				Audio УРОКА
				<input
					type="file"
					name="audio"
					onChange={fileHandler}
					accept='audio/*'
					multiple
				/>
			</label>
			<button type='button' onClick={() => createField('text')}>+ text</button>
			{text}
		</>
	);
}

const mapStateToProps = ({createForm}) => ({
	form: createForm.blocks
})

const mapDispatchToProps = {
	fillLesson,
	fillTimecode,
	fillText
}

export default connect(mapStateToProps, mapDispatchToProps)(Lesson)