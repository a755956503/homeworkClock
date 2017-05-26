/**
 * Created by Administrator on 2017/2/26.
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
import NavigatorBar from 'react-native-navbar';
import NavbarStyles from '../styles/navbar';
export default class Navbar extends Component{
    constructor(props){
        super(props);
    }

    render(){
        let title=this.props.title;
        let nav=null;
        if(title=='Homework'){
                nav=<NavigatorBar
                    tintColor="#00000000"
                    //leftButton={{title:'菜单',tintColor:'#ffffff',handler:this.props.toMenu}}
                    title={{title:'作业列表'}}
            />
        }else if(title=='AddNotify'){
            nav=<NavigatorBar
                tintColor="#00000000"
                //leftButton={{title:'菜单',tintColor:'#ffffff',handler:this.props.toMenu}}
                title={{title:'添加通知'}}
                leftButton={{title:'返回',tintColor:'#404040',handler:this.props.toBack}}
                rightButton={{title:'提交',tintColor:'#EF9595',handler:this.props.toSubmit}}
            />
        }else if(title=='AddHomework'){
                nav=<NavigatorBar
                    leftButton={{title:'返回',tintColor:'#404040',handler:this.props.toBack}}
                    title={{title:'布置作业'}}
                    rightButton={{title:'提交',tintColor:'#EF9595',handler:this.props.toSubmit}}/>
        }else if(title=='Calendar'){
                nav=<NavigatorBar
                    style={NavbarStyles.calendarBar}
                    tintColor="#00000000"
                    title={{title:'历史记录'}}
                    leftButton={{title:'菜单',tintColor:'#404040',handler:this.props.toMenu}}
                    rightButton={{title:'统计',tintColor:'#EF9595'}}/>
        }else if(title=='Classes'){
            nav=<NavigatorBar
                style={NavbarStyles.calendarBar}
                tintColor="#ffffff"
                title={{title:'班级列表'}}
                leftButton={{title:'返回',tintColor:'#404040',handler:this.props.toBack}}
                rightButton={{title:'添加',tintColor:'#EF9595',handler:this.props.toAddClass}}/>
        }
        else if(title=='Students'){
            nav=<NavigatorBar
                style={NavbarStyles.calendarBar}
                tintColor="#ffffff"
                title={{title:'学生列表'}}
                leftButton={{title:'返回',tintColor:'#404040',handler:this.props.toBack}}
                rightButton={{title:'添加',tintColor:'#EF9595',handler:this.props.toAddClass}}/>
        }

        return(<View>{nav}</View>);
    }
}