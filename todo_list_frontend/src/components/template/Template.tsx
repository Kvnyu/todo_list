import React, { FC, ReactNode } from 'react';
// MUI
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
// Components
import Footer from './Footer';
import Header from './Header';
// Styles
import { Color } from '../../theme/theme';
import { useTheme } from '@material-ui/core/styles';

interface Props {
  children: ReactNode;
  pageName: string;
}

const Template: FC<Props> = ({ children, pageName }) => {
  const theme = useTheme();
  return (
    <Box minHeight="100%">
      <Box>
        <Box zIndex={theme.zIndex.appBar}>
          <Header pageName={pageName} />
        </Box>
        <Box
          color={Color.WHITE}
          position="absolute"
          width="100%"
          zIndex={theme.zIndex.modal}
        >
          <Container disableGutters maxWidth="md">
            <Box boxShadow={theme.shadows[3]}>{children}</Box>
          </Container>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Template;
