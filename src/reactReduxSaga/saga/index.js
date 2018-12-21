/**
 * @since 2018-12-18 16:55
 * @author pengyumeng
 */

import fetch from 'isomorphic-fetch';
import { delay } from 'redux-saga';
import { take, call, put, takeEvery } from 'redux-saga/effects';

import actions from '../actions';

const p = () => {
    return fetch('./api/asyncFetchData.json')
        .then((response) => response.json())
        .then((json) => {
            return json.msg;
        });
};

function* asyncFetch() {
    yield delay(1000);
    const payload = yield call(p);

    yield put({
        type: actions.async.RECEIVE_DATA,
        payload,
    });
}

function* rootSaga() {
    // yield takeEvery(actions.async.REQUEST_DATA, asyncFetch);
    while (true) {
        yield take(actions.async.REQUEST_DATA);

        yield delay(1000);
        const payload = yield call(p);

        yield put({
            type: actions.async.RECEIVE_DATA,
            payload,
        });
    }
}

export default rootSaga;
