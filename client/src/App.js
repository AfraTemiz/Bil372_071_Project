import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import OgrenciPage from './pages/OgrenciProfili';
import OgrencilerPage from './pages/Ogrenciler';
import CalisanlarPage from './pages/Calisanlar';
import DerslerPage from './pages/Dersler';
import CalisanPage from './pages/CalisanProfili';
import CalisanEkle from './pages/CalisanEkle';
import SubelerPage from './pages/Subeler';
import DersManage from './pages/DersManage';
import OgretmenEkle from './pages/OgretmenEkle';
import OgrenciEkle from './pages/OgrenciEkle';
import TemizlikciEkle from './pages/TemizlikciEkle';
import IdareciEkle from './pages/IdareciEkle';
import DersEkle from './pages/DersEkle';
import GiderlerPage from './pages/Giderler';
import MalzemelerPage from './pages/Malzemeler';
import VelilerPage from './pages/Veliler';
import VeliProfile from './pages/VeliProfili';
import SubeEkle from './pages/SubeEkle';
import SubeManage from './pages/SubeManage';
import GiderEkle from './pages/GiderEkle';
import SubeBagla from './pages/SubeBagla';
import MalzemeEkle from './pages/MalzemeEkle';

import './style/FilterableTableList.css';
import './style/AnaSayfa.css'; // Yeni bir CSS dosyası ekleyeceğiz

function AnaSayfa() {
  const currentDate = new Date().toLocaleDateString();
  return (
    <div className="main-container">
      <div className="header">
        <h1>WELCOME!</h1>
        <p>{currentDate}</p>
      </div>
      <div className="button-container">
        <Link to="/Ogrenciler">
          <button type="button" className="nav-button">
            Students
          </button>
        </Link>
        <Link to="/Calisanlar">
          <button type="button" className="nav-button">
            Staff
          </button>
        </Link>
        <Link to="/Dersler">
          <button type="button" className="nav-button">
            Courses
          </button>
        </Link>
        <Link to="/Subeler">
          <button type="button" className="nav-button">
            Branches
          </button>
        </Link>
        <Link to="/Giderler">
          <button type="button" className="nav-button">
            Costs
          </button>
        </Link>
        <Link to="/Malzemeler">
          <button type="button" className="nav-button">
            Material
          </button>
        </Link>
        <Link to="/Veliler">
          <button type="button" className="nav-button">
            Parents
          </button>
        </Link>
      </div>
    </div>
  );
}

function Home() {
  return (
    <div>
      <AnaSayfa />
    </div>
  );
}

function Hello() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/Ogrenciler" element={<OgrencilerPage />} />
      <Route path="/OgrenciProfili/" element={<OgrenciPage />} />
      <Route path="/OgrenciEkle/" element={<OgrenciEkle />} />
      <Route path="/TemizlikciEkle/" element={<TemizlikciEkle />} />
      <Route path="/IdareciEkle/" element={<IdareciEkle />} />
      <Route path="/Calisanlar" element={<CalisanlarPage />} />
      <Route path="/CalisanProfili" element={<CalisanPage />} />
      <Route path="/CalisanEkle" element={<CalisanEkle />} />
      <Route path="/OgretmenEkle" element={<OgretmenEkle />} />
      <Route path="/Dersler" element={<DerslerPage />} />
      <Route path="/DersEkle" element={<DersEkle />} />
      <Route path="/Subeler" element={<SubelerPage />} />
      <Route path="/SubeEkle" element={<SubeEkle />} />
      <Route path="/SubeBagla" element={<SubeBagla />} />
      <Route path="/SubeManage" element={<SubeManage />} />
      <Route path="/DersManage" element={<DersManage />} />
      <Route path="/Giderler" element={<GiderlerPage />} />
      <Route path="/GiderEkle" element={<GiderEkle />} />
      <Route path="/Malzemeler" element={<MalzemelerPage />} />
      <Route path="/Veliler" element={<VelilerPage />} />
      <Route path="/VeliManage" element={<VeliProfile />} />
      <Route path="/MalzemeEkle" element={<MalzemeEkle />} />
    </Routes>
  );
}

export default Hello;
