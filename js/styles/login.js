'use strict';
/**
 * @class 
 * @desc login
 * */
import {
  StyleSheet,
  PixelRatio,
  Dimensions,
} from 'react-native';
var cell_w = Dimensions.get('window').width;
var cell_h = Dimensions.get('window').height;
var styles = StyleSheet.create({
    loginWrap: {
      backgroundColor: '#FCE9D4',
    },

    imgWrap: {
      flexDirection: 'row',
      flex: 1,
    },

    loginMain: {
      flex:1,
    },

    loginMainCon: {
      position: 'absolute', 
      top: cell_h*0.1,
      left: (cell_w-320)/2,
      backgroundColor: '#fff',
      height: cell_h*0.5,
      borderRadius: 20,
    },
    comCulture: {
      width:320,
        marginTop:10,
      height:cell_h * 0.08,
    },

    logoImg: {
      position: 'absolute', 
      top:0,
      left: cell_w/7,
      width:cell_w/7*5,
      resizeMode: 'contain',
    },

    formStyle: {
      backgroundColor:'#F4F3F3',
      marginTop: 10,
      marginLeft: 10,
      width: 300,
      height: cell_h * 0.3,
      borderRadius: 8,
    },

    formInput:{
      flexDirection:'row',
      height: 60,
      padding: 20,
    },
    
    formInputSplit:{
      borderBottomWidth:1,
      borderBottomColor:'#dbdada',
    },

    loginInput: {
      height: 40,
      borderColor: '#000',
      paddingLeft: 10,
      flex: 1,
      fontSize: 16,
    },

    forget: {
      //alignItems: 'flex-end',
      flexDirection:'row',
      margin: 20
      
    },

    btn: {
      flexDirection:'row',
      //backgroundColor:'transparent',
        marginTop:cell_h * 0.5,
        height:cell_h*0.3,
        width:cell_w,
        justifyContent:'center',
    },

    btnWrap:{
      marginTop: 150,
      borderRadius: 5,
      height: 50,
    },
  
    loginBtn1: {
        fontSize: 20,
        color: '#666666',
        backgroundColor: 'transparent',
        width: 150,
        height: 50,
        borderWidth: 1,
        borderColor: '#fff',
        paddingTop: 15,
        marginRight: 20,
        flex: 1,
        textAlign: 'center',
    },

    loginBtn2: {
      fontSize: 20,
      color: '#C7D634',
      backgroundColor: '#fff',
      width: 150,
      height: 50,
      borderWidth: 1,
      borderColor: '#fff',
      paddingTop: 15,
      flex: 1,
      textAlign: 'center',
    },
      
})


module.exports = styles;
