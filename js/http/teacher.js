/**
 * Created by Administrator on 2017/2/25.
 */
import * as URLS from './url';
function get(url,callback) {
    let result=fetch(url,{
        headers:{
            'Accept': 'application/json',
            'Content-Type':'application/json',
        }
    }).then((res)=>{
        return res.json();
    }).then((res)=>{
        if(res.flag=='1'){
            callback(res);
        }else if(res.flag=='3'||res.flag=='2'){
            callback(false,res.error);
        }else if(res.error){
            callback(false,res.error);
        }else{
            callback(false,"其他错误");
        }
    })
}
function postJson(url,content,callback) {
    let result=fetch(url,{
        method:'post',
        headers:{
            'Accept': 'application/json',
            'Content-Type':'application/json',
        },
        body:content,
    }).then((res)=>{
        return res.json();
    }).then((res)=>{
        if(res.flag=='1'){
            callback(res);
        }else if(res.flag=='3'||res.flag=='2'){
            callback(false,res.error);
        }else{
            callback(false,"其他错误");
        }
    })
}
function postForm(url,content,callback) {
    let result=fetch(url,{
        method:'post',
        headers:{
            'Accept': 'application/json',
            'Content-Type':'application/x-www-form-urlencoded',
        },
        body:content,
    }).then((res)=>{
        return res.json();
    }).then((res)=>{
        if(res.flag=='1'){
            callback(res);
        }else if(res.flag=='3'||res.flag=='2'){
            callback(false,res.error);
        }else if(res.error){
            callback(false,res.error);
        }else{
            callback(false,"其他错误");
        }
    })
}
export function regist(user,callback){
    let url=URLS.URL_REGIST+"?userName="+user.username+
                            "&password="+user.password+
                            "&phone="+user.phone+
                            "&userRole="+user.userrole;
    console.log(url);
    get(url,callback);
}
export function login(user,callback){
    let url=URLS.URL_LOGIN+"?phone="+user.phone+
                            "&password="+user.password;
    console.log(url);
    get(url,callback);
    
}
export function getClasses(callback) {
    let url=URLS.CLASS_GETALL;
    get(url,callback)
}
export function getUserClasses(teacherId,callback) {
    let url=URLS.CLASS_USERGET+"?teacherId="+teacherId;
    console.log(url);
    get(url,callback)
}
export function addUserClass(teacherId,classId,callback) {
    let url=URLS.CLASS_USERADD+"?teacherId="+teacherId+"&classId="+classId;
    console.log(url);
    get(url,callback)
}
export function deleteUserClass(teacherId,classId,callback) {
    let url=URLS.CLASS_USERDELETE+"?teacherId="+teacherId+"&classId="+classId;
    console.log(url);
    get(url,callback)
}
export function getClassesFirst(callback) {
    let url=URLS.CLASS_GETALL;
    get(url,callback)

}
export function addHomework(item,callback) {
    let url=URLS.HOMEWORK_ADD;
    postForm(url,item,callback);

}
export function updateHomework(item,callback) {
    let url=URLS.HOMEWORK_UPDATE;
    postForm(url,item,callback);

}
export function getHomework(item,callback) {
    let url=URLS.HOMEWORK_AND_NOTIFY_GET;
    url=url+item
    console.log("gethomework"+url);
    get(url,callback);
//     callback({"flag":1,
//         "homeworkList":
//             [{"assignTime":"2017-01-24 15:59:25","classId":1,"content":"古诗歌抄两遍","homeworkId":1,"plantime":30,"subjectId":1,"teacherId":1,"title":"寒假语文作业"},{"assignTime":"2017-01-24 15:54:46","classId":1,"content":"古诗歌抄两遍","homeworkId":2,"plantime":30,"subjectId":1,"teacherId":1,"title":"周末语文作业"}]}
// )
}
export function getSubjects(callback) {
    let url=URLS.SUBJECT_GETALL;
    get(url,callback);
}
export function getStudents(classId,callback) {
    let url=URLS.STUDENTS_GET+"?classId="+classId;
    console.log(url);
    get(url,callback)
}
export function addNotify(item,callback) {
    let url=URLS.NOTIFY_ADD+"?"+item;
    console.log(url);
    get(url,callback);
}
export function updateNotify(item,callback) {
    let url=URLS.NOTIFY_UPDATE+"?"+item;
    console.log(url);
    get(url,callback);

}
// export function updateHomework(item,callback) {
//     let url=URLS.HOMEWORK_UPDATE;
//     postForm(url,item,callback);
//
// }
