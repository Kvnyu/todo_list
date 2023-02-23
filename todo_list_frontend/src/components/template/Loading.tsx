import React, { FC } from 'react';
// Modules
import Image from 'next/image';
// MUI
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
// Images
import loading from '../../../public/images/loading.gif';

const Loading: FC = () => {
  return (
    <Grid container alignItems="center" justifyContent="center" spacing={1}>
      <Grid item xs={12}>
        <Box
          marginTop="80px"
          marginX="auto"
          maxHeight={400}
          maxWidth={400}
          p={2}
        >
          <Image priority alt="Loading" src={loading} />
        </Box>
      </Grid>
    </Grid>
  );
};
export default Loading;
