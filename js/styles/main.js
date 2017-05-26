/**
 * Created by Administrator on 2017/2/26.
 */
import {
    StyleSheet,
    PixelRatio,
    Dimensions,
} from 'react-native';
var cell_w = Dimensions.get('window').width;
var cell_h = Dimensions.get('window').height;
var icon_h=cell_h*0.05;
var styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ffffff'
    },
    barContainer:{
        position:'absolute',
        top:0,
        left:0,
        bottom:0,
    },
    navContainer:{
        width:cell_w,
        height:cell_h*0.1,
    },
    iconHomework:{
        width:cell_w*0.2,
        height:icon_h*0.8,
    },
    iconAddHomework:{
        width:cell_w*0.3,
        height:icon_h,
    },
})
module.exports = styles;