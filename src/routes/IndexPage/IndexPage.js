import React from 'react';
import { connect } from 'dva';
import { Link } from 'react-router-dom'
import styles from './IndexPage.css';

function IndexPage() {
  return (
    <div className={styles.normal}>
      <p><Link to="/products">products</Link></p>
      <p><Link to="/user/login">Login</Link></p>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
