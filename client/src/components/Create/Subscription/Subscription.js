import React, {useContext, useEffect} from 'react'
import {CreateContext} from "../../../context/CreateContext";

export const Subscription = ({subscriptionIndex}) => {
	const {form, setForm} = useContext(CreateContext)
	
	// useEffect(() => {
	//   console.log('Subscription', subscriptionIndex, form.subscriptions)
	//   if (duration) {
	//     setForm(prev => {
	//       prev.subscriptions[subscriptionIndex].duration = duration
	//       return prev
	//     })
	//   }
	// }, [])
	useEffect(() => {
		return () => console.log('YMER PODPIS')
	})
	
	const changeHandler = ev => {
		setForm(prev => {
			prev.subscriptions[subscriptionIndex][ev.target.name] = ev.target.value
			return prev
		})
	}
	return (
		<>
			{console.log(form.subscriptions, subscriptionIndex)}
			
			<label className='auth-form__label'>
				Количество месяцев
				<input
					className='auth-form__input'
					type="number"
					name="duration"
					value={form.subscriptions[subscriptionIndex].duration}
					onChange={changeHandler}
				/>
			</label>
			<label className='auth-form__label'>
				Цена
				<input
					className='auth-form__input'
					type="number"
					name="price"
					value={form.subscriptions[subscriptionIndex].price}
					onChange={changeHandler}
				/>
			</label>
		</>
	);
}