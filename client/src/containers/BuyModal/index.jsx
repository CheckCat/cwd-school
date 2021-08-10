import React, {useEffect, useMemo, useRef, useState} from 'react';
import {connect} from "react-redux";
import config from "../../config";
import getRandomKey from "../../utils/getRandomKey";
import './index.css'
import {toggleBuyModalWindow} from "../../redux/actions/course.actions";

const BuyModal = ({data: {title, subscriptionPrices}, toggleBuyModalWindow}) => {
	// eslint-disable-next-line
	const [_, setCurrent] = useState()
	const link = useRef()

	useEffect(() => {
		const initial = document.querySelectorAll('.subs-modal__elem')[0]
		initial.classList.add('subs-modal__elem_active')
		link.current.href = `${config.paymentUrlTemplate}${initial.dataset.value}`
		setCurrent(initial)
	}, [subscriptionPrices, setCurrent])

	const clickHandler = ({target}) => {
		setCurrent(prev => {
			if(target === prev) return prev
			if(target.classList.contains('subs-modal__text')) target = target.parentElement
			prev.classList.remove('subs-modal__elem_active')
			target.classList.add('subs-modal__elem_active')
			link.current.href = `${config.paymentUrlTemplate}${target.dataset.value}`
			return target
		})
	}

	const getNoun = (number, one, two, five) => {
		let n = Math.abs(number);
		n %= 100;
		if (n >= 5 && n <= 20) {
			return five;
		}
		n %= 10;
		if (n === 1) {
			return one;
		}
		if (n >= 2 && n <= 4) {
			return two;
		}
		return five;
	}

	const paymentList = useMemo(() => subscriptionPrices.map(({price, duration}) => {
		return (<li key={getRandomKey()} onClick={clickHandler} data-value={price} className='subs-modal__elem'>
			<p className='subs-modal__text'>{duration} {getNoun(duration, 'Месяц', 'Месяца', 'Месяцев')}</p>
			<p className='subs-modal__text'>{price} CWD</p>
		</li>)
	}), [subscriptionPrices])

	return (
		<div className='disabled'>
			<div className='container subs-modal'>
				<h2 className='subs-modal__title'>{title}</h2>
				<h3 className='subs-modal__subtitle'>Выберите период подписки</h3>
				<ul className='subs-modal__list'>
					{paymentList}
				</ul>
				<button onClick={toggleBuyModalWindow} className='subs-modal__close-btn'></button>
				<p className='abc' style={{fontSize: '1.8rem', textAlign: 'center'}}>
					После оплаты подписки на платформе CWD.Global обновите страницу этого сайта.
					После обновления страницы в течение 1-2 минут
					курс появится в вашем личном кабинете
				</p>
				<a ref={link} className='subs-modal__continue-btn' href='/' target='_blank'>Продолжить</a>
			</div>
		</div>
	)
}

const mapStateToProps = ({commonCoursesData: {durationInfo, currentCourse}}) => {
	return {data: durationInfo.find(({title}) => title === currentCourse)}
}

const mapDispatchToProps = ({toggleBuyModalWindow})

export default connect(mapStateToProps, mapDispatchToProps)(BuyModal);
