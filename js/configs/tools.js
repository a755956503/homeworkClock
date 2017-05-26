/**
 * Created by Administrator on 2017/3/1.
 */
//import moment from 'moment';
export function getWeekday() {
    var date=new Date();
    var weekday = date.getDay();
    var currentday = null;
    if(weekday==1){
        currentday="星期一"
    }
    if(weekday==2){
        currentday="星期二"
    }
    if(weekday==3){
        currentday="星期三"
    }if(weekday==4){
        currentday="星期四"
    }if(weekday==5){
        currentday="星期五"
    }if(weekday==6){
        currentday="星期六"
    }if(weekday==0){
        currentday="星期天"
    }



    return(currentday);
}
export function getDate() {
    var date=new Date();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var seperator1 = "-";
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
    return(currentdate);
}
export function getClassNameById(classes,classId){
    try {
        var item="long";
        if(!classes.length){
            return null;
        }
        for(let i=0;i<classes.length;i++){
            if(classes[i].classId==classId)
                return classes[i].className;
        }
        return null;

    }catch(error){
        return null;
    }

    //class.some();
}
export function getSubjectNameById(subjects,subjectId){
    try {
        var item="long";
        if(!subjects.length){
            return null;
        }
        for(let i=0;i<subjects.length;i++){
            if(subjects[i].subjectId==subjectId)
                return subjects[i].subjectName;
        }
        return null;

    }catch(error){
        return null;
    }

    //class.some();
}
// export function getHourAndMinutes(time) {
//     let reg=
// }
export function getUserNameById(users,userId){
    try {
        var item="long";
        if(!users.length||!userId){
            return null;
        }
        console.log("tools"+userId);
        console.log("tools"+JSON.stringify(users));
        for(let i=0;i<users.length;i++){
            if(users[i].userId==userId){
                console.log(users[i].userName)
                return users[i].userName;
            }
        }
        return null;
    }catch(error){
        return null;
    }

    //class.some();
}
export function getTime(date){
    var item="long";
    if(!date){
        return null;
    }
    //class.some();
}