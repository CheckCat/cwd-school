import React from 'react';
import {NavLink} from "react-router-dom";
import LandingNav from "./LandingNav";

const DefaultNav = ({theme}) => (
	<nav className='nav'>
		<ul className='nav__list'>
			<li className='nav__logo'>
				<img src={`${theme}-images/nav-logo.png`} className='logo-img' alt="logo"/>
				<div className='logo-text'>
					<p className='logo-text__title'>CrowdSkills</p>
					<p className='logo-text__description'>blockсhain</p>
				</div>
			</li>
			<li>
				<ul className='nav__list nav__auth'>
					<li>
						<NavLink className='nav__elem ' to="/auth">
							<img src={`${theme}-images/login.png`} className='nav__img' alt="Auth"/>
							Личный кабинет
						</NavLink>
					</li>
				</ul>
			</li>
			<LandingNav theme={theme}/>
		</ul>
	</nav>
)

export default DefaultNav;