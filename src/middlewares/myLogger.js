const myLogger = store => next => action => {
  console.log(action);

  console.log('\t', '업데이트 이전 상태 : ', store.getState()); 

  const result = next(action);    // 다음 미들웨어 또는 리듀서에게 액션을 전달

  // 업데이트 이후의 상태를 조회합니다.
  console.log('\t', '업데이트 이후 상태 : ', store.getState());  

  return result;  // 여기서 반환하는 값은 dispatch(action)의 결과물
};

export default myLogger;