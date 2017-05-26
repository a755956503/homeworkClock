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
    menu: {
        flex: 1,
        width: cell_w,
        height: cell_h,
        backgroundColor: 'gray',
        padding: 20,
    },
    topContainer:{
        marginBottom: 20,
        marginTop: 20,
    },
    topImg:{
        resizeMode:"stretch",
        width: 64,
        height: 64,
        borderRadius: 100,
        flex: 1,
    },
    topName: {
        fontSize: 20,
        position: 'absolute',
        left: 70,
        top: 20,
    },
    item: {
        fontSize: 25,
        fontWeight: '300',
        paddingTop: 10,
    },
})
module.exports = styles;