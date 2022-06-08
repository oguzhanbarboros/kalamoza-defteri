import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div className="container ml-[550px]">
      <Link className='lnk' to="cari-liste">
        <button className='btn-og'>Cari Listesi</button>
      </Link>
    </div>
  );
};

export default Home;
