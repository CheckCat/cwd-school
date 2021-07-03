import React, {useState} from 'react';
import getRandomKey from "../../utils/getRandomKey";
import './index.css'
import {Link} from "react-router-dom";
import {toggleBuyModalWindow} from "../../redux/actions/course.actions";
import {connect} from "react-redux";

const CourseInfo = props => {
	const {courseInfo: {title, subscriptionDescription}, isAuthenticated, toggleBuyModalWindow} = props
	const [isOpen, setIsOpen] = useState(props.isOpen)

	return (
		<li className='course-info' style={isOpen ? {} : (window.innerWidth <= 1550 && window.innerWidth > 650) ? {height: 270} :  window.innerWidth <= 650 ? window.innerWidth <= 490 ? window.innerWidth <= 450 ? {height: 225} : {height: 370} : {height: 320} : {height: 310}}>
			<h3 className='course-info__title'>{title}</h3>
			<div className="course-info__wrapper">
				<p className="course-info__text">Вам порекомендовали школу?</p>
				<p className="course-info__text course-info__text_green">Вы недавно на платформе?</p>
			</div>
			<div className="course-info__container">
				<div className="course-info__wrapper">
					<p className="course-info__text">Эта подписка для вас!</p>
				</div>
				<div className="course-info__wrapper">
					<p className="course-info__text course-info__text_green">Время подписки вы определяете сами.</p>
					<p className="course-info__text">
						Кому-то достаточно 1 месяца, чтобы схватить азы, а кто-то любит контроль
						и полное сопровождение, 24/7 возможность задать вопрос и получить консультацию.
					</p>
				</div>
				<div className="course-info__wrapper">
					<p className="course-info__text course-info__text_green">{title} - это:</p>
				</div>
				<ul className='course-info__list'>
					{subscriptionDescription.map(c => <li key={getRandomKey()} className='course-info__elem'>{c}</li>)}
				</ul>
				{isAuthenticated
					?
					<button className='btn-continue course-info__btn-continue'
									onClick={() => toggleBuyModalWindow(title)}>Оформить подписку</button>
					:
					<Link className='btn-continue course-info__btn-continue' to='/auth'>Авторизоваться</Link>
				}
			</div>
			{!isAuthenticated &&
			<button className='course-info__toggle' onClick={() => setIsOpen(prev => !prev)}>Подробнее</button>}
		</li>
	);
}
const mapDispatchToProps = {toggleBuyModalWindow}

export default connect(() => ({}), mapDispatchToProps)(CourseInfo);
