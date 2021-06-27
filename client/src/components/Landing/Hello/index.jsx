import React from 'react';
import {Link} from "react-router-dom";
import './index.css'

const Hello = ({isAuthenticated, theme}) => {
	return (
		<section className="hello">
			<h2 className='hello__title'>Привет</h2>
			<div className="hello__wrapper">
				<div className="hello__descriptions">
					<p className="hello__description">
						Добро пожаловать в CrowdSkills! Здесь вы узнаете о возможностях
						криптовалюты и технологии блокчейн.
					</p>
					<p className="hello__description">
						Мы знаем, как трудно приходится новичкам. Это руководство постепенно
						познакомит вас с ключевыми идеями, необходимыми для успешного
						старта в мире технологий.
					</p>
				</div>
				<img className='hello__image' src={`${theme}-images/robot.png`} alt="Робот"/>
			</div>
			{!isAuthenticated && <div className="hello__addition">
				Если вы на сайте впервые вам необходимо авторизироваться.
			</div>}
			<Link className='btn-continue hello__btn-continue'
						to={isAuthenticated ? '/buy' : '/auth'}>{isAuthenticated ? 'Приобрести' : 'Авторизоваться'}</Link>
		</section>
	);
}

export default Hello;