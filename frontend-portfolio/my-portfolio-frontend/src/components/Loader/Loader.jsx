import React from 'react';
import { Spinner } from 'react-bootstrap';
import './Loader.css';

const Loader = ({ message = 'Loading...' }) => {
  return (
    <div className="loader-container">
      <Spinner animation="border" role="status" variant="primary" />
      <span className="loader-message">{message}</span>
    </div>
  );
};

export default Loader;