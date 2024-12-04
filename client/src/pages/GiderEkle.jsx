import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function GiderEkle() {
  const navigate = useNavigate();

  const [giderTur, setGiderTur] = useState('sabit');
  const [GIDER_ADI, setGiderAdi] = useState('');
  const [GIDER_TUTAR, setGiderTutar] = useState('');
  const [GIDER_TARIH, setGiderTarih] = useState('');

  const handleGiderEkle = async () => {
    try {
      let endpoint = '';
      console.log(giderTur);
      if (giderTur === 'sabit') {
        endpoint = 'http://localhost:3006/api/gider/sabitGiderEkle';
      } else if (giderTur === 'degisken') {
        endpoint = 'http://localhost:3006/api/gider/degiskenGiderEkle';
      }
      console.log('Endpoint', endpoint);
      console.log('TARİH', GIDER_TARIH);

      const response = await axios.get(endpoint, {
        params: {
          GIDER_ADI,
          GIDER_TUTAR,
          GIDER_TARIH,
        },
      });

      console.log('Successful!:', response.data);

      // Gider ekledikten sonra Giderler sayfasına yönlendir
      navigate('/Giderler');
    } catch (error) {
      console.error('Error!:', error);
    }
  };

  return (
    <div>
      <h2>Add Cost</h2>
      <form>
        <label htmlFor="giderTurDropdown">
          Cost Type:
          <select value={giderTur} onChange={(e) => setGiderTur(e.target.value)}>
            <option value="sabit">Fixed Cost</option>
            <option value="degisken">Variable Cost</option>
          </select>
        </label>
        <br />

        <label htmlFor="giderAdiInput">
          Cost Name:
          <input type="text" value={GIDER_ADI} onChange={(e) => setGiderAdi(e.target.value)} />
        </label>
        <br />

        <label htmlFor="giderTutarInput">
          Cost Amount:
          <input type="text" value={GIDER_TUTAR} onChange={(e) => setGiderTutar(e.target.value)} />
        </label>
        <br />

        <label htmlFor="giderTarihInput">
          Cost Date:
          <input type="date" value={GIDER_TARIH} onChange={(e) => setGiderTarih(e.target.value)} />
        </label>
        <br />

        <button type="button" onClick={handleGiderEkle}>
          Add Cost
        </button>
      </form>
    </div>
  );
}

export default GiderEkle;
