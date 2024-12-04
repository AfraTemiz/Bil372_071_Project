import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/AddPage.css';

function MalzemeEkle() {
  const [MALZEME_ADI, setMALZEME_ADI] = useState('');
  const [STOK, setSTOK] = useState('');
  const [MALZEME_BIRIM, setMALZEME_BIRIM] = useState('');
  const navigate = useNavigate();

  const handleAddOgrenci = async () => {
    try {
      const response = await axios.get('http://localhost:3006/api/malzeme/malzemeEkle', {
        params: {
          MALZEME_ADI, STOK, MALZEME_BIRIM,
        },
      });

      // Handle the response as needed, e.g., show a success message or redirect to another page
      console.log('Malzeme added successfully:', response.data);
    } catch (error) {
      console.error('Error adding Malzeme:', error);
      // Handle the error, e.g., show an error message to the user
    }
    navigate('/Malzemeler');
  };

  return (
    <div className="ogrenci-ekle-container">
      <h2>Add Material</h2>

      <label className="label-add" htmlFor="TC_NO">Material Name:
        <input className="input-add" type="text" id="MALZEME_ADI" value={MALZEME_ADI} onChange={(e) => setMALZEME_ADI(e.target.value)} />
      </label>

      <label className="label-add" htmlFor="ISIM">Material Stock:
        <input className="input-add" type="text" id="STOK" value={STOK} onChange={(e) => setSTOK(e.target.value)} />
      </label>

      <label className="label-add" htmlFor="ISIM">Material Unit:
        <input className="input-add" type="text" id="MALZEME_BIRIM" value={MALZEME_BIRIM} onChange={(e) => setMALZEME_BIRIM(e.target.value)} />
      </label>

      <button className="button-add" type="button" onClick={handleAddOgrenci}>
        Add
      </button>
    </div>
  );
}

export default MalzemeEkle;
