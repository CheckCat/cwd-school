import React, {memo} from 'react'
import {fillSubscriptionPrice} from "../../../redux/actions/create.actions";
import {connect} from "react-redux";

const SubscriptionPrice = memo(({props: {indexSubscriptionPrice}, form, fillSubscriptionPrice}) => {
	form = form[indexSubscriptionPrice]
	
	const changeHandler = ({target: {name, value}}) => {
		fillSubscriptionPrice(name, value, indexSubscriptionPrice)
	}
	
	return (
		<>
			<label className='auth-form__label'>
				Количество месяцев
				<input
					className='auth-form__input'
					type="number"
					name="duration"
					value={form.duration}
					onChange={changeHandler}
				/>
			</label>
			<label className='auth-form__label'>
				Цена
				<input
					className='auth-form__input'
					type="number"
					name="price"
					value={form.price}
					onChange={changeHandler}
				/>
			</label>
		</>
	);
})

const mapStateToProps = ({createForm}) => ({
	form: createForm.subscriptions.prices
})

const mapDispatchToProps = {
	fillSubscriptionPrice
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionPrice)