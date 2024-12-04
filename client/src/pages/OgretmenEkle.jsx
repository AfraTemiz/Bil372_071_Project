import React, { useState } from 'react';
import axios from 'axios';
import '../style/AddPage.css';

function OgretmenEkle() {
  const [TC_NO, setTC_NO] = useState('');
  const [ISIM, setISIM] = useState('');
  const [SOYISIM, setSOYISIM] = useState('');
  const [ADRES, setADRES] = useState('');
  const [TEL_NO, setTEL_NO] = useState('');
  const [E_POSTA, setE_POSTA] = useState('');
  const [PART_MI, setPART_MI] = useState('0');
  const [MAAS, setMAAS] = useState('');
  const [SAAT, setSAAT] = useState('');

  const handleOgretmenEkle = async () => {
    try {
      let response;
      if (PART_MI === '0') {
        response = await axios.get('http://localhost:3006/api/calisan/fullTime/ogretmenEkle', {
          params: {
            TC_NO, ISIM, SOYISIM, ADRES, TEL_NO, E_POSTA, MAAS,
          },
        });
      } else {
        response = await axios.get('http://localhost:3006/api/calisan/partTime/ogretmenEkle', {
          params: {
            TC_NO, ISIM, SOYISIM, ADRES, TEL_NO, E_POSTA, SAAT,
          },
        });
      }

      console.log(response.data); // Optional: Handle success response
    } catch (error) {
      console.error('Error adding ogretmen:', error);
      // Optional: Handle error response
    }
  };

  return (
    <div>
      <h2>Add Teacher</h2>
      <form>
        <label className="label-add" htmlFor="TC_NO">TC Id:
          <input className="input-add" type="text" id="TC_NO" value={TC_NO} onChange={(e) => setTC_NO(e.target.value)} />
        </label>

        <label className="label-add" htmlFor="ISIM">Name:
          <input className="input-add" type="text" id="ISIM" value={ISIM} onChange={(e) => setISIM(e.target.value)} />
        </label>

        <label className="label-add" htmlFor="SOYISIM">Surname:
          <input className="input-add" type="text" id="SOYISIM" value={SOYISIM} onChange={(e) => setSOYISIM(e.target.value)} />
        </label>

        <label className="label-add" htmlFor="ADRES">Address:
          <input className="input-add" type="text" id="ADRES" value={ADRES} onChange={(e) => setADRES(e.target.value)} />
        </label>

        <label className="label-add" htmlFor="TEL_NO">Phone:
          <input className="input-add" type="text" id="TEL_NO" value={TEL_NO} onChange={(e) => setTEL_NO(e.target.value)} />
        </label>

        <label className="label-add" htmlFor="E_POSTA">E-mail:
          <input className="input-add" type="text" id="E_POSTA" value={E_POSTA} onChange={(e) => setE_POSTA(e.target.value)} />
        </label>
        <br />
        {PART_MI === '0' && (
          <label htmlFor="MAAS">
            Salary:
            <input type="text" id="MAAS" name="MAAS" value={MAAS} onChange={(e) => setMAAS(e.target.value)} />
          </label>
        )}
        <br />
        <label htmlFor="PART_MI">
          Is Part Time:
          <select id="PART_MI" name="PART_MI" value={PART_MI} onChange={(e) => setPART_MI(e.target.value)}>
            <option value="0">Full Time</option>
            <option value="1">Part Time</option>
          </select>
        </label>
        <br />
        {PART_MI === '1' && (
          <div>
            <label htmlFor="SAAT">
              Hour:
              <input type="text" id="SAAT" name="SAAT" value={SAAT} onChange={(e) => setSAAT(e.target.value)} />
            </label>
            <br />
          </div>
        )}
        <button type="button" onClick={handleOgretmenEkle}>
          Add Teacher
        </button>
      </form>
    </div>
  );
}

export default OgretmenEkle;
