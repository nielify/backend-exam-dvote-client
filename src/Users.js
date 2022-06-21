import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import './App.css';

const Users = () => {
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'first_name', headerName: 'First Name', width: 130 },
    { field: 'last_name', headerName: 'Last Name', width: 130 },
    {
      field: 'address',
      headerName: 'Address',
      width: 200,
    },
    { field: 'postcode', headerName: 'Post Code', width: 100 },
    { field: 'contact_phone_number', headerName: 'Contact Phone Number', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'username', headerName: 'Username', width: 150 },
    { field: 'password', headerName: 'Password', width: 150 },
  ];

  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  const history = useHistory();

  const handleDeleteUser = () => {
    if (selectedRows.length === 1) {
      fetch(`http://localhost:3001/user/single/${selectedRows[0]}`, {
        method: 'DELETE',
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          if (data.message === 'user deleted') {
            window.location.reload(false);
          }
        });
    } else if (selectedRows.length > 1) {
      fetch('http://localhost:3001/user/multiple', {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(selectedRows),
      })
      .then(res => {
        return res.json();
      })
      .then(data => {
        if (data.message === 'users deleted') {
          window.location.reload(false);
        }
      });
    } else {
      alert('Select user/s to delete')
    }
  }

  const handleEditUser = () => {
    if (selectedRows.length === 1) {
      history.push(`/user/edit/${selectedRows[0]}`, selectedRow);
    } else if (selectedRows.length > 1) {
      alert('you can only edit one user at once');
    } else {
      alert('select a user to edit')
    }
  }

  const handleAddUser = () => {
    history.push('/user/add');
  }

  useEffect(() => {
    fetch('http://localhost:3001/user/all')
      .then(res => {
        return res.json();
      })
      .then(data => {
        setRows(data);
      });
  }, [])

  return (  
    <div style={{ height: 600, width: 1500 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        onSelectionModelChange={item => {
          setSelectedRows(item);
        }}
        onRowClick={e => setSelectedRow(e.row)}
        hideFooter
      />
      <button className='add-button' onClick={handleAddUser}>Add New</button>
      <button className='edit-button' onClick={handleEditUser}>Edit</button>
      <button className="delete-button" onClick={handleDeleteUser}>Delete</button>
    </div>
  );
}
 
export default Users;