import React, {memo, useState} from 'react'
import {fillText} from "../../../redux/actions/create.actions";
import {connect} from 'react-redux'

const TextInput = memo(({props: {indexBlock, indexLesson, indexText}, form, fillText, theme}) => {
		form = form[indexBlock].lessons[indexLesson].text[indexText]
		const [files, setFiles] = useState({})
		
		const changeHandler = ({target: {name, value}}) => {
			fillText(name, value, indexBlock, indexLesson, indexText)
		}
		
		const increaseHandler = ({target}) => {
			if (target.scrollTop > 0) {
				target.style.height = target.scrollHeight + "px";
			}
		}
		
		const fileHandler = ({target: {name, files}}) => {
			const file = [...files].map(f => f.name)[0]
			setFiles({[name]: file})
			fillText(name, file, indexBlock, indexLesson, indexText)
		}
		
		return (
			<div className='create-form__text'>
				<input
					className='create-form__input'
					type="text"
					name="title"
					onChange={changeHandler}
					placeholder='Заголовок текста (Криптовалюта)'
					value={form.title}
				/>
				<textarea
					className='create-form__textarea'
					name="text"
					onChange={event => {
						changeHandler(event);
						increaseHandler(event)
					}}
					placeholder='Текст (Криптовалюта - это...)'
					value={form.text}
				/>
				<label className='create-form__input-file'>
					<img src={`${theme}-images/image.png`} alt="Загрузить файл"/>
					{
						files.image
							?
							files.image
							:
							<>
								Изображение
							</>
					}
					<input
						type="file"
						name="image"
						onChange={fileHandler}
						accept='image/*'
					/>
				</label>
			</div>
		)
	}
)

const mapStateToProps = ({createForm, authData: {theme}}) => ({form: createForm.blocks, theme})

const mapDispatchToProps = {
	fillText
}

export default connect(mapStateToProps, mapDispatchToProps)(TextInput)
