'use strict';
import React from 'react';
import { Navigator } from 'react-native';


// Pages

import LoginPage from '../pages/login';
import MainPage from '../pages/main';
import RegistPage from '../pages/regist';
import ClassesPage from '../pages/classes';
import StudentsPage from '../pages/students';
import AddHomeworkPage from '../pages/addHomework';
import AddNotifyPage from '../pages/addNotify';


// Config
const sceneConfig = require('./sceneConfig')

const customFloatFromRight = sceneConfig.customFloatFromRight;

const customFloatFromBottom=sceneConfig.customFloatFromBottom;


class Router {
    constructor(navigator) {
        this.navigator = navigator
    }

    push(props, route) {
        let routesList = this.navigator.getCurrentRoutes()
        let nextIndex = routesList[routesList.length - 1].index + 1
        route.props = props
        route.index = nextIndex
        this.navigator.push(route)
    }


    pop() {
        this.navigator.pop()
    }

    toLogin(props){
        this.push(props, {
            page: LoginPage,
            name: 'login-page',
            sceneConfig: customFloatFromRight
        })
    }

    toMain(props){
        let customNoBack=customFloatFromRight;
        customNoBack.gestures=null;
        this.push(props, {
            page: MainPage,
            name: 'main-page',
            sceneConfig:customNoBack,
        })
    }
    toRegist(){
        this.push(null,{
            page:RegistPage,
            name:'regist-page',
            sceneConfig:customFloatFromRight
        })

    }
    toClasses(){
        this.push(null,{
            page:ClassesPage,
            name:'classes-page',
            sceneConfig:customFloatFromRight
        })
    }
    toStudents(){
        this.push(null,{
            page:StudentsPage,
            name:'classes-page',
            sceneConfig:customFloatFromRight
        })
    }
    toAddHomework(props){
        console.log("b");
        this.push(props,{
            page:AddHomeworkPage,
            name:'addHomework-page',
            sceneConfig:customFloatFromBottom
        })
    }
    toAddNotify(props){
        console.log("toaddNotify");
        this.push(props,{
            page:AddNotifyPage,
            name:'addNotify-page',
            sceneConfig:customFloatFromBottom
        })
    }

    

    replaceWithHome() {
        this.navigator.popToTop()
    }

    resetToLogin(){
        this.navigator.resetTo({
            name: 'login-page',
            page: LoginPage,
            //sceneConfig: customFloatFromRight,
        })
    }


}

module.exports = Router

