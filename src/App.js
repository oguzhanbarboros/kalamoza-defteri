import { Container, Row, Col } from 'reactstrap';
import './App.css';
import FirmaListe from './components/FirmaListe';
import Header from './components/Header';
import Home from './components/Home';
import Firma from './components/Firma';
import FirmaEkle from './components/FirmaEkle';
import { positions } from '@mui/system';

function App() {
  return (
    <div className='w-screen h-screen my-bg bg-slate-300'>
      <Header />

      <div className='flex flex-row px-20 py-10 gap-36'>
        <FirmaListe />

        <div className='flex flex-col gap-20 items-center justify-center'>
        <FirmaEkle />
        <Home />

        </div>
      </div>

    </div>
  );
}

export default App;
