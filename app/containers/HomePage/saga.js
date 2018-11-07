/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_REPOS } from 'containers/App/constants';
import { reposLoaded, repoLoadingError } from 'containers/App/actions';

import request from 'utils/request';
import { makeSelectSkill, makeSelectLocation } from 'containers/HomePage/selectors';

import { dataLoadSuccess, dataLoadError } from './actions';
import { DATA_LOAD_REQUEST } from './constants';
/**
 * Github repos request/response handler
 */
export function* getData() {
  // Select username from store
  const skill = yield select(makeSelectSkill());
  const location = yield select(makeSelectLocation());
  const requestURL = `https://jobs.github.com/positions.json?description=${skill}&location=${location}`;

  try {
    // Call our request helper (see 'utils/request')
    const data = yield call(request, requestURL);
    yield put(dataLoadSuccess(data));
  } catch (err) {
    yield put(dataLoadError(err));
  }
}

// export function* getData() {
//   // Select username from store
//   // const username = yield select(makeSelectUsername());
//   const requestURL = 'https://jobs.github.com/positions.json?description=python&location=new+york';

//   try {
//     // Call our request helper (see 'utils/request')
//     const data = yield call(request, requestURL);
//     yield put(dataLoadSuccess(data));
//   } catch (err) {
//     yield put(dataLoadError(err));
//   }
// }

/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {
  // Watches for LOAD_REPOS actions and calls getJobs when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  // yield takeLatest(DATA_LOAD_REQUEST, getJobs);
  yield takeLatest(DATA_LOAD_REQUEST, getData);
}
