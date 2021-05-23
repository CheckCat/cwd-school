import React, {useContext} from 'react'
import {RegContext} from "../../context/RegContext"
import {useHttp} from '../../hooks/http.hook'
import config from "../../config.json"

export const VerifyCode = () => {
  const {setState, setForm, form, changeHandler} = useContext(RegContext)
  const {loading, error, request} = useHttp()

  const verifyCodeHandler = async (ev) => {
    try {
      ev.preventDefault()
      const data = await request(`http://localhost:5000/api/verify_code`, 'POST', {
        code: form.code,
        blockchainAccount: form.blockchainAccount
      })
      console.log(data)
      setState(config.regSteps[2])
      setForm(prev => ({...prev, blockchainId: data.bc_id}))
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <form className='auth-form' onSubmit={verifyCodeHandler}>
      <h1 className='auth-form__title'>Регистрация</h1>
      {
        loading
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