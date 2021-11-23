import React from 'react';

//moment
import moment from 'moment'

//material-ui
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@material-ui/core';

//styles
import styles from './table.module.scss'

//history
import history from '../../utils/history';

//context
import { useUser } from '../../Context/userContext'

const TableComponent = ({setUserId, userItems}) => {

  const { setOpenModal, openModal } = useUser();

  const handleOnClickView = (row) => {
    const first = row.name.first.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const last = row.name.last.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const id = `${first}${last}`
    history.push(`/${id}`);
    setOpenModal(!openModal);
    setUserId(id);
  }

  return (

    <TableContainer component={Paper}>
    <Table className={styles.table} aria-label="caption table">
      <TableHead>
        <TableRow >
          <TableCell >Name</TableCell>
          <TableCell >Gender</TableCell>
          <TableCell >Birth</TableCell>
          <TableCell >Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {userItems && userItems.map((row) => (
         
          
          <TableRow key={row.phone}>
            <TableCell component="th" scope="row">
              {row.name.title} {row.name.first} {row.name.last}
            </TableCell>
            <TableCell >{row.gender}</TableCell>
            <TableCell >{moment(row.dob.date).format('DD-MM-YYYY')}</TableCell>
            <TableCell >
              <Button className={styles.buttonView} variant="outlined" onClick={() => handleOnClickView(row)} > View </Button>
            </TableCell>
          </TableRow>
         
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  );
}

export default TableComponent;