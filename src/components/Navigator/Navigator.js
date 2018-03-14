import React, { Component } from 'react'
import { Layout, Affix } from 'antd';
import kinectIcon from '../../assets/lens.png';
import datasetsIcon from '../../assets/datasets.png';
import './Navigator.css';

export default class Navigator extends Component {

    constructor(props) {
        super(props)
        this.state = {
            alignTabs: 'right',
        }
    }

    render() {
        return (
            <Layout className="layout" style={{ backgroundColor: '#f8f8f8' }}>
                <Affix>
                    <div className="navbar" style={{ height: window.innerHeight - 1 }} >
                        {/* <p className="logo" >KINECT</p> */}

                        <a href="/">
                            <img alt="" src={kinectIcon} className="icon" />
                        </a>

                        <a href="/">
                            <img alt="" src={datasetsIcon} className="icon" />
                        </a>
                    </div>
                </Affix>
                <div style={{ paddingLeft: 70 }} >
                    {this.props.children}
                </div>
            </Layout >
        );
    }
}
