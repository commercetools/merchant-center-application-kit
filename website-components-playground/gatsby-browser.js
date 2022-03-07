import React from 'react';
import { BrowserRouter } from 'react-router-dom';

export const wrapPageElement = ({ element, props }) => {
  return <BrowserRouter {...props}>{element}</BrowserRouter>;
};
