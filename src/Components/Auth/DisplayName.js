import { useContext, useState } from 'react';
import { UserContext } from '../../Context/User';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const DisplayName = () => {
  const { displayNamePopup, setDisplayNamePopup } = useContext(UserContext);
  const { validUser, setValidUser } = useContext(UserContext);
  const [displayName, setDisplayName] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);

  const handleClose = () => {
    setDisplayNamePopup(false);
  };

  const navigate = useNavigate();

  const updateUser = async () => {
    let data = { ...validUser, displayName: displayName, nameCheck: displayName.toLowerCase() };
    try {
      let url = `${process.env.REACT_APP_SERVER}/user/${validUser._id}`;
      // check response of server for success
      // send other code if displayName already exists
      // prompt user to choose another name
      let updatedUser = await axios.put(url, data);
      setValidUser(updatedUser.data);
      setErrorMessage(false);
      setDisplayNamePopup(false);
      navigate('/');

    } catch (error) {
      console.log('ERROR DUPLICATE DISPLAYNAME')
      setErrorMessage(true);
      console.log(error.message);
    }

  }


  return (
    <div>
      <Dialog open={displayNamePopup} onClose={handleClose}>
        <DialogTitle>Display Name</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {
              errorMessage ? 'Display name exists. Please try again.' : 'Please input a display name.'
            }
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Display Name"
            fullWidth
            variant="standard"
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Cancel</Button> */}
          <Button onClick={updateUser}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );

}

export default DisplayName;