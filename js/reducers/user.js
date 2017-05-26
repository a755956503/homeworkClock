'use strict';

import * as TYPES from '../actions/types';

const initialState = {
	isLoggedIn: false,
	user: {},
	status: null,
	error:null,
	message:null,
	registStatus:null,
	requestStatus:null,
};
// 		case:
// 			return {
//
// 			};


export default function user(state=initialState, action){

	switch(action.type){
		case TYPES.LOGGED_DOING:
			return {
				...state,
				status: 'doing'
			};
		case TYPES.REQUEST_DOING:{
			console.log("request doing");
			return {
				...state,
				requestStatus:'doing'
			};
		}

		case TYPES.REQUEST_DONE: {
			console.log("333")
			return {
				...state,
				requestStatus:'done'
			};
		}

		case TYPES.REQUEST_ERROR:
		{
			console.log("reducer"+action.error);
			return {
				...state,
                requestStatus:'error',
				error:action.error,
			};
		}
		case TYPES.REQUEST_SUCCESS:{
			console.log("reducer"+action.message);
			return {
				...state,
				requestStatus:'success',
				message:action.message,
			};
		}

		case TYPES.REQUEST_CLEAN:
			return {
				...state,
				requestStatus:null,
				error:null,
				message:null,
			};
        case TYPES.CLEAN_ERROR:
            return {
                ...state,
				status: null,
				error:null,
				message:null,
            }

		case TYPES.LOGGED_IN:
			return {
				...state,
				isLoggedIn: true,
				user: action.user,
				status: 'done'
			};

		case TYPES.LOGGED_OUT:
			return {
				...state,
				isLoggedIn: false,
				user: {},
				status: null
			};
		case TYPES.LOGGED_ERROR:
			return {
				...state,
				isLoggedIn: false,
				user: {},
				error:action.error,
				status: 'error'
			};

		case TYPES.REGIST_DOING:
			return {
				...state,
				registStatus:'doing',
			};
		case TYPES.REGIST_SUCCESS:
			return {
				...state,
				registStatus:'done',
				user:action.user,
			};
		case TYPES.REGIST_FAILED:
			return {
				...state,
				registStatus:'error',
				error:action.error,
			}
		case TYPES.REGIST_RESET:
			return {
				...state,
				registStatus:'reset',
			}
		default: 
			return state;
	}

}