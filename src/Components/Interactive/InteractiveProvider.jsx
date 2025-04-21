import React, { useEffect } from 'react';
import { initInteractive } from './index';
import './Interactive.css';

// This component initializes all interactive features
const InteractiveProvider = ({ children }) => {
  useEffect(() => {
    // Initialize interactive effects when component mounts
    initInteractive();
  }, []);

  return <>{children}</>;
};

export default InteractiveProvider;
