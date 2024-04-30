import logo from './logo.svg';
import './App.css';
import React from 'react';
import {useEffect, useState} from "react";

function App() {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    async function fetchData() {
      try{
        const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
        const data = await response.json();
        console.log(data);
        setEmployees(data);
      }
      catch (e) {
        console.log(e);
        alert("Error in fetching data")
      }
    }
     fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = employees.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(employees.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleNextPageChange = (event) => {
    if(currentPage<pageNumbers.length){
      setCurrentPage(currentPage+1);
    }  };
  const handlePreviousPageChange = (event) => {
    if(currentPage>1){
      setCurrentPage(currentPage-1);
    }
  };
  const handleCurrentPageChange = (event) => {
    setCurrentPage(currentPage);
  };
  const headerStyles = {
    "text-align": "center",
    "background-color": "#04AA6D",
    "color": "white",
    "border": "1px solid black",
    "margin": "auto",
    "padding": "10px",
  }
  const dataStyles = {
    "text-align": "center",
    "border": "0.1px solid lightgray",
    "margin": "auto",
    "padding": "10px",
  }
  return (
      <div className="App">
        <h1>Employee Data Table</h1>
        <table style={{border: "2px solid #04AA6D", marginLeft: "auto", marginRight: "auto"}} width="95%">
           {/*<thead style={headerStyles}>*/}
          <th style={headerStyles}>ID</th>
          <th style={headerStyles}>Name</th>
          <th style={headerStyles}>Email</th>
          <th style={headerStyles}>Role</th>
          {/*</thead>*/}
          <tbody style={{border: "1px solid", padding:"15px"}}>
          {
            // eslint-disable-next-line array-callback-return
            currentItems.map((employee) => {
              return (
                  <tr style={{background: "white", borderBottom:"1px solid", marginLeft: "auto", marginRight: "auto"}}>
                    <td style={dataStyles}>{employee.id}</td>
                    <td style={dataStyles}>{employee.name}</td>
                    <td style={dataStyles}>{employee.email}</td>
                    <td style={dataStyles}>{employee.role}</td>
                  </tr>
              )
            })
          }
          </tbody>
        </table>
        <div style={{margin:"10px", padding:"5px" , display: "flex", flexDirection: "row", justifyContent:"center", alignItems: "center"}}>
          <button
              onClick={handlePreviousPageChange}
              style={{marginRight: "10px"}}
          >
            Previous
          </button>
          <button
              onClick={handleCurrentPageChange}
              style={{marginRight: "10px"}}

          >
            {currentPage}
          </button>
          <button
              onClick={handleNextPageChange}
              style={{marginRight: "10px"}}
          >
            Next
          </button>
        </div>
      </div>
  )
      ;
}

export default App;
