import React, {useState} from 'react';
import './index.css'
import useHttp from "../../hooks/http.hook";
import config from "../../config";

const Promo = ({token, theme}) => {
	const [btnIsOpen, setBtnIsOpen] = useState(false)
	const [promoValue, setPromoValue] = useState('')
	const request = useHttp()

	const changeHandler = ({target}) => {
		if (target.value.length !== 0) {
			setBtnIsOpen(true)
		} else {
			setBtnIsOpen(false)
		}
		setPromoValue(target.value.trim().toLowerCase())
	}

	const clickHandler = async () => {
		try {
			const data = await request(`${config.baseUrl}/api/promo`, 'POST', {promocode: promoValue},
				{Authorization: `Bearer ${token}`})
		} catch (e) {
		}
	}

	return (
		<div className='promo'>
			<div className='promo__input-wrapper'>
				<div className='promo__input-icon promo__input-icon_promo'>
					<input className='promo__input' onChange={changeHandler} type="text" placeholder='Ваш промокод'
								 value={promoValue}/>
					{btnIsOpen &&
					<input type='image' src={`${config.clientUrl}/${theme}-images/success.svg`} onClick={clickHandler} className='promo__btn' alt='Отправить'/>}
				</div>
			</div>
		</div>
	);
}

export default Promo;
