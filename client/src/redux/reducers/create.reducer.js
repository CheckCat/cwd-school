import config from '../../config.js'
import {
	CLEAR_COURSE,
	FILL_BLOCK,
	FILL_COURSE,
	FILL_LESSON,
	FILL_SUBSCRIPTION_INFO,
	FILL_SUBSCRIPTION_PRICE,
	FILL_TEXT,
	FILL_TIMECODE
} from "../types";
// СТАРАЯ НЕИСПОЛЬЗУЕМАЯ ЛОГИКА. УДАЛИТЬ ИЛИ ИСПРАВИТЬ!!!

const {
	createCourseStateTemplate,
	createBlockStateTemplate,
	lessonStateTemplate,
	subscriptionStateTemplate,
	timecodesStateTemplate,
	textStateTemplate
} = config
export const createFormReducer = (state = createCourseStateTemplate, action) => {
	const prevState = JSON.parse(JSON.stringify({...state}))
	const {indexBlock, indexLesson, indexTimecode, indexText, indexSubPrice, indexSubInfo, payload} = action

	switch (action.type) {
		case CLEAR_COURSE:
			return createCourseStateTemplate
		case FILL_COURSE:
			return {...state, ...action.payload}
		case FILL_BLOCK:
			if (!prevState.blocks[indexBlock]) prevState.blocks.push(createBlockStateTemplate)
			!(null in payload) && (prevState.blocks[indexBlock] = {...prevState.blocks[indexBlock], ...payload})

			return prevState
		case FILL_SUBSCRIPTION_INFO:
			if (prevState.subscriptions.description[indexSubInfo] === undefined) prevState.subscriptions.description.push('');
			(payload !== null) && (prevState.subscriptions.description[indexSubInfo] = payload)
			return prevState
		case FILL_SUBSCRIPTION_PRICE:
			if (!prevState.subscriptions.prices[indexSubPrice]) prevState.subscriptions.prices.push(subscriptionStateTemplate)
			!(null in payload) && (prevState.subscriptions.prices[indexSubPrice] = {...prevState.subscriptions.prices[indexSubPrice], ...payload})

			return prevState
		case FILL_LESSON:
			if (!prevState.blocks[indexBlock].lessons[indexLesson]) prevState.blocks[indexBlock].lessons.push(lessonStateTemplate)
			!(null in payload) && (prevState.blocks[indexBlock].lessons[indexLesson] = {...prevState.blocks[indexBlock].lessons[indexLesson], ...payload})

			return prevState
		case FILL_TIMECODE:
			if (!prevState.blocks[indexBlock].lessons[indexLesson].timecodes[indexTimecode]) prevState.blocks[indexBlock].lessons[indexLesson].timecodes.push(timecodesStateTemplate)
			!(null in payload) && (prevState.blocks[indexBlock].lessons[indexLesson].timecodes[indexTimecode] = {
				...prevState.blocks[indexBlock].lessons[indexLesson].timecodes[indexTimecode],
				...payload
			})

			return prevState
		case FILL_TEXT:
			if (!prevState.blocks[indexBlock].lessons[indexLesson].text[indexText]) prevState.blocks[indexBlock].lessons[indexLesson].text.push(textStateTemplate)
			!(null in payload) && (prevState.blocks[indexBlock].lessons[indexLesson].text[indexText] = {
				...prevState.blocks[indexBlock].lessons[indexLesson].text[indexText],
				...payload
			})

			return prevState
		default:
			return state
	}
}

