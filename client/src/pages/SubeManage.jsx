import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import TableList from '../components/TableList';

function objToArr(rows) {
  const allowedAttributes = ['TC_NO', 'ISIM', 'SOYISIM', 'ADRES', 'TEL_NO', 'E_POSTA', 'DOGUM_YILI'];
  if (Array.isArray(rows)) {
    return rows;
  }

  if (rows === undefined) {
    return [];
  }
  const arr = [];
  arr[0] = rows;
  return arr;
}

function MalzemeOgrenciSelect({ type, setType, fetchData }) {
  return (
    <div className="filters">
      <label htmlFor="calisanTypeDropdown">
        <select
          id="calisanTypeDropdown"
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            fetchData(e.target.value);
          }}
        >
          <option value="malzeme">Material</option>
          <option value="ogrenci">Student</option>
        </select>
        Change Staff type
      </label>
    </div>
  );
}

MalzemeOgrenciSelect.propTypes = {
  type: PropTypes.string.isRequired,
  setType: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
};

function SubeManage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { unique } = location.state;
  const [rows, setRows] = useState([]);
  const SUBE_ID = unique;
  const [ders, setDers] = useState({});
  const [malzemeOgrenciType, setMalzemeOgrenciType] = useState('ogrenci');
  const [visibleColumns, setvisibleColumns] = useState(['TC_NO', 'ISIM', 'SOYISIM', 'ADRES', 'TEL_NO', 'E_POSTA', 'DOGUM_YILI']);

  const fetchData = async (selectedType) => {
    try {
      let endpoint = 'http://localhost:3006/api/sube/ogrencileriGetir'; // Default endpoint

      if (selectedType === 'malzeme') {
        // Update endpoint based on selected type
        endpoint = 'http://localhost:3006/api/malzeme/subeMalzemeGetir';
        setvisibleColumns(['MALZEME_ADI', 'MALZEME_ID', 'MALZEME_BIRIM', 'STOK', 'SUBE_ID']);
      } else if (selectedType === 'ogrenci') {
        // Update endpoint based on selected type
        endpoint = 'http://localhost:3006/api/sube/ogrencileriGetir';
        setvisibleColumns(['TC_NO', 'ISIM', 'SOYISIM', 'ADRES', 'TEL_NO', 'E_POSTA', 'DOGUM_YILI']);
      }

      const response = await axios.get(endpoint, { params: { SUBE_ID } });
      setRows(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    axios.get('http://localhost:3006/api/sube/subeGetir', { params: { SUBE_ID } })
      .then((response) => setDers(response.data[0]))
      .catch((error) => console.error('Error fetching student profile:', error));
  }, [SUBE_ID]);

  useEffect(() => {
    axios.get('http://localhost:3006/api/sube/ogrencileriGetir', { params: { SUBE_ID } })
      .then((response) => setRows(objToArr(response.data[0])))
      .catch((error) => console.error('Error fetching student profile:', error));
  }, [SUBE_ID]);

  return (
    <>
      <div>
        <p>Branch Id: {ders.SUBE_ID}</p>
        <p>Day: {ders.GUN}</p>
        <p>Course No: {ders.DERS_NO}</p>
        <p>Classroom: {ders.SINIF}</p>
        <p>Branch No: {ders.SUBE_NO}</p>
      </div>
      <MalzemeOgrenciSelect type={malzemeOgrenciType} setType={setMalzemeOgrenciType} fetchData={fetchData} />
      <TableList rows={rows} manageTo="/SubeManage" visibleColumns={visibleColumns} unique="SUBE_ID" addTo="/SubeEkle/" />
    </>
  );
}

export default SubeManage;
