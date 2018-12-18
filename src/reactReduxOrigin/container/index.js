/**
 * @since 2018-12-14 15:10
 * @author pengyumeng
 */

import React, { Component } from 'react';
import 'antd/dist/antd.css';

import { createStore } from '../lib/redux';
import Number from '../components/Number';
import Alert from '../components/Alert';
import actions from '../actions';
import reducer from '../reducer';
import './index.pcss';

const store = createStore(reducer);

export default class Demo extends Component {
    state = {
        number: 0,
        showAlert: false,
    };

    componentDidMount() {
        store.subscribe(() => {
            const newState = store.getState();
            this.setState({
                number: newState.changeNumber.number,
                showAlert: newState.toggleAlert.showAlert,
            });
        });
    }

    handleClickAdd = () => {
        store.dispatch({ type: actions.number.INCREMENT });
    };

    handleClickMinus = () => {
        store.dispatch({ type: actions.number.DECREMENT });
    };

    handleClickClear = () => {
        store.dispatch({ type: actions.number.CLEAR });
    };

    handleClickAlert = () => {
        store.dispatch({ type: actions.alert.TOGGLE_ALERT });
    };

    render() {
        const {
            number,
            showAlert,
        } = this.state;

        return (
            <div className="wrap">
                <h3>react use redux without react-redux</h3>
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
            </div>
        );
    }
}
