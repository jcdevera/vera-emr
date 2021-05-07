import { useTable } from 'react-table'
import React,  { useMemo, useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

function PatientTable(props){
  const pData = React.useMemo(()=> props.data);
  const data = React.useMemo(
    () => [
      {
        col1: 'Hello',
        col2: 'World',
      },
      {
        col1: 'react-table',
        col2: 'rocks',
      },
      {
        col1: 'whatever',
        col2: 'you want',
      },
    ],
    []
  )

  const columns = React.useMemo(
    () => [
      {
        Header: 'First Name',
        accessor: 'first_name', // accessor is the "key" in the data
      },
      {
        Header: 'Last Name',
        accessor: 'last_name',
      },
      {
        Header: 'Gender',
        accessor: 'gender', // accessor is the "key" in the data
      },
      {
        Header: 'Date of Birth',
        accessor: 'dateOfBirth',
      },
    ],
    []
  )
    console.log(pData)
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: pData })

  const history = useHistory();
  const rowOnClick = (e) =>{
    history.push(`/api/${e}`)
  }

  return (
    <table {...getTableProps()} >
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps()}
                style={{
                  background: '#5e6668',
                  color: 'white',
                  fontWeight: 'bold',
                  width: '20%',
                }}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          console.log()
          return (
            <tr onClick={() => rowOnClick(row.original._id)} {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: '15px',
                      border: 'solid 1px gray',
                      
                    }}
                  >
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default PatientTable;