/**
 * Created by Administrator on 2017/2/27.
 */
import * as TYPES from './types';
import * as TEACHER from '../http/teacher';
export function getClasses() {
    return(dispatch=>{
        dispatch({'type':TYPES.REQUEST_DOING})
        TEACHER.getClasses((success,error)=>{
            if(success){
                dispatch({'type':TYPES.CLASS_GETALL_SUCCESS,classes:success.classes});
                console.log("a"+JSON.stringify(success.classes));
                dispatch({'type':TYPES.REQUEST_DONE});
            }else{
                dispatch({'type':TYPES.REQUEST_ERROR,error:error})
            }
        });
    })
    
}
export function getUserClasses(teacherId) {
    return(dispatch=>{
    dispatch({'type':TYPES.REQUEST_DOING})
    TEACHER.getUserClasses(teacherId,(success,error)=>{
        if(success){
            dispatch({'type':TYPES.CLASSES_USER_GET_SUCCESS,userClasses:success.classList});
            console.log(JSON.stringify(success.classList));
            dispatch({'type':TYPES.REQUEST_DONE});
        }else{
            dispatch({'type':TYPES.REQUEST_ERROR,error:error})
        }
    });
})
}
export function addUserClass(teacherId,classId) {
    return(dispatch=>{
        dispatch({'type':TYPES.REQUEST_DOING})
        TEACHER.addUserClass(teacherId,classId,(success,error)=>{
            if(success){
                TEACHER.getUserClasses(teacherId,(success,error)=>{
                    if(success){
                        dispatch({'type':TYPES.CLASSES_USER_GET_SUCCESS,userClasses:success.classList});
                    }else{
                        dispatch({'type':TYPES.REQUEST_ERROR,error:error})
                    }
                });
                dispatch({'type':TYPES.REQUEST_SUCCESS,message:'绑定成功！'});
                //dispatch(getUserClasses(teacherId));
                // console.log(JSON.stringify(success.classList));
                // dispatch({'type':TYPES.REQUEST_DONE});
            }else{
                dispatch({'type':TYPES.REQUEST_ERROR,error:error})
            }
        });
    })
}
export function deleteUserClass(teacherId,classId) {
    return(dispatch=>{
        dispatch({'type':TYPES.REQUEST_DOING})
        TEACHER.deleteUserClass(teacherId,classId,(success,error)=>{
            if(success){
                TEACHER.getUserClasses(teacherId,(success,error)=>{
                    if(success){
                        dispatch({'type':TYPES.CLASSES_USER_GET_SUCCESS,userClasses:success.classList});
                    }else{
                        dispatch({'type':TYPES.REQUEST_ERROR,error:error})
                    }
                });
                dispatch({'type':TYPES.REQUEST_SUCCESS,message:"删除成功！"});
                //dispatch(getUserClasses(teacherId));
                //console.log(JSON.stringify(success.classList));
                // dispatch({'type':TYPES.REQUEST_DONE});
            }else{
                dispatch({'type':TYPES.REQUEST_ERROR,error:error})
            }
        });
    })
}
export function setSelectedClass(item) {
    return(dispatch=>{
        dispatch({'type':TYPES.CLASSES_SELECT_SUCCESS,selectedClass:item});
    })
}
export function addHomework(item) {
        return(dispatch=>{
            dispatch({'type':TYPES.REQUEST_DOING})
            TEACHER.addHomework(item,(success,error)=>{
                if(success){
                    //dispatch({'type':TYPES.CLASSES_ADDHOMEWORK_SUCCESS});
                    dispatch({'type':TYPES.REQUEST_SUCCESS});
                    console.log("11")
                }else{
                    dispatch({'type':TYPES.REQUEST_ERROR,error:error})
                }
            })
        })
}
export function updateHomework(item) {
    return(dispatch=>{
        dispatch({'type':TYPES.REQUEST_DOING})
        TEACHER.updateHomework(item,(success,error)=>{
            if(success){
                //dispatch({'type':TYPES.CLASSES_ADDHOMEWORK_SUCCESS});
                dispatch({'type':TYPES.REQUEST_SUCCESS});
                console.log("11")
            }else{
                dispatch({'type':TYPES.REQUEST_ERROR,error:error})
            }
        })
    })
}
export function getHomework(item,today) {
    return(dispatch=>{
        dispatch({'type':TYPES.REQUEST_DOING})
        TEACHER.getHomework(item,(success,error)=>{
            if(success){
                console.log(JSON.stringify(success.notificationInfos));
                if(today)
                    dispatch({'type':TYPES.CLASSES_GETHOMEWORK_TODAY_SUCCESS,homeworksToday:success.homeworkInfos,notifiesToday:success.notificationInfos});
                else
                    dispatch({'type':TYPES.CLASSES_GETHOMEWORK_SUCCESS,homeworks:success.homeworkInfos,notifies:success.notificationInfos});
                dispatch({'type':TYPES.REQUEST_DONE});
            }
        })
    })
}
// export function getInitDate(item,userId) {
//         var classes,subjects,homeworksToday,notifiesToday,userClasses;
//         TEACHER.getClasses((success,error)=>{
//             if(success){
//                 console.log("initdata"+success.classes);
//                 classes=success.classes;
//                 //dispatch({'type':TYPES.CLASS_GETALL_SUCCESS,classes:success.classes});
//                 TEACHER.getSubjects((success,error)=>{
//                     if(success){
//                         subjects=success.subjectList;
//                         //dispatch({'type':TYPES.CLASSES_GETSUBJECT_SUCCESS,subjects:success.subjectList});
//                         TEACHER.getHomework(item,(success,error)=>{
//                             if(success){
//                                 console.log(JSON.stringify(success.notificationInfos));
//                                 homeworksToday=success.homeworkInfos;
//                                 notifiesToday=success.notificationInfos;
//                                 // dispatch({'type':TYPES.CLASSES_GETHOMEWORK_TODAY_SUCCESS,homeworksToday:success.homeworkInfos,notifiesToday:success.notificationInfos});
//                                 TEACHER.getUserClasses(userId,(success,error)=>{
//                                     if(success){
//                                         userClasses=success.classList;
//                                         // dispatch({'type':TYPES.CLASSES_USER_GET_SUCCESS,userClasses:success.classList});
//
//
//                                     }
//                                 })
//                             }
//                         })
//                     }
//                 })
//                 console.log("a"+JSON.stringify(success.classes));
//             }else{
//             }
//         });
//     return ({'type':TYPES.CLASSES_GETINITDATA_SUCCESS,
//         classes:classes,
//         subjects:subjects,
//         homeworksToday:homeworksToday,
//         notifiesToday:notifiesToday,
//         userClasses:userClasses
//
//     });
//
//
// }
export function getInitDate(item,userId) {
    return(dispatch=>{
        var classes,subjects,homeworksToday,notifiesToday,userClasses;
        TEACHER.getClasses((success,error)=>{
            if(success){
                console.log("initdata"+success.classes);
                classes=success.classes;
                //dispatch({'type':TYPES.CLASS_GETALL_SUCCESS,classes:success.classes});
                TEACHER.getSubjects((success,error)=>{
                    if(success){
                        subjects=success.subjectList;
                        //dispatch({'type':TYPES.CLASSES_GETSUBJECT_SUCCESS,subjects:success.subjectList});
                        TEACHER.getHomework(item,(success,error)=>{
                            if(success){
                                console.log(JSON.stringify(success.notificationInfos));
                                homeworksToday=success.homeworkInfos;
                                notifiesToday=success.notificationInfos;
                                // dispatch({'type':TYPES.CLASSES_GETHOMEWORK_TODAY_SUCCESS,homeworksToday:success.homeworkInfos,notifiesToday:success.notificationInfos});
                                TEACHER.getUserClasses(userId,(success,error)=>{
                                    if(success){
                                        userClasses=success.classList;
                                        // dispatch({'type':TYPES.CLASSES_USER_GET_SUCCESS,userClasses:success.classList});
                                        return dispatch({'type':TYPES.CLASSES_GETINITDATA_SUCCESS,
                                            classes:classes,
                                            subjects:subjects,
                                            homeworksToday:homeworksToday,
                                            notifiesToday:notifiesToday,
                                            userClasses:userClasses

                                        });

                                    }
                                })
                            }
                        })
                    }
                })
                console.log("a"+JSON.stringify(success.classes));
            }else{
            }
        });

    })


}
export function getSubjectsAndClasses() {
    return(dispatch=>{
        dispatch({'type':TYPES.REQUEST_DOING})
        TEACHER.getClasses((success,error)=>{
            if(success){
                dispatch({'type':TYPES.CLASS_GETALL_SUCCESS,classes:success.classes});
                TEACHER.getSubjects((success,error)=>{
                    if(success){
                        dispatch({'type':TYPES.CLASSES_GETSUBJECT_SUCCESS,subjects:success.subjectList});
                    }
                })
                console.log("a"+JSON.stringify(success.classes));
                dispatch({'type':TYPES.REQUEST_DONE});
            }else{
                dispatch({'type':TYPES.REQUEST_ERROR,error:error})
            }
        });
    })
}
export function getStudents(classId) {
    return(dispatch=>{
        dispatch({'type':TYPES.REQUEST_DOING})
        TEACHER.getStudents(classId,(success,error)=>{
            if(success){
                dispatch({'type':TYPES.CLASSES_GETSTUDENTS_SUCCESS,students:success.students});
                console.log("students"+JSON.stringify(success.students));
                dispatch({'type':TYPES.REQUEST_DONE});
            }else{
                dispatch({'type':TYPES.REQUEST_ERROR,error:error})
            }
        });
    })
}
export function addNotify(item) {
    return(dispatch=>{
        dispatch({'type':TYPES.REQUEST_DOING})
        TEACHER.addNotify(item,(success,error)=>{
            if(success){
                //dispatch({'type':TYPES.CLASSES_ADDHOMEWORK_SUCCESS});
                dispatch({'type':TYPES.REQUEST_SUCCESS});
                console.log("11")
            }else{
                dispatch({'type':TYPES.REQUEST_ERROR,error:error})
            }
        })
    })
}
export function updateNotify(item) {
    return(dispatch=>{
        dispatch({'type':TYPES.REQUEST_DOING})
        TEACHER.updateNotify(item,(success,error)=>{
            if(success){
                //dispatch({'type':TYPES.CLASSES_ADDHOMEWORK_SUCCESS});
                dispatch({'type':TYPES.REQUEST_SUCCESS});
                console.log("11")
            }else{
                dispatch({'type':TYPES.REQUEST_ERROR,error:error})
            }
        })
    })
}
