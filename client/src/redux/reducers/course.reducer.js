import {FILL_COURSE_INFO, FILL_DURATION_INFO, TOGGLE_BUY_MODAL_WINDOW} from "../types";

export const courseReducer = (state = {
	isOpen: false,
	currentCourse: '',
	coursesInfo: [],
	durationInfo: []
}, action) => {
	switch (action.type) {
		case FILL_DURATION_INFO:
			return {...state, durationInfo: action.payload}
		case FILL_COURSE_INFO:
			return {...state, coursesInfo: action.payload}
		case TOGGLE_BUY_MODAL_WINDOW:
			return {...state, isOpen: !state.isOpen, currentCourse: action.payload}
		default:
			return state
	}
}