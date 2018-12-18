/**
 * @since 2018-12-14 15:10
 * @author pengyumeng
 */

import React, { Component } from 'react';
import 'antd/dist/antd.css';

import { connect } from '../lib/react-redux';
import Number from '../components/Number';
import Alert from '../components/Alert';
import actions from '../actions';
import './index.pcss';

const mapStateToProps = (state) => ({
    number: state.changeNumber.number,
    showAlert: state.toggleAlert.showAlert,
});

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
