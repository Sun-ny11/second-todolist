import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useSelector } from 'react-redux';
import { AppRootStateType } from '../../reducers/store';
import { useDispatch } from 'react-redux';
import { setAppError } from '../../reducers/appReducer';

export default function ErrorSnackbar() {
   const error = useSelector<AppRootStateType, string | null>(state => state.app.error)
   const dispatch = useDispatch()

   const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
         return;
      }
      dispatch(setAppError(null))
   };


   const isOpen = error !== null

   return (
      <div>
         <Snackbar open={isOpen} autoHideDuration={2000} onClose={handleClose}>
            <Alert
               onClose={handleClose}
               severity="error"
               variant="filled"
               sx={{ width: '100%'}}
            >
               {error}
            </Alert>
         </Snackbar>
      </div>
   );
}