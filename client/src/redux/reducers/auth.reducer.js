import {CHANGE_THEME, CLEAR_AUTH_FORM, CLEAR_REG_FORM, FILL_AUTH_FORM, FILL_REG_FORM, LOGIN, LOGOUT} from "../types";
import config from "../../config";

const {authStateTemplate, regStateTemplate} = config

export const authReducer = (state = {theme: 'dark'}, action) => {
	switch (action.type) {
		case LOGIN:
			return {...state, ...action.payload}
		case LOGOUT:
			return {...state, ...action.payload}
		case CHANGE_THEME:
			return {...state, theme: action.payload}
		default:
			return state
	}
}

export const regFormReducer = (state = regStateTemplate, action) => {
	switch (action.type) {
		case FILL_REG_FORM:
			return {...state, ...action.payload}
		case CLEAR_REG_FORM:
			return {...regStateTemplate}
		default:
			return state
	}
}

export const authFormReducer = (state = authStateTemplate, action) => {
	switch (action.type) {
		case FILL_AUTH_FORM:
			return {...state, ...action.payload}
		case CLEAR_AUTH_FORM:
			return {...authStateTemplate}
		default:
			return state
	}
}