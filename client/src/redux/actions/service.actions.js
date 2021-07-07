import {CLEAR_ERROR, ERROR, LOADING, READY_SHOW, TOGGLE_THANKS_IS_OPEN} from "../types";

export const readyShow = () => {
	return {
		type: READY_SHOW
	}
}

export const loading = () => {
	return {
		type: LOADING
	}
}

export const setError = (message, isError) => {
	return {
		type: ERROR,
		payload: {message, isError}
	}
}

export const toggleThanksIsOpen = isOpen => {
	return {
		type: TOGGLE_THANKS_IS_OPEN,
		payload: isOpen
	}
}

export const clearError = () => {
	return {
		type: CLEAR_ERROR
	}
}
