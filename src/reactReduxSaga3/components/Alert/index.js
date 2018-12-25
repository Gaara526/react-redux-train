/**
 * @since 2018-12-14 15:01
 * @author pengyumeng
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Alert } from 'antd';
import 'antd/dist/antd.css';

import './index.pcss';

export default class AlertComponent extends Component {
    static propTypes = {
        showAlert: PropTypes.bool,
        handleClickAlert: PropTypes.func,
    };

    static defaultProps = {
        showAlert: false,
        handleClickAlert: () => {},
    };

    render() {
        const {
            showAlert,
            handleClickAlert,
        } = this.props;

        return (
            <div>
                <Button size="large" className="numBtn" onClick={handleClickAlert}>alert</Button>
                {showAlert && <Alert message="Hello Redux" type="success" />}
            </div>
        );
    }
}
