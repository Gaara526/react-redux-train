/**
 * @since 2018-12-14 15:10
 * @author pengyumeng
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';

import './index.pcss';

import Number from '../components/Number';
import Alert from '../components/Alert';
import Async from '../components/Async';

class Demo extends Component {
    handleClickAdd = () => {
        this.props.dispatch({ type: 'INCREMENT' });
    };

    handleClickMinus = () => {
        this.props.dispatch({ type: 'DECREMENT' });
    };

    handleClickClear = () => {
        this.props.dispatch({ type: 'CLEAR_NUM' });
    };

    handleClickAlert = () => {
        this.props.dispatch({ type: 'TOGGLE_ALERT' });
    };

    handleClickFetch = () => {
        // TODO
    };

    render() {
        const {
            number,
            showAlert,
            fetching,
            data,
        } = this.props;

        return (
            <div className="wrap">
                <h3>use redux-saga to async fetch</h3>
                <Number
                    value={number}
                    handleClickAdd={this.handleClickAdd}
                    handleClickMinus={this.handleClickMinus}
                    handleClickClear={this.handleClickClear}
                />
                <Alert
                    showAlert={showAlert}
                    handleClickAlert={this.handleClickAlert}
                />
                <Async
                    showLoading={fetching}
                    handleClickFetch={this.handleClickFetch}
                    data={data}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    number: state.changeNumber.number,
    showAlert: state.toggleAlert.showAlert,
    fetching: state.asyncFetch.fetching,
    data: state.asyncFetch.data,
});

export default connect(
    mapStateToProps,
)(Demo);
