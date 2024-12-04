import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import '../style/FilterableTableList.css';

function Add({
  addTo, unique,
}) {
  return (
    <Link to={addTo} state={unique}>
      <button type="button" className="ogrenci-button">Add</button>
    </Link>
  );
}

function FilterableTableList({
  rows, visibleColumns, compFilter, manageTo, addTo, unique, compAfter,
}) {
  const [filteredData, setFilteredData] = useState(rows);
  const [filterTCNO, setFilterTCNO] = useState('');
  const [filterIsim, setFilterIsim] = useState('');
  const [filterSoyisim, setFilterSoyisim] = useState('');
  const [filterTelNo, setFilterTelNo] = useState('');
  const [filterEPosta, setFilterEPosta] = useState('');
  const [filterDogumYili, setFilterDogumYili] = useState('');
  const [dogumYiliFilterType, setDogumYiliFilterType] = useState('exact');
  const [filterDersId, setFilterDersId] = useState('');
  const [filterDersAdi, setfilterDersAdi] = useState('');
  const [filterDersSaati, setfilterDersSaati] = useState('');
  const [filterSubeId, setfilterSubeId] = useState('');
  const [filterGun, setfilterGun] = useState('');
  const [filterDersNo, setfilterDersNo] = useState('');
  const [filterSinif, setfilterSinif] = useState('');
  const [filterSubeNo, setfilterSubeNo] = useState('');

  useEffect(() => {
    // Filter the data based on the filter input value for each column

    const filtered = rows.filter((item) => {
      let isTCNOMatch = true;
      let isIsimMatch = true;
      let isSoyisimMatch = true;
      let isTelNoMatch = true;
      let isEPostaMatch = true;
      let isDersAdi = true;
      let isDersSaati = true;
      let isGun = true;
      let isDersNo = true;
      let isSinif = true;
      let isSubeNo = true;
      if (item.TC_NO) { isTCNOMatch = item.TC_NO.toLowerCase().includes(filterTCNO.toLowerCase()); }
      if (item.ISIM) { isIsimMatch = item.ISIM.toLowerCase().includes(filterIsim.toLowerCase()); }
      if (item.SOYISIM) { isSoyisimMatch = item.SOYISIM.toLowerCase().includes(filterSoyisim.toLowerCase()); }
      if (item.TEL_NO) { isTelNoMatch = item.TEL_NO.toLowerCase().includes(filterTelNo.toLowerCase()); }
      if (item.E_POSTA) { isEPostaMatch = item.E_POSTA.toLowerCase().includes(filterEPosta.toLowerCase()); }

      let isDogumYiliMatch = true;
      if (dogumYiliFilterType === 'exact') {
        isDogumYiliMatch = String(new Date().getFullYear() - item.DOGUM_YILI).includes(filterDogumYili);
      } else if (dogumYiliFilterType === 'range' && filterDogumYili) {
        const [min, max] = filterDogumYili.split('-').map(Number);
        isDogumYiliMatch = new Date().getFullYear() - item.DOGUM_YILI >= Math.min(min, max) && new Date().getFullYear() - item.DOGUM_YILI <= Math.max(min, max);
      }

      if (item.DERS_ADI) { isDersAdi = item.DERS_ADI.toLowerCase().includes(filterDersAdi.toLowerCase()); }
      if (item.DERS_SAATI) { isDersSaati = String(item.DERS_SAATI).includes(filterDersSaati); }
      if (item.GUN) { isGun = String(item.GUN).includes(filterGun); }
      if (item.DERS_NO) { isDersNo = String(item.DERS_NO).includes(filterDersNo); }
      if (item.SINIF) { isSinif = item.SINIF.toLowerCase().includes(filterSinif.toLowerCase()); }
      if (item.SUBE_NO) { isSubeNo = String(item.SUBE_NO).includes(filterSubeNo); }

      return (
        isTCNOMatch
        && isIsimMatch
        && isSoyisimMatch
        && isTelNoMatch
        && isEPostaMatch
        && isDogumYiliMatch
        && isDersAdi
        && isDersSaati
        && isGun
        && isDersNo
        && isSinif
        && isSubeNo
      );
    });

    setFilteredData(filtered);
  }, [
    rows,
    filterTCNO,
    filterIsim,
    filterSoyisim,
    filterTelNo,
    filterEPosta,
    filterDogumYili,
    dogumYiliFilterType,
  ]);

  return (
    <div>
      <div className="filters">
        {compFilter}

        {visibleColumns.includes('TC_NO') && (
          <input
            type="text"
            placeholder="Filter by ID"
            value={filterTCNO}
            onChange={(e) => setFilterTCNO(e.target.value)}
          />
        )}

        {visibleColumns.includes('ISIM') && (
          <input
            type="text"
            placeholder="Filter by name"
            value={filterIsim}
            onChange={(e) => setFilterIsim(e.target.value)}
          />
        )}

        {visibleColumns.includes('SOYISIM') && (
          <input
            type="text"
            placeholder="Filter by surname"
            value={filterSoyisim}
            onChange={(e) => setFilterSoyisim(e.target.value)}
          />
        )}

        {visibleColumns.includes('TEL_NO') && (
          <input
            type="text"
            placeholder="Filter by phone number"
            value={filterTelNo}
            onChange={(e) => setFilterTelNo(e.target.value)}
          />
        )}

        {visibleColumns.includes('E_POSTA') && (
          <input
            type="text"
            placeholder="Filter by e-mail"
            value={filterEPosta}
            onChange={(e) => setFilterEPosta(e.target.value)}
          />
        )}

        {visibleColumns.includes('DOGUM_YILI') && (
          <select
            id="dogumYiliFilterType"
            value={dogumYiliFilterType}
            onChange={(e) => setDogumYiliFilterType(e.target.value)}
          >
            <option value="exact">Exact</option>
            <option value="range">Range</option>
          </select>
        )}

        {visibleColumns.includes('DOGUM_YILI') && dogumYiliFilterType === 'exact' && (
          <input
            type="number"
            placeholder="Filter by age"
            value={filterDogumYili}
            onChange={(e) => setFilterDogumYili(e.target.value)}
          />
        )}

        {visibleColumns.includes('DOGUM_YILI') && dogumYiliFilterType === 'range' && (
          <input
            type="text"
            placeholder="Filter by age (Min-Max)"
            value={filterDogumYili}
            onChange={(e) => setFilterDogumYili(e.target.value)}
          />
        )}

        {visibleColumns.includes('DERS_ID') && (
          <input
            type="text"
            placeholder="Filter by course ID"
            value={filterDersId}
            onChange={(e) => setFilterDersId(e.target.value)}
          />
        )}

        {visibleColumns.includes('DERS_ADI') && (
          <input
            type="text"
            placeholder="Filter by course name"
            value={filterDersAdi}
            onChange={(e) => setfilterDersAdi(e.target.value)}
          />
        )}

        {visibleColumns.includes('DERS_SAATI') && (
          <input
            type="text"
            placeholder="Filter by course hour"
            value={filterDersSaati}
            onChange={(e) => setfilterDersSaati(e.target.value)}
          />
        )}

        {visibleColumns.includes('SUBE_ID') && (
          <input
            type="text"
            placeholder="Filter by branch Id"
            value={filterSubeId}
            onChange={(e) => setfilterSubeId(e.target.value)}
          />
        )}

        {visibleColumns.includes('GUN') && (
          <input
            type="text"
            placeholder="Filter by day"
            value={filterGun}
            onChange={(e) => setfilterGun(e.target.value)}
          />
        )}

        {visibleColumns.includes('DERS_NO') && (
          <input
            type="text"
            placeholder="Filter by course no"
            value={filterDersNo}
            onChange={(e) => setfilterDersNo(e.target.value)}
          />
        )}

        {visibleColumns.includes('SINIF') && (
          <input
            type="text"
            placeholder="Filter by classroom"
            value={filterSinif}
            onChange={(e) => setfilterSinif(e.target.value)}
          />
        )}

        {visibleColumns.includes('SUBE_NO') && (
          <input
            type="text"
            placeholder="Filter by branch no"
            value={filterSubeNo}
            onChange={(e) => setfilterSubeNo(e.target.value)}
          />
        )}

        <Add addTo={addTo} unique={unique} />
      </div>

      <table>
        <thead>
          <tr>
            <th> </th>
            {visibleColumns.includes('TC_NO') && <th>TC ID</th>}
            {visibleColumns.includes('ISIM') && <th>Name</th>}
            {visibleColumns.includes('SOYISIM') && <th>Surname</th>}
            {visibleColumns.includes('ADRES') && <th>Address</th>}
            {visibleColumns.includes('TEL_NO') && <th>Phone Number</th>}
            {visibleColumns.includes('E_POSTA') && <th>E-mail</th>}
            {visibleColumns.includes('MEZUNIYET_TARIHI') && <th>Graduation Date</th>}
            {visibleColumns.includes('DOGUM_YILI') && <th>Age</th>}
            {visibleColumns.includes('DERS_ID') && <th>Course ID</th>}
            {visibleColumns.includes('DERS_ADI') && <th>Course Name</th>}
            {visibleColumns.includes('DERS_SAATI') && <th>Course Hours</th>}
            {visibleColumns.includes('SUBE_ID') && <th>Branch ID</th>}
            {visibleColumns.includes('GUN') && <th>Day</th>}
            {visibleColumns.includes('DERS_NO') && <th>Course No</th>}
            {visibleColumns.includes('SINIF') && <th>Classroom</th>}
            {visibleColumns.includes('SUBE_NO') && <th>Branch No</th>}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item[unique]}>
              {manageTo && (
                <td>
                  <Link to={manageTo} state={{ unique: item[unique], visibleColumns: visibleColumns }}>
                    <button type="button" className="ogrenci-button">Manage</button>
                  </Link>
                </td>
              )}
              {visibleColumns.includes('TC_NO') && <td>{item.TC_NO}</td>}
              {visibleColumns.includes('ISIM') && <td>{item.ISIM}</td>}
              {visibleColumns.includes('SOYISIM') && <td>{item.SOYISIM}</td>}
              {visibleColumns.includes('ADRES') && <td>{item.ADRES}</td>}
              {visibleColumns.includes('TEL_NO') && <td>{item.TEL_NO}</td>}
              {visibleColumns.includes('E_POSTA') && <td>{item.E_POSTA}</td>}
              {visibleColumns.includes('MEZUNIYET_TARIHI') && <td>{item.MEZUNIYET_TARIHI}</td>}
              {visibleColumns.includes('DOGUM_YILI') && <td>{new Date().getFullYear() - item.DOGUM_YILI}</td>}
              {visibleColumns.includes('DERS_ID') && <td>{item.DERS_ID}</td>}
              {visibleColumns.includes('DERS_ADI') && <td>{item.DERS_ADI}</td>}
              {visibleColumns.includes('DERS_SAATI') && <td>{item.DERS_SAATI}</td>}
              {visibleColumns.includes('SUBE_ID') && <td>{item.SUBE_ID}</td>}
              {visibleColumns.includes('GUN') && <td>{item.GUN}</td>}
              {visibleColumns.includes('DERS_NO') && <td>{item.DERS_NO}</td>}
              {visibleColumns.includes('SINIF') && <td>{item.SINIF}</td>}
              {visibleColumns.includes('SUBE_NO') && <td>{item.SUBE_NO}</td>}
              {(compAfter !== undefined) && <td>{compAfter}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

FilterableTableList.defaultProps = {
  compFilter: null,
  manageTo: '/',
  addTo: '/',
  unique: 'TC_NO',
  compAfter: null,
};

FilterableTableList.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      TC_NO: PropTypes.string,
      ISIM: PropTypes.string,
      SOYISIM: PropTypes.string,
      ADRES: PropTypes.string,
      TEL_NO: PropTypes.string,
      E_POSTA: PropTypes.string,
      MEZUNIYET_TARIHI: PropTypes.string,
      DOGUM_YILI: PropTypes.number,
      DERS_ID: PropTypes.number,
      DERS_ADI: PropTypes.string,
      DERS_SAATI: PropTypes.number,
      SUBE_ID: PropTypes.number,
      GUN: PropTypes.number,
      DERS_NO: PropTypes.number,
      SINIF: PropTypes.string,
      SUBE_NO: PropTypes.number,
    }),
  ).isRequired,
  visibleColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
  compFilter: PropTypes.element,
  manageTo: PropTypes.string,
  addTo: PropTypes.string,
  unique: PropTypes.string,
  compAfter: PropTypes.element,
};

Add.propTypes = {
  addTo: PropTypes.string.isRequired,
  unique: PropTypes.string.isRequired,
};

export default FilterableTableList;
