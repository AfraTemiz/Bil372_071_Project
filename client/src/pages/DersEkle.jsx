import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/AddPage.css';

function DersEkle() {
  const [DERS_ADI, setDERS_ADI] = useState('');
  const [DERS_SAATI, setDERS_SAATI] = useState('');
  const navigate = useNavigate();

  const handleAddOgrenci = async () => {
    try {
      const response = await axios.get('http://localhost:3006/api/ders/dersEkle', {
        params: {
          DERS_ADI, DERS_SAATI,
        },
      });

      // Handle the response as needed, e.g., show a success message or redirect to another page
      console.log('Ogrenci added successfully:', response.data);
    } catch (error) {
      console.error('Error adding Ogrenci:', error);
      // Handle the error, e.g., show an error message to the user
    }
    navigate('/Dersler');
  };

  return (
    <div className="ogrenci-ekle-container">
      <h2>Add Course</h2>

      <label className="label-add" htmlFor="TC_NO">Course Name:
        <input className="input-add" type="text" id="TC_NO" value={DERS_ADI} onChange={(e) => setDERS_ADI(e.target.value)} />
      </label>

      <label className="label-add" htmlFor="ISIM">Course Hour:
        <input className="input-add" type="text" id="ISIM" value={DERS_SAATI} onChange={(e) => setDERS_SAATI(e.target.value)} />
      </label>

      <button className="button-add" type="button" onClick={handleAddOgrenci}>
        Add
      </button>
    </div>
  );
}

export default DersEkle;
