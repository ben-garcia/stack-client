import React from 'react';

import { FooterProps } from './types';
import './styles.scss';

const Footer: React.FC<FooterProps> = ({ style = {}, children }) => {
  return (
    <footer style={style} className="footer">
      {children}
    </footer>
  );
};

export default Footer;
