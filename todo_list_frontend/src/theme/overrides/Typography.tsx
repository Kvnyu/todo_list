import React, { FC, ReactNode } from 'react';
// MUI
import { makeStyles } from '@material-ui/core';
import MuiTypography, { TypographyTypeMap } from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    color: (props: StyleProps) => props.customColor,
  },
});

interface StyleProps {
  customColor?: string;
}

interface Props extends StyleProps {
  children: ReactNode;
}

const Typography: FC<Props & TypographyTypeMap['props']> = (props) => {
  const { customColor, children, ...parentProps } = props;
  const classes = useStyles({ customColor });
  return (
    <MuiTypography className={classes.root} {...parentProps}>
      {children}
    </MuiTypography>
  );
};

export default Typography;
