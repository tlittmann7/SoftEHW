import * as React from 'react';
import ReactDOM from 'react-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import getUsers from '../services/backendservice.js';

export default class DataTable extends React.Component {

    constructor() {
        super();
        this.state = {rows: []};
    }

    componentDidMount () {
        getUsers().then(currentTable => {console.log(currentTable); 
        this.setState({rows: currentTable.users})
        console.log(currentTable)});
    }

    // Formats and displays table of contents
    render() {
        return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">ID</TableCell>
                <TableCell align="right">Points</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {this.state.rows.map((row) => (
                <TableRow
                    key={row.Id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">
                    {row.Name}
                    </TableCell>
                    <TableCell align="right">{row.Id}</TableCell>
                    <TableCell align="right">{row.Points}</TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        );
    }
}