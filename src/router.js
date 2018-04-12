import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom'

import DatasetsPage from './components/pages/DatasetsPage/DatasetsPage';
import KinectView from './components/pages/KinectPreviewPage/KinectPreviewPage';



class RouterConfig extends Component {

    render() {

        return (

            <HashRouter>
                <div className="App">

                    <Switch>

                        <Route path="//" component={DatasetsPage} />

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