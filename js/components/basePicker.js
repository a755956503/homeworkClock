/**
 * Created by Administrator on 2017/3/5.
 */
import React, { Component } from 'react';
import ModalPicker from './ModalPicker';
import arrow_right from '../imgs/icons/arrow_right.png'
import commonStyle from '../styles/common';
import {
    TextInput,
    Text,
    View,
    Image
}from 'react-native';
export default class basePicker extends Component{
    constructor(props){
        super(props);
    }
    render(){
        var item=null;
        if(this.props.type="subject") {
            item=<ModalPicker
                data={this.props.data}
                initValue={this.props.dataValue}
                onChange={this.props.dataChange}
            >
                <View style={commonStyle.rowContainer}>
                    <View style={commonStyle.rowTextView}>
                        <Text style={commonStyle.rowText1}>{this.props.title}</Text>
                        <Text style={commonStyle.rowText2}>{this.props.dataValue}</Text>

                    </View>
                    <View style={commonStyle.rowImgView}>
                        <Image source={arrow_right} style={commonStyle.rowImg} resizeMode="stretch"/>
                    </View>

                </View>
            </ModalPicker>
        }
        return({item})
    }
}