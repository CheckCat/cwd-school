import React, {useContext} from 'react'
import {RegContext} from "../../context/RegContext"
import {useHttp} from "../../hooks/http.hook"
import config from "../../config.json"
import {Link} from "react-router-dom";

export const CreateCode = () => {
  const {setState, form, changeHandler} = useContext(RegContext)
  const {loading, error, request} = useHttp()

  const createCodeHandler = async (ev) => {
    try {
      ev.preventDefault()
      const data = await request(`http://localhost:5000/api/create_code`, 'POST', {
        blockchainAccount: form.blockchainAccount
      })
      console.log(data)
      setState(config.regSteps[1])
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <form className='auth-form' onSubmit={createCodeHandler}>
        <h1 className='auth-form__title'>Регистрация</h1>
        {
          loading
            ?
            <h2>Мяу</h2>
            :
            <>
              <label className='auth-form__label'>
                Введите имя аккаунта cwd.global
                <input
                  className='auth-form__input'
                  type="text"
                  placeholder="account"
                  name="blockchainAccount"
                  value={form.blockchainAccount}
                  onChange={changeHandler}
                  required/>
              </label>
              <Link className='auth-form__not-have' to='/auth'>Уже есть аккаунт?</Link>
              <button className='auth-form__button' type="submit">Продолжить</button>
            </>
        }
      </form>
    </>
  )
}