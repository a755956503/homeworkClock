/**
 * Created by Administrator on 2017/2/27.
 */
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
        backgroundColor:'#F8F8F8'
    },
})
module.exports = styles;