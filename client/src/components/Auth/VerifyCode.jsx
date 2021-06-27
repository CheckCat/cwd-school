import React from 'react'
import config from "../../config.js"
import MiniLoader from "../Loader/MiniLoader";

const VerifyCode = ({props: {setState, fillForm, form, changeHandler, isLoading, request}}) => {
	
	const verifyCodeHandler = async (ev) => {
		try {
			ev.preventDefault()
			const data = await request(`${config.flaskUrl}/api/verify_code`, 'POST', {
				code: form.code,
				blockchainAccount: form.blockchainAccount
			})
			console.log(data)
			setState(config.regSteps[2])
			fillForm('blockchainId', data.bc_id, 'reg')
		} catch (e) {
			console.log(e)
		}
	}
	
	return (
		<form className='auth-form' onSubmit={verifyCodeHandler}>
			{
				isLoading
					?
					<MiniLoader/>
					:
					<>
						<div className='auth-form__input-wrapper'>
							<div className='auth-form__input-icon auth-form__input-icon_key'>
								<input
									className='auth-form__input'
									type="text"
									id="code"
									name="code"
									value={form.code}
									onChange={changeHandler}
									placeholder="Введите код"
									required/>
							</div>
						</div>
						<a className='auth-form__additional-elem' href='https://cwd.global' rel="noreferrer" target='_blank'>Перейти
							в активность</a>
						<button className='auth-form__button' type="submit">Продолжить</button>
					</>
			}
		</form>
	);
}

export default VerifyCode