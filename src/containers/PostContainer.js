import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getPost, goToHome } from '../modules/posts';
import { useDispatch } from 'react-redux';
import Post from '../components/Post';
import { useNavigate } from 'react-router-dom';

function PostContainer({ postId }) {
  const { data, loading, error } = useSelector(
    state => state.posts.post[postId]
  ) || {
    loading: false,
    data: null,
    error: null
  };  // 아예 데이터가 존재하지 않을 때가 있으므로, 비구조화 할당이 오류나지 않도록 
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  // 1. 포스트 정보가 바뀔 수 있는 가능성이 있다면 새로 불러오긴 하지만 로딩중은 표시하지 않는 아래 구조
  useEffect(()=>{
    dispatch(getPost(postId));
  }, [postId, dispatch]);
  if (loading && !data) return <div>로딩중...</div>

  // // 2. 데이터를 재대로 캐생하고 싶다면 아예 요청하지 않는 아래 방식을 선택
  // useEffect(()=>{
  //   if (data) return;
  //   dispatch(getPost(postId));
  // }, [postId, dispatch, data]);
  // if (loading) return <div>로딩중...</div>

  if (error) return <div>에러 발생!</div>
  if (!data) return null;

  return (
    <>
      <button onClick={() => dispatch(goToHome(navigate))}>홈으로 이동</button>
      <Post post={data} />
    </>
  )
}

export default PostContainer;