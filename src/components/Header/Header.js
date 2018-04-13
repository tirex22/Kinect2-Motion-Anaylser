import React, { Component } from 'react';
import './Header.css';

var datasetSelector = null;

class Header extends Component {

    constructor() {
        super();
        this.state = {
            screenWidth: 0,
            datasetName: "",
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.updateDataset = this.updateDataset.bind(this);
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

    updateDataset(datasetName) {
        this.setState({ datasetName: datasetName });
    }

    render() {

        if (this.props.selectorVisible) {
            datasetSelector = (
                <a onClick={() => this.props.chooseDatasetModal.open()} >
                    <div className="datasetSelector" href="#">{this.state.datasetName}</div>
                </a>
            );
        }

        return (
            <div style={{ width: this.state.screenWidth - 70 }} className="header" >
                <p className="title" >{this.props.title}</p>
                {datasetSelector}
            </div>
        );
    }
}

export default Header;