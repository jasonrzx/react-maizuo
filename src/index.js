import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import Thunk from 'redux-thunk';
import Logger from 'redux-logger';
import {Provider} from 'react-redux';

const reducers = combineReducers({
	filmsed: function(state=[], action){
		// console.log(action);
		switch(action.type){
			case "Get_Films_Data":
				return action.payload;
			default:
				return state;
		}
	},
	willfilms: function(state=[], action){
		switch(action.type){
			case "Get_WillFilms_Data":
				return action.payload;
			default:
				return state;
		}
	}
})
const store = createStore(reducers, {}, applyMiddleware(Thunk, Logger));

function renderpage() {
	ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
}
renderpage();

store.subscribe(renderpage);
registerServiceWorker();
