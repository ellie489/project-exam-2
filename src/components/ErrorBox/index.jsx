import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

const ErrorBox = ({ message }) => {
  return (
    <Alert variant="danger" className="mt-3">
      {message}
    </Alert>
  );
};

ErrorBox.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorBox;
