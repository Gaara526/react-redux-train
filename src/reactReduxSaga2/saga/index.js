/**
 * @since 2018-12-18 16:55
 * @author pengyumeng
 */

import fetch from 'isomorphic-fetch';
import { delay } from 'redux-saga';
import { call, cancel, fork, put, take, takeEvery } from 'redux-saga/effects';

import actions from '../actions';

const fetch1 = () => {
    return fetch('./api/asyncFetchData.json')
        .then((response) => response.json())
        .then((json) => {
            return json.msg;
        });
};

const fetch2 = () => {
    return fetch('./api/asyncFetchData1.json')
        .then((response) => response.json())
        .then((json) => {
            return json.msg;
        });
};

function* saga1() {
    yield call(delay, 1000);
    const payload = yield call(fetch1);

    yield put({
        type: actions.async.RECEIVE_DATA,
        payload,
    });
}

function* saga2() {
    yield call(delay, 1000);
    const payload = yield call(fetch2);

    yield put({
        type: actions.async.RECEIVE_DATA2,
        payload,
    });
}

function* rootSaga() {
    let task1 = null;
    let task2 = null;

    while (true) { // eslint-disable-line no-constant-condition
        const action = yield take([actions.async.REQUEST_DATA, actions.async.CANCEL_FETCH]);
        if (action.type === actions.async.REQUEST_DATA) {
            task1 = yield fork(saga1);
            task2 = yield fork(saga2);
        } else {
            if (task2) { // eslint-disable-line no-lonely-if
                yield cancel(task2);
            }
        }
    }
}

export default rootSaga;
