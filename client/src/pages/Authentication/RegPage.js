import React, {useState} from 'react';
import useHttp from "../../hooks/http.hook";
import CreateCode from '../../components/Reg/CreateCode'
import VerifyCode from "../../components/Reg/VerifyCode";
import Register from "../../components/Reg/Register";
import config from "../../config.js"
import './index.css'
import {clearForm, fillForm, login} from "../../redux/actions/auth.actions";
import {connect} from "react-redux";

const RegPage = ({addition: {isLoading}, form, fillForm, login, clearForm}) => {
	let layout
	
	const request = useHttp()
	const [state, setState] = useState(config.regSteps[0])
	// useEffect(() => {
	//   clearError()
	// }, [error, clearError])
	
	const changeHandler = ({target: {name, value}}) => {
		fillForm(name, value, 'reg')
	}
	
	const props = {
		form, fillForm, isLoading, login, request, changeHandler, setState, clearForm
	}
	
	switch (state) {
		case 'account':
			layout = <CreateCode props={props}/>
			break
		case 'code':
			layout = <VerifyCode props={props}/>
			break
		case 'form':
			layout = <Register props={props}/>
			break
		default:
			return
	}
	
	return (
		<>
			<div className="header">
				<img className='header__img' src="images/1.png" alt="logo"/>
				<p className='header__title'>Crowd School</p>
			</div>
			{layout}
		</>
	)
	
}

const mapStateToProps = ({addition, regForm, transferState}) => ({
	addition, form: regForm, transferState
})

const mapDispatchToProps = {
	login, fillForm, clearForm
}

export default connect(mapStateToProps, mapDispatchToProps)(RegPage)