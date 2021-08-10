import React, {useRef} from 'react';
import {NavLink} from "react-router-dom";
import LandingNav from "./LandingNav";
import {changeTheme} from "../../redux/actions/auth.actions";
import {connect} from "react-redux";
import config from "../../config";

const DefaultNav = ({theme, changeTheme}) => {
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

	const toggleHandler = () => {
		const newTheme = theme === 'dark' ? 'light' : 'dark'
		changeTheme(newTheme)
	}

	return (
		<nav ref={nav} className='nav nav_closed'>
			<div className='nav__burger'>
				<span className='nav__burger-btn' onClick={clickHandler}></span>
				<span className='nav__burger-elem nav__burger-elem_top'></span>
				<span className='nav__burger-elem nav__burger-elem_middle'></span>
				<span className='nav__burger-elem nav__burger-elem_bottom'></span>
			</div>
			<ul className='nav__list'>
				<li className='nav__logo'>
					<img src={`${config.clientUrl}/${theme}-images/nav-logo.png`} className='logo-img' alt="logo"/>
					<div className='logo-text'>
						<p className='logo-text__title'>CrowdSkills</p>
						<p className='logo-text__description'>blockсhain</p>
					</div>
				</li>
				<li>
					<ul className='nav__list nav__auth'>
						<li>
							<NavLink onClick={closeHandler} className='nav__elem' to="/auth">
								<img src={`${config.clientUrl}/${theme}-images/login.png`} className='nav__img' alt="Auth"/>
								Личный кабинет

							</NavLink>
						</li>
						<li onClick={toggleHandler} className='nav__elem change-theme__wrapper'>
							<input className='change-theme change-theme_default-nav' type='image'
										 src={`${config.clientUrl}/${theme}-images/theme.png`}
										 alt="Поменять тему"/> Поменять тему

						</li>
					</ul>
				</li>
				<LandingNav closeHandler={closeHandler} theme={theme}/>
			</ul>
		</nav>)
}

const mapDispatchToProps = {
	changeTheme
}

export default connect(() => ({}), mapDispatchToProps)(DefaultNav);
