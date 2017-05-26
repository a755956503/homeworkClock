/**
 * Created by Administrator on 2017/2/27.
 */
import * as TYPES from '../actions/types';
const initialState={
    classes:null,
    selectedClass:{
        "classId":2,
        "className":"初一一班"
    },
    userClasses:null,
    homeworks:null,
    homeworksToday:null,
    homework:null,
    subjects:null,
    students:null,
    notifies:null,
    notifiesToday:null,
}
// 		case:
// 			return {
//
// 			};
export default function classes(state=initialState,action){
    switch(action.type){
        case TYPES.CLASSES_REQUEST:
            return{
                ...state,
                status:'doing',
            };
        case TYPES.CLASS_GETALL_SUCCESS:
        {
     //       console.log("rrr"+JSON.stringify(action.classes));
            return{
                ...state,
                classes:action.classes,
            };
        }
        case TYPES.CLASSES_USER_GET_SUCCESS: {
            console.log("rrr"+JSON.stringify(action.userClasses));
            return {
                ...state,
                userClasses: action.userClasses,
            };
        }
        case TYPES.CLASSES_SELECT_SUCCESS: {
            //console.log("rrr"+JSON.stringify(action.classes));
            return {
                ...state,
                selectedClass: action.selectedClass,
            };
        }
        case TYPES.CLASSES_ADDHOMEWORK_SUCCESS:
			return {
                ...state,
			};
        case TYPES.CLASSES_GETHOMEWORK_SUCCESS:
			return {
                ...state,
                homeworks:action.homeworks,
                notifies:action.notifies,
			};
        case TYPES.CLASSES_GETHOMEWORK_TODAY_SUCCESS:
            return {
                ...state,
                homeworksToday:action.homeworksToday,
                notifiesToday:action.notifiesToday,
            };
        case TYPES.CLASSES_GETSUBJECT_SUCCESS:
			return {
                ...state,
                subjects:action.subjects,
			};
        case TYPES.CLASSES_GETSTUDENTS_SUCCESS:
            return {
                ...state,
                students:action.students,
            };
        case TYPES.CLASSES_GETINITDATA_SUCCESS:
            return{
                ...state,
                subjects:action.subjects,
                homeworksToday:action.homeworksToday,
                notifiesToday:action.notifiesToday,
                userClasses:action.userClasses

            };
        default:
            return state;
    }
}