import React, {useContext, useEffect, useState} from 'react';
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";
import {Link} from "react-router-dom";
import './index.css'


export const AuthPage = () => {
  const {login, setName} = useContext(AuthContext)
  const {loading, error, request, clearError} = useHttp()
  const [form, setForm] = useState({
    blockchainAccount: '', password: ''
  })
  useEffect(() => {
    clearError()
  }, [error, clearError])

  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const loginHandler = async (ev) => {
    try {
      ev.preventDefault()
      const data = await request('http://localhost:5001/api/auth/login', 'POST', {...form})
      login(data.token, data.userId, data.role)
      setName(data.blockchainAccount)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <div className="header">
        <img className='header__img' src="images/1.png" alt="logo"/>
        <p className='header__title'>Crowd School</p>
      </div>

      <form className='auth-form' onSubmit={loginHandler}>
        <h1 className='auth-form__title'>Авторизация</h1>
        {
          loading
            ?
            <h2>Мяу</h2>
            :
            <>
              <label className='auth-form__label'>
                Имя аккаунта
                <input
                  className='auth-form__input'
                  type="text"
                  name="blockchainAccount"
                  value={form.blockchainAccount}
                  onChange={changeHandler}
                  required/>
              </label>

              <label className='auth-form__label'>
                Пароль
                <input
                  className='auth-form__input'
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={changeHandler}
                  required/>
              </label>
              <Link className='auth-form__not-have' to='/reg'>Еще нет своего аккаунта?</Link>
              <button className='auth-form__button' type="submit">Войти</button>
            </>
        }
      </form>
    </>
  );
}