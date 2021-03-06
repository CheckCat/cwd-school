import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension'
import {applyMiddleware, createStore} from "redux";
import rootReducer from "./redux/reducers";
import './index.css'
import App from './App';

const store = createStore(rootReducer, composeWithDevTools(
	applyMiddleware(thunk)
))

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App/>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

