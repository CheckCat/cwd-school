import React, {useRef} from 'react';
import StudentNav from "./StudentNav";
import {NavLink} from "react-router-dom";

const AdminNav = ({theme}) => {
	const nav = useRef()
	
	const clickHandler = ({target}) => {
		target.offsetParent.classList.toggle('nav__burger_opened')
		nav.current.classList.toggle('nav_closed')
	}
	
	return (
		<nav ref={nav} className='nav nav_closed'>
			<div className='nav__burger' onClick={clickHandler}>
				<span className='nav__burger-elem'></span>
			</div>
			<ul className='nav__list'>
				<StudentNav/>
				<li>
					<NavLink className='nav__elem' to="/create">
						<img src={`${theme}-images/main.png`} className='nav__img' alt="Создать"/>
						Создать курс
					</NavLink>
				</li>
				<li>
					<NavLink className='nav__elem' to="/create">
						<img src={`${theme}-images/main.png`} className='nav__img' alt="Создать"/>
						Создать курс
					</NavLink>
				</li>
				<li>
					<NavLink className='nav__elem' to="/create">
						<img src={`${theme}-images/main.png`} className='nav__img' alt="Создать"/>
						Создать курс
					</NavLink>
				</li><li>
				<NavLink className='nav__elem' to="/create">
					<img src={`${theme}-images/main.png`} className='nav__img' alt="Создать"/>
					Создать курс
				</NavLink>
			</li><li>
				<NavLink className='nav__elem' to="/create">
					<img src={`${theme}-images/main.png`} className='nav__img' alt="Создать"/>
					Создать курс
				</NavLink>
			</li><li>
				<NavLink className='nav__elem' to="/create">
					<img src={`${theme}-images/main.png`} className='nav__img' alt="Создать"/>
					Создать курс
				</NavLink>
			</li>
				
				
				<li>
					<NavLink className='nav__elem' to="/admin">
						<img src={`${theme}-images/main.png`} className='nav__img' alt="Админ"/>
						Админ панель
					</NavLink>
				</li>
				<li>
					<NavLink className='nav__elem' to="/admin/courses">
						<img src={`${theme}-images/main.png`} className='nav__img' alt="Курсы"/>
						Админ панель курсов
					</NavLink>
				</li>
			</ul>
		</nav>
	)
}

export default AdminNav;