/**
 * Created by Administrator on 2017/2/25.
 */
'use strict';
import React, { Component } from 'react';
import {
    Text,
    View,
    Platform,
    TextInput,
    Image,
    Alert,
    ActivityIndicator,
} from 'react-native';

import { connect } from 'react-redux';
import DatePicker from '../components/datePicker';
import SexPicker from '../components/sexPicker';
import Modal from 'react-native-modalbox';
import Spinner from 'react-native-spinkit';
import DropdownAlert from 'react-native-dropdownalert';

import { logIn, skipLogin,registIn,registReset} from '../actions/user';

import commonStyle from '../styles/common';
import loginStyle from '../styles/regist';


class RegistPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            userName: null,
            password: null,
            passwordDefine:null,
            phone:null,
            btnFlag: true,
            birth:'2017-01-01',
            sex:1,
        };
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePswd = this.onChangePswd.bind(this);
        this.onChangePswdDefine = this.onChangePswdDefine.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onDateChange=this.onDateChange.bind(this);
        this.onSexChange=this.onSexChange.bind(this);
        this.handleReturn = this.handleReturn.bind(this);
        this.handleRegister = this.handleRegister.bind(this);

    }

    shouldComponentUpdate(nextProps, nextState){

        if(nextProps.status == 'doing'){
            //loggining
            this.refs.modal.open();
            setTimeout(()=>{
                if(this.refs.modal){
                    const {dispatch}=this.props;
                    dispatch(registReset());
                    this.refs.modal.close();
                }

            },5000);
            return false;
        }else if(nextProps.status == 'done'){
            this.refs.modal.close();
            this.dropdown.alertWithType('success','提示信息','注册成功!即将跳转页面');
            const {dispatch}=this.props;
            dispatch(registReset());
            setTimeout(()=>{
                const {router}=this.props;
                router.toMain();
            },3000);
            return false;

        }else if(nextProps.status=='reset'){
            this.refs.modal.close();
        }else if(nextProps.status=='error'){
            this.refs.modal.close();
        }
        if(nextProps.error){
            this.dropdown.alertWithType('error','提示信息',nextProps.error);
            const {dispatch}=this.props;
            dispatch(cleanError());

        }

        return true;
    }


    handleReturn(){
        const {router}=this.props;
        router.pop();
    }

    handleRegister(){
        var regexp1=/^[a-zA-Z][\w]{7,31}$/;
        var regexp2=/^1[34578][\d]{9}$/;
        if(this.state.password!=this.state.passwordDefine||this.state.password==null){
            this.dropdown.alertWithType('info','填写错误',"两次密码输入不相同！");
        }else if(!this.state.password.match(regexp1)){
            this.dropdown.alertWithType('info','填写错误',"密码需要首字母开头并且不少于8位!");
        }else if(!this.state.phone.match(regexp2)){
            this.dropdown.alertWithType('info','填写错误',"请输入正确的手机号！");
        } else{
            // const {dispatch} = this.props;
            // dispatch(registIn({'username':this.state.username,'password':this.state.password,'phone':this.state.phone,
            //                    'birth':this.state.birth,'sex':this.state.sex};
            // ));
            const {dispatch} = this.props;
            dispatch(registIn({'username':this.state.userName,'password':this.state.password,
                    'phone':this.state.phone,'userrole':1
                }
            ));
        }


    }

    onChangeName(text){
        this.setState({'userName': text});
    }

    onChangePswd(text){
        this.setState({'password': text});
    }
    onChangePswdDefine(text) {
        this.setState({'passwordDefine':text});
    }
    onChangePhone(text){
        this.setState({'phone':text});
        //alert(this.state.birth);
    }
    onDateChange(date){
        this.setState({birth: date});
        //alert(this.state.birth);
    }
    onSexChange(sex){
        this.setState({'sex':Number(sex)});
    }


    render(){
        return (
            <View style={[commonStyle.wrapper, loginStyle.loginWrap]}>
                <Image source={require('../imgs/icons/bg.png')} style={{resizeMode: 'stretch'}}>
                    <View style={loginStyle.loginMain}>
                        <View style={loginStyle.loginMainCon}>
                            <View style={loginStyle.comCulture}>
                                <Text style={[commonStyle.textCenter,{color:'#ccc',fontSize:30}]}>注    册</Text>
                            </View>
                            <View style={loginStyle.formStyle}>
                                <View style={[loginStyle.formInput,loginStyle.formInputSplit]}>
                                    <Image source={require('../imgs/icons/user.png')} style={{width:25,height:35,resizeMode: 'contain'}}/>
                                    <TextInput
                                        ref="login_name"
                                        placeholder='用户名'
                                        style={loginStyle.loginInput}
                                        onChangeText={this.onChangeName} />
                                </View>
                                <View style={[loginStyle.formInput,loginStyle.formInputSplit]}>
                                    <Image source={require('../imgs/icons/passicon.png')} style={{width:25,height:35,resizeMode: 'contain'}}/>
                                    <TextInput
                                        ref="login_psw"
                                        style={loginStyle.loginInput}
                                        secureTextEntry={true}
                                        placeholder='密码'
                                        onChangeText={this.onChangePswd} />
                                </View>
                                <View style={[loginStyle.formInput,loginStyle.formInputSplit]}>
                                    <Image source={require('../imgs/icons/passicon.png')} style={{width:25,height:35,resizeMode: 'contain'}}/>
                                    <TextInput
                                        ref="login_psw"
                                        style={loginStyle.loginInput}
                                        secureTextEntry={true}
                                        placeholder='确认密码'
                                        onChangeText={this.onChangePswdDefine} />
                                </View>
                                <View style={[loginStyle.formDate,loginStyle.formInputSplit]}>
                                    <Text>生日：</Text>
                                    <DatePicker dateChange={this.onDateChange} date={this.state.birth}/>
                                </View>
                                <View style={[loginStyle.formDate,loginStyle.formInputSplit]}>
                                    <Text>性别：</Text>
                                    <SexPicker sexChange={this.onSexChange} sex={this.state.sex}/>
                                </View>

                                <View style={loginStyle.formInput}>
                                    <Image source={require('../imgs/icons/user.png')} style={{width:25,height:35,resizeMode: 'contain'}}/>
                                    <TextInput
                                        ref="login_psw"
                                        style={loginStyle.loginInput}
                                        placeholder='电话号码'
                                        onChangeText={this.onChangePhone} />
                                </View>
                            </View>

                        </View>
                        <View style={loginStyle.btn}>
                            <View style={loginStyle.btnWrap}>
                                <Text style={loginStyle.loginBtn1} onPress={this.handleReturn}>返  回</Text>
                            </View>
                            <View style={loginStyle.btnWrap}>
                                <Text style={loginStyle.loginBtn2} onPress={this.handleRegister}>提  交</Text>
                            </View>
                        </View>

                    </View>
                </Image>

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
                    <Text style={{marginTop:15,fontSize:16,color:'#444444'}}>注册中...</Text>
                </Modal>
                <DropdownAlert
                        ref={(ref) => this.dropdown = ref} closeInterval={3000} showCancel={true}></DropdownAlert>

            </View>

        );
    }
}



function select(store){
    return {
        isLoggedIn: store.userStore.isLoggedIn,
        user: store.userStore.user,
        status: store.userStore.registStatus,
        error: store.userStore.error,
    }
}


export default connect(select)(RegistPage);



