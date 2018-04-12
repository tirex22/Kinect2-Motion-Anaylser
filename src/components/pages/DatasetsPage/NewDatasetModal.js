import React, { Component } from 'react';
import { Modal, Row, Button, Input, notification, Icon } from 'antd';
import { createDataset } from '../../../firebase/firestore';
import BodyView from './BodyView';

var content = null;

class NewDatasetModal extends Component {

    constructor() {
        super();
        this.state = { visible: false, datasetName: "", isCreating: false };
        this.handleChange = this.handleChange.bind(this);
        this.createDataset = this.createDataset.bind(this);
    }

    componentDidMount() {

    }

    setVisible(visiblity) {
        this.setState({ visible: visiblity });
    }

    handleChange(text) {
        let name = text.target.value;
        this.setState({ datasetName: name });
    }

    createDataset() {
        this.setState({ isCreating: true });
        let datasetInfo = this.refs.bodyView.getSelectedJoints();
        datasetInfo.name = this.state.datasetName;
        datasetInfo.motion_models = [];
        createDataset(datasetInfo, (res) => {
            if (res.success) {
                notification['success']({
                    message: 'Successfully Created Dataset',
                    duration: 3,
                });
                this.props.onCreateDataset(this.state.datasetName);
                this.setVisible(false);
            } else {
                notification['error']({
                    message: 'Failed To Creat Dataset',
                    duration: 3,
                });
            }
            this.setState({ isCreating: false });
        });
    }

    render() {

        if (this.state.isCreating) {
            content = (
                <div>
                    <Icon style={{ marginTop: 35 }} type="loading" className="loader" spin />
                    <p className="not-found-error" >Creating Dataset</p>
                </div>
            )
        } else {
            content = (
                <div>
                    <input onChange={(e) => this.handleChange(e)} style={{ marginTop: 15, }} className="new-dataset-input" placeholder="Dataset Name" />
                    <BodyView ref="bodyView" />
                    <Button onClick={() => this.createDataset()} style={{ marginTop: 20, }} type="danger" className="save-dataset-button">
                        Save
                    </Button>
                </div>
            );
        }

        return (
            <Modal
                visible={this.state.visible}
                footer={null}
                onCancel={() => {
                    if (!this.state.isCreating) {
                        this.setVisible(false);
                    }
                }}
            >
                <Row type="flex" justify="center" className="datasets-row" style={{ marginTop: 10, }}>
                    {content}
                </Row>

            </Modal>
        );
    }
}

export default NewDatasetModal;