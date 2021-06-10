import React, {memo, useEffect, useState} from 'react'
import Lesson from '../Lesson/Lesson'
import getRandomKey from '../../../utils/getRandomKey'
import {connect} from "react-redux";
import {fillBlock, fillLesson} from "../../../redux/actions/create.actions"

const Block = memo(({props: {indexBlock}, form, fillBlock, fillLesson}) => {
	form = form[indexBlock]
	
	const [lessons, setLessons] = useState([])
	useEffect(() => {
		setLessons(prev => [...prev, <Lesson key={getRandomKey()} props={{indexBlock, indexLesson: 0}}/>])
	}, [indexBlock])
	
	const changeHandler = ({target: {name, value}}) => {
		fillBlock(name, value, indexBlock)
	}
	
	const createLesson = () => {
		fillLesson(null, null, indexBlock, lessons.length)
		setLessons(prev => [...prev, <Lesson key={getRandomKey()} props={{indexBlock, indexLesson: prev.length}}/>])
	}
	
	return (
		<>
			<label className='auth-form__label'>
				Ключевое слово БЛОКА
				<input
					className='auth-form__input'
					type="text"
					name="keyword"
					value={form.keyword}
					onChange={changeHandler}
					required/>
			</label>
			<label className='auth-form__label'>
				Заголовок БЛОКА
				<input
					className='auth-form__input'
					type="text"
					name="title"
					value={form.title}
					onChange={changeHandler}
					required/>
			</label>
			<button type='button' onClick={createLesson}>+ lesson</button>
			{lessons}
		</>
	);
})

const mapStateToProps = ({createForm}) => ({
	form: createForm.blocks
})

const mapDispatchToProps = {
	fillBlock,
	fillLesson
}

export default connect(mapStateToProps, mapDispatchToProps)(Block)