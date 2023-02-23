// MUI
import { Theme, createStyles, withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
// Styles
import { Color } from '../theme';

const TextField = withStyles((theme: Theme) =>
  createStyles({
    input: {
      backgroundColor: Color.GREY,
      border: '1px solid #ced4da',

      borderRadius: 4,

      fontSize: 16,

      padding: '10px 12px',

      position: 'relative',

      transition: theme.transitions.create(['border-color', 'box-shadow']),
    },
    root: {
      marginTop: theme.spacing(),
    },
  }),
)(InputBase);

export default TextField;
