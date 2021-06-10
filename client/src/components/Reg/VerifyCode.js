import React from 'react'
import config from "../../config.js"

const VerifyCode = ({props: {setState, fillForm, form, changeHandler, isLoading,
  request}}) => {

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
      <h1 className='auth-form__title'>Регистрация</h1>
      {
        isLoading
          ?
          <h2>Мяу</h2>
          :
          <>
            <label className='auth-form__label'>
              Введите код
              <input
                className='auth-form__input'
                type="text"
                placeholder="code"
                id="code"
                name="code"
                value={form.code}
                onChange={changeHandler}
                required/>
            </label>
            <button className='auth-form__button' type="submit">Отправить</button>
          </>
      }
    </form>
  );
}

export default VerifyCode