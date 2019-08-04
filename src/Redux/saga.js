import { put, takeLatest } from 'redux-saga/effects';
import { GET_DATA } from './const'

export function* getServers(action) {
  try {
    yield put(console.log("fetch here"))
  } catch (error) {

  }
}
export default function* saga() {
  yield takeLatest(GET_DATA, getServers);
}