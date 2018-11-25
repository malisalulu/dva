const delay = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};
export default {

  namespace: 'example',

  state: {
    count: 0,
    localeLang:"en_US"
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
    *snycADD({ payload }, { call, put }){
      // yield call(delay, 1000);
      yield put({ type: 'add' ,payload});
    }
  },

  reducers: {
    changeLang(state,{ payload }) {
      // state.localeLang=payload.lang;
      // return state
      return { ...state, localeLang:payload.lang}
    },
    add(state,{ payload }) {
      // state.count=state.count+payload.num;
      // return state
      return { ...state, count:state.count+payload.num }
    },
    save(state, action) {
      return { ...state, ...action.payload };
    }
  },

};
