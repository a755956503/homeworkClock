/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    Navigator,
    View
} from 'react-native';
import { connect } from 'react-redux';

import TabNavigator from 'react-native-tab-navigator';
import SideMenu from 'react-native-side-menu';

import commonStyles from '../styles/common';
import mainStyles from '../styles/main';
import Menu from '../components/menu';

import { logOut } from '../actions/user';
import {getClasses} from '../actions/classes'
import HomeworkPage from './homework';
import AddHomeworkPage from './addHomework';
import CalendarPage from './calendar';
import icon_homework from '../imgs/icons/homework.png';
import icon_homework_select from '../imgs/icons/homework_select.png';
import icon_calendar from '../imgs/icons/calendar.png';
import icon_calendar_select from '../imgs/icons/calendar_select.png';
import icon_addhomework from '../imgs/icons/add_homework.png';
import LoginPage from './login';



class Main extends Component {

    constructor(props){
        super(props);
        this.state={
            selectedTab:'Homework',
            isOpen:false,
        }
        this.toLoginOut=this.toLoginOut.bind(this);
        this.toClasses=this.toClasses.bind(this);
        this.toStudents=this.toStudents.bind(this);
        this.toAddHomework=this.toAddHomework.bind(this);
        this.toAddNotify=this.toAddNotify.bind(this);
    }


    shouldComponentUpdate(nextProps, nextState){
        if(nextProps.isLoggedIn != this.props.isLoggedIn && nextProps.isLoggedIn === false){
            //logout, need to redirect login page
            this.toLogin();
            return false;
        }
        return true;
    }

    toLogin(){
        // myrouter.resetToLogin();
        let {router}=this.props;
        router.resetToLogin();
        // let {Navigator}=this.props;
        // Navigator.resetTo({
        //     name: 'login-page',
        //     page: LoginPage,
        //     //sceneConfig: customFloatFromRight,
        // })
    }
    toLoginOut(){
        let {dispatch}=this.props;
        dispatch(logOut());
    }
    updateMenuState(isOpen) {
        this.setState({ isOpen: isOpen });
    }
    toMenu(){
        this.setState({ isOpen:true});
    }
    toClasses(){
        const {router,dispatch}=this.props;
        // dispatch(getClasses());
        router.toClasses();
    }
    toStudents(){
        const {router}=this.props;
        router.toStudents();
    }
    toAddHomework(iconNum,selectedTab){
        console.log("aaa"+iconNum);
        if(iconNum==1){this.setState({selectedTab:selectedTab})}
        else {
            const {router}=this.props;
            console.log(router);
            router.toAddHomework(null);

        }
    }
    toAddNotify(){
        const {router}=this.props;
        router.toAddNotify();
    }



    render() {
        let {user} = this.props;
        const menu=<Menu username={user.userName} toLoginOut={this.toLoginOut}
                         toStudents={this.toStudents} toClasses={this.toClasses}
                            toAddNotify={this.toAddNotify}/>;
        return (
            <SideMenu
                menu={menu}
                isOpen={this.state.isOpen}
                onChange={(isOpen) => this.updateMenuState(isOpen) }
            >

                <View style={mainStyles.container}>

                    <TabNavigator>
                        {this.renderTabBarItem( icon_homework, icon_homework_select,'Homework', 1,'作业', HomeworkPage)}
                        {this.renderTabBarItem(icon_addhomework, icon_addhomework ,'AddHomework', 2,'添加',AddHomeworkPage)}
                        {this.renderTabBarItem(icon_calendar, icon_calendar_select ,'Calendar',1, '日历',CalendarPage)}
                    </TabNavigator>

                </View>

            </SideMenu>


        );

    }
    renderTabBarItem(iconName, selectedIconName, selectedTab,iconNum, componentName, component){
        return(
            <TabNavigator.Item
                renderIcon={() => <Image source={iconName} style={iconNum==1? mainStyles.iconHomework:mainStyles.iconAddHomework}/>} // 图标
                renderSelectedIcon={() =><Image source={selectedIconName} style={iconNum==1? mainStyles.iconHomework:mainStyles.iconAddHomework}/>}   // 选中的图标
                onPress={()=>this.toAddHomework(iconNum,selectedTab)}
                selected={this.state.selectedTab === selectedTab}
            >
                <Navigator
                    initialRoute={{name:componentName,component:component}}
                    configureScene={()=>{
                        return Navigator.SceneConfigs.PushFromRight;
                    }}
                    renderScene={(route,navigator)=>{
                        let Component = route.component;
                        return <Component {...route.passProps} router={this.props.router} navigator={navigator}/>;
                    }}
                />
            </TabNavigator.Item>
        )
    }



}



function select(store){
    return {
        isLoggedIn: store.userStore.isLoggedIn,
        user: store.userStore.user,
    }
}


export default connect(select)(Main);
