/**
 * Created by Administrator on 2017/2/26.
 */
import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    Image,
    TouchableHighlight,
    View,
} from 'react-native';
import sideMenuStyles from '../styles/sideMenu';
// import topimg from '../imgs/icons/topimg.png';
import teacher_bg from '../imgs/teacher_bg.png';
export default class Menu extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <ScrollView scrollsToTop={false} style={sideMenuStyles.menu}>
                <View style={sideMenuStyles.topContainer}>
                    <Image
                        resizeMode="stretch"
                        style={sideMenuStyles.topImg}
                        source={teacher_bg}/>
                    <Text style={sideMenuStyles.topName}>欢迎您：{this.props.username}</Text>
                </View>
                <TouchableHighlight onPress={this.props.toLoginOut}>
                    <Text
                        style={sideMenuStyles.item}>
                        注销
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.props.toStudents}>
                    <Text
                        style={sideMenuStyles.item}>
                        学生列表
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.props.toClasses}>
                    <Text
                        style={sideMenuStyles.item}>
                        班级管理
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.props.toAddNotify}>
                    <Text
                        style={sideMenuStyles.item}>
                        添加通知
                    </Text>
                </TouchableHighlight>



            </ScrollView>
        )
    }

}
