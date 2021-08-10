import React from 'react'
import config from "../../config.js"
import {Link} from "react-router-dom";
import MiniLoader from "../Loader/MiniLoader";

const CreateCode = ({props: {isForgot, setState, form, changeHandler, request, isLoading}}) => {

	const createCodeHandler = async (ev) => {
		try {
			ev.preventDefault()
			const data = await request(`${config.flaskUrl}/api/create_code`, 'POST', {
				blockchainAccount: form.blockchainAccount,
				isForgot
			})
			if(data.ok)	setState(config.regSteps[1])
		} catch (e) {
		}
	}

	return (
		<>
			<form className='auth-form' onSubmit={createCodeHandler}>
				{
					isLoading
						?
						<MiniLoader/>
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
							<Link className='auth-form__additional-elem'
										to='/auth'>{isForgot ? "Вернуться к авторизации" : "Уже есть свой аккаунт"}</Link>
							<button className='auth-form__button' type="submit">Получить код</button>
						</>
				}
			</form>
		</>
	)
}

export default CreateCode
