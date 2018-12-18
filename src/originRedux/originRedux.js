/**
 * @since 2018-12-13 15:40
 * @author pengyumeng
 */

import React, { Component } from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css';

import { createStore } from './lib/redux';
import './originRedux.pcss';

const initialState = {
    number: 0,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                ...state,
                number: state.number + 1,
            };
        case 'DECREMENT':
            return {
                ...state,
                number: state.number - 1,
            };
        case 'CLEAR_NUM':
            return {
                ...state,
                number: 0,
            };
        default:
            return state;
    }
};

const store = createStore(reducer);

const update = () => {
    const valueEl = document.getElementsByClassName('numValue');
    valueEl[0].innerHTML = store.getState().number;
};

store.subscribe(update);

export default class Demo extends Component {
    addNum = () => {
        store.dispatch({ type: 'INCREMENT' });
    };

    minusNum = () => {
        store.dispatch({ type: 'DECREMENT' });
    };

    clearNum = () => {
        store.dispatch({ type: 'CLEAR_NUM' });
    };

    render() {
        return (
            <div className="wrap">
                <h3>all redux in single js file</h3>
                Current Number: <span className="numValue">0</span>
                <div>
                    <Button size="large" className="numBtn" onClick={this.addNum}>+</Button>
                    <Button size="large" className="numBtn" onClick={this.minusNum}>-</Button>
                    <Button size="large" className="numBtn" onClick={this.clearNum}>clear</Button>
                </div>
            </div>
        );
    }
}
