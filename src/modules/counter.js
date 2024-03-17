import { delay, put, takeEvery, takeLatest } from 'redux-saga/effects'

// 액션 타입
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';
const INCREASE_ASYNC = 'INCREASE_ASYNC';
const DECREASE_ASYNC = 'DECREASE_ASYNC';

// 액션 함수
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });
export const increaseAsync = () => ({ type: INCREASE_ASYNC });
export const decreaseAsync = () => ({ type: DECREASE_ASYNC });

// export const increaseAsync = () => dispatch => {
//   setTimeout(() => dispatch(increase()), 1000);
// };
// export const decreaseAsync = () => dispatch => {
//   setTimeout(() => dispatch(decrease()), 1000);
// };

function* increaseSaga() {
  yield delay(1000);
  yield put(increase());    // put은 특정 액션을 디스패치 해준다.
}

function* decreaseSaga() {
  yield delay(1000);
  yield put(decrease());
}

export function* counterSaga() {
  yield takeEvery(INCREASE_ASYNC, increaseSaga);
  yield takeLatest(DECREASE_ASYNC, decreaseSaga);
}

// 초기값
const initialState = 0;

export default function counter(state=initialState, action) {
  switch (action.type) {
    case INCREASE:
      return state + 1;
    case DECREASE:
      return state - 1;
    default:
      return state;
  }
}


