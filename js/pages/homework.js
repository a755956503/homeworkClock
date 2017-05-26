/**
 * Created by Administrator on 2017/2/26.
 */
import React,{Component} from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    ActivityIndicator,
    ScrollView,
    RefreshControl,
} from 'react-native';
import {connect} from 'react-redux';
import commonStyle from '../styles/common';
import Modal from 'react-native-modalbox';
import DropdownAlert from 'react-native-dropdownalert';
import homework_bgmax from '../imgs/homework_bgmax.png';
import homework_bgmin from '../imgs/homework_bgmin.png';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import HomeworkStyles from '../styles/homework';
import ListHomeworks from '../components/listHomeworks'
import Navbar from '../components/navbar';
import {getDate,getWeekday} from '../configs/tools';
import {getSubjectsAndClasses,getUserClasses, getHomework,getInitDate} from '../actions/classes';
import {cleanError,cleanRequest} from '../actions/user';
import Title from '../components/title';
import ListNotify from '../components/listNotify';
class HomeworkPage extends Component{
    constructor(props){
        super(props);
        this.state={
            isRefreshing:false
        }
        this.onItemPress=this.onItemPress.bind(this);
        this.test=this.test.bind(this);
        this.onNotifyPress=this.onNotifyPress.bind(this);
        this.initData=this.initData.bind(this);
        this._onRefresh=this._onRefresh.bind(this);
        // this.initData();
    }
    shouldComponentUpdate(nextProps,nextState){
        if(nextProps.requestStatus=='doing'){
            this.refs.modal.open();
            setTimeout(()=>{
                if(this.refs.modal){
                    const {dispatch}=this.props;
                    dispatch(cleanRequest());
                }

            },5000);
            return false;
        }
        if(nextProps.requestStatus=='done'){
            this.refs.modal.close();
            return true;
        }
        if(nextProps.requestStatus=='success'||nextProps.requestStatus=='error'){
            console.log("success error")
            this.refs.modal.close();
            return true;
        }
        if(nextProps.error){
            this.dropdown.alertWithType('error','提示信息',error);
            const {dispatch}=this.props;
            dispatch(cleanRequest());
            return false;
        }
        // if(nextProps.classes){
        //     this.refs.modal.close();
        //     console.log("lll"+JSON.stringify(nextProps.classes));
        //     return true;
        // }
        return true;
    }
    // componentWillMount(){
    //     var today=getDate();
    //     console.log("today"+today);
    //     const {dispatch,user}=this.props;
    //     //dispatch(getSubjectsAndClasses());
    //     let body="?teacherId="+user.userId+"&date="+today;
    //     console.log("body"+body);
    //    dispatch(getHomework(body,true));
    //     //dispatch(getInitDate(body,user.userId));
    //
    // }
    initData(){
        var today=getDate();
        console.log("today"+today);
        const {dispatch,user}=this.props;
        // dispatch(getSubjectsAndClasses());
        let body="?teacherId="+user.userId+"&date="+today;
        console.log("body"+body);
        dispatch(getHomework(body,true));
       // dispatch(getInitDate(body,user.userId));

    }
    componentDidMount(){
        // const {dispatch,user}=this.props;

        var today=getDate();
        console.log("today"+today);
        const {dispatch,user}=this.props;
        dispatch(getSubjectsAndClasses());
        let body="?teacherId="+user.userId+"&date="+today;
        console.log("body"+body);

        dispatch(getUserClasses(user.userId));

        dispatch(getHomework(body,true));
        //dispatch(getInitDate(body,user.userId));
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
    test(){
        const {router,user}=this.props;
        // router.toAddHomework({homework:rowData});
        console.log(user);
    }
    _onRefresh() {
        //this.setState({isRefreshing: true});
        this.initData();
        //this.setState({isRefreshing: true});
    }
    render(){
        let topHeight=Dimensions.get('window').height*0.2;
                let topWidth=Dimensions.get('window').width;
                var main=null;
                if(JSON.stringify(this.props.homeworksToday)!="[]"&&this.props.homeworksToday)
                main=<ListHomeworks
                subjects={this.props.subjects}
                classes={this.props.classes}
                datas={this.props.homeworksToday}
                onItemPress={this.onItemPress}></ListHomeworks>;
                else
                main=<View style={commonStyle.commonTextView}><Text style={commonStyle.commonText}>您今天还没有布置作业</Text></View>
                var notify=null;
                if(JSON.stringify(this.props.notifiesToday)!="[]"&&this.props.notifiesToday)
                    notify=<ListNotify
                            classes={this.props.classes}
                            datas={this.props.notifiesToday}
                            onItemPress={this.onNotifyPress}></ListNotify>;
                else
                    notify=<View style={commonStyle.commonTextView}><Text style={commonStyle.commonText}>您今天还没有添加通知</Text></View>


                return (
                // var main=null;
                // if(!this.props.subjects)
                //     main=<Text>正在加载数据</Text>
                <View style={commonStyle.wrapper}>
                    <ParallaxScrollView
                        backgroundColor="#f8f8f8"
                        parallaxHeaderHeight={topHeight}
                        stickyHeaderHeight={topHeight*0.4}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.isRefreshing}
                                onRefresh={this._onRefresh}
                                tintColor="#444444"
                                title="Loading..."
                                colors={['#ff0000', '#00ff00', '#0000ff']}
                                progressBackgroundColor="#444444"
                            />
                        }
                        renderStickyHeader={()=>(
                            <View key="sticky-header" style={{height:topHeight*0.4,width:topWidth}}
                            >
                                <Image source={homework_bgmin} style={HomeworkStyles.bgImgMin}>
                                    <Navbar title="Homework"></Navbar>
                                </Image>

                            </View>

                        )}
                        renderForeground={() => (
                            <View style={commonStyle.topContainer}>
                                <Image source={homework_bgmax} style={HomeworkStyles.bgImg}>
                                    <View style={HomeworkStyles.topTextView}>
                                        <Text style={HomeworkStyles.topText}>{getDate()}</Text>
                                        <Text style={HomeworkStyles.topText}>{getWeekday()}</Text>
                                    </View>
                                </Image>
                            </View>
                        )}>
                        <Title title="作业"></Title>
                        <View>{main}</View>
                        <Title title="通知"></Title>
                        <View>{notify}</View>
                    </ParallaxScrollView>

                <Modal
                    style={commonStyle.modal}
                    ref='modal'
                    isOpen={false}
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
        homeworksToday:store.classesStore.homeworksToday,
        notifiesToday:store.classesStore.notifiesToday,
    }
}
export default connect(select)(HomeworkPage);