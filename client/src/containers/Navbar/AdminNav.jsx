import React, {useRef} from 'react';
import StudentNav from "./StudentNav";
import {NavLink} from "react-router-dom";
import config from "../../config";

const AdminNav = ({theme}) => {
	const nav = useRef()

	const clickHandler = ({target}) => {
		window.scrollTo(0,0)
		target.disabled = true
		if(target.offsetParent.classList.contains('nav__burger_opened')) {
			setTimeout(() => {
				target.offsetParent.nextSibling.classList.add('nav__list_closed')
				target.disabled = false
			}, 300)
		} else {
			target.offsetParent.nextSibling.classList.remove('nav__list_closed')
			setTimeout(() => {
				target.disabled = false
			}, 300)
		}
		target.offsetParent.classList.toggle('nav__burger_opened')
		nav.current.classList.toggle('nav_closed')
	}

	const closeHandler = ({target}) => {
		window.scrollTo(0,0)
		if(target.classList.contains('active') || window.innerWidth > 1550) return
		clickHandler({
			target: document.querySelector('.nav__burger-btn')
		})
	}

	return (
		<nav ref={nav} className='nav'>
			<div className='nav__burger nav__burger_opened'>
				<span className='nav__burger-btn' onClick={clickHandler}></span>
				<span className='nav__burger-elem nav__burger-elem_top'></span>
				<span className='nav__burger-elem nav__burger-elem_middle'></span>
				<span className='nav__burger-elem nav__burger-elem_bottom'></span>
			</div>
			<ul className='nav__list'>
				<StudentNav closeHandler={closeHandler}/>
				{/*<li>*/}
				{/*	<NavLink onClick={closeHandler} className='nav__elem' to="/create">*/}
				{/*		<img src={`${config.clientUrl}/${theme}-images/main.png`} className='nav__img' alt="Создать"/>*/}
				{/*		Создать курс*/}
				{/*	</NavLink>*/}
				{/*</li>*/}
				{/*СТАРАЯ ЛОГИКА. УДАЛИТЬ ИЛИ ИЗМЕНИТЬ!!!*/}
				<li>
					<NavLink onClick={closeHandler} className='nav__elem' to="/admin/students" exact>
						<img src={`${config.clientUrl}/${theme}-images/main.png`} className='nav__img' alt="Студенты"/>
						Админ панель
					</NavLink>
				</li>
				<li>
					<NavLink onClick={closeHandler} className='nav__elem' to="/admin/courses">
						<img src={`${config.clientUrl}/${theme}-images/main.png`} className='nav__img' alt="Курсы"/>
						Админ панель курсов
					</NavLink>
				</li>
			</ul>
		</nav>
	)
}

export default AdminNav;
