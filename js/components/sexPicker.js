/**
 * Created by Administrator on 2017/2/25.
 */
import React, { Component } from 'react';
import {
    Picker,
} from 'react-native';
export default class sexPicker extends Component {
    constructor(props){
        super(props)
        this.state = {date:null}
    }

    render(){
        return (
            <Picker
                selectedValue={String(this.props.sex)}
                onValueChange={(lang) => this.props.sexChange(lang)}
                mode="dialog"
                style={{height:30,width:80}}
            >

                <Picker.Item label="男" value="1"/>
                <Picker.Item label="女" value="2" />
            </Picker>
        )
    }
}