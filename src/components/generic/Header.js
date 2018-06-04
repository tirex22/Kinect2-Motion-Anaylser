import React, { Component } from 'react';

let logo = require('../../assets/logo.PNG')

let menu = require('../../assets/menu.png')

export default class Header extends Component {
    render() {
        return (
            <div className="header" style={styles.container} >
                <img src={menu} style={{ width: 30, height: 25, marginTop: 23, marginLeft: 15, display: 'inline' }} />
                <div style={{
                    display: 'inline',
                    width: 200,
                    height: 200,
                    borderRadius: 100,
                    boxShadow: '0 0px 15px 0 rgba(0, 0, 0, 0.1)',
                    alignSlef: 'center',
                    marginLeft: ((window.innerWidth - 200) / 2) - 45,
                    marginTop: -100,
                    position: 'absolute',
                    backgroundColor: '#fff',
                }}>
                    <img src={logo} style={{ width: 68, height: 60, marginTop: 115, marginLeft: 66 }} />

                </div>
            </div>
        )
    }
};

let styles = {
    container: {
        height: 70,
        boxShadow: '0 0px 15px 0 rgba(0, 0, 0, 0.1)',
        marginBottom: 20,
    },
}

