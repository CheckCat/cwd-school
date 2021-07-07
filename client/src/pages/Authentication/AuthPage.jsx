import React from 'react';
import useHttp from "../../hooks/http.hook";
import {Link} from "react-router-dom";
import './index.css'
import {changeTheme, clearForm, fillForm, login} from "../../redux/actions/auth.actions";
import {pointOutData} from "../../redux/actions/data.actions";
import config from "../../config";
import {connect} from "react-redux";
import Footer from "../../containers/Footer";
import MiniLoader from "../../components/Loader/MiniLoader";
import {toggleThanksIsOpen} from "../../redux/actions/service.actions";

const AuthPage = ({addition: {isLoading}, theme, form, fillForm, login, clearForm, pointOutData, changeTheme, toggleThanksIsOpen}) => {
	const request = useHttp()

	const changeHandler = ({target: {name, value}}) => {
		fillForm(name, value, 'auth')
	}

	const loginHandler = async (ev) => {
		try {
			ev.preventDefault()
			const data = await request(`${config.baseUrl}/api/auth/login`, 'POST', {...form})
			login(data.token, data.role, data.name)
			toggleThanksIsOpen(data.thanksModalIsOpen)
			changeTheme(data.theme)
			pointOutData(data.courses)
			clearForm('auth')
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<>
			<div className="header">
				<img className='header__img' src={`${theme}-images/logo-auth.png`} alt="logo"/>
				<h1 className='auth-form__title'>Авторизация</h1>
			</div>

			<form className='auth-form' onSubmit={loginHandler}>
				{
					isLoading
						?
						<MiniLoader />
						:
						<>
							<div className='auth-form__input-wrapper'>
								<div className='auth-form__input-icon auth-form__input-icon_user'>
									<input
										className='auth-form__input'
										type="text"
										name="blockchainAccount"
										value={form.blockchainAccount}
										onChange={changeHandler}
										placeholder='Введите логин CWD.Global'
										required/>
								</div>
							</div>
							<div className='auth-form__input-wrapper'>
								<div className='auth-form__input-icon auth-form__input-icon_password'>
									<input
										className='auth-form__input'
										type="password"
										name="password"
										value={form.password}
										onChange={changeHandler}
										placeholder='Пароль'
										required/>
								</div>
							</div>
							<div className='auth-form__additional-wrapper'>
								<Link className='auth-form__additional-elem' to='/forgot'>Забыли пароль?</Link>
								<Link className='auth-form__additional-elem' to='/reg'>Еще нет своего аккаунта?</Link>
							</div>
							<button className='auth-form__button' type="submit">Войти</button>
						</>
				}
			</form>
			<Footer/>
		</>
	);
}

const mapStateToProps = ({authData: {theme}, addition, authForm, transferState}) => ({theme, addition, form: authForm, transferState})

const mapDispatchToProps =
	{
		login, fillForm, clearForm, pointOutData, changeTheme, toggleThanksIsOpen
	}

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage)
