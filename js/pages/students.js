/**
 * Created by Administrator on 2017/2/28.
 */
/**
 * Created by Administrator on 2017/2/27.
 */
import React,{Component} from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    ListView,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import Modal from 'react-native-modalbox';
import DropdownAlert from 'react-native-dropdownalert';

import {cleanError,cleanRequest} from '../actions/user';
import commonStyle from '../styles/common';
import ClassStyle from '../styles/classes';
import Navbar from '../components/navbar';
import ClassesPicker from '../components/classesPicker';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import ListStudents from '../components/listStudents';
import {getUserClasses,getStudents} from '../actions/classes';
import TimePicker from '../components/timePicker';
import * as Tools from '../configs/tools';

var dataclasses=[];
class StudentsPage extends Component{
    constructor(props){
        super(props);
        let index = 0;
        const {userClasses}=this.props;
        if(userClasses.length){
            for(let i=0;i<userClasses.length;i++)
                dataclasses[i]={key:userClasses[i].classId,label:userClasses[i].className};
        }
        this.state={
            classValue:"班级",
            classId:"",
            dataClasses:dataclasses,
        }
        this.toBack=this.toBack.bind(this);
        this.toAddClass=this.toAddClass.bind(this);
        this.onClassChange=this.onClassChange.bind(this);
    }
    shouldComponentUpdate(nextProps,nextState){
        if(nextProps.requestStatus=='doing'){
            console.log("test doging")
            this.refs.modal.open();
            setTimeout(()=>{
                if(this.refs.modal){
                    const {dispatch}=this.props;
                    dispatch(cleanRequest());
                }

            },5000);
            return true;
        }
        if(nextProps.requestStatus=='done'){
            console.log("test done")
            this.refs.modal.close();
            // const {dispatch}=this.props;
            // dispatch(cleanRequest());
            return true;
        }
        if(nextProps.requestStatus==null){
            this.refs.modal.close();
            // const {dispatch}=this.props;
            // dispatch(cleanRequest());
            return true;
        }
        if(nextProps.requestStatus=='success'||nextProps.requestStatus=='error'){
            console.log("success error")
            this.refs.modal.close();
        }
        if(nextProps.message){
            this.refs.modal.close();
            console.log(nextProps.message);
            this.dropdown.alertWithType('success','提示信息',nextProps.message);
            const {dispatch}=this.props;
            dispatch(cleanRequest());
            return false;
        }
        if(nextProps.error){
            this.refs.modal.close()
            console.log(nextProps.error);
            this.dropdown.alertWithType('error','提示信息',nextProps.error);
            const {dispatch}=this.props;
            dispatch(cleanRequest());
            return false;
        }
        return true;
    }
    componentWillMount(){
        const {dispatch,userClasses,user}=this.props;
        dispatch(getUserClasses(user.userId));
    }
    toBack(){
        const {router}=this.props;
        router.pop();
    }
    toAddClass(){
        this.dropdown.alertWithType('info','提示信息',"对不起，您没有添加学生的权限！");
    }
    onClassChange(option){
        this.setState({classId: option.key});
        const {dispatch}=this.props;
        dispatch(getStudents(option.key));
    }
    render(){
        let navWidth=Dimensions.get('window').width;
        let topHeight=Dimensions.get('window').height;
        let stickHeight=Dimensions.get('window').height*0.1;
        var main=null;
        if(JSON.stringify(this.props.students)!="{}"&&this.props.students)
            main=<ListStudents students={this.props.students}></ListStudents>;
        else
            main=<View style={commonStyle.commonTextView}><Text style={commonStyle.commonText}>还没有学生</Text></View>
        return (
            <View style={ClassStyle.container}>
                <Navbar title="Classes"  toBack={this.toBack} toAddClass={this.toAddClass}></Navbar>
                <TimePicker
                    title="班级"
                    data={this.state.dataClasses}
                    dataChange={(option)=>{this.onClassChange(option)}}
                    initValue={Tools.getClassNameById(this.props.userClasses,this.state.classId)}
                    dataValue={Tools.getClassNameById(this.props.userClasses,this.state.classId)}
                ></TimePicker>
                {main}
                <Modal
                    style={commonStyle.modal}
                    ref='modal'
                    isOpen={false}
                    animationDuration={0}
                    position={"center"}
                >
                    <ActivityIndicator
                        size='large'
                    />
                    <Text style={{marginTop:15,fontSize:16,color:'#444444'}}>正在加载数据...</Text>
                </Modal>

                <DropdownAlert
                    ref={(ref) => this.dropdown = ref} closeInterval={3000} showCancel={true}></DropdownAlert>
            </View>

        )
    }
}
function select(store) {
    return {
        user: store.userStore.user,
        userClasses:store.classesStore.userClasses,
        requestStatus:store.userStore.requestStatus,
        error:store.userStore.error,
        message:store.userStore.message,
        students:store.classesStore.students,
    }
}
export default connect(select)(StudentsPage);

