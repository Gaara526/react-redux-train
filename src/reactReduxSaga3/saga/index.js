/**
 * @since 2018-12-18 16:55
 * @author pengyumeng
 */

import fetch from 'isomorphic-fetch';
import { delay } from 'redux-saga';
import { call, cancel, fork, put, take, takeEvery, takeLatest } from 'redux-saga/effects';

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
    // takeEvery 采用非阻塞的方式，每次操作都能被监听到，并且每次都请求数据
    // while (true) { // eslint-disable-line no-constant-condition
    //     yield take(actions.async.REQUEST_DATA);
    //     yield fork(asyncFetch);
    // }
    // yield takeEvery(actions.async.REQUEST_DATA, asyncFetch);

    // takeLatest 同样采用非阻塞的方式，每次操作都能被监听到，但是新来的操作被监听到会取消上次的任务
    // let task = null;
    // while (true) { // eslint-disable-line no-constant-condition
    //     yield take(actions.async.REQUEST_DATA);
    //     if (task) {
    //         yield cancel(task);
    //     }
    //     task = yield fork(asyncFetch);
    // }
    // yield takeLatest(actions.async.REQUEST_DATA, asyncFetch);
}

export default rootSaga;
