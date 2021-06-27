import {FILL_DURATION_INFO, FILL_COURSE_INFO, TOGGLE_BUY_MODAL_WINDOW} from "../types";

export const setDurationInfo = data => ({
	type: FILL_DURATION_INFO,
	payload: data
})

export const setCoursesInfo = data => ({
	type: FILL_COURSE_INFO,
	payload: data
})

export const toggleBuyModalWindow = (course = '') => ({
	type: TOGGLE_BUY_MODAL_WINDOW,
	payload: course
})