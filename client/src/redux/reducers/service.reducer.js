import {CLEAR_ERROR, ERROR, LOADING, READY_SHOW, TOGGLE_THANKS_IS_OPEN} from "../types";

export const serviceReducer = (state = {isReady: false, isLoading: false, message: {}, thanksModalIsOpen: false}, action) => {
	switch (action.type) {
		case READY_SHOW:
			return {...state, isReady: true}
		case LOADING:
			return {...state, isLoading: !state.isLoading}
		case ERROR:
			return {...state, message: action.payload}
		case CLEAR_ERROR:
			return {...state, message: {}}
		case TOGGLE_THANKS_IS_OPEN:
			return {...state, thanksModalIsOpen: action.payload}
		default:
			return state
	}
}
