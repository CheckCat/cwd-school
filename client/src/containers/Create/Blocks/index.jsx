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
		<div className='create-form__border create-form__block'>
			<input
				className='create-form__input'
				type="text"
				name="keyword"
				value={form.keyword}
				onChange={changeHandler}
				placeholder='Ключевое слово блока (gloss)'
				required/>
			<input
				className='create-form__input'
				type="text"
				name="title"
				value={form.title}
				onChange={changeHandler}
				placeholder='Заголовок блока (Глоссарий)'
				required/>
			<div className='add create-form__add'>
				<p className='add-text'>Добавить урок</p>
				<button className='add-btn' type='button' onClick={createLesson}></button>
			</div>
			{lessons}
		</div>
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