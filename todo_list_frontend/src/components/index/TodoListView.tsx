import React, { FC } from 'react';
// Modules
import Link from 'next/link';
// MUI
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
// FUI
import Typography from '../../theme/overrides/Typography';
// Types
import { Item } from '../../lib/types/TodoTypes';
// Styles
import { Color, Shadow } from '../../theme/theme';
// Lib
import paths from '../../lib/paths';

interface Props {
  // This shouldn't be void but the type for HTMLInputElement is missing in this env
  // eslint-disable-next-line no-unused-vars
  handleCheckboxClick: (_event: any) => void;
  items: Item[];
}

const TodoListView: FC<Props> = ({ items, handleCheckboxClick }) => {
  return (
    <Box minHeight="400px">
      <Grid container spacing={2}>
        {items.map((item: Item) => {
          return (
            <Grid key={item.id} item xs={12}>
              <Box
                bgcolor={Color.WHITE}
                borderRadius={8}
                boxShadow={Shadow.DEPTH_01}
                px={1}
              >
                <Grid container alignItems="center">
                  <Grid item>
                    <Box py={3}>
                      <Checkbox
                        color={'primary'}
                        defaultChecked={item.completed}
                        value={item.id}
                        onChange={handleCheckboxClick}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs>
                    <Link passHref href={paths.view.href(item.id)}>
                      <Box py={3} style={{ cursor: 'pointer' }} width="100%">
                        <Typography customColor={Color.JET}>
                          {item.title}
                        </Typography>
                      </Box>
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};
export default TodoListView;
