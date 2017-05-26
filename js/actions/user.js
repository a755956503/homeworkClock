'use strict';

import { AlertIOS } from 'react-native';

import * as TYPES from './types';
import * as TEACHER from '../http/teacher';

// fake user data
let testUser = {
	'name': 'juju',
	'age': '24',
	'avatar': 'https://avatars1.githubusercontent.com/u/1439939?v=3&s=460'
};

// for skip user 
let skipUser = {
	'name': 'guest',
	'age': 20,
	'avatar': 'https://avatars1.githubusercontent.com/u/1439939?v=3&s=460',
};

// login
export function logIn(opt){
	return (dispatch) => {
		dispatch({'type': TYPES.LOGGED_DOING});
		//dispatch({'type': TYPES.LOGGED_IN, user: opt});
		TEACHER.login(opt,(success,error)=>{
			if(success){
				dispatch({'type': TYPES.LOGGED_IN, user: success.userInfo});
			}else{
				dispatch({'type': TYPES.LOGGED_ERROR, 'error':error});
			}

		})
		// setTimeout(()=>{
		// 			dispatch({'type': TYPES.LOGGED_IN, user: opt});
		// },3000);

	}
}
export function registIn(user) {
	return (dispatch)=>{
		console.log("action");
		dispatch({'type':TYPES.REGIST_DOING});
		TEACHER.regist(user,(success,error)=>{
			if(success){
				dispatch({'type':TYPES.REGIST_SUCCESS,'user':success.userInfo})
				console.log(JSON.stringify("regist"+success.userInfo));
			}else{
				dispatch({'type':TYPES.REGIST_FAILED,'error':error})
				console.log(JSON.stringify(error));
			}
		})
	}
}
export function cleanError(){
	return (dispatch)=>{
		dispatch({'type':TYPES.CLEAN_ERROR});
	}

}
export function cleanRequest(){
	return (dispatch)=>{
		dispatch({'type':TYPES.REQUEST_CLEAN});
	}

}
export function registReset(){
	return {
		'type':TYPES.REGIST_RESET,
	}
}



// skip login
export function skipLogin(){
	return {
		'type': TYPES.LOGGED_IN,
		'user': skipUser,
	}
}


// logout
export function logOut(){
	return {
		'type': TYPES.LOGGED_OUT
	}
}