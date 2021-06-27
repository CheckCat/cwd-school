import {CLEAR_ERROR, ERROR, LOADING, READY_SHOW} from "../types";

export const serviceReducer = (state = {isReady: false, isLoading: false, message: {}}, action) => {
	switch (action.type) {
		case READY_SHOW:
			return {...state, isReady: true}
		case LOADING:
			return {...state, isLoading: !state.isLoading}
		case ERROR:
			return {...state, message: action.payload}
		case CLEAR_ERROR:
			return {...state, message: {}}
		default:
			return state
	}
}