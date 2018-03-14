import React, { Component } from 'react';
import './Header.css';

class Header extends Component {

    constructor() {
        super();
        this.state = {
            screenWidth: 0
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    updateWindowDimensions() {
        this.setState({ screenWidth: window.innerWidth });
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
            <div style={{ width: this.state.screenWidth }} className="header" >
                <p className="title" >{this.props.title}</p>
            </div>
        );
    }
}

export default Header;