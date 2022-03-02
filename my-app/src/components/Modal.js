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
    const [nameError, setNameError] = React.useState("")
    const handleChangeName = (event) => {
        setName(event.target.value)
        // user input validation for name
        if (typeof(event.target.value) === "string" &&
          event.target.value.length >= 1 &&
          event.target.value.length <= 25) {
            setNameError("")
        } else {
          setNameError("Name must be between 1 and 25 characters")
        }
    };
    // sets ID field as current ID
    const [ID, setID] = React.useState(props.thisEntry?.Id || "");
    const [IDError, setIDError] = React.useState("")
    const handleChangeID = (event) => {
        setID(event.target.value);
        // user input validation for ID
        if (!isNaN(event.target.value) &&
          event.target.value >= 1 &&
          event.target.value <= 999) {
            setIDError("")
        } else {
          setIDError("ID must be number between 1 and 999")
        }
    };
    // sets Points field as current Points
    const [Points, setPoints] = React.useState(props.thisEntry?.Points || "");
    const [pointsError, setPointsError] = React.useState("")
    const handleChangePoints = (event) => {
        setPoints(event.target.value);
        // user input validation for Points
        if (!isNaN(event.target.value) &&
          event.target.value >= 0 &&
          event.target.value <= 100) {
            setPointsError("")
        } else {
          setPointsError("ID must be number between 0 and 100")
        }
    };
    // Allows fields to be updated at the start (to be populated with default values)
    React.useEffect(() => {
        // update
        if (props.thisEntry) {
          setName(props.thisEntry.Name);
          setID(props.thisEntry.Id);
          setPoints(props.thisEntry.Points);
        // create
        } else {
          setName("");
          setID("");
          setPoints("");
        }
        setNameError("")
      }, [props.thisEntry, props.open])
    
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
                helperText={nameError}
                error={nameError !== ""}
                />
            <TextField disabled={!props.editID} 
                id="standard-disabled" 
                label="ID" 
                variant="standard" 
                value={ID}
                onChange={handleChangeID}
                helperText={IDError}
                error={IDError !== ""}
                />
            <TextField id="standard-basic" 
                label="Points" 
                variant="standard" 
                value={Points}
                onChange={handleChangePoints}
                helperText={pointsError}
                error={pointsError !== ""}
                />
            <Button variant="text" disabled={nameError !== ""
              || IDError !== ""
              || pointsError !== ""} onClick={() => {props.close()
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