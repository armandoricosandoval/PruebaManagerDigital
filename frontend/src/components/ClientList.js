import React,{useState,useEffect} from 'react';
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import EditClient from './EditClient';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  
}))(TableRow);



const rows = [

];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function ClientList() {
    const [client, setClient] = useState([])
    const history = useHistory();
  const classes = useStyles();

  const getData = async ()=> {
    const res =await axios.get('http://localhost:4000/api');
        setClient(res.data)      
  }

  

  useEffect(async() => {
      await getData()
  }, [])


  const deleteClient=async(id)=>{      
    const res= await axios.delete(`http://localhost:4000/api/${id}`)
    getData()
  }

  const editClient=async(data)=>{  
  history.push(`/edit/${data._id}`);
  <EditClient data={data}/>
      
  }

  return (
    <Container fixed >
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Nombre</StyledTableCell>
            <StyledTableCell align="right">Cedula</StyledTableCell>
            <StyledTableCell align="right">Telefono</StyledTableCell>
            <StyledTableCell align="right">Direccion</StyledTableCell>
            <StyledTableCell align="right">Editar</StyledTableCell>            
            <StyledTableCell align="right">Eliminar</StyledTableCell>            
          </TableRow>
        </TableHead>
        <TableBody>
          {client.map((client) => (
            <StyledTableRow key={client._id}>
              <StyledTableCell component="th" >
                {client.name}
              </StyledTableCell>
              <StyledTableCell align="right">{client.cedula}</StyledTableCell>
              <StyledTableCell align="right">{client.phone}</StyledTableCell>
              <StyledTableCell align="right">{client.dir}</StyledTableCell>
              <StyledTableCell align="right"><EditIcon onClick={()=>editClient(client)} /></StyledTableCell>
              <StyledTableCell align="right"><DeleteIcon onClick={()=>deleteClient(client._id)}/></StyledTableCell>
              
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  );
}