import {POINT_OUT_DATA} from "../types";

export const dataReducer = (state = [], action) => {
	switch (action.type) {
		case POINT_OUT_DATA:
			return [...action.payload]
		default:
			return state
	}
}