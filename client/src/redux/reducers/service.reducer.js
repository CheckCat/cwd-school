import {CLEAR_ERROR, ERROR, LOADING, READY_SHOW} from "../types";

export const serviceReducer = (state = {isReady: false, isLoading: false}, action) => {
	switch (action.type) {
		case READY_SHOW:
			return {...state, isReady: true}
		case LOADING:
			return {...state, isLoading: !state.isLoading}
		case ERROR:
			return {...state, ...action.payload}
		case CLEAR_ERROR:
			return {...state, message: null}
		default:
			return state
	}
}