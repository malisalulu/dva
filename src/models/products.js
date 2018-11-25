export default {
  namespace: 'products',
  state: [
      { name: 'dva', id: 1 },
      { name: 'antd', id: 2 },
      { name: 'dva2', id: 3 },
      { name: 'antd3', id: 4 },
  ],
  reducers: {
    'delete'(state, { payload: id }) {
      return state.filter(item => item.id !== id);
    },
  },
};
