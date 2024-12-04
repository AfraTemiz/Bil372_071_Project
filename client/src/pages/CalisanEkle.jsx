import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import OgretmenEkle from './OgretmenEkle';
import IdareciEkle from './IdareciEkle';

import '../style/AnaSayfa.css'; // Yeni bir CSS dosyası ekleyeceğiz

function CalisanEkle() {
  return (
    <div className="main-container">
      <div className="button-container">
        <Link to="/OgretmenEkle"><button type="button" className="nav-button">Add Teacher</button></Link>
        <br />
        <Link to="/TemizlikciEkle"><button type="button" className="nav-button">Add Cleaner</button></Link>
        <br />
        <Link to="/IdareciEkle"><button type="button" className="nav-button">Add Administrator</button></Link>
      </div>
    </div>
  );
}

export default CalisanEkle;
