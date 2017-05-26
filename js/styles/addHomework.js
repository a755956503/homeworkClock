/**
 * Created by Administrator on 2017/3/1.
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
        backgroundColor:'#f8f8f8',

    },
    homeworkForm:{
        paddingTop:10,
    },
    content:{
        backgroundColor:'#f8f8f8',
        fontSize: 17,
        padding:10,
    },
    contentView:{
        padding:10,
        backgroundColor:'#ffffff',
        height:cell_h*0.3,
    },
})
module.exports = styles;