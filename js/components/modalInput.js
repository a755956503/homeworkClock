/**
 * Created by Administrator on 2017/3/4.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    TextInput,
} from 'react-native';
import Button from './button';
export default class modalInput extends Component {
    constructor(props){
        super(props)
        this.state = {date:null}
    }

    render(){
        return (
            <View>

                <TextInput
                    onChangeText={this.props.on}
                    placeholder="题目"
                    ></TextInput>
                <Button>确定</Button>
            </View>

        )
    }
}
// var styles=StyleSheet.create({
//     modalContainer:{
//         flex:1,
//     },
// })
