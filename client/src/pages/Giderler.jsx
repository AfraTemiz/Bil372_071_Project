import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TableList2 from '../components/TableList2';
import '../style/FilterableTableList.css';

function GiderTypeSelect(giderType, setGiderType) {
  return (
    <div className="filters">
      <label htmlFor="giderTypeDropdown">
        <select
          id="giderTypeDropdown"
          value={giderType}
          onChange={(e) => setGiderType(e.target.value)}
        >
          <option value="all">All</option>
          <option value="degisken">Variable Costs</option>
          <option value="sabit">Fixed Costs</option>
        </select>
      </label>
    </div>
  );
}

function Giderler() {
  const [rows, setRows] = useState([]);
  const [giderType, setGiderType] = useState('all');
  const [visibleColumns, setvisibleColumns] = useState(['GIDER_ID', 'GIDER_TUTAR', 'GIDER_ADI', 'GIDER_TARIH']);
  const [dateFilter, setDateFilter] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      let endpoint = 'http://localhost:3006/api/gider/tumGiderleriGetir';

      if (giderType === 'sabit') {
        endpoint = 'http://localhost:3006/api/gider/sabitGiderGetir';
        setvisibleColumns(['GIDER_ID', 'GIDER_TUTAR', 'GIDER_ADI', 'GIDER_TARIH']);
      } else if (giderType === 'degisken') {
        endpoint = 'http://localhost:3006/api/gider/degiskenGiderGetir';
        setvisibleColumns(['GIDER_ID', 'GIDER_TUTAR', 'GIDER_ADI', 'GIDER_TARIH']);
      } else if (giderType === 'all') {
        endpoint = 'http://localhost:3006/api/gider/tumGiderleriGetir';
        setvisibleColumns(['GIDER_ID', 'GIDER_TUTAR', 'GIDER_ADI', 'GIDER_TARIH']);
      }

      const currentDate = new Date();
      const filterDate = new Date();

      if (dateFilter === 'weekly') {
        filterDate.setDate(currentDate.getDate() - 7); // 1 hafta önce
      } else if (dateFilter === 'monthly') {
        filterDate.setMonth(currentDate.getMonth() - 1); // 1 ay önce
      }

      try {
        const response = await axios.get(endpoint);
        setRows(response.data[0]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [giderType, dateFilter]);

  return (
    <div>
      <TableList2 rows={rows} visibleColumns={visibleColumns} comp={GiderTypeSelect(giderType, setGiderType)} manageTo="/GiderManage/" unique="GIDER_ID" addTo="/GiderEkle" />
    </div>
  );
}

function GiderlerPage() {
  return (
    <div>
      <Giderler />
    </div>
  );
}

export default GiderlerPage;
