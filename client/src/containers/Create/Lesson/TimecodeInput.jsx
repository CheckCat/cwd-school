import React, {memo} from 'react'
import {fillTimecode} from "../../../redux/actions/create.actions";
import {connect} from "react-redux";

const TimecodeInput = memo(({props: {indexBlock, indexLesson, indexTimecode}, form, fillTimecode}) => {
	form = form[indexBlock].lessons[indexLesson].timecodes[indexTimecode]
	
	const changeHandler = ({target: {name, value}}) => {
		fillTimecode(name, value, indexBlock, indexLesson, indexTimecode)
	}
	
	return (
		<div className='create-form__timecode'>
			<input
				className='create-form__input'
				type="text"
				name="time"
				onChange={changeHandler}
				placeholder='Время таймкода (02:05)'
				value={form.time}
			/>
			<input
				className='create-form__input'
				type="text"
				name="description"
				onChange={changeHandler}
				placeholder='Описание таймкода (Виды криптовалюты)'
				value={form.text}
			/>
		</div>
	)
})

const mapStateToProps = ({createForm}) => ({
	form: createForm.blocks
})

const mapDispatchToProps = {
	fillTimecode
}

export default connect(mapStateToProps, mapDispatchToProps)(TimecodeInput)
