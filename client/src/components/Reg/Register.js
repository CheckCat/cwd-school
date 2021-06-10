import React from 'react'
import config from '../../config'

const Register = ({props: {form, changeHandler, login, clearForm, isLoading, request}}) => {

  const registerHandler = async (ev) => {
    try {
      ev.preventDefault()
      if (form.password !== form.confirmPassword) return
      const {token, userId, role, name} = await request(`${config.baseUrl}/api/auth/register`, 'POST', {
        blockchainAccount: form.blockchainAccount,
        blockchainId: form.blockchainId,
        password: form.password,
        telegram: form.telegram,
        email: form.email,
        phone: form.phone
      })
      login(token, userId, role, name)
      clearForm('reg')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <form className='auth-form' onSubmit={registerHandler}>
      <h1 className='auth-form__title'>Регистрация</h1>
      {
        isLoading
          ?
          <h2>Мяу</h2>
          :
          <>
            <label className='auth-form__label'>
              Ваш пароль
              <input
                className='auth-form__input'
                type="password"
                placeholder="Пароль"
                id="password"
                name="password"
                value={form.password}
                onChange={changeHandler}
                required/>
            </label>
            <label className='auth-form__label'>
              Подтвердите пароль
              <input
                className='auth-form__input'
                type="password"
                placeholder="Подтвердите пароль"
                id="confirmPassword"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={changeHandler}
                required/>
            </label>
            <label className='auth-form__label'>
              Ваш телеграм
              <input
                className='auth-form__input'
                type="text"
                placeholder="Telegram"
                id="telegram"
                name="telegram"
                value={form.telegram}
                onChange={changeHandler}
                required/>
            </label>
            <label className='auth-form__label'>
              Ваш email
              <input
                className='auth-form__input'
                type="email"
                placeholder="Email"
                id="email"
                name="email"
                value={form.email}
                onChange={changeHandler}
                required/>
            </label>
            <label className='auth-form__label'>
              Ваш телефон
              <input
                className='auth-form__input'
                type="phone"
                placeholder="Телефон"
                id="phone"
                name="phone"
                value={form.phone}
                onChange={changeHandler}
                required/>
            </label>
            <button className='auth-form__button' type="submit">Зарегистрироваться</button>
          </>
      }
    </form>
  );
}

export default Register