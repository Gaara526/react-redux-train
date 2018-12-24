/**
 * @since 2018-12-18 16:55
 * @author pengyumeng
 */

import fetch from 'isomorphic-fetch';
import { delay } from 'redux-saga';
import { call, put, take, takeEvery, takeLatest } from 'redux-saga/effects';

import actions from '../actions';

const p = () => {
    return fetch('./api/asyncFetchData.json')
        .then((response) => response.json())
        .then((json) => {
            return json.msg;
        });
};

function* asyncFetch() {
    yield call(delay, 1500);
    const payload = yield call(p);

    yield put({
        type: actions.async.RECEIVE_DATA,
        payload,
    });
}

function* rootSaga() {
    while (true) { // eslint-disable-line no-constant-condition
        yield take(actions.async.REQUEST_DATA);

        yield call(delay, 1500);
        const payload = yield call(p);

        yield put({
            type: actions.async.RECEIVE_DATA,
            payload,
        });
    }
    // yield takeEvery(actions.async.REQUEST_DATA, asyncFetch);
    // yield takeLatest(actions.async.REQUEST_DATA, asyncFetch);
}

export default rootSaga;
