/**
 * Created by Administrator on 2017/3/4.
 */
import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableHighlight,
    Dimensions,
} from 'react-native';
var cell_w = Dimensions.get('window').width;
var cell_h = Dimensions.get('window').height;
import teacher_bg from '../imgs/teacher_bg.png';
import * as Tools from '../configs/tools';
export default class RowClasses extends Component {
    constructor(props){
        super(props)
        this.state = {date:null}
        this.toAddHomework=this.toAddHomework.bind(this);
    }
    toAddHomework(){
        if(false){
            const {router}=this.props;
            router.toAddHomework(null);
        }else{
            const {router}=this.props;
            router.toAddHomework(null);
        }
        console.log("a");


    }


    render(){
        let row=null;
        let {assignTime,title,plantime,subjectId,classId} =this.props.item;
        let {subjects,classes,type}=this.props;
        let subjectName=Tools.getSubjectNameById(subjects,subjectId);
        let className=Tools.getClassNameById(classes,classId);
        row=<TouchableHighlight onPress={this.props.onItemPress}
            ><View style={styles.homework_container}>
                <View style={styles.homework_container_left}>
                    <Text style={styles.homework_leftText}>{assignTime}</Text>
                </View>
                <View style={styles.homework_container_mid}>
                    <Text style={styles.homework_midText1}>{title}</Text>
                    <Text style={styles.homework_midText2}>{plantime}分钟</Text>
                 </View>
                <View style={styles.homework_container_right}>
                    <Image source={teacher_bg} style={styles.homework_img} resizeMode="stretch"/>
                    <Text style={styles.homework_rightText}>{subjectName}</Text>
                    <Text style={styles.homework_rightText}>{className}</Text>
                </View>

            </View></TouchableHighlight>


        return (
            <View>{row}</View>
        )
    }
}
const styles=StyleSheet.create({
    homework_container:{
        flexDirection:'row',
        height:cell_h*0.17,
        width:cell_w,
        backgroundColor:'#F9F9F9',
        borderBottomWidth:2,
        borderBottomColor:'#dbdada',
    },
    homework_container_left:{
        flexDirection:'column',
        alignItems:'flex-start',
        marginLeft:10,

    },
    homework_container_mid:{
        flexDirection:'column',
        alignItems:'flex-start',
        marginLeft:10,

    },
    homework_container_right:{
        flexDirection:'column',
        alignItems:'flex-end',
        justifyContent:'center',
        marginRight:20,
        flex:1
    },
    homework_leftText:{
        fontSize:14,

    },
    homework_midText1:{
        fontSize:17,
        paddingBottom:10
    },
    homework_midText2:{
        color:'#F74545',
        fontSize:15,
        paddingBottom:10
    },
    homework_midText3:{
        fontSize:15
    },
    homework_img:{
        // alignSelf:'center',
        width:cell_h*0.08,
        height:cell_h*0.08,
        paddingTop:10,
        marginRight:10,
    },
    homework_rightText:{
        fontSize:14,
        paddingRight:15
    },
})