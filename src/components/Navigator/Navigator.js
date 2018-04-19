import React, { Component } from 'react'
import { Layout, Affix } from 'antd';
import kinectIcon from '../../assets/lens.png';
import datasetsIcon from '../../assets/datasets.png';
import avatarIcon from '../../assets/avatar.png';
import { Link, HashRouter } from 'react-router-dom';
import './Navigator.css';

export default class Navigator extends Component {

    constructor(props) {
        super(props)
        this.state = {
            alignTabs: 'right',
            screenHeight: window.innerHeight - 1,
        }

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    updateWindowDimensions() {
        this.setState({ screenHeight: window.innerHeight });
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    render() {
        return (
            <Layout className="layout" style={{ backgroundColor: '#f8f8f8' }}>
                <Affix>
                    <div className="navbar" style={{ height: this.state.screenHeight }} >
                        {/* <p className="logo" >KINECT</p> */}

                        <a href="/">
                            <img alt="" src={kinectIcon} className="icon" />
                        </a>

                        <a href="/datasets/">
                            <img alt="" src={datasetsIcon} className="icon" />
                        </a>

                        <a href="/datasets/">
                            <img alt="" src={avatarIcon} className="icon" />
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
