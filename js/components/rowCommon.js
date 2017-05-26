/**
 * Created by Administrator on 2017/3/1.
 */
import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableHighlight,
    StyleSheet,
} from 'react-native';
import commonStyle from '../styles/common';
import arrow_right from '../imgs/icons/arrow_right.png'
export default class RowClasses extends Component {
    constructor(props){
        super(props)
        this.state = {date:null}
    }

    render(){
        let item=null;
        let type=this.props.type;
        if(type=='commonNoPress'){
            item=<TouchableHighlight
            ><View style={commonStyle.rowContainer}>
                <View style={commonStyle.rowTextView}>
                    <Text style={commonStyle.rowText1}>{this.props.text1}</Text>
                    <Text style={commonStyle.rowText2}>{this.props.text2}</Text>
                </View>
                <View style={commonStyle.rowImgView}>
                    <Image source={arrow_right} style={commonStyle.rowImg} resizeMode="stretch"/>
                </View>

            </View></TouchableHighlight>
        }else if(type=='common'){
            item=<TouchableHighlight onPress={this.props.onItemPress}
            ><View style={commonStyle.rowContainer}>
                <View style={commonStyle.rowTextView}>
                    <Text style={commonStyle.rowText1}>{this.props.text1}</Text>
                    <Text style={commonStyle.rowText2}>{this.props.text2}</Text>
                </View>
                <View style={commonStyle.rowImgView}>
                    <Image source={arrow_right} style={commonStyle.rowImg} resizeMode="stretch"/>
                </View>

            </View></TouchableHighlight>
        }

        return (
            <View>{item}</View>
        )
    }
}
