/**
 * Created by Administrator on 2017/2/26.
 */
import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import CalendarStyle from '../styles/calendar';
import Calendar from 'react-native-calendar';
import Modal from 'react-native-modalbox';
import DropdownAlert from 'react-native-dropdownalert';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import moment from 'moment';

import {cleanError,cleanRequest} from '../actions/user';
import commonStyle from '../styles/common';
import ListHomeworks from '../components/listHomeworks'
import Navbar from '../components/navbar';
import {getDate,getWeekday} from '../configs/tools';
import {getSubjectsAndClasses,getHomework} from '../actions/classes';
import Title from '../components/title';
import ListNotify from '../components/listNotify';

const customDayHeadings = ['天', '一', '二', '三', '四', '五', '六'];
const customMonthNames = ['一月', '二月', '三月', '四月', '五月',
    '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];


// eventDates={['2016-07-03', '2016-07-05', '2016-07-28', '2016-07-30']}
// events={[{date: '2016-07-04', hasEventCircle: {backgroundColor: 'powderblue'}}]}
class CalendarPage extends Component{
    constructor(props){
        super(props);
        // this.state = {
        //     selectedDate: '2016-07-04',
        // };
        this.onChangeDate=this.onChangeDate.bind(this);
        this.onItemPress=this.onItemPress.bind(this);
        this.onNotifyPress=this.onNotifyPress.bind(this);
    }
    shouldComponentUpdate(nextProps,nextState){
        if(nextProps.requestStatus=='doing'){
            console.log("calendar requesdoing");
            this.refs.modal.open();
            setTimeout(()=>{
                if(this.refs.modal){
                    this.refs.modal.close();
                    const {dispatch}=this.props;
                    dispatch(cleanRequest());
                }

            },3000);
            return false;
        }
        if(nextProps.requestStatus==null){
            this.refs.modal.close();
            // const {dispatch}=this.props;
            // dispatch(cleanRequest());
            return true;
        }
        if(nextProps.requestStatus=='done'||nextProps.requestStatus=='error'){
            this.refs.modal.close();
            const {dispatch}=this.props;
            dispatch(cleanRequest());
            return true;
        }
        if(nextProps.error){
            this.dropdown.alertWithType('error','提示信息',error);
            const {dispatch}=this.props;
            dispatch(cleanError());
            return false;
        }
        return true;
    }
    componentDidMount(){
        var today=getDate();
        console.log("today"+today);
        const {dispatch,user}=this.props;
        let body="?teacherId="+user.userId+"&date="+today;
        console.log("body"+body);
        dispatch(getHomework(body));

    }
    onItemPress(item){
        const {router,user}=this.props;
        // router.toAddHomework({homework:rowData});
        console.log(user);
        router.toAddHomework({Homework:item});
    }
    onNotifyPress(item){
        const {router,user}=this.props;
        // router.toAddHomework({homework:rowData});
        console.log(user);
        router.toAddNotify({Notify:item});
    }
    onChangeDate(date){
        //this.setState({ selectedDate: date });
        const {dispatch,user}=this.props;
        //selectedDate=
        let body="?teacherId="+user.userId+"&date="+moment(date).format('YYYY-MM-DD');
        console.log("body"+body);
        dispatch(getHomework(body));
    }
    render(){
        let topHeight=Dimensions.get('window').height*0.45;
        let topWidth=Dimensions.get('window').width;
        var main=null;
        console.log(JSON.stringify(this.props.homeworks));
        if(JSON.stringify(this.props.homeworks)!="[]"&&this.props.homeworks)
            main=<ListHomeworks
                subjects={this.props.subjects}
                classes={this.props.classes}
                datas={this.props.homeworks}
                onItemPress={this.onItemPress}></ListHomeworks>;
        else
            main=<View style={commonStyle.commonTextView}><Text style={commonStyle.commonText}>您这天没有布置作业</Text></View>
        var notify=null;
        if(JSON.stringify(this.props.notifies)!="[]"&&this.props.notifies)
            notify=<ListNotify
                classes={this.props.classes}
                datas={this.props.notifies}
                onItemPress={this.onNotifyPress}></ListNotify>;
        else
            notify=<View style={commonStyle.commonTextView}><Text style={commonStyle.commonText}>您今天还没有添加通知</Text></View>
        return (

            <View style={commonStyle.wrapper}>

                <ParallaxScrollView
                        backgroundColor="#f8f8f8"
                        parallaxHeaderHeight={topHeight}
                        stickyHeaderHeight={topHeight*0.15}
                        renderStickyHeader={()=>(
                            <Navbar title="Homework"></Navbar>
                        )}
                        renderForeground={() => (
                            <Calendar
                                ref="calendar"
                                scrollEnabled
                                showControls
                                dayHeadings={customDayHeadings}
                                monthNames={customMonthNames}
                                titleFormat={'MMMM YYYY'}
                                prevButtonText={''}
                                nextButtonText={''}
                                onDateSelect={(date)=>this.onChangeDate(date)}
                                onTouchPrev={(e) => console.log('onTouchPrev: ', e)}
                                onTouchNext={(e) => console.log('onTouchNext: ', e)}
                                onSwipePrev={(e) => console.log('onSwipePrev: ', e)}
                                onSwipeNext={(e) => console.log('onSwipeNext', e)}
                                weekStart={0}
                            />
                        )}>

                    <Title title="作业"></Title>
                    {main}
                    <Title title="通知"></Title>
                    {notify}
                </ParallaxScrollView>
                <Modal
                    style={commonStyle.modal}
                    ref='modal'
                    isOpen={this.props.requestStatus=='doing'?true:false}
                    animationDuration={0}
                    position={"center"}
                >
                    <ActivityIndicator
                        size='large'
                    />
                    <Text style={{marginTop:15,fontSize:16,color:'#444444'}}>正在加载数据...</Text>
                </Modal>
                <DropdownAlert
                    ref={(ref) => this.dropdown = ref} closeInterval={3000} showCancel={true}></DropdownAlert>
            </View>
        )
    }
}
function select(store) {
    return {
        user: store.userStore.user,
        classes:store.classesStore.classes,
        subjects:store.classesStore.subjects,
        homeworks:store.classesStore.homeworks,
        notifies:store.classesStore.notifies,
        requestStatus:store.userStore.requestStatus,
        error:store.userStore.error,
        message:store.userStore.message,
    }
}
export default connect(select)(CalendarPage);