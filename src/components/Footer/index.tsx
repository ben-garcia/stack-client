import React from 'react';

import { FooterProps } from './types';
import './styles.scss';

const Footer: React.FC<FooterProps> = ({ children }) => {
  return <footer className="footer">{children}</footer>;
};

export default Footer;
