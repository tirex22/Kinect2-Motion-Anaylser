import React, { Component } from 'react';
import Header from '../../Header/Header';
import { Button, Row } from 'antd';
import NewUserForm from './NewUserForm';
import { getAllUsers } from '../../../firebase/firestore';
import './UserPage.css';

import { Line, defaults } from 'react-chartjs-2';
import { getBarLevel } from '../../Functions/SnatchAnalyser';

const snatchAnalyser = require('../../Functions/SnatchAnalyser');

var content;

class UserPage extends Component {

    constructor() {
        super();

        let data = getBarLevel();
        let emptyLables = [];

        for (let i = 0; i < data.length; i++) {
            emptyLables.push("");
        }

        this.state = {
            users: [],
            data: {
                labels: emptyLables,
                datasets: [{
                    label: '',
                    data: data,
                    fill: true,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(0,0,0,0)',
                    borderColor: '#c2bee5',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    pointBackgroundColor: '#fff',
                    pointRadius: 0,
                    pointHitRadius: 0,
                }]

            }
        }

        this.getAllUsers = this.getAllUsers.bind(this);
    }

    componentDidMount() {
        this.getAllUsers();
    }

    getAllUsers() {
        getAllUsers((res) => {
            if (res.success) {
                this.setState({ users: res.users });
            }
        });
    }

    onCreateUser() {
        this.getAllUsers();
    }

    render() {

        if (this.state.users) {
            content = (
                this.state.users.map((item, index) => (
                    <a href={"/#/users/" + item.id + "/"} ><div key={index} className="user">
                        <img src={item.data.info.profile_picture} className="user-pic" />
                        <p className="user-name" >{item.data.info.name}</p>
                        {/* <div className="save-button" >{item.data.name}</div> */}
                    </div></a>
                )))
        }

        return (
            <div>
                <Header title="Users" selectorVisible={false} />
                <NewUserForm ref="newUserForm" onCreateUser={this.getAllUsers} />
                <Button onClick={() => this.refs.newUserForm.setVisible(true)} type="danger" className="new-dataset-button">Create New
                </Button>
                <Row type="flex" justify="center" className="datasets-row" style={{ marginTop: 20, }}>
                    {content}
                </Row>
            </div>
        );
    }
}

export default UserPage;