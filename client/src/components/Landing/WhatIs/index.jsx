import React from 'react';
import './index.css'

const WhatIs = () => {
	return (
		<section className='what-is'>
			<h2 className='what-is__title'>Что такое криптовалюта?</h2>
			<div className="what-is__wrapper">
				<p className="what-is__text">
					Криптовалюта похожа на цифровую форму наличных денег.
				</p>
			</div>
			<div className="what-is__wrapper">
				<p className="what-is__text">
					Поскольку криптовалюта имеет цифровую форму, ее также можно отправить
					друзьям и родственникам в любую точку мира.
				</p>
			</div>
			<div className="what-is__wrapper">
				<p className="what-is__text what-is__text_green">
					Прямо как PayPal или банковские переводы, да?
				</p>
				<p className="what-is__text what-is__text_green">
					Ну, почти. Только намного интереснее!
				</p>
			</div>
			<div className="what-is__wrapper">
				<p className="what-is__text">
					Дело в том, что все традиционные шлюзы для онлайн-платежей принадлежат каким-либо организациям.
					Они предоставляют сервис для хранения и перевода средств, собирают ваши данные.
					Также это очень большой бизнес - они зарабатывают на вас, взимая комиссии за переводы
					(за большие - большие комиссии, за небольшие - меньше, хотя работу они выполняют одну и ту же).
				</p>
			</div>
			<div className="what-is__wrapper">
				<p className="what-is__text">
					В случае с криптовалютами вы можете воспользоваться бесплатным программным обеспечением
					для прямой отправки средств другим пользователям, без посредников.
				</p>
				<p className="what-is__text">
					Вам, вашим друзьям и тысяче других людей не нужна организация. Вы сами себе банк!
				</p>
			</div>
			<div className="what-is__container">
				<h3 className='what-is__container-title'>Откуда взялось название «Криптовалюта»?</h3>
				<div className='what-is__text-container'>
					<p className="what-is__text">
						Термин криптовалюта является комбинацией слов криптография
						и валюта. Криптография обеспечивает защиту наших средств
						от кражи с помощью шифрования.
					</p>
					<p className="what-is__text">
						Итак, эта чудесная виртуальная валюта никому не принадлежит
						и защищена шифрованием. Но зачем она вам, если вы уже пользуетесь
						приложениями для быстрой оплаты?
					</p>
				</div>
			</div>
			<div className="what-is__wrapper">
				<p className="what-is__text">
					Используя инструменты представленные на платформе CWD.GLOBAL вы можете
					не просто отправлять криптовалюту друзьям или родственникам,
					но и зарабатывать и приумножать свои средства.
				</p>
			</div>
		</section>
	);
}

export default WhatIs;