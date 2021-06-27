import {combineReducers} from "redux";
import {authFormReducer, authReducer, regFormReducer} from "./auth.reducer";
import {serviceReducer} from "./service.reducer";
import {createFormReducer} from "./create.reducer";
import {dataReducer} from "./data.reducer";
import {courseReducer} from "./course.reducer";


const rootReducer = combineReducers({
	authData: authReducer,
	addition: serviceReducer,
	authForm: authFormReducer,
	regForm: regFormReducer,
	createForm: createFormReducer,
	commonCoursesData: courseReducer,
	coursesData: dataReducer
})

export default rootReducer