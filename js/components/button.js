/**
 * Created by Administrator on 2017/3/4.
 */
import React, { Component } from 'react';
import {
    TouchableHighlight,
    StyleSheet,
    Text,
    Dimensions,
} from 'react-native';
var cell_w = Dimensions.get('window').width;
var cell_h = Dimensions.get('window').height;
export default class button extends Component {
    constructor(props){
        super(props)
        this.state={
            active: false,
        }
    }
    _onHighlight() {
        this.setState({active: true});
    }

    _onUnhighlight() {
        this.setState({active: false});
    }


    render(){
        var colorStyle = {
            color: this.state.active ? '#fff' : '#000',
        };
        return (
            <TouchableHighlight
                onHideUnderlay={this._onUnhighlight}
                onPress={this.props.onPress}
                onShowUnderlay={this._onHighlight}
                style={[styles.button, this.props.style]}
                underlayColor="#a9d9d4">
                <Text style={[styles.buttonText, colorStyle]}>{this.props.children}</Text>
            </TouchableHighlight>
        )
    }
}
var styles = StyleSheet.create({
    button: {
        borderRadius: 5,
        flex: 1,
        height: 44,
        alignSelf: 'stretch',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    buttonText: {
        fontSize: 18,
        margin: 5,
        textAlign: 'center',
    },
});