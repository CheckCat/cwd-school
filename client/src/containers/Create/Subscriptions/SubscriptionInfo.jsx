import React, {memo} from 'react'
import {fillSubscriptionInfo} from "../../../redux/actions/create.actions";
import {connect} from "react-redux";

const SubscriptionInfo = memo(({props: {indexSubscriptionInfo}, form, fillSubscriptionInfo}) => {
	form = form[indexSubscriptionInfo]
	
	const changeHandler = ({target: {value}}) => {
		fillSubscriptionInfo(value, indexSubscriptionInfo)
	}
	
	return (
		<>
			<input
				className='create-form__input'
				type="text"
				name="description"
				value={form.text}
				placeholder='Входящее в курс (Более 10 уроков с видео и...)'
				onChange={changeHandler}
			/>
		</>
	);
})

const mapStateToProps = ({createForm}) => ({
	form: createForm.subscriptions.description
})

const mapDispatchToProps = {
	fillSubscriptionInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionInfo)