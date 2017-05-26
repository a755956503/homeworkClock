/**
 * Created by Administrator on 2017/2/28.
 */
import React, { Component } from 'react';
import {
    View,
    Text,
    Image
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
        if(type=='classes')
            item=<View style={[commonStyle.rowContainer,commonStyle.rowSplit,commonStyle.rowMin]}>
                        <View style={commonStyle.rowTextView}>
                                <Text style={commonStyle.rowText}>{this.props.text}</Text>
                        </View>
                        <View style={commonStyle.rowImgView}>
                                <Image source={arrow_right} style={commonStyle.rowImg} resizeMode="stretch"/>
                        </View>

                </View>
        return (
            <View>{item}</View>
        )
    }
}
