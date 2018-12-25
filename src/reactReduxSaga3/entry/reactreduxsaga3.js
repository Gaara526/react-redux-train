/**
 * @since 2018-12-14 14:49
 * @author pengyumeng
 */

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';

import reducer from '../reducer';
import Demo from '../container';
import rootSaga from '../saga';

const sagaMiddleware = createSagaMiddleware();
const middleware = [
    sagaMiddleware,
];

const store = createStore(reducer, compose(
    applyMiddleware(...middleware),
));

sagaMiddleware.run(rootSaga);

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
