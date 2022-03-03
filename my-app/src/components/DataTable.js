import * as React from 'react';
import ReactDOM from 'react-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {getUsers, deleteUser, updateUser, createUser} from '../services/backendservice.js';
// import deleteUser from '../services/backendservice.js';
import Button from '@mui/material/Button';
import BasicModal from './Modal.js';
import Typography from '@mui/material/Typography';

export default class DataTable extends React.Component {

    constructor() {
        super();
        this.state = {rows: [], open: false, thisEntry: null};
        this.handleClose = this.handleClose.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleCreate = this.handleCreate.bind(this);

    }

    componentDidMount () {
        getUsers().then(currentTable => { 
        this.setState({rows: currentTable.users})});
    }

    // handles closing the modal
    handleClose () {
        this.setState({open: false});

    }

    // handles updating an entry and changing the table to match
    handleUpdate (name, id, points) {
        let updateInfo = {Name: name, Id: id, Points: points}; 
        updateUser(updateInfo).then(response => 
            this.setState(prevState => 
                prevState.rows.map(row => 
                    {
                        if (row.Id == response.Id) {
                            row.Name = response.Name
                            row.Points = response.Points
                        } 
                        return row
                    }) 
                    ));
    }

    // handles sending a create request and updating the table with the response
    handleCreate (name, id, points) {
        let createInfo = {Name: name, Id: id, Points: points};
        createUser(createInfo).then(response => {
            if (response.status == 200) {
                this.setState(prevState => {
                    return {
                        ...prevState,
                        rows: [
                            ...prevState.rows,
                            response.json()
                        ]
                    }
                })
            }
        })
    }



    // Formats and displays table of contents
    render() {
        return (
        <div>
        <TableContainer component={Paper}>
            <BasicModal open={this.state.open}
                close={this.handleClose}
                editID={this.state.editID}
                thisEntry={this.state.thisEntry}
                update={this.handleUpdate}
                create={this.handleCreate}
                >
            </BasicModal>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">ID</TableCell>
                <TableCell align="right">Points</TableCell>
                <TableCell align="right">Functions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {this.state.rows.map((row) => (
                <TableRow
                    key={row.Id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                    {row.Name}
                    </TableCell>
                    <TableCell align="right">{row.Id}</TableCell>
                    <TableCell align="right">{row.Points}</TableCell>
                    <TableCell align="right">
                        {/* Button that allows user to edit data on that row */}
                        <Button variant="text" 
                        onClick={() => {this.setState({open: true, editID: false, thisEntry: row})}}>
                            Edit
                        </Button></TableCell>
                    <TableCell align="right">
                        {/* Button to delete the user on the same row as the button */}
                        <Button variant="text" 
                        onClick={() => { deleteUser(row.Id).then(response => {
                            this.setState(prevState => {
                                let newUsers = prevState.rows.filter(entry => 
                                    entry.Id != response.deletedID);
                                return {'rows': newUsers}});
                        }) }}>
                            Delete
                            </Button>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        <Typography id="Edit_Warning" variant="h6" component="h2">
              *You cannot edit your ID.  If you Wish to do so, delete your entry and recreate it
        </Typography>
            {/* button opens a modal to create a new user */}
            <Button variant="outlined"
            onClick={() => this.setState({open: true, editID: true, thisEntry: null})}
            >New Entry</Button>
        </div>
        );
    }
}