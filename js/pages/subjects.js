/**
 * Created by Administrator on 2017/3/5.
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
import {cleanError} from '../actions/user';
import {getClasses,setSelectedClass} from '../actions/classes';
import RowCommon from '../components/rowCommon';




//var p=null;
class SubjectsPage extends Component{

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

    }
    componentWillMount(){
        this.loadDatas();


    }
    componentDidMount(){
        // if(!this.props.classses){
        //     this.loadDatas();
        //     console.log("aaa"+JSON.stringify(this.props.classes));
        //     //this.setState({classes:this.props.classes});
        // }
        // return true;
        //this.refs.modal.open();
    }
    shouldCompoentUpdate(nextProps,nextState){
        if(nextProps.requestStatus=='doing'){
            this.refs.modal.open();
            setTimeout(()=>{
                this.refs.modal.close();
            },8000);
            return false;
        }
        if(nextProps.requestStatus=='done'||nextProps.requestStatus=='error'){
            this.refs.modal.close();
        }
        if(nextProps.error){
            this.dropdown.alertWithType('error','提示信息',error);
            const {dispatch}=this.props;
            dispatch(cleanError());
            return false;
        }
        // if(nextProps.classes){
        //     this.refs.modal.close();
        //     console.log("lll"+JSON.stringify(nextProps.classes));
        //     return true;
        // }
        return true;
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
    onItemDefine(item){
        console.log("jjj"+JSON.stringify(item))
        const {dispatch}=this.props;
        dispatch(setSelectedClass(item));
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
        const {dispatch,classes}=this.props;
        dispatch(getClasses());
    }
    render(){
        let navWidth=Dimensions.get('window').width;
        let topHeight=Dimensions.get('window').height;
        let stickHeight=Dimensions.get('window').height*0.1;
        return (
            <View style={ClassStyle.container}>
                <Navbar title="Classes"  toBack={this.toBack} toAddClass={this.toAddClass}></Navbar>
                <RowCommon type="commonNoPress" text1="当前绑定班级" text2={this.props.selectedClassName}></RowCommon>
                <FoldView title="全部班级">
                    <ListClasses datas={this.props.classes} itemPress={this.onItemPress}/>
                </FoldView>
                <Modal
                    style={commonStyle.modal}
                    ref='modal'
                    isOpen={this.props.status=='doing'?true:false}
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
    }
}
export default connect(select)(SubjectsPage);

