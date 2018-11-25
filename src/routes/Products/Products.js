import React from 'react';
import { connect } from 'dva';
import { LocaleProvider, Pagination, DatePicker, TimePicker, Calendar,
  Popconfirm, Table, Modal, Button, Select, Transfer, Radio } from 'antd';
import ProductList from '../../components/ProductList';

const Products = ({ dispatch, products,example }) => {
  console.log(products,example)
  function handleDelete(id) {
    dispatch({
      type: 'products/delete',
      payload: id,
    });
  }
  return (
    <div>
      <h2>List of Products</h2>
      <DatePicker />
      <TimePicker />
      <ProductList onDelete={handleDelete} products={products} />
    </div>
  );
};

// export default Products;
export default connect(({ products,example }) => ({
  products,example
}))(Products);
