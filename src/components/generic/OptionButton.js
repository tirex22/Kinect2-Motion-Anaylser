import React, { Component } from 'react';

export default class OptionButton extends Component {
    render() {
        return (
            <a>
                <div style={{
                    width: (window.innerWidth / 2),
                    height: 60,
                    // backgroundColor: '#0f0',
                    display: 'inline-block',
                    // boxShadow: '0 0px 5px 0 rgba(0, 0, 0, 0.2)',
                    // margin: 10,
                    // marginLeft: 10,
                    // marginRight: 0,
                    // backgroundColor: '#fafafa',
                    borderRightStyle: 'solid',
                    borderRightWidth: .5,
                    borderRightColor: '#ccc',
                    borderTopStyle: 'solid',
                    borderTopWidth: .5,
                    borderTopColor: '#ccc',
                    marginTop: 20,
                    // backgroundImage: 'linear-gradient(90deg, #fff 0%, #f4f4f4 100%)',
                }}>

                    <p style={{
                        textAlign: 'center',
                        color: '#85CED1',
                        fontSize: '.7rem',
                        fontWeight: '900',
                        marginTop: 10,
                        marginBottom: 0,
                    }}>{this.props.title}</p>


                    <p style={{
                        textAlign: 'center',
                        color: 'rgb(49, 59, 73)',
                        fontSize: '1rem',
                        fontWeight: '900',
                        marginTop: 0,
                    }}>{this.props.option}</p>

                </div>
            </a>
        );
    }
}