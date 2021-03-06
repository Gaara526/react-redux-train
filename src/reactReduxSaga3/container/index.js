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
            data,
        } = this.props;

        return (
            <div className="wrap">
                <h3>takeEvery and takeLatest of redux-saga</h3>
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
    data: state.asyncFetch.data,
});

export default connect(
    mapStateToProps,
)(Demo);
