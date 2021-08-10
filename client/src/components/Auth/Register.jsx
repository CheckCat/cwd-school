import React from 'react'
import config from '../../config'
import MiniLoader from "../Loader/MiniLoader";
import {clearError, setError} from "../../redux/actions/service.actions";
import {connect} from "react-redux";

const Register = ({props: {form, changeHandler, login, clearForm, isLoading, request, changeTheme}, setError, clearError}) => {

	const registerHandler = async (ev) => {
		try {
			ev.preventDefault()
			if (form.password !== form.confirmPassword) {
				setError('Пароли не совпадают!', true)
				setTimeout(() => clearError(), 3000)
				return
			}
			const {token, role, name, theme} = await request(`${config.baseUrl}/api/auth/register`, 'POST', {
				blockchainAccount: form.blockchainAccount,
				blockchainId: form.blockchainId,
				password: form.password,
				telegram: form.telegram,
			})
			login(token, role, name)
			changeTheme(theme)
			clearForm('reg')
		} catch (e) {
		}
	}

	return (
		<form className='auth-form' onSubmit={registerHandler}>
			{
				isLoading
					?
					<MiniLoader/>
					:
					<>
						<div className='auth-form__input-wrapper'>
							<div className='auth-form__input-icon auth-form__input-icon_password'>
								<input
									className='auth-form__input'
									type="password"
									id="password"
									name="password"
									value={form.password}
									onChange={changeHandler}
									placeholder="Пароль (минимум 8 символов)"
									required/>
							</div>
						</div>
						<div className='auth-form__input-wrapper'>
							<div className='auth-form__input-icon auth-form__input-icon_password'>
								<input
									className='auth-form__input'
									type="password"
									id="confirmPassword"
									name="confirmPassword"
									value={form.confirmPassword}
									onChange={changeHandler}
									placeholder="Подтвердите пароль"
									required/>
							</div>
						</div>
						<div className='auth-form__input-wrapper'>
							<div className='auth-form__input-icon auth-form__input-icon_telegram'>
								<input
									className='auth-form__input'
									type="text"
									id="telegram"
									name="telegram"
									value={form.telegram}
									onChange={changeHandler}
									placeholder="Ваш ID в Telegram"
									required/>
							</div>
						</div>
						<button className='auth-form__button' type="submit">Зарегистрироваться</button>
					</>
			}
		</form>
	);
}
const mapDispatchToProps = {
	setError,
	clearError,
}
export default connect(() => ({}), mapDispatchToProps)(Register);
