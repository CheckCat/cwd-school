import {CLEAR_AUTH_FORM, CLEAR_REG_FORM, FILL_AUTH_FORM, FILL_REG_FORM, LOGIN, LOGOUT} from "../types";
import {readyShow} from "./service.actions"
import config from '../../config.js'
import {pointOutData} from "./data.actions";

const {storageName} = config

export const login = (token, id, role, name) => {
	localStorage.setItem(storageName, JSON.stringify({
		userId: id, token
	}))
	return {
		type: LOGIN,
		payload: {
			token, id, role, name
		}
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
			{Authorization: `Bearer ${token}`})
		dispatch(readyShow())
		dispatch(pointOutData(data.courses))
		dispatch(login(data.token, data.userId, data.role, data.name))
	} catch (e) {
		console.log(e)
		dispatch(readyShow())
	}
}


