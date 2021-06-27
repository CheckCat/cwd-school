import React, {memo} from 'react'
import {fillSubscriptionPrice} from "../../../redux/actions/create.actions";
import {connect} from "react-redux";

const SubscriptionPrice = memo(({props: {indexSubscriptionPrice}, form, fillSubscriptionPrice}) => {
	form = form[indexSubscriptionPrice]
	
	const changeHandler = ({target: {name, value}}) => {
		fillSubscriptionPrice(name, value, indexSubscriptionPrice)
	}
	
	return (
		<div className='create-form__price'>
			<input
				className='create-form__input'
				type="number"
				name="duration"
				value={form.duration}
				placeholder='Количество месяцец подписки (3)'
				onChange={changeHandler}
			/>
			<input
				className='create-form__input'
				type="number"
				name="price"
				value={form.price}
				placeholder='Цена подписки в краудах (20)'
				onChange={changeHandler}
			/>
		</div>
	);
})

const mapStateToProps = ({createForm}) => ({
	form: createForm.subscriptions.prices
})

const mapDispatchToProps = {
	fillSubscriptionPrice
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionPrice)