/**
 * @since 2018-12-18 10:22
 * @author pengyumeng
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import 'antd/dist/antd.css';

import './index.pcss';

export default class FetchDataComponent extends Component {
    static propTypes = {
        handleClickFetch: PropTypes.func,
        showLoading: PropTypes.bool,
        data: PropTypes.object,
    };

    static defaultProps = {
        handleClickFetch: () => {},
        showLoading: false,
        data: null,
    };

    render() {
        const {
            handleClickFetch,
            showLoading,
            data,
        } = this.props;

        return (
            <div>
                <Button size="large" className="numBtn" onClick={handleClickFetch}>async fetch</Button>
                {data !== null && <p>{data.msg}</p>}
                {showLoading && <div className="loading" />}
            </div>
        );
    }
}
