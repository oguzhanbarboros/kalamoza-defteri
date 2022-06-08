import React, { useEffect, useState } from 'react';
import Header from './Header';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import data from '../data';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import FirmaEkle from './FirmaEkle';
import { Container, Row, Col } from 'reactstrap';
import { Button } from 'bootstrap';
import firmaListe from './firmaListe.css';
const FirmaListe = () => {
  const [firmalar, setfirmalar] = useState([
    Cookies.get('firmalar')
      ? JSON.parse(Cookies.get('firmalar'))
      : Cookies.set('firmalar', JSON.stringify(data)),
  ]);
  const [silinicekId, setSilinicekId] = useState(null);
  const navigate = useNavigate();
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const sil = (e) => {
    console.log(e);
    const newFirmalar = firmalar.filter((firma) => firma.id !== e);
    setfirmalar(newFirmalar);
    Cookies.set('firmalar', JSON.stringify(newFirmalar));
  };

  useEffect(() => {
    Cookies.get('firmalar')
      ? setfirmalar(JSON.parse(Cookies.get('firmalar')))
      : Cookies.set('firmalar', JSON.stringify(data));
  }, [firmalar.length]);

  return (
    <div className="overflow-y-auto">
      <Container className="w-[800px]">
        <Row>
          <Col>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 500 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Firma Adı</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {firmalar.map((row, key) => (
                    <StyledTableRow
                      className="flex items-center cursor-pointer"
                      key={key}
                    >
                      <StyledTableCell
                        className="flex flex-row items-center"
                        component="th"
                        scope="row"
                      >
                        <h4
                          className="cursor-pointer "
                          onClick={() => {
                            navigate(`/${row.id}`);
                          }}
                        >
                          {row.firmaAdi}
                        </h4>

                        <button
                          onClick={(e) => {
                            sil(row.id);
                          }}
                          className="button hover:scale-105 transition-all text-white/95 font-mono font-medium rounded-lg"
                        >
                          Sil
                        </button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FirmaListe;
