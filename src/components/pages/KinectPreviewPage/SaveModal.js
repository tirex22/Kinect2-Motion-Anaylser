import React, { Component } from 'react';
import { Row, Modal, notification, Icon } from 'antd';
import { getAllDatasets, createMotionModel } from '../../../firebase/firestore';
import './KinectPreviewPage.css';

var content;

class SaveModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            datasets: [],
            isSaving: false,
        }

        this.requestSave = this.requestSave.bind(this);
        this.saveToDataset = this.saveToDataset.bind(this);
    }

    componentDidMount() {
        getAllDatasets((res) => {
            if (res.success) {
                this.setState({ datasets: res.datasets });
            }
        });
    }

    requestSave = (motionModel) => {
        this.setState({ motionModel: motionModel, visible: true });
    }

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
        }, 30000);

        createMotionModel(dataset.id, this.state.motionModel, (res) => {
            if (res.success) {
                if (this.state.isSaving) {
                    notification['success']({
                        message: 'Motion Model Successfully Add To ' + dataset.data.name,
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
                    <a key={index} onClick={() => this.saveToDataset(item)} ><div className="save-button" >{item.data.name}</div></a>
                )))
        }

        return (
            <Modal className="save-modal"
                visible={this.state.visible}
                footer={[null]}
                onCancel={() => this.setState({ visible: false })}
            >
                <Row type="flex" justify="center" className="datasets-row" >
                    {content}
                </Row>

            </Modal>
        );
    }
}

export default SaveModal;