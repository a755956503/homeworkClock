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
    ScrollView,
    ActivityIndicator,
    Alert,
} from 'react-native';
import {connect} from 'react-redux';
import commonStyle from '../styles/common';
import ClassStyle from '../styles/classes';
import Navbar from '../components/navbar';

import ListClasses from '../components/listClasses';
import FoldView from '../components/foldView';
import Modal from 'react-native-modalbox';
import DropdownAlert from 'react-native-dropdownalert';
import {cleanError,cleanRequest} from '../actions/user';
import {getClasses,setSelectedClass,getUserClasses,addUserClass,deleteUserClass} from '../actions/classes';
import RowCommon from '../components/rowCommon';




//var p=null;
class ClassesPage extends Component{

    constructor(props){
        super(props);
        //let s=null;
        // try{
        //     getClassesFirst((success,error)=> {
        //         if (success) {
        //             s=success.classes;
        //             //console.log("ccc" + JSON.stringify(s));
        //             //this.setState({classes:success.classes});
        //             // this.props= {
        //             //     classes: s,
        //             // }
        //
        //         }
        //     });
        // }catch(error){
        // }


        //console.log("ppp"+this.props.classes);
        // this.state={
        //     classes:[{"classId":1,"className":"初一一班"},{"classId":2,"className":"初一二班"},{"classId":3,"className":"初一三班"}],
        // };
            //console.log("bbb"+JSON.stringify(this.state.classes));

        this.toBack=this.toBack.bind(this);
        this.toAddClass=this.toAddClass.bind(this);
        this.onItemPress=this.onItemPress.bind(this);
        this.loadDatas=this.loadDatas.bind(this);
        this.onItemDefine=this.onItemDefine.bind(this);
        this.onDelete=this.onDelete.bind(this);
        this.onDeleteDefine=this.onDeleteDefine.bind(this);

    }
    // componentWillMount(){
    //     this.loadDatas();
    //
    //
    // }
    componentWillMount(){
        this.loadDatas();
        // if(!this.props.classses){
        //     this.loadDatas();
        //     console.log("aaa"+JSON.stringify(this.props.classes));
        //     //this.setState({classes:this.props.classes});
        // }
        // return true;
        //this.refs.modal.open();
    }
    shouldComponentUpdate(nextProps,nextState){
        if(nextProps.requestStatus=='doing'){
            console.log("test doging")
            this.refs.modal.open();
            setTimeout(()=>{
                if(this.refs.modal){
                    this.refs.modal.close();
                    const {dispatch}=this.props;
                    dispatch(cleanRequest());
                }


            },3000);
            return false;
        }
        if(nextProps.requestStatus=='done'){
            console.log("test done");
            this.refs.modal.close();
            return true;
            const {dispatch}=this.props;
            dispatch(cleanRequest());
        }
        // if(nextProps.requestStatus==null){
        //     this.refs.modal.close();
        //     // const {dispatch}=this.props;
        //     // dispatch(cleanRequest());
        //     return true;
        // }
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
        // if(nextProps.classes){
        //     this.refs.modal.close();
        //     console.log("lll"+JSON.stringify(nextProps.classes));
        //     return true;
        // }
        return false;
    }
    toBack(){
        const {router}=this.props;
        router.pop();
    }
    toAddClass(){
        this.dropdown.alertWithType('info','提示信息',"对不起，您没有添加班级的权限！");
    }
    onItemCancel(){

    }
    onDelete(item){
        Alert.alert(
            '注意',
            '您确定删除绑定这个班级吗？',
            [
                {text:'取消'},
                {text:"确定",onPress:()=>{this.onDeleteDefine(item)}}
            ]
        );
    }
    onDeleteDefine(item){
        const {dispatch,user}=this.props;
        dispatch(deleteUserClass(user.userId,item.classId));
    }
    onItemDefine(item){
        console.log("jjj"+JSON.stringify(item))
        const {dispatch,user}=this.props;
        // dispatch(setSelectedClass(item));
        dispatch(addUserClass(user.userId,item.classId));
        //dispatch(getUserClasses(user.userId));

    }
    onItemPress(item){
        Alert.alert(
            '注意',
            '您确定绑定这个班级吗？',
            [
                {text:'取消'},
                {text:"确定",onPress:()=>{this.onItemDefine(item)}}
            ]
            );
    }
    loadDatas(){
        const {dispatch,classes,user}=this.props;
        if(!classes){
            dispatch(getClasses());
        }
        dispatch(getUserClasses(user.userId));
    }
    render(){
        let navWidth=Dimensions.get('window').width;
        let topHeight=Dimensions.get('window').height;
        let stickHeight=Dimensions.get('window').height*0.1;
       console.log("length"+this.props.userClasses.length);
        console.log(this.props.userClasses.length>0);
        var userclass,allclass;
        if(this.props.userClasses.length>0){
            userclass=<FoldView title="已绑定班级">
                <ListClasses datas={this.props.userClasses}itemPress={this.onDelete}/>
            </FoldView>
        }else {userclass=<View style={commonStyle.commonTextView}><Text style={commonStyle.commonText}>您还没有绑定班级</Text></View>}
        if(this.props.classes.length>0){
            allclass=<FoldView title="全部班级">
                <ListClasses datas={this.props.classes} itemPress={this.onItemPress}/>
            </FoldView>
        }else{
            allclass=<View style={commonStyle.commonTextView}><Text style={commonStyle.commonText}>该校还没有添加班级或者服务器崩溃了</Text></View>
        }
        return (
            <View style={ClassStyle.container}>
                <Navbar title="Classes"  toBack={this.toBack} toAddClass={this.toAddClass}></Navbar>
                {userclass}
                {allclass}
                <Modal
                    style={commonStyle.modal}
                    ref='modal'
                    isOpen={this.props.requestStatus=='doing'?true:false}
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

        )}
}
function select(store) {
    return {
        user: store.userStore.user,
        classes:store.classesStore.classes,
        selcetedClass:store.classesStore.selectedClass,
        selectedClassName:store.classesStore.selectedClass.className,
        userClasses:store.classesStore.userClasses,
        requestStatus:store.userStore.requestStatus,
        error:store.userStore.error,
        message:store.userStore.message,
}
}
export default connect(select)(ClassesPage);

