import React, {useState} from 'react';
import useHttp from "../../hooks/http.hook";
import CreateCode from '../../components/Auth/CreateCode'
import VerifyCode from "../../components/Auth/VerifyCode";
import config from "../../config.js"
import './index.css'
import {changeTheme, clearForm, fillForm, login} from "../../redux/actions/auth.actions";
import {connect} from "react-redux";
import ForgotRegister from "../../components/Auth/ForgotRegister";
import Footer from "../../containers/Footer";

const ForgotPage = ({addition: {isLoading}, form, fillForm, login, clearForm, theme, changeTheme}) => {
	let layout
	
	const request = useHttp()
	const [state, setState] = useState(config.regSteps[0])
	
	const changeHandler = ({target: {name, value}}) => {
		fillForm(name, value, 'reg')
	}
	
	const props = {
		form, fillForm, isLoading, login, request, changeHandler, setState, clearForm, isForgot: true, changeTheme
	}
	
	switch (state) {
		case 'account':
			layout = <CreateCode props={props}/>
			break
		case 'code':
			layout = <VerifyCode props={props}/>
			break
		case 'form':
			layout = <ForgotRegister props={props}/>
			break
		default:
			return
	}
	
	return (
		<>
			<div className="header">
				<img className='header__img' src={`${theme}-images/logo-main.png`} alt="logo"/>
				<h1 className='auth-form__title'>Забыли пароль</h1>
			</div>
			{layout}
			<Footer/>
		</>
	)
	
}

const mapStateToProps = ({addition, regForm, transferState, authData: {theme}}) => ({
	addition, form: regForm, transferState, theme
})

const mapDispatchToProps = {
	login, fillForm, clearForm, changeTheme
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPage)