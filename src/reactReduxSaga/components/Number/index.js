/**
 * @since 2018-12-14 15:02
 * @author pengyumeng
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import 'antd/dist/antd.css';

import './index.pcss';

export default class Number extends Component {
    static propTypes = {
        value: PropTypes.number,
        handleClickAdd: PropTypes.func,
        handleClickMinus: PropTypes.func,
        handleClickClear: PropTypes.func,
    };

    static defaultProps = {
        value: 0,
        handleClickAdd: () => {},
        handleClickMinus: () => {},
        handleClickClear: () => {},
    };

    render() {
        const {
            value,
            handleClickAdd,
            handleClickMinus,
            handleClickClear,
        } = this.props;

        return (
            <div>
                Current Number: <span className="numValue">{value}</span>
                <div>
                    <Button size="large" className="numBtn" onClick={handleClickAdd}>+</Button>
                    <Button size="large" className="numBtn" onClick={handleClickMinus}>-</Button>
                    <Button size="large" className="numBtn" onClick={handleClickClear}>clear</Button>
                </div>
            </div>
        );
    }
}
