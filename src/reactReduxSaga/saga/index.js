/**
 * @since 2018-12-18 16:55
 * @author pengyumeng
 */

import fetch from 'isomorphic-fetch';
import { call, put, takeEvery } from 'redux-saga/effects';

import actions from '../actions';

const sleep = (timeout) => {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
};

function* asyncFetch() {
    const p = () => {
        return fetch('./api/asyncFetchData.json')
            .then((response) => response.json())
            .then((json) => {
                return json.msg;
            });
    };

    yield sleep(1000);
    const payload = yield call(p);

    yield put({
        type: actions.async.RECEIVE_DATA,
        payload,
    });
}

function* rootSaga() {
    yield takeEvery(actions.async.REQUEST_DATA, asyncFetch);
}

export default rootSaga;
