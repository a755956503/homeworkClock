/**
 * Created by Administrator on 2017/3/4.
 */
import React, { Component } from 'react';
import {
    ListView,
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    Platform
} from 'react-native';
// {/*rowView={this.renderRow}*/}
// {/*onFetch={this.props.onFetch}*/}
//var RefreshableListView=require('react-native-refreshable-listview')
import RowHomework from './rowHomeworks';
import Router from '../configs/router';
// var GiftedListView = require('react-native-gifted-listview');
export default class listClasses extends Component {
    constructor(props){
        super(props);
        this.state = {
            loaded: false,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2)=> row1 !== row2,
            })
        };

    }

    renderRow(rowData){
        return (<View><RowHomework item={rowData}
                                   classes={this.props.classes}
                                   subjects={this.props.subjects}
                                   onItemPress={()=>this.props.onItemPress(rowData)}/></View>

        )
    }


    render(){
        return (
            <ListView
                dataSource={this.state.dataSource.cloneWithRows(this.props.datas)}
                renderRow={this.renderRow.bind(this)}
                style={styles.listView}
                enableEmptySections={true}

            />

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