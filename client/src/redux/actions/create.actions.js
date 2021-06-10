import {
	CLEAR_COURSE,
	FILL_BLOCK,
	FILL_COURSE,
	FILL_LESSON,
	FILL_SUBSCRIPTION_INFO,
	FILL_SUBSCRIPTION_PRICE, FILL_TEXT,
	FILL_TIMECODE
} from "../types"

export const clearCourse = () => {
	return {
		type: CLEAR_COURSE
	}
}

export const fillCourse = (key, value) => {
	return {
		type: FILL_COURSE,
		payload: {[key]: value}
	}
}

export const fillBlock = (key, value, indexBlock) => {
	return {
		type: FILL_BLOCK,
		payload: {[key]: value},
		indexBlock
	}
}

export const fillSubscriptionInfo = (value, indexSubInfo) => {
	return {
		type: FILL_SUBSCRIPTION_INFO,
		payload: value,
		indexSubInfo
	}
}

export const fillSubscriptionPrice = (key, value, indexSubPrice) => {
	return {
		type: FILL_SUBSCRIPTION_PRICE,
		payload: {[key]: value},
		indexSubPrice
	}
}

export const fillLesson = (key, value, indexBlock, indexLesson) => {
	return {
		type: FILL_LESSON,
		payload: {[key]: value},
		indexBlock,
		indexLesson
	}
}

export const fillTimecode = (key, value, indexBlock, indexLesson, indexTimecode) => {
	return {
		type: FILL_TIMECODE,
		payload: {[key]: value},
		indexBlock,
		indexLesson,
		indexTimecode
	}
}

export const fillText = (key, value, indexBlock, indexLesson, indexText) => {
	return {
		type: FILL_TEXT,
		payload: {[key]: value},
		indexBlock,
		indexLesson,
		indexText
	}
}