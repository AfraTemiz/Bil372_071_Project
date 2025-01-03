import React, { useState } from 'react';
import axios from 'axios';
import '../style/AddPage.css';

function IdareciEkle() {
  const [TC_NO, setTC_NO] = useState('');
  const [ISIM, setISIM] = useState('');
  const [SOYISIM, setSOYISIM] = useState('');
  const [ADRES, setADRES] = useState('');
  const [TEL_NO, setTEL_NO] = useState('');
  const [E_POSTA, setE_POSTA] = useState('');
  const [MAAS, setMAAS] = useState('');

  const handleAddTemizlikci = async () => {
    try {
      const response = await axios.get('http://localhost:3006/api/calisan/idareciEkle', {
        params: {
          TC_NO, ISIM, SOYISIM, ADRES, TEL_NO, E_POSTA, MAAS,
        },
      });

      // Handle the response as needed, e.g., show a success message or redirect to another page
      console.log('Temizlikci added successfully:', response.data);
    } catch (error) {
      console.error('Error adding Temizlikci:', error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  return (
    <div className="temizlikci-ekle-container">
      <h2>Add Administrator</h2>

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

      <label className="label-add" htmlFor="MAAS">Salary:
        <input className="input-add" type="text" id="MAAS" value={MAAS} onChange={(e) => setMAAS(e.target.value)} />
      </label>

      <button className="button-add" type="button" onClick={handleAddTemizlikci}>
        Add
      </button>
    </div>
  );
}

export default IdareciEkle;
