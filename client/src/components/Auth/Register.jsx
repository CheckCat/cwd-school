import React from 'react'
import config from '../../config'
import MiniLoader from "../Loader/MiniLoader";

const Register = ({props: {form, changeHandler, login, clearForm, isLoading, request, changeTheme}}) => {

	const registerHandler = async (ev) => {
		try {
			ev.preventDefault()
			if (form.password !== form.confirmPassword) return
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
			console.log(e)
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
									placeholder="Пароль (минимум 6 символов)"
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
									placeholder="Ваш Telegram"
									required/>
							</div>
						</div>
						<button className='auth-form__button' type="submit">Зарегистрироваться</button>
					</>
			}
		</form>
	);
}

export default Register
