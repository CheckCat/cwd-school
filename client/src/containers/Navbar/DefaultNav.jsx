import React, {useRef} from 'react';
import {NavLink} from "react-router-dom";
import LandingNav from "./LandingNav";
import {changeTheme} from "../../redux/actions/auth.actions";
import {connect} from "react-redux";

const DefaultNav = ({theme, changeTheme}) => {
	const nav = useRef()

	const clickHandler = ({target}) => {
		if(![...target.classList].find(c => c === 'nav__burger-elem')) return
		target.offsetParent.classList.toggle('nav__burger_opened')
		nav.current.classList.toggle('nav_closed')
	}

	const toggleHandler = () => {
		const newTheme = theme === 'dark' ? 'light' : 'dark'
		changeTheme(newTheme)
	}

	return (
		<nav ref={nav} className='nav nav_closed'>
			<div className='nav__burger' onClick={clickHandler}>
				<span className='nav__burger-elem nav__burger-elem_top'></span>
				<span className='nav__burger-elem nav__burger-elem_middle'></span>
				<span className='nav__burger-elem nav__burger-elem_bottom'></span>
			</div>
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
							<NavLink className='nav__elem' to="/auth">
								<img src={`${theme}-images/login.png`} className='nav__img' alt="Auth"/>
								Личный кабинет

							</NavLink>
						</li>
						<li onClick={toggleHandler} className='nav__elem change-theme__wrapper'>
							<input className='change-theme change-theme_default-nav' type='image'
										 src={`${theme}-images/theme.png`}
										 alt="Поменять тему"/> Поменять тему

						</li>
					</ul>
				</li>
				<LandingNav theme={theme}/>
			</ul>
		</nav>)
}

const mapDispatchToProps = {
	changeTheme
}

export default connect(() => ({}), mapDispatchToProps)(DefaultNav);
