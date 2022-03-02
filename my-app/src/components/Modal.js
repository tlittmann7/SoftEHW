import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 200,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
  export default function BasicModal(props) {
    // sets name field as current name
    const [name, setName] = React.useState(props.thisEntry?.Name || "");
    const handleChangeName = (event) => {
        setName(event.target.value);
    };
    // sets ID field as current ID
    const [ID, setID] = React.useState(props.thisEntry?.Id || "");
    const handleChangeID = (event) => {
        setID(event.target.value);
    };
    // sets Points field as current Points
    const [Points, setPoints] = React.useState(props.thisEntry?.Points || "");
    const handleChangePoints = (event) => {
        setPoints(event.target.value);
    };
    // Allows fields to be updated at the start (to be populated with default values)
    React.useEffect(() => {
        if (props.thisEntry) {
          setName(props.thisEntry.Name);
          setID(props.thisEntry.Id);
          setPoints(props.thisEntry.Points);
        } else {
          setName("");
          setID("");
          setPoints("");
        }
      }, [props.thisEntry])
    
    return (
      <div>
        <Modal
          open={props.open}
          onClose={props.close}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit Data
            </Typography>
            <TextField id="standard-basic" 
                label="Name"   
                variant="standard" 
                value={name}
                onChange={handleChangeName}
                />
            <TextField disabled={!props.editID} 
                id="standard-disabled" 
                label="ID" 
                variant="standard" 
                value={ID}
                onChange={handleChangeID}
                />
            <TextField id="standard-basic" 
                label="Points" 
                variant="standard" 
                value={Points}
                onChange={handleChangePoints}
                />
            <Button variant="text" onClick={() => {props.close()
                if (!props.editID) {
                  props.update(name, ID, Points)
                } else {
                  props.create(name, ID, Points)
                }

                }}>
            Submit</Button>
          </Box>
        </Modal>
      </div>
    );
  }