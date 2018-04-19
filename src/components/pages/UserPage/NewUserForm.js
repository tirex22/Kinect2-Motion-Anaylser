import React, { Component } from 'react';
import { Modal, Row, Button, Input, notification, Icon } from 'antd';
import { createUser } from '../../../firebase/firestore';

var content = null;

class NewUserForm extends Component {

    constructor() {
        super();
        this.state = { visible: false, name: "", isCreating: false };
        this.handleChange = this.handleChange.bind(this);
        this.createNewUser = this.createNewUser.bind(this);
    }

    componentDidMount() {

    }

    setVisible(visiblity) {
        this.setState({ visible: visiblity });
    }

    handleChange(text) {
        let name = text.target.value;
        this.setState({ name: name });
    }

    createNewUser() {
        this.setState({ isCreating: true });
        createUser(this.state.name, (res) => {
            console.log(res);
            if (res.success) {
                notification['success']({
                    message: 'Successfully Added ' + this.state.name + " To Users",
                    duration: 3,
                });
                this.props.onCreateUser(this.state.name);
                this.setVisible(false);
                this.setState({ name: "" });
            } else {
                notification['error']({
                    message: 'Failed To Add User',
                    duration: 3,
                });
            }
            this.setState({ isCreating: false });
        })
    }


    render() {

        if (this.state.isCreating) {
            content = (
                <div>
                    <Icon style={{ marginTop: 35 }} type="loading" className="loader" spin />
                    <p className="not-found-error" >Adding User</p>
                </div>
            )
        } else {
            content = (
                <div>
                    <input onChange={(e) => this.handleChange(e)} style={{ marginTop: 15, }} className="new-dataset-input" placeholder="User Name" />
                    <Button onClick={() => this.createNewUser()} style={{ marginTop: 20, }} type="danger" className="save-dataset-button">
                        Add User
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

export default NewUserForm;