import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom'

import DatasetsPage from './components/pages/KinectPreviewPage/KinectPreviewPage';
import KinectView from './components/pages/KinectPreviewPage/KinectPreviewPage';



class RouterConfig extends Component {

    render() {

        return (

            <HashRouter>
                <div className="App">

                    <Switch>

                        <Route path="//" component={KinectView} />
                        <Route path="/datasets" component={DatasetsPage} />

                        {/* <Route path="/market"
                            render={() => <AsyncMarketPage web3={this.props.web3} />} />

                        <Route path="/profile"
                            render={() => <AsyncProfilePage web3={this.props.web3} />} />

                        <Route path="/roadmap" component={Roadmap} />

                        <Route component={PageNotFound} /> */}

                    </Switch>

                </div>
            </HashRouter>

        );
    }
}



export default RouterConfig;