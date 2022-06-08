import React,{useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Cookies from 'js-cookie'
import data from '../data'
import { set } from 'react-hook-form';
import cariListeTablo from './cariListeTablo.css'
import Header from './Header';
function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  
  
  return (
    
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
           
            
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.cariAdi}
        </TableCell>
        <TableCell align="right">{row.borc}</TableCell>
        <TableCell align="right">{row.alacak}</TableCell>
        <TableCell align="right">{row.tarih}</TableCell>
       
        
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                AÇIKLAMA
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                <TableCell>{row.aciklama}</TableCell>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      
    </React.Fragment>
  );
}



  
  
  

export default function CollapsibleTable() {
  const [firmalar, setfirmalar] = useState([]);
  const [para,setPara] = useState(0);
  let totalBorc =0;
  let totalAlacak=0;
  let total = 0;
  let karar =0;
  let borc=0;
  let alacak=0;
  let gonder = false;
  
  
  
  useEffect(() => {
    Cookies.get('firmalar')
      ? setfirmalar(JSON.parse(Cookies.get('firmalar')))
      : Cookies.set('firmalar', JSON.stringify(data));
  }, []);
  
  firmalar.forEach((i)=>{
    i.cari.forEach((i)=>{
      totalBorc = parseInt(totalBorc) +parseInt(i.borc)
      totalAlacak = parseInt(totalAlacak)+ parseInt(i.alacak)
    })
 
   
  })
  total = totalBorc - totalAlacak
  if(total>0){
    gonder = true
    borc ="Toplam " +  total + " ₺ "  + "  Alacak " ;
    alacak = "";
  } else{
    alacak = "Toplam " + total * -1 +" ₺ " + " Borç ";
    borc = "";
  }

  return (
    <div>
      <Header/>
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>FİRMA</TableCell>
            <TableCell align="right">Borç&nbsp;(₺)</TableCell>
            <TableCell align="right">Alacak&nbsp;(₺)</TableCell>
            <TableCell align="right">Tarih</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
          {firmalar.map((row) => (
            
            row.cari.map((item) =>{
              
              return <Row key={row.name} row={item} toplam={row.borc} />

            })  
          ))}
        </TableBody>
      </Table>
      
    </TableContainer>
    
    
    <div>
    <h3 className='underlinee'> {borc}</h3>
     <h3 className='underlinee'> {alacak}</h3>
      </div>
    </div>
  );
}
