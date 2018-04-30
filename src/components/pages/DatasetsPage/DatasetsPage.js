import React, { Component } from 'react';
import Header from '../../Header/Header';
import { getAllDatasets } from '../../../firebase/firestore';
import NewDatasetModal from './NewDatasetModal';
import { Row, Button } from 'antd';

import './DatasetsPage.css';

let folder = require('../../../assets/folder.png');
let content = null;

class DatasetsPage extends Component {

    constructor() {
        super();
        this.state = { datasets: [] };
        this.addDataset = this.addDataset.bind(this);
    }

    componentDidMount() {
        getAllDatasets((res) => {
            if (res.success) {
                this.setState({ datasets: res.datasets });
            }
        });
    }

    addDataset(datasetName) {
        let newDatasets = this.state.datasets;
        newDatasets.push({
            data: {
                name: datasetName,
                motion_models: [],
            }
        });
        this.setState({ datasets: newDatasets });
    }

    render() {
        if (this.state.datasets) {
            content = (
                this.state.datasets.map((item, index) => (
                    <div key={index} className="dataset">
                        <img alt="" src={folder} className="folderIcon" />
                        <p className="dataset-name" >{item.data.name}</p>
                        <p className="motion-model-count" >{item.data.motion_models.length} Motion Models</p>
                        {/* <div className="save-button" >{item.data.name}</div> */}
                    </div>
                )))
        }

        return (
            <div >
                <Header title="Datasets" />

                <Button onClick={() => this.refs.newDatasetModal.setVisible(true)} type="danger" className="new-dataset-button">Create New
                </Button>

                <Row type="flex" justify="center" className="datasets-row" style={{ marginTop: 60, }}>
                    {content}
                </Row>

                <NewDatasetModal ref="newDatasetModal" onCreateDataset={(datasetName) => this.addDataset(datasetName)} />

            </div >
        );
    }
}

export default DatasetsPage;
