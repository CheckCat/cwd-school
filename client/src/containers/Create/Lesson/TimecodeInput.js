import React, {memo} from 'react'
import {fillTimecode} from "../../../redux/actions/create.actions";
import {connect} from "react-redux";

const TimecodeInput = memo(({props: {indexBlock, indexLesson, indexTimecode}, form, fillTimecode}) => {
	form = form[indexBlock].lessons[indexLesson].timecodes[indexTimecode]
	
	const changeHandler = ({target: {name, value}}) => {
		fillTimecode(name, value, indexBlock, indexLesson, indexTimecode)
	}
	
	return (
		<>
			<label className='auth-form__label'>
				ВРЕМЯ ТАЙМКОДА
				<input
					className='auth-form__input'
					type="text"
					name="time"
					onChange={changeHandler}
					value={form.time}
				/>
			</label>
			<label className='auth-form__label'>
				ОПИСАНИЕ ТАЙМКОДА
				<input
					className='auth-form__input'
					type="text"
					name="description"
					onChange={changeHandler}
					value={form.text}
				/>
			</label>
		</>
	)
})

const mapStateToProps = ({createForm}) => ({
	form: createForm.blocks
})

const mapDispatchToProps = {
	fillTimecode
}

export default connect(mapStateToProps, mapDispatchToProps)(TimecodeInput)
