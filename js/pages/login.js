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

import Modal from 'react-native-modalbox';
import Spinner from 'react-native-spinkit';

import { logIn, skipLogin,cleanError} from '../actions/user';

import commonStyle from '../styles/common';
import loginStyle from '../styles/login';
import DropdownAlert from 'react-native-dropdownalert';


class LoginPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            phone: null,
            password: null,
            btnFlag: true,
        };
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePswd = this.onChangePswd.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState){

        if(nextProps.isLoggedIn != this.props.isLoggedIn && nextProps.isLoggedIn === true){
            //will redirect
            
            this.refs.modal.close();
            console.log(JSON.stringify(this.props.user));
            this.toMain();
            return false;
        }
        if(nextProps.status == 'doing'){
            //loggining
            console.log("ffff");
            this.refs.modal.open();
            setTimeout(()=>{
                if(this.refs.modal){
                    const {dispatch}=this.props;
                    dispatch(cleanError());
                    this.refs.modal.close();
                }

                //this.dropdown.alertWithType('error','填写错误',"网络错误！");

            },5000)
            return false;
        }
        if(nextProps.status=='done'||nextProps.status=='error'){
            this.refs.modal.close();
            if(nextProps.error){
                this.dropdown.alertWithType('error','填写错误',nextProps.error);
                const {dispatch}=this.props;
                dispatch(cleanError());

            }
            return false;
        }

        return true;
    }

    toMain(){
        const {router} = this.props;
        router.toMain();
    }

    handleLogin(){
        if(!this.state.phone || !this.state.password){
            this.dropdown.alertWithType('info','填写错误',"请输入用户名或密码！");
            return;
        }
        let opt = {
            'phone': this.state.phone,
            'password': this.state.password,
        };
        this.props.dispatch(logIn(opt));
    }

    handleRegister(){
        const {router} = this.props;
        router.toRegist();
    }

    onChangeName(text){
        this.setState({'phone': text});
    }

    onChangePswd(text){
        this.setState({'password': text});
    }


    render(){
        console.log("1111"+this.props.status)
        return (
          <View style={[commonStyle.wrapper, loginStyle.loginWrap]}>
            <Image source={require('../imgs/icons/bg.png')} style={{resizeMode: 'stretch'}}>
                <View style={loginStyle.loginMain}>
                    <View style={loginStyle.loginMainCon}>
                        <View style={loginStyle.comCulture}>
                            <Text style={[commonStyle.textCenter,{color:'#ccc',fontSize:30}]}>作业闹钟</Text>
                        </View>
                        <View style={loginStyle.formStyle}>
                            <View style={[loginStyle.formInput,loginStyle.formInputSplit]}>
                                <Image source={require('../imgs/icons/user.png')} style={{width:25,height:35,resizeMode: 'contain'}}/>
                                <TextInput 
                                    ref="login_name" 
                                    placeholder='电话号码'
                                    style={loginStyle.loginInput} 
                                    onChangeText={this.onChangeName} />
                            </View>
                            <View style={loginStyle.formInput}>
                                <Image source={require('../imgs/icons/passicon.png')} style={{width:25,height:35,resizeMode: 'contain'}}/>
                                <TextInput 
                                    ref="login_psw"  
                                    style={loginStyle.loginInput} 
                                    secureTextEntry={true}
                                    placeholder='密码'
                                    onChangeText={this.onChangePswd} />
                            </View>
                        </View>
                        <View style={{alignItems: 'flex-end'}}>
                            <View style={loginStyle.forget}>
                                <View>
                                    <Image source={require('../imgs/icons/prompt.png')} style={{width:15,height:15,resizeMode: 'contain',marginRight:10}}/>
                                </View>
                                <View >
                                    <Text style={{color:'#62a2e0', backgroundColor: 'white'}}>忘记密码</Text>
                                </View>
                            </View>
                        </View>

                    </View>
                    <View style={loginStyle.btn}>
                        <View style={loginStyle.btnWrap}>
                            <Text style={loginStyle.loginBtn1} onPress={this.handleLogin}>登 录</Text>
                        </View>
                        <View style={loginStyle.btnWrap}>
                            <Text style={loginStyle.loginBtn2} onPress={this.handleRegister}>注 册</Text>
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
                  <Text style={{marginTop:15,fontSize:16,color:'#444444'}}>登录中...</Text>
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
        status: store.userStore.status,
        error:store.userStore.error,
    }
}


export default connect(select)(LoginPage);


