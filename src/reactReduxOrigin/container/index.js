/**
 * @since 2018-12-14 15:10
 * @author pengyumeng
 */

import React, { Component } from 'react';
import { createStore } from 'redux';
import 'antd/dist/antd.css';

import reducer from '../reducer';
import './index.pcss';

import NumberComponent from '../components/Number';
import AlertComponent from '../components/Alert';

const store = createStore(reducer);

export default class Number extends Component {
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
        store.dispatch({ type: 'INCREMENT' });
    };

    handleClickMinus = () => {
        store.dispatch({ type: 'DECREMENT' });
    };

    handleClickClear = () => {
        store.dispatch({ type: 'CLEAR_NUM' });
    };

    handleClickAlert = () => {
        store.dispatch({ type: 'TOGGLE_ALERT' });
    };

    render() {
        const {
            number,
            showAlert,
        } = this.state;

        return (
            <div className="wrap">
                <h3>react redux without react-redux package</h3>
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
            </div>
        );
    }
}
