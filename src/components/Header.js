import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="header-container">
      <Link className='font-serif hover:scale-105 transition-all' to="/">
      <p className='!text-4x1 !font-mono text-emerald-50'>Cari Hesap Kalamoza Defteri</p>
      </Link>
      
      <p>Oğuzhan Barbaros</p>
    </div>
  );
};

export default Header;
