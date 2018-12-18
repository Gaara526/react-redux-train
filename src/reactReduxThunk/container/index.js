/**
 * @since 2018-12-14 15:10
 * @author pengyumeng
 */

import React, { Component } from 'react';
import 'antd/dist/antd.css';
import fetch from 'isomorphic-fetch';

import { connect } from '../lib/react-redux';
import './index.pcss';

import NumberComponent from '../components/Number';
import AlertComponent from '../components/Alert';
import AsyncComponent from '../components/Async';

const sleep = (timeout) => {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
};

const mapStateToProps = (state) => ({
    number: state.changeNumber.number,
    showAlert: state.toggleAlert.showAlert,
    fetching: state.asyncFetch.fetching,
    data: state.asyncFetch.data,
});

class Number extends Component {
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
        if (this.props.fetching) {
            return;
        }

        const asyncFetch = async(dispatch, getState) => {
            // 请求开始
            dispatch({ type: 'REQUEST_DATA' });

            await sleep(1000);

            fetch('./api/asyncFetchData.json')
                .then((response) => response.json())
                .then((json) => {

                    // 请求开始
                    dispatch({
                        type: 'RECEIVE_DATA',
                        payload: json.msg,
                    });
                });
        };

        this.props.dispatch(asyncFetch);
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
                <h3>react redux with redux-thunk</h3>
                <NumberComponent
                    value={number}
                    handleClickAdd={this.handleClickAdd}
                    handleClickMinus={this.handleClickMinus}
                    handleClickClear={this.handleClickClear}
                />
                <AlertComponent
                    showAlert={showAlert}
                    handleClickAlert={this.handleClickAlert}
                />
                <AsyncComponent
                    showLoading={fetching}
                    handleClickFetch={this.handleClickFetch}
                    data={data}
                />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(Number);
