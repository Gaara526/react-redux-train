/**
 * @since 2018-12-14 10:35
 * @author pengyumeng
 */

import React, { Component } from 'react';
import { Alert, Button } from 'antd';
import 'antd/dist/antd.css';

import { createStore } from './lib/redux';
import actions from './actions';
import reducer from './reducer';
import './originRedux.pcss';

const store = createStore(reducer);

const update = () => {
    const valueEl = document.getElementsByClassName('numValue');
    valueEl[0].innerHTML = store.getState().changeNumber.number;

    const alertEl = document.getElementsByClassName('alert');
    if (store.getState().toggleAlert.showAlert) {
        alertEl[0].style.display = 'block';
    } else {
        alertEl[0].style.display = 'none';
    }
};

store.subscribe(update);

export default class Demo extends Component {
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
        return (
            <div className="wrap">
                <h3>separate reducer from other</h3>
                Current Number: <span className="numValue">0</span>
                <div>
                    <Button size="large" className="numBtn" onClick={this.handleClickAdd}>+</Button>
                    <Button size="large" className="numBtn" onClick={this.handleClickMinus}>-</Button>
                    <Button size="large" className="numBtn" onClick={this.handleClickClear}>clear</Button>
                </div>
                <div>
                    <Button size="large" className="numBtn" onClick={this.handleClickAlert}>alert</Button>
                    <Alert className="alert" message="Hello Redux" type="success" style={{ display: 'none' }} />
                </div>
            </div>
        );
    }
}
