import React, { Component } from 'react';

let logo = require('../../assets/logo.PNG')

let menu = require('../../assets/menu.png')

export default class Header extends Component {
    render() {
        return (
            <div className="header" style={styles.container} >
                <img src={menu} style={{ width: 25, height: 20, marginTop: 17, marginLeft: 15, display: 'inline' }} />
                <div style={{
                    display: 'inline',
                    width: 150,
                    height: 150,
                    borderRadius: 75,
                    boxShadow: '0 0px 15px 0 rgba(0, 0, 0, 0.1)',
                    alignSlef: 'center',
                    marginLeft: ((window.innerWidth - 150) / 2) - 40,
                    marginTop: -75,
                    position: 'absolute',
                    backgroundColor: '#fff',
                }}>
                    <img src={logo} style={{ width: 58, height: 50, marginTop: 85, marginLeft: 45 }} />

                </div>
            </div>
        )
    }
};

let styles = {
    container: {
        height: 55,
        boxShadow: '0 0px 15px 0 rgba(0, 0, 0, 0.1)',
        marginBottom: 15,
    },
}

