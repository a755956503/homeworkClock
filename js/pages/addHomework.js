/**
 * Created by Administrator on 2017/2/26.
 */
import React,{Component} from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    ActivityIndicator,
    TouchableHighlight
} from 'react-native';
import {connect} from 'react-redux';
import Modal from 'react-native-modalbox';
import DropdownAlert from 'react-native-dropdownalert';
import commonStyle from '../styles/common';
import AddHomeworkStyle from '../styles/addHomework';
import Navbar from '../components/navbar';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import RowCommon from '../components/rowCommon';
import TimePicker from '../components/timePicker';
import * as Tools from '../configs/tools';
import {addHomework,updateHomework} from  '../actions/classes';
import {cleanRequest} from  '../actions/user';
var datasubjects=[];
var datatime = [];
var dataclasses=[];
class AddHomeworkPage extends Component {
    constructor(props) {
        super(props);
        this.toBack = this.toBack.bind(this);
        this.toSubmit1 = this.toSubmit1.bind(this);
    }
    componentWillMount(){
        const {classes,subjects}=this.props;
        for (var i = 0; i < 120; i++)
            datatime[i] = {key: i, label: i + '分钟'};
        for(let i=0;i<subjects.length;i++){
            datasubjects[i]={key:subjects[i].subjectId,label:subjects[i].subjectName};
        }
        if(classes.length){
            for(let i=0;i<classes.length;i++)
                dataclasses[i]={key:classes[i].classId,label:classes[i].className};
        }

        if(this.props.Homework){
            let homework=this.props.Homework;
            console.log(JSON.stringify(this.props.Homework));
            this.state = {
                title:homework.title,
                content: homework.content,
                dataTime: datatime,
                plantime: homework.plantime,
                subjectId:homework.subjectId,
                classId:homework.classId,
                dataSubjects:datasubjects,
                dataClasses:dataclasses,
                assignTime:homework.assignTime,
                homeworkId:homework.homeworkId,
                commitType:"update",
            }
        }else{
            this.state = {
                title:null,
                content: null,
                dataTime: datatime,
                plantime: 30,
                subjectId:1,
                classId:1,
                dataSubjects:datasubjects,
                dataClasses:dataclasses,
                commitType:"add",
            }
        }
        console.log(this.state.commitType);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.requestStatus == 'doing') {
            console.log("22222");
            this.refs.modal.open();
            setTimeout(()=>{
                if(this.refs.modal){
                    const {dispatch}=this.props;
                    dispatch(cleanRequest());
                }

            },3000);
            return false;
        }
        if (nextProps.requestStatus == 'error') {
            this.refs.modal.close();
            return false;
        }
        if (nextProps.requestStatus == 'done') {
            this.refs.modal.close();
            return true;
        }
        if (nextProps.requestStatus == 'success') {
            this.refs.modal.close();
            console.log("222");
            this.dropdown.alertWithType('success', '提示信息', "提交成功！");
            const {dispatch}=this.props;
            dispatch(cleanRequest());
            return false;
        }

        if (nextProps.error) {
            this.dropdown.alertWithType('error', '提示信息', error);
            const {dispatch}=this.props;
            dispatch(cleanError());
            return false;
        }
        return true;
    }

    toBack() {
        const {router}=this.props;
        router.pop();
        console.log("aaa");
    }

    toSubmit1() {
        const {user,router,dispatch}=this.props;;
        if(this.state.commitType=='add'){
            let s="title="+this.state.title+"&content="+this.state.content+"&plantime="+this.state.plantime+"&classId="+this.state.classId;
            s=s+"&subjectId="+this.state.subjectId+"&teacherId="+user.userId;
            console.log("router="+router);
            dispatch(addHomework(s));
            //this.toClasses();
        }else if(this.state.commitType=='update'){
            let s="title="+this.state.title+"&content="+this.state.content+"&plantime="+this.state.plantime+"&classId="+this.state.classId;
            s=s+"&subjectId="+this.state.subjectId+"&teacherId="+user.userId+"&assignTime="+this.state.assignTime+"&homeworkId="+this.state.homeworkId;
            console.log("router="+router);
            dispatch(updateHomework(s));
            //this.toClasses();
        }

    }
    toClasses(){
        const {router,dispatch}=this.props;
        //dispatch(getClasses());
        router.toClasses();
    }

    render() {
        return (
            <View style={AddHomeworkStyle.container}>
                <Navbar title="AddHomework" toBack={this.toBack} toSubmit={this.toSubmit1}></Navbar>
                <View style={AddHomeworkStyle.homeworkForm}>
                    <View style={AddHomeworkStyle.contentView}>
                        <AutoGrowingTextInput style={AddHomeworkStyle.content}
                                              placeholder="请填写内容"
                                              value={this.state.content}
                                              onChangeText={(content) =>this.setState({content: content})}
                                              maxHeight={200}
                        ></AutoGrowingTextInput>
                    </View>
                    <View style={[commonStyle.rowContainer, commonStyle.rowContainerInput]}>
                        <View style={commonStyle.rowTextView}>
                            <TextInput style={commonStyle.rowTextInput}
                                       placeholder="请填写题目"
                                       value={this.state.title}
                                       onChangeText={(title)=>{this.setState({title:title})}}
                            >
                            </TextInput>
                        </View>

                    </View>
                    {/*<RowCommon type="common" text1="班级" onItemPress={this.toClasses.bind(this)} text2={this.props.selectedClassName}></RowCommon>*/}
                    <TimePicker
                        title="班级"
                        data={this.state.dataClasses}
                        dataChange={(option)=> {
                            this.setState({classId: option.key})
                        }}
                        initValue={Tools.getClassNameById(this.props.classes,this.state.classId)}
                        dataValue={Tools.getClassNameById(this.props.classes,this.state.classId)}
                    ></TimePicker>
                    <TimePicker
                                title="科目"
                                data={this.state.dataSubjects}
                                dataChange={(option)=> {
                                    this.setState({subjectId: option.key})
                                }}
                                dataValue={Tools.getSubjectNameById(this.props.subjects,this.state.subjectId)}
                    ></TimePicker>
                    <TimePicker
                                title="预计时间"
                                data={this.state.dataTime}
                                dataChange={(option)=> {
                                    this.setState({plantime: option.key})
                                }}
                                dataValue={this.state.plantime+"分钟"}
                    ></TimePicker>

                </View>
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
                    <Text style={{marginTop:15,fontSize:16,color:'#444444'}}>正在提交...</Text>
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
        classes:store.classesStore.userClasses,
        requestStatus:store.userStore.requestStatus,
        error:store.userStore.error,
        homework:store.classesStore.homework,
        subjects:store.classesStore.subjects,
    }
}
export default connect(select)(AddHomeworkPage);
