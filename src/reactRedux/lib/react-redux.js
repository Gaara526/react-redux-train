/**
 * @since 2018-12-17 14:46
 * @author pengyumeng
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Provider extends Component {
    static childContextTypes = {
        store: PropTypes.object,
    };

    getChildContext = () => {
        return { store: this.props.store };
    };

    render() {
        return (<div>{this.props.children}</div>);
    }
}

const connect = (mapStateToProps) => (WrappedComponent) => {
    class Connect extends Component {
        static contextTypes = {
            store: PropTypes.object,
        };

        state = {
            finalProps: {},
        };

        componentDidMount() {
            this.updateProps();
            this.context.store.subscribe(this.updateProps);
        }

        updateProps = () => {
            const { store } = this.context;

            const dispatch = store.dispatch;
            const stateProps = mapStateToProps(store.getState());

            this.setState({
                finalProps: {
                    dispatch,
                    ...stateProps,
                    ...this.props,
                },
            });
        };

        render() {
            const { finalProps } = this.state;
            return (<WrappedComponent {...finalProps} />);
        }
    }

    return Connect;
};

export {
    Provider,
    connect,
};
