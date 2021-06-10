import React from 'react'
import config from "../../config.js"
import {Link} from "react-router-dom";

const CreateCode = ({props: {setState, form, changeHandler, request, isLoading}}) => {

  const createCodeHandler = async (ev) => {
    try {
      ev.preventDefault()
      const data = await request(`${config.flaskUrl}/api/create_code`, 'POST', {
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
          isLoading
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

export default CreateCode