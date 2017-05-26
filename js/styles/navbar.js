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
var styles=StyleSheet.create({
    homeworkBar:{
        position:'absolute',
        top:0,
        left:0,
        bottom:0,
        height:cell_h*0.08,
        width:cell_w,
    },
    calendarBar:{
        backgroundColor:'#ffffff',
        height:cell_h*0.08,
        width:cell_w,
        shadowColor:'#E3E3E3',
        shadowOffset:{h:10,w:10},
    },
})
module.exports = styles;