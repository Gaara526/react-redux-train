/**
 * @since 2018-12-14 14:49
 * @author pengyumeng
 */

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { applyMiddleware, compose, createStore } from '../lib/redux';
import { Provider } from '../lib/react-redux';
import { thunk } from '../lib/middlewares';
import reducer from '../reducer';
import Demo from '../container';

const middlewares = [
    thunk,
];

const store = createStore(reducer, compose(
    applyMiddleware(...middlewares),
));

render(
    <AppContainer>
        <Provider store={store}>
            <Demo />
        </Provider>
    </AppContainer>,
    document.getElementById('app'),
);

if (module.hot) {
    module.hot.accept('../container', () => {
        const newDemo = require('../container').default;
        render(
            <AppContainer>
                <Provider store={store}>
                    {React.createElement(newDemo)}
                </Provider>
            </AppContainer>,
            document.getElementById('app'),
        );
    });
}
