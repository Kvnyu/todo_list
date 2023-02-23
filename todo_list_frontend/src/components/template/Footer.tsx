import React, { FC } from 'react';
// MUI
import Box from '@material-ui/core/Box';

const Footer: FC = () => {
  return (
    <Box
      maxWidth="lg"
      style={{
        backgroundImage: `url(/images/trees.png)`,
        backgroundPosition: 'center center',
        backgroundRepeat: 'repeat-x',
        bottom: 0,
        display: 'block',
        height: '128px',
        left: 0,
        opacity: '15%',
        position: 'fixed',
        width: '100%',
      }}
    />
  );
};

export default Footer;
