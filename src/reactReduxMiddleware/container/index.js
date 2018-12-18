/**
 * @since 2018-12-14 15:10
 * @author pengyumeng
 */

import React, { Component } from 'react';
import 'antd/dist/antd.css';

import { connect } from '../lib/react-redux';
import './index.pcss';

import Number from '../components/Number';
import Alert from '../components/Alert';

const mapStateToProps = (state) => ({
    number: state.changeNumber.number,
    showAlert: state.toggleAlert.showAlert,
});

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

    render() {
        const {
            number,
            showAlert,
        } = this.props;

        return (
            <div className="wrap">
                <h3>redux middleware</h3>
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

export default connect(
    mapStateToProps,
)(Demo);
