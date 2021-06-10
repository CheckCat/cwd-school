import React, {memo} from 'react'
import {fillText} from "../../../redux/actions/create.actions";
import {connect} from "react-redux";

const TextInput = memo(({props: {indexBlock, indexLesson, indexText}, form, fillText}) => {
	form = form[indexBlock].lessons[indexLesson].text[indexText]
	
	const changeHandler = ({target: {name, value}}) => {
		fillText(name, value, indexBlock, indexLesson, indexText)
	}
	
	const fileHandler = ({target: {name, files}}) => {
		const file = [...files].map(f => f.name)[0]
		fillText(name, file, indexBlock, indexLesson, indexText)
	}
	
	return (
		<>
			<label className='auth-form__label'>
				ЗАГОЛОВОК ТЕКСТА
				<input
					className='auth-form__input'
					type="text"
					name="title"
					onChange={changeHandler}
					value={form.title}
				/>
			</label>
			<label className='auth-form__label'>
				ТЕКСТ
				<input
					className='auth-form__input'
					type="text"
					name="text"
					onChange={changeHandler}
					value={form.text}
				/>
			</label>
			<label className='auth-form__label'>
				КАРТИНКА
				<input
					type="file"
					name="image"
					onChange={fileHandler}
					accept='image/*'
				/>
			</label>
		</>
	)
})

const mapStateToProps = ({createForm}) => ({
	form: createForm.blocks
})

const mapDispatchToProps = {
	fillText
}

export default connect(mapStateToProps, mapDispatchToProps)(TextInput)
