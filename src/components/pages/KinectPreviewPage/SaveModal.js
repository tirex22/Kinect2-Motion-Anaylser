import React, { Component } from 'react';
import { Row, Modal, notification } from 'antd';
import { getAllDatasets, createMotionModel } from '../../../firebase/firestore';
import './KinectPreviewPage.css';


class SaveModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            datasets: [],
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
        createMotionModel(dataset.id, this.state.motionModel, (res) => {
            if (res.success) {
                notification['success']({
                    message: 'Motion Model Successfully Add To ' + dataset.data.name,
                    duration: 3
                });
                this.setState({ visible: false });
                this.props.deleteMotion();
            } else {
                console.log(res.msg);
                notification['error']({
                    message: 'Failed To  Add Motion Model To ' + dataset.data.name,
                    duration: 3
                });
            }
        });
    }

    render() {
        return (
            <Modal className="save-modal"
                visible={this.state.visible}
                footer={[null]}
                onCancel={() => this.setState({ visible: false })}
            >
                <Row type="flex" justify="center" className="datasets-row" >
                    {this.state.datasets.map((item, index) => (
                        <a key={index} onClick={() => this.saveToDataset(item)} ><div className="save-button" >{item.data.name}</div></a>
                    ))}
                </Row>

            </Modal>
        );
    }
}

export default SaveModal;