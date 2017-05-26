'use strict';
/**
 * @class StylesCommon
 * @desc 通用样式
 * */

import React from 'react';
import {
  StyleSheet,
  PixelRatio,
  Dimensions,
} from 'react-native';
var cell_w = Dimensions.get('window').width;
var cell_h=Dimensions.get('window').height;
var styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor:'#ffffff'
    },
    bgColor: {
        backgroundColor: '#F5FCFF'
    },
    mgt5: {
        marginTop: 5,
    },
    mgb5: {
        marginBottom: 5,
    },
    pdt5: {
        paddingTop: 5,
    },
    pdb5: {
        paddingBottom: 5,
    },
    textCenter: {
        textAlign: 'center',
        flex: 1,
    },
    textAli: {
        textAlign: 'right',
    },
    navbar: {
        flexDirection: 'row',
        borderBottomColor: '#000000',
        borderBottomWidth: 1/PixelRatio.get(),
    },
    justAlign: {
        alignItems: 'center', 
        justifyContent: 'center',
    },

    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        width:150,
        height:150,
        borderRadius:10,
    },
    modalInput:{
        justifyContent: 'center',
        alignItems: 'center',
        width:150,
        height:150,
        borderRadius:10,
    },

    viewList: {
        padding: 10,
        fontSize: 15,
    },

    flexRow: {
        flexDirection: 'row',
    },

    flex1: {
        flex: 1,
    },
    rowContainer:{
        flexDirection:'row',
        height:cell_h*0.1,
        width:cell_w,
        backgroundColor:'#ffffff',
        marginTop:10,
    },
    rowContainerInput:{
        width:cell_w,
        backgroundColor:'#ffffff',
    },
    rowMin:{
        marginTop:0,
        width:cell_w*0.9
    },
    rowSplit:{
        borderBottomWidth:1,
        borderBottomColor:'#dbdada',
    },
    rowTextView:{
        flexDirection:'column',
        alignItems:'flex-start',
        paddingLeft:10,
    },
    rowText:{
        marginTop:10,
        fontSize:25,
    },
    rowText1:{
        fontSize:14
    },
    rowText2:{
        fontSize:20,
    },
    rowTextInput:{
      height:cell_h*0.1,
        width:cell_w,
    },
    rowImgView:{
        flexDirection:'column',
        alignItems:'flex-end',
        justifyContent:'center',
        flex:1,
    },
    rowImg:{
       // alignSelf:'center',
        width:cell_h*0.01,
        height:cell_h*0.01,
        paddingBottom:10,
        marginRight:10,
    },
    commonTextView:{
        alignItems:'center',
        justifyContent:'center',
    },
    commonText:{
        fontSize:22,

    },
    
});
module.exports = styles;
