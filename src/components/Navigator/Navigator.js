import React, { Component } from 'react'
import { Layout, Menu, Icon, Affix, Button } from 'antd';
import { Link, HashRouter } from 'react-router-dom'
import './Navigator.css';
import kinectIcon from '../../assets/lens.png'
import datasetsIcon from '../../assets/datasets.png'
import logo from '../../assets/logo.png'

const { Sider } = Layout;

export default class Navigator extends Component {

    constructor(props) {
        super(props)
        this.state = {
            collapsed: true,
            alignTabs: 'right',
        }
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    onCollapse = (collapsed) => {
        this.setState({ collapsed });
    }

    render() {
        return (
            <Layout className="layout">


                <HashRouter>
                    <Affix>
                        <div className="navbar" style={{ height: window.innerHeight - 1 }} >
                            <p className="logo" >KINECT</p>

                            <a href="/">
                                <img src={kinectIcon} className="icon" />
                            </a>

                            <a href="/">
                                <img src={datasetsIcon} className="icon" />
                            </a>


                        </div>
                    </Affix>
                </HashRouter>
                {this.props.children}
            </Layout >
        );
    }
}
