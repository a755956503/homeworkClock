/**
 * Created by Administrator on 2017/2/28.
 */
import React, { Component, PropTypes } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    Animated,
    Dimensions,
} from 'react-native'
var cell_w=Dimensions.get('window').width;
var cell_h=Dimensions.get('window').height;

const ICONS = {
    up: require('../imgs/icons/arrow_up.png'),
    down: require('../imgs/icons/arrow_down.png')
}

export default class extends Component {
    static propTypes = {
        expanded: PropTypes.bool,
        title: PropTypes.string,
        onToggle: PropTypes.func
    }

    static defaultProps = {
        expanded: true
    }

    constructor (props) {
        super(props)

        this.state = {
            expanded: props.expanded,
            animation: new Animated.Value()
        }
    }

    toggle = () => {
        //const { onToggle } = this.props
        const { expanded, maxHeight, minHeight, animation } = this.state
        const initialValue = expanded ? minHeight + maxHeight : minHeight
        const finalValue = expanded ? minHeight : minHeight + maxHeight

        this.setState({expanded: !expanded})
        animation.setValue(initialValue)

        Animated.timing(animation, {
            toValue: finalValue
        }).start()

        //onToggle()
    }

    render () {
        const { expanded, animation, maxHeight } = this.state
        const icon = expanded ? 'up' : 'down'

        return (
            <Animated.View style={[styles.container, {height: animation}]}>
                <View style={styles.titleContainer}
                      onLayout={event => this.setState({minHeight: event.nativeEvent.layout.height})}
                    >
                    <Text style={styles.title}>{this.props.title}</Text>
                    <TouchableHighlight
                        style={styles.button}
                        onPress={this.toggle}
                        underlayColor="#f1f1f1">
                        <Image style={styles.buttonImage} source={ICONS[icon]} />
                    </TouchableHighlight>
                </View>
                {/*fixed bug in recent version of react-native that maxHeight will be changed when body is collapsed*/}
                <View style={styles.body}
                      onLayout={event => !maxHeight && this.setState({maxHeight: event.nativeEvent.layout.height})}
                    >
                    {this.props.children}
                </View>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginTop:10,
        overflow:'hidden'
    },
    titleContainer: {
        flexDirection: 'row',
        height:cell_h*0.1
    },
    title: {
        flex: 1,
        padding: 10,
        color:'#404040',
        fontWeight:'bold',
        fontSize:18
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonImage: {
        width: 25,
        height: 20
    },
    body: {
        height:cell_h*0.6,
        padding: 20,
        paddingTop: 0
    }
});