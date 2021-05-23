import React, {useContext, useEffect, useState} from 'react';
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";
import {RegContext} from "../../context/RegContext";
import {CreateCode} from '../../components/Reg/CreateCode'
import {VerifyCode} from "../../components/Reg/VerifyCode";
import {Register} from "../../components/Reg/Register";
import config from "../../config.json"
import './index.css'

export const RegPage = () => {
  let layout

  const {loading, error, request, clearError} = useHttp()
  const [state, setState] = useState(config.regSteps[0])
  const [form, setForm] = useState({...config.regStateTemplate})
  useEffect(() => {
    clearError()
  }, [error, clearError])

  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  switch (state) {
    case 'account':
      layout = <CreateCode/>
      break
    case 'code':
      layout = <VerifyCode/>
      break
    case 'form':
      layout = <Register/>
      break
    default:
      return
  }

  return (
    <RegContext.Provider value={{
      state, setState, form, setForm, changeHandler
    }}>
      <div className="header">
        <img className='header__img' src="images/1.png" alt="logo"/>
        <p className='header__title'>Crowd School</p>
      </div>
      {layout}
    </ RegContext.Provider>
  )

}