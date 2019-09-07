import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

export default function DirectionSnackbar(props) {
  const [transition, setTransition] = React.useState(undefined);
  const {message, open} = props

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  };

  return (
    <div>
      <Snackbar
        open={open}
        onClose={handleClose}
        TransitionComponent={transition}
        autoHideDuration={6000}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={message}
      />
    </div>
  );
}