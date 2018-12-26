/**
 * @since 2018-12-14 15:10
 * @author pengyumeng
 */

import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import 'antd/dist/antd.css';

import { connect } from '../lib/react-redux';
import Number from '../components/Number';
import Alert from '../components/Alert';
import Async from '../components/Async';
import actions from '../actions';
import './index.pcss';

const sleep = (timeout) => {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
};

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
        const asyncFetch = async(dispatch, getState) => {
            // 第一步，请求开始阶段，可以给视图添加 loading 状态
            dispatch({ type: actions.async.REQUEST_DATA });

            // 第二步，发送请求
            await sleep(1500);
            fetch('./api/asyncFetchData.json')
                .then((response) => response.json())
                .then((json) => {
                    // 第三步，请求发送成功回调，此时更新数据并关闭 loading 状态
                    dispatch({
                        type: actions.async.RECEIVE_DATA,
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
            data,
        } = this.props;

        return (
            <div className="wrap">
                <h3>use redux-thunk to async fetch</h3>
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
