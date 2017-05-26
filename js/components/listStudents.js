/**
 * Created by Administrator on 2017/2/27.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import AtoZList from 'react-native-atoz-list';
import randomcolor from 'randomcolor';
// import _ from 'lodash';
// "A":[{"regTime":"2017-01-23 18:11:35","userId":3,"userName":"王阳明","userRole":3},
//     {"regTime":"2017-01-23 18:11:24","userId":2,"userName":"韩磊","userRole":3},
//     {"password":"123456","regTime":"2017-01-23 18:31:42","userId":7,"userName":"李大头","userRole":3}],
//     "B":[{"regTime":"2017-01-23 18:11:35","userId":3,"userName":"王阳明","userRole":3},
//     {"regTime":"2017-01-23 18:11:24","userId":2,"userName":"韩磊","userRole":3},
//     {"password":"123456","regTime":"2017-01-23 18:31:42","userId":7,"userName":"李大头","userRole":3}],
// let names = require('./names');
// names = _.groupBy(require('./names'), (name) => name[0].toUpperCase());
//let name=names;

export default class listStudents extends Component {
    constructor(props, context) {
        super(props, context);

        this._renderCell = this._renderCell.bind(this);
        this._renderHeader = this._renderHeader.bind(this);
        //console.log(JSON.stringify(name))
    }

    _renderHeader(data) {
        return (
            <View style={{ height: 35, justifyContent: 'center', backgroundColor: '#eee', paddingLeft: 10 }}>
                <Text>{data.sectionId}</Text>
            </View>
        )
    }


    _renderCell(data) {
        return (
            <View style={styles.cell}>
                <View style={[styles.placeholderCircle, { backgroundColor: randomcolor() }]} />
                <Text style={styles.name}>
                    {data.studentName}
                </Text>
            </View>
        );
    }

    render() {
        return (
            <AtoZList
                sectionHeaderHeight={35}
                cellHeight={95}
                data={this.props.students}
                renderCell={this._renderCell}
                renderSection={this._renderHeader}
            />
        );
    }
}






const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 25,
        backgroundColor: '#f8F8F8',
    },
    swipeContainer: {
    },
    alphabetSidebar: {
        position: 'absolute',
        backgroundColor: 'transparent',
        top: 0,
        bottom: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderCircle: {
        width: 50,
        height: 50,
        backgroundColor: '#ccc',
        borderRadius: 25,
        marginRight: 10,
        marginLeft: 5,
    },
    name: {
        fontSize: 15,
    },
    cell: {
        height: 95,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
    },
});
