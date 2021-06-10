import {combineReducers} from "redux";
import {authFormReducer, authReducer, regFormReducer} from "./auth.reducer";
import {serviceReducer} from "./service.reducer";
import {createFormReducer} from "./create.reducer";
import {dataReducer} from "./data.reducer";


const rootReducer = combineReducers({
	authData: authReducer,
	addition: serviceReducer,
	authForm: authFormReducer,
	regForm: regFormReducer,
	createForm: createFormReducer,
	coursesData: dataReducer
})

export default rootReducer