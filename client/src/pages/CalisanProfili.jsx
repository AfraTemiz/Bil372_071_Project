import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function CalisanProfile() {
  const location = useLocation();
  const { TC_NO } = location.state;
  const [calisan, setcalisan] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3006/api/calisan/calisanlariGetir', { params: { TC_NO } })
      .then((response) => setcalisan(response.data[0]))
      .catch((error) => console.error('Error fetching student profile:', error));
  }, [TC_NO]);

  return (
    <div>
      {calisan && (
        <div>
          <h2>
            {calisan.ISIM} s Profile
          </h2>
          <p>
            İsim: {calisan.ISIM}
          </p>
          <p>
            Soyisim: {calisan.SOYISIM}
          </p>
          <p>
            TC No: {calisan.TC_NO}
          </p>
          <p>
            Telefon: {calisan.TEL_NO}
          </p>
          <p>
            Email: {calisan.E_POSTA}
          </p>
        </div>
      )}
    </div>
  );
}

export default CalisanProfile;
