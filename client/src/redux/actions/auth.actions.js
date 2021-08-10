import {CHANGE_THEME, CLEAR_AUTH_FORM, CLEAR_REG_FORM, FILL_AUTH_FORM, FILL_REG_FORM, LOGIN, LOGOUT} from "../types";
import {readyShow, toggleThanksIsOpen} from "./service.actions"
import config from '../../config.js'
import {pointOutData} from "./data.actions";

const {storageName} = config

export const login = (token, role, name) => {
	localStorage.setItem(storageName, JSON.stringify({
		token
	}))
	return {
		type: LOGIN,
		payload: {
			token, role, name
		}
	}
}

export const changeTheme = theme => {
	return {
		type: CHANGE_THEME,
		payload: theme
	}
}

export const logout = () => {
	localStorage.removeItem(storageName)
	return {
		type: LOGOUT,
		payload: {
			token: null,
			id: null,
			role: null,
			name: null
		}
	}
}

export const fillForm = (key, value, type) => {
	const payloads = {
		payload: {[key]: value}
	}

	switch (type) {
		case 'auth':
			return {...payloads, type: FILL_AUTH_FORM}
		case 'reg':
			return {...payloads, type: FILL_REG_FORM}
		default:
			return {type: ''}
	}
}

export const clearForm = type => {
	switch (type) {
		case 'auth':
			return {type: CLEAR_AUTH_FORM}
		case 'reg':
			return {type: CLEAR_REG_FORM}
		default:
			return {type: ''}
	}
}

export const tryAuth = (token, request) => async dispatch => {
	try {
		if (!token) return dispatch(readyShow())

		const data = await request(`${config.baseUrl}/api/auth/verify`, 'POST', null,
			{Authorization: `Bearer ${token}`}, null, false, false)
		dispatch(readyShow())
		if(!data) return
		dispatch(pointOutData(data.courses))
		dispatch(login(data.token, data.role, data.name))
		dispatch(toggleThanksIsOpen(data.thanksModalIsOpen))
		dispatch(changeTheme(data.theme))
	} catch (e) {
		console.log(e)
		dispatch(readyShow())
	}
}


