import {CLEAR_ERROR,  ERROR, LOADING, READY_SHOW} from "../types";

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

export const error = message => {
	return {
		type: ERROR,
		payload: {
			message
		}
	}
}

export const clearError = () => {
	return {
		type: CLEAR_ERROR
	}
}