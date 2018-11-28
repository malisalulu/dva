import { doLogin } from '../utils/api'
const delay = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};
let lang = (navigator.languages && navigator.languages[0]) || navigator.language;
let currentLang=lang=="zh-CN"?"zh_CN":"en_US";
let localeLang=sessionStorage.getItem("lang")?sessionStorage.getItem("lang"):currentLang;
export default {
  namespace: 'example',
  state: {
    count: 0,
    localeLang:localeLang
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
      yield call(delay, 1000);
      // let params = {
      //    username:"lilu",
      //    password:"123456"
      //  };
      // const response = yield call(doLogin,params);
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
