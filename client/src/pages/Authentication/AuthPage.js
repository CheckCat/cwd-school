import React from 'react';
import useHttp from "../../hooks/http.hook";
import {Link} from "react-router-dom";
import './index.css'
import {clearForm, fillForm, login} from "../../redux/actions/auth.actions";
import {connect} from "react-redux";
import {pointOutData} from "../../redux/actions/data.actions";
import config from "../../config";

const AuthPage = ({addition: {isLoading}, form, fillForm, login, clearForm, pointOutData}) => {
  const request = useHttp()

  // useEffect(() => {
  //   clearError()
  // }, [error, clearError])

  const changeHandler = ({target: {name, value}}) => {
    fillForm(name, value, 'auth')
  }

  const loginHandler = async (ev) => {
    try {
      ev.preventDefault()
      const data = await request(`${config.baseUrl}/api/auth/login`, 'POST', {...form})
      console.log(data)
      login(data.token, data.userId,data.role, data.name)
      pointOutData(data.courses)
      clearForm('auth')
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
          isLoading
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

const mapStateToProps = ({addition, authForm, transferState}) => ({
  addition, form: authForm, transferState
})

const mapDispatchToProps = {
  login, fillForm, clearForm, pointOutData
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage)