import {POINT_OUT_DATA} from "../types";

export const pointOutData = (data) => {
	return {
		type: POINT_OUT_DATA,
		payload: [...data]
	}
}