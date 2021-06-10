import React, {memo} from 'react'
import {fillSubscriptionInfo, fillSubscriptionPrice} from "../../../redux/actions/create.actions";
import {connect} from "react-redux";

const SubscriptionInfo = memo(({props: {indexSubscriptionInfo}, form, fillSubscriptionInfo}) => {
	form = form[indexSubscriptionInfo]
	
	const changeHandler = ({target: {value}}) => {
		fillSubscriptionInfo(value, indexSubscriptionInfo)
	}
	
	return (
		<>
			<label className='auth-form__label'>
				Текст подписки
				<input
					className='auth-form__input'
					type="text"
					name="description"
					value={form.text}
					onChange={changeHandler}
				/>
			</label>
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