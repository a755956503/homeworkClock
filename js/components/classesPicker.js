/**
 * Created by Administrator on 2017/2/27.
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
export default class ClassesPicker extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(<ModalPicker
            data={this.props.data}
            initValue="classes"
            onChange={this.props.classChange}
        >
            <View style={commonStyle.rowContainer}>
                <View style={commonStyle.rowTextView}>
                    <Text style={commonStyle.rowText1}>班级</Text>
                    <Text style={commonStyle.rowText2}>{this.props.classValue}</Text>

                </View>
                <View style={commonStyle.rowImgView}>
                    <Image source={arrow_right} style={commonStyle.rowImg} resizeMode="stretch"/>
                </View>

            </View>
        </ModalPicker>)
    }
}