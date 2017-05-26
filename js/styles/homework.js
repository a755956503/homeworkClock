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
    topContainer:{
        height:cell_h*0.2,
        width:cell_w
    },
    bgImg:{
        width:cell_w,
        height:cell_h*0.2,
    },
    bgImgMin:{
        width:cell_w,
        height:cell_h*0.1,
    },
    topTextView:{
        flexDirection:'column',
        paddingLeft:20,
        paddingTop:10,
    },
    topText:{
        fontSize:20,
        color:'#ffffff'
    },
})
module.exports = styles;
