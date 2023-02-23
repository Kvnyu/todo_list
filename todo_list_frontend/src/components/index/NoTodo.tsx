import React, { FC } from 'react';
// Modules
import Image from 'next/image';
// MUI
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// Images
import smiley from '../../../public/images/smiley.png';
// Styles
import { Color } from '../../theme/theme';

const NoTodo: FC = () => {
  return (
    <Container maxWidth="lg">
      <Box mb={2} mt={3} pt={4}>
        <Grid container alignItems="center" justifyContent="center" spacing={1}>
          <Grid item xs={12}>
            <Box
              marginLeft="auto"
              marginRight="auto"
              maxHeight={200}
              maxWidth={200}
              p={2}
            >
              <Image priority alt="smiley face" src={smiley} />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box color={Color.ASH}>
              <Typography align="center">
                Hooray!
                <br />
                You’ve cleared your to-do list
              </Typography>
              <Box mt={4}>
                <Typography align="center">{`Tap '+' to create a new task`}</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
export default NoTodo;
