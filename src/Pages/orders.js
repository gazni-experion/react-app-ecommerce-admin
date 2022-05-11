import "../Styles/styles.css";
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'Order Id', width: 70 },
    { field: 'customerName', headerName: 'Customer Name', width: 150 },
    { field: 'orderDate', headerName: 'Order Date', width: 150 },
    { field: 'total', headerName: 'Total', type: 'number', width: 100 },
    { field: 'status', headerName: 'Status', width: 200 },
    { field: 'details', headerName: 'Details', width: 150 },
  ];
  
  const rows = [
    { id: 1, customerName: 'John Snow', orderDate: '24-03-2022', total: 3577, status: 'pending', details: 'haai' },
    { id: 2, customerName: 'John Snow', orderDate: '24-03-2022', total: 3577, status: 'pending', details: 'haai' },
    
  ];

function Orders() {



  
  return (
  <div className="container">
      <h2>Orders</h2>
      <hr />
      <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows.map((item)=>{return({id: item.id, customerName:item.customerName, orderDate: item.orderDate, total: item.total, status: item.status, details: item.details  })})}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />
    </div>

      </div>
      );
}

export default Orders;




