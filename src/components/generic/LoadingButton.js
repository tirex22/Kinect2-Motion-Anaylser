import React, { Component } from 'react';
import { Icon, Row } from 'antd';

export default class LoadingButton extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            success: false,
        }

        this.setLoadingState = this.setLoadingState.bind(this);
        this.setSuccessState = this.setSuccessState.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    setLoadingState = (loadingState) => {
        this.setState({ loading: loadingState });
    }

    setSuccessState = (successState) => {
        this.setState({ success: successState });
    }

    onClick = () => {
        if (this.props.onClick) {
            this.props.onClick();
        }
        this.setState({ loading: true });
    }

    render() {
        return (
            <a onClick={() => this.onClick()}>
                <Row type="flex" justify="center" style={styles.container}>
                    {this.state.loading ?
                        <Icon style={styles.loading}
                            type={this.state.success ? 'check' : 'loading'}
                            spin={this.state.success ? false : true} />
                        :
                        <p style={styles.text}>{this.props.text}</p>
                    }
                </Row>
            </a>
        )
    }
};

let styles = {
    container: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        // borderStyle: 'solid',
        // borderColor: '#ddd',
        // borderWidth: .3,
        marginTop: 20,
        borderRadius: 25,
        alignSelf: 'center',
        alignItems: 'center',
        boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.2)',
    },

    text: {
        color: '#8EDEDB',
        fontSize: '1rem',
        fontWeight: '900',
        marginTop: 14,
    },

    loading: {
        fontSize: 30,
        color: '#8EDEDB',
        fontWeight: '900',
    }
}

