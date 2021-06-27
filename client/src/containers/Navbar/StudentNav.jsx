import React from 'react';
import Promo from "../../components/Promo";
import {NavLink, useHistory} from "react-router-dom";
import getRandomKey from "../../utils/getRandomKey";
import LandingNav from "./LandingNav";
import {changeTheme, logout} from "../../redux/actions/auth.actions";
import {connect} from "react-redux";
import useHttp from "../../hooks/http.hook";
import config from "../../config";

const StudentNav = ({authData: {name, token, theme}, coursesData, logout, changeTheme}) => {
	const history = useHistory()
	const request = useHttp()
	
	const logoutHandler = event => {
		event.preventDefault()
		logout()
		history.push('/')
	}
	
	const clickHandler = async () => {
		try {
			const newTheme = theme === 'dark' ? 'light' : 'dark'
			changeTheme(newTheme)
			await request(`${config.baseUrl}/api/auth/theme`, 'POST', {theme: newTheme},
				{Authorization: `Bearer ${token}`})
		} catch(e) {
		  console.log(e)
		}
	}
	
	return (
		<>
			<li className='nav__logo'>
				<img src={`${theme}-images/nav-logo.png`} className='logo-img' alt="logo"/>
				<div className='logo-text'>
					<p className='logo-text__title'>CrowdSkills</p>
					<p className='logo-text__description'>blockсhain</p>
				</div>
			</li>
			<li>
				<Promo theme={theme}/>
			</li>
			<li>
				<ul className='nav__list nav__auth'>
					<li className='nav__elem nav__user'>
						<img src={`${theme}-images/account.png`} className='nav__img' alt="Никнейм"/>
						{name}
						<input onClick={clickHandler} className='change-theme' type='image' src={`${theme}-images/theme.png`} alt="Поменять тему"/>
					</li>
					<li>
						<a className='nav__elem' href="/" onClick={logoutHandler}>
							<img src={`${theme}-images/logout.png`} className='nav__img' alt="Выйти"/>
							Выйти
						</a>
					</li>
				</ul>
			</li>
			<LandingNav theme={theme}/>
			<li>
				<NavLink className='nav__elem' to="/buy">
					<img src={`${theme}-images/buy.png`} className='nav__img' alt="Подписки"/>
					Купить курс
				</NavLink>
			</li>
			{
				coursesData.map(({keyword, title, blocks, timeframe}) => {
					const courseKey = keyword
					const time = timeframe.slice(0, 10).split('-').reverse().join('.')
					const isActive = (new Date(timeframe)).getTime() - Date.now() > 6048e5
					return (
						<li className='nav__elem  course-nav' key={getRandomKey()}>
							<div className='course-nav__wrapper'>
								<img src={`${theme}-images/course.png`} className='nav__img' alt="Первый"/>
								{title}
							</div>
							<ul className='course-nav__list'>
								<li
									className={isActive ? 'course-nav__active-field course-nav__active-field_active' : 'course-nav__active-field course-nav__active-field_disactive'}>{`Активна до ${time}`}</li>
								{blocks.map(({keyword, title}) => {
									const blockKey = keyword
									return (
										<li key={getRandomKey()} className='course-nav__elem'>
											<NavLink to={`/courses/${courseKey}/${blockKey}`}>
												{title}
											</NavLink>
										</li>
									)
								})}
							</ul>
						</li>
					)
				})
			}
		</>
	)
}

const mapStateToProps = ({authData, coursesData}) => ({
	authData, coursesData
})

const mapDispatchToProps = {
	logout, changeTheme
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentNav)