import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, Box } from '@mui/material';
import './RecentSubmissionsTable.css';

const columns = [
  { field: 'formName', headerName: 'Form Name', width: 200 },
  { field: 'status', headerName: 'Status', width: 130 },
  { field: 'date', headerName: 'Date', width: 130 },
  { field: 'submittedBy', headerName: 'Submitted By', width: 200 },
];

const submissions = [
  { id: 1, formName: 'Medical Practitioner Form', status: 'Pending', date: '2024-11-01', submittedBy: 'Dr. Smith' },
  { id: 2, formName: 'Funeral Undertaker Form', status: 'Approved', date: '2024-10-29', submittedBy: 'John Doe' },
  { id: 3, formName: 'Informant Form', status: 'Rejected', date: '2024-10-28', submittedBy: 'Jane Doe' },
  { id: 4, formName: 'Deceased Form', status: 'Pending', date: '2024-10-27', submittedBy: 'Emily Clark' },
  { id: 5, formName: 'Medical Practitioner Form', status: 'Approved', date: '2024-10-26', submittedBy: 'Dr. Roberts' },
];

const RecentSubmissionsTable = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredRows, setFilteredRows] = useState(submissions);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);

    const filteredData = submissions.filter((row) =>
      row.formName.toLowerCase().includes(value) ||
      row.status.toLowerCase().includes(value) ||
      row.date.includes(value) ||
      row.submittedBy.toLowerCase().includes(value)
    );

    setFilteredRows(filteredData);
  };

  return (
    <Box className="recent-submissions-container" sx={{ width: '70%', overflow: 'hidden', margin: '0 auto', }}>
      <h2 className="recent-submissions-title">Recent Submissions</h2>
      <TextField
        label="Search Submissions"
        variant="outlined"
        value={searchText}
        onChange={handleSearch}
        fullWidth
        sx={{
          marginBottom: 2,
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            backgroundColor: '#f5f5f5',
          },
        }}
      />
      <DataGrid
        rows={filteredRows}
        columns={columns}
        pageSize={1}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection
        sx={{
          '& .MuiDataGrid-columnHeaders': {
            // White text for header
            fontSize: '1rem',
            fontWeight: 'bold',
          },
          '& .MuiDataGrid-cell': {
            padding: '8px',
          },
          '& .MuiDataGrid-row:nth-of-type(odd)': {
            backgroundColor: '#f9f9f9', // Light gray for alternate rows
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: '#e6f7ff', // Light blue on hover
          },
          '& .MuiDataGrid-footerContainer': {
            backgroundColor: '#f5f5f5', // Light gray for footer
          },
          '& .MuiDataGrid-root': {
            borderRadius: '8px', // Round edges for DataGrid
          },
        }}
      />
    </Box>
  );
};

export default RecentSubmissionsTable;
