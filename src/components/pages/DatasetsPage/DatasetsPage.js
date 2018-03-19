import React, { Component } from 'react';
import Header from '../../Header/Header';
import { getAllDatasets } from '../../../firebase/firestore';
import { Row } from 'antd';

import './DatasetsPage.css';

let folder = require('../../../assets/folder.png');
let content = null;

class DatasetsPage extends Component {

    constructor() {
        super();
        this.state = { datasets: [] };
    }

    componentDidMount() {
        getAllDatasets((res) => {
            if (res.success) {
                this.setState({ datasets: res.datasets });
            }
        });
    }

    render() {
        if (this.state.datasets) {
            content = (
                this.state.datasets.map((item, index) => (
                    <div key={index} className="dataset">
                        <img src={folder} className="folderIcon" />
                        <p className="dataset-name" >{item.data.name}</p>
                        <p className="motion-model-count" >{item.data.motion_models.length} Motion Models</p>
                        {/* <div className="save-button" >{item.data.name}</div> */}
                    </div>
                )))
        }

        return (
            <div >
                <Header title="Datasets" />

                <Row type="flex" justify="center" className="datasets-row" style={{ marginTop: 60, }}>
                    {content}
                </Row>

            </div >
        );
    }
}

export default DatasetsPage;
