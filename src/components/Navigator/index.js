import React, { Component } from 'react'
import { Layout, Menu, Icon, Affix, Button } from 'antd';
import { Link, HashRouter } from 'react-router-dom'
import './Navigator.css';
import kinectIcon from '../../assets/lens.png'
import datasetsIcon from '../../assets/datasets.png'

const { Sider } = Layout;

export default class Navigator extends Component {

    constructor(props) {
        super(props)
        this.state = { collapsed: true }
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
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                    {/* <img className="logo" src={kinectLogo} /> */}

                    <HashRouter>
                        <Affix>
                            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>

                                <Menu.Item key="1">
                                    <Icon>
                                        <img src={kinectIcon} className="icon" />
                                    </Icon>
                                    <span>Kinect View</span>
                                    <Link to="/market" />
                                </Menu.Item>

                                <Menu.Item key="2">
                                    <Icon>
                                        <img src={datasetsIcon} className="icon" />
                                    </Icon>
                                    <span>Datasets</span>
                                    <Link to="/" />
                                </Menu.Item>

                                {/* <Menu.Item key="3">
                                    <Icon type="skin" />
                                    <span>Profile</span>
                                    <Link to="/profile" />
                                </Menu.Item>

                                <Menu.Item key="5">
                                    <Icon type="trophy" />
                                    <span>Leagues (coming soon!)</span>
                                </Menu.Item>

                                <Menu.Item key="4">
                                    <Icon type="pushpin-o" />
                                    <span>Roadmap</span>
                                    <Link to="/roadmap" />
                                </Menu.Item>

                                <Menu.Item key="6">
                                    <a href="https://discord.gg/CPwmU6C"
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        <i className="fab fa-discord fa-lg"></i>
                                    </a>
                                </Menu.Item> */}

                            </Menu>
                        </Affix>
                    </HashRouter>
                </Sider>
                {this.props.children}
            </Layout >
        );
    }
}
