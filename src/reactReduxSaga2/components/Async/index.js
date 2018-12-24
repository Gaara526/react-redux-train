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
        handleClickCancel: PropTypes.func,
        data: PropTypes.object,
        data2: PropTypes.object,
    };

    static defaultProps = {
        handleClickFetch: () => {},
        handleClickCancel: () => {},
        data: null,
        data2: null,
    };

    render() {
        const {
            handleClickFetch,
            handleClickCancel,
            data,
            data2,
        } = this.props;

        return (
            <div>
                <Button size="large" className="numBtn" onClick={handleClickFetch}>async fetch</Button>
                <Button size="large" className="numBtn" onClick={handleClickCancel}>cancel fetch2</Button>
                {data !== null && <p>{data.msg}</p>}
                {data2 !== null && <p>{data2.msg}</p>}
            </div>
        );
    }
}
