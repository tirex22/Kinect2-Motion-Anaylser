import React, { Component } from 'react';
import { Image } from 'react-native';
import { Scene, Router } from 'react-native-router-flux';
import StartScreen from './screens/StartScreen';
import PreviewScreen from './screens/PreviewScreen';



const RouterComponent = () => {
    return (
        <Router>
            <Scene hideNavBar >
                <Scene key="main" component={PreviewScreen} />
            </Scene>
        </Router >
    )
}

export default RouterComponent;
