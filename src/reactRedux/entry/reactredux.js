/**
 * @since 2018-12-14 14:49
 * @author pengyumeng
 */

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { createStore } from '../lib/redux';
import { Provider } from '../lib/react-redux';
import reducer from '../reducer';
import Demo from '../container';

const store = createStore(reducer);

const preDispatch = store.dispatch;

store.dispatch = (actions) => {
    console.log('actions: ', actions);
    preDispatch(actions);
};

const tempDispatch = store.dispatch;

store.dispatch = (actions) => {
    console.log('current state: ', store.getState());
    tempDispatch(actions);
    console.log('next state: ', store.getState());
};

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
