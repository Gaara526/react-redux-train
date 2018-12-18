/**
 * @since 2018-12-14 15:10
 * @author pengyumeng
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';

import actions from '../actions';
import Number from '../components/Number';
import Alert from '../components/Alert';
import Async from '../components/Async';
import './index.pcss';

class Demo extends Component {
    handleClickAdd = () => {
        this.props.dispatch({ type: actions.number.INCREMENT });
    };

    handleClickMinus = () => {
        this.props.dispatch({ type: actions.number.DECREMENT });
    };

    handleClickClear = () => {
        this.props.dispatch({ type: actions.number.CLEAR });
    };

    handleClickAlert = () => {
        this.props.dispatch({ type: actions.alert.TOGGLE_ALERT });
    };

    handleClickFetch = () => {
        this.props.dispatch({ type: actions.async.REQUEST_DATA });
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
