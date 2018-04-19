import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom'

import DatasetsPage from './components/pages/DatasetsPage/DatasetsPage';
import KinectView from './components/pages/KinectPreviewPage/KinectPreviewPage';
import UserPage from './components/pages/UserPage/UserPage';



class RouterConfig extends Component {

    render() {

        return (

            <HashRouter>
                <div className="App">

                    <Switch>

                        <Route path="//" component={UserPage} />

                        <Route path="/dataset"
                            render={() => <DatasetsPage />} />
                        />

                        <Route path="/dataset"
                            render={() => <DatasetsPage />} />
                        />

                    </Switch>

                </div>
            </HashRouter>

        );
    }
}



export default RouterConfig;