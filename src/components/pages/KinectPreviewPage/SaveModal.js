import React, { Component } from 'react';
import { Modal } from 'antd';
import './KinectPreviewPage.css'

class SaveModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        }

        this.setVisible = this.setVisible.bind(this);
    }

    setVisible = (visibility) => {
        this.setState({ visible: visibility });
    }

    render() {
        return (
            <Modal className="save-modal"
                visible={this.state.visible}
                footer={[null]}
                onCancel={() => this.setVisible(false)}
            >

            </Modal>
        );
    }
}

export default SaveModal;