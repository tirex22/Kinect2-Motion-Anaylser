import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom'

import DatasetsPage from './components/pages/DatasetsPage/DatasetsPage';
import KinectView from './components/pages/KinectPreviewPage/KinectPreviewPage';
import UserPage from './components/pages/UserPage/UserPage';

import Navigator from './components/Navigator/Navigator'



class RouterConfig extends Component {

    render() {

        return (

            <HashRouter>
                <div className="App">

                    <Navigator />

                    {/* <Switch> */}

                    <div style={{ marginLeft: 70, }}>

                        <Route path="//" component={KinectView} />

                        <Route path="/datasets" component={DatasetsPage} />

                        <Route path="/users" component={UserPage} />

                    </div>



                    {/* </Switch> */}

                </div>
            </HashRouter>

        );
    }
}



export default RouterConfig;