import React, { Component } from 'react';
import { Row, Modal, notification, Icon } from 'antd';
import { getAllDatasets, createMotionModel, uploadMotionModel } from '../../../firebase/firestore';
import './KinectPreviewPage.css';

var content;

class ChooseDatasetModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            datasets: [],
            isSaving: false,
            currentDataset: {},
        }

        this.open = this.open.bind(this);
        this.saveToDataset = this.saveToDataset.bind(this);
    }

    componentDidMount() {
        getAllDatasets((res) => {
            if (res.success) {
                this.props.header.updateDataset(res.datasets[0].data.name);
                this.props.animator.setSelectedJoints(res.datasets[0].data.selected_joints);
                this.setState({ datasets: res.datasets, currentDataset: res.datasets[0] });
            }
        });
    }


    // Shows the save modal 
    open = (motionModel) => {
        this.setState({ visible: true });
    }

    ChooseDataset(dataset) {
        this.props.header.updateDataset(dataset.data.name);
        this.setState({ currentDataset: dataset, visible: false });
        this.props.animator.setSelectedJoints(dataset.data.selected_joints);
    }


    // uploades the motion model and adds its reference to the chosen dataset
    saveToDataset = (dataset) => {
        this.setState({ isSaving: true });

        setTimeout(() => {
            if (this.state.isSaving) {
                this.setState({ isSaving: false });
                notification['error']({
                    message: 'Failed To  Add Motion Model To ' + dataset.data.name,
                    duration: 3
                });
            }
        }, 40000);

        uploadMotionModel(dataset.id, this.state.motionModel, (res) => {
            if (res.success) {
                if (this.state.isSaving) {
                    notification['success']({
                        message: 'Motion Model Successfully Added To ' + dataset.data.name,
                        duration: 3
                    });
                    this.setState({ visible: false });
                    this.props.deleteMotion();
                }
            } else {
                if (this.state.isSaving) {
                    console.log(res.msg);
                    notification['error']({
                        message: 'Failed To  Add Motion Model To ' + dataset.data.name,
                        duration: 3
                    });
                }
            }
            this.setState({ isSaving: false });
        });
    }

    render() {

        if (this.state.isSaving) {
            content = (
                <div>
                    <Icon style={{ marginTop: 35 }} type="loading" className="loader" spin />
                    <p className="not-found-error" >Saving Motion Model</p>
                </div>
            )
        } else {
            content = (
                this.state.datasets.map((item, index) => (
                    <a key={index} onClick={() => this.ChooseDataset(item)} ><div className="save-button" >{item.data.name}</div></a>
                )))
        }

        return (
            <Modal className="save-modal"
                visible={this.state.visible}
                footer={null}
                onCancel={() => {
                    if (!this.state.isSaving) {
                        this.setState({ visible: false });
                    }
                }}
            >
                <Row type="flex" justify="center" className="datasets-row" >
                    {content}
                </Row>

            </Modal>
        );
    }
}

export default ChooseDatasetModal;