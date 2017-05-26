/**
 * Created by Administrator on 2017/2/28.
 */
import React, { Component } from 'react';
import {
    ListView,
    View,
    TouchableHighlight,
} from 'react-native';
//var RefreshableListView=require('react-native-refreshable-listview')
import RowClasses from './rowClasses';
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
export default class listClasses extends Component {
    constructor(props){
        super(props)
        if(this.props.datas){
            this.state = {
                dataSource: ds.cloneWithRows(this.props.datas),
            }
        }else{
            this.state = {
                dataSource: this.props.datas,
            }
        }

        this.renderClasses=this.renderClasses.bind(this);
    }
    renderClasses(item){
        return (<TouchableHighlight onPress={()=>{this.props.itemPress(item)}}
                        ><View><RowClasses type="classes" text={item.className}></RowClasses></View></TouchableHighlight>)
    }
    reloadClasses(){

    }

    render(){
        return (
            <ListView
                enableEmptySections={true}
                dataSource={this.state.dataSource}
                renderRow={this.renderClasses}
                //loadData={this.reloadClasses}
                //refreshDescription="正在刷新..."
            />
        )
    }
}