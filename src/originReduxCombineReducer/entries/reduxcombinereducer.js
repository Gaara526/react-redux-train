/**
 * @since 2018-12-14 10:37
 * @author pengyumeng
 */

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Demo from '../originReduxCombineReducer';

render(
    <AppContainer>
        <Demo />
    </AppContainer>,
    document.getElementById('app'),
);

if (module.hot) {
    module.hot.accept('../originReduxCombineReducer', () => {
        const newDemo = require('../originReduxCombineReducer').default;
        render(
            <AppContainer>
                {React.createElement(newDemo)}
            </AppContainer>,
            document.getElementById('app'),
        );
    });
}
