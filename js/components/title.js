import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    Dimensions,
} from 'react-native';
var cell_w = Dimensions.get('window').width;
var cell_h = Dimensions.get('window').height;
export default class title extends Component {
    constructor(props){
        super(props)
        // this.state = {date:null}
    }

    render(){
        return (
            <View style={styles.title_container}>
                <Text style={styles.title_text}>{this.props.title}</Text>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    title_container:{
        flexDirection:'row',
        width:cell_w,
        backgroundColor:'#dbdada',
        justifyContent:'flex-start',
        paddingLeft:5,
    },
    title_text:{
        fontSize:24,
        color:"#ffffff",
    },
})