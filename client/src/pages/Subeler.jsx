import React from 'react';
import axios from 'axios';
import TableList from '../components/TableList';

function Subeler() {
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    (async function getData() {
      await axios.get('http://localhost:3006/api/ders/subeleriGetir').then((response) => {
        setRows(response.data);
      });
    }());
  }, []);

  return (
    <TableList
      rows={rows}
      visibleColumns={['SUBE_ID', 'GUN', 'DERS_NO', 'SINIF', 'SUBE_NO']}
      addTo="/SubeEkle/"
      manageTo="/SubeManage/" // Manage düğmesi için rota ekledik
      unique="SUBE_ID" // Her satırı benzersiz yapmak için bir anahtar belirttik
    />
  );
}

function SubelerPage() {
  return (
    <div>
      <Subeler />
    </div>
  );
}

export default SubelerPage;
