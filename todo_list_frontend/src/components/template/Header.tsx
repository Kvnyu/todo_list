import React, { FC } from 'react';
// MUI
import { Box } from '@material-ui/core';
import Container from '@material-ui/core/Container';
// FUI
import Typography from '../../theme/overrides/Typography';
// Styles
import { Color } from '../../theme/theme';

interface Props {
  pageName: string;
}

const Header: FC<Props> = ({ pageName }) => {
  return (
    <Container disableGutters maxWidth="md">
      <Box
        bgcolor="background.paper"
        boxShadow={2}
        fontSize="24px"
        minHeight="64px"
        py={2}
        sx={{
          borderRadius: '0px 0px 8px 8px',
        }}
        textAlign="center"
      >
        <Typography customColor={Color.FRESH} variant="h4">
          {pageName}
        </Typography>
      </Box>
    </Container>
  );
};

export default Header;
