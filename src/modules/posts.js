import * as postsAPI from '../api/posts';
import { 
  reducerUtils ,
  createPromiseThunk, 
  handleAsyncActions, 
  createPromiseThunkById,
  handleAsyncActionById,
  createPromiseSaga,
  createPromiseSagaById
} from '../lib/asyncUtils';
import { call, put, takeEvery } from 'redux-saga/effects'

const GET_POSTS = 'GET_POSTS';  // 요청 시작
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';  // 요청 성공
const GET_POSTS_ERROR = 'GET_POSTS_ERROR';  // 요청 실패

// 포스트 하나 조회하기
const GET_POST = 'GET_POST';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_ERROR = 'GET_POST_ERROR';

// 포스트 비우기
const CLEAR_POST = 'CLEAR_POST';

// // thunk를 사용 할 때, 꼭 모든 액션들에 대하여 액션 생성함수를 만들 필요는 없습니다.
// // 그냥 thunk 함수에서 바로 액션 객체를 만들어주어도 괜찮습니다.
// export const getPosts = () => async dispatch => {
//   dispatch({ type: GET_POST });
//   try {
//     const posts = await postsAPI.getPosts();
//     dispatch({ type: GET_POSTS_SUCCESS, posts });
//   } catch (e) {
//     dispatch({ type: GET_POSTS_ERROR, error: e });
//   }
// };

// // thunk 함수에서도 파라미터를 받아와서 사용 할 수 있습니다.
// export const getPost = id => async dispatch => {
//   dispatch({ type: GET_POST });
//   try {
//     const post = await postsAPI.getPostById(id);
//     dispatch({ type: GET_POST_SUCCESS, post });
//   } catch (e) {
//     dispatch({ type: GET_POST_ERROR, error: e });
//   }
// };

export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);
export const getPost = createPromiseThunkById(GET_POST, postsAPI.getPostById);

export const clearPost = () => ({ type: CLEAR_POST });

// function* getPostsSaga() {
//   try {
//     const posts = yield call(postsAPI.getPosts);   // call을 사용하면 특정 함수를 호출하고, 결과를 리턴 받을때 까지 기다린다.
//     yield put({
//       type: GET_POSTS_SUCCESS,
//       payload: posts
//     });
//   } catch (e) {
//     yield put({
//       type: GET_POSTS_ERROR,
//       error: true,
//       payload: e
//     });
//   }
// }

// function* getPostSaga(action) {
//   const param = action.payload;
//   const id = action.meta;
//   try {
//     const post = yield call(postsAPI.getPostById, param);
//     yield put({
//       type: GET_POST_SUCCESS,
//       payload: post,
//       meta: id
//     });
//   } catch (e) {
//     yield put({
//       type: GET_POST_ERROR,
//       error: true,
//       payload: e,
//       meta: id
//     });
//   }
// };

const getPostsSaga = createPromiseSaga(GET_POSTS, postsAPI.getPosts);
const getPostSaga = createPromiseSagaById(GET_POST, postsAPI.getPostById);

export function* postsSaga() {
  yield takeEvery(GET_POSTS, getPostsSaga);
  yield takeEvery(GET_POST, getPostSaga);
}

const initialState = {
  posts: reducerUtils.initial(), 
  post: reducerUtils.initial()
};

export default function posts(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
    case GET_POSTS_SUCCESS:
    case GET_POSTS_ERROR:
      return handleAsyncActions(GET_POSTS, 'posts', true)(state, action);
    case GET_POST:
    case GET_POST_SUCCESS:
    case GET_POST_ERROR:
      const postsReducer = handleAsyncActionById(GET_POST, 'post', true);
      return postsReducer(state, action);
    default:
      return state;
  }
};

export const goToHome = (navigate) => (dispatch, getState) => {
  dispatch({ type: GET_POSTS });
  navigate('/');
}