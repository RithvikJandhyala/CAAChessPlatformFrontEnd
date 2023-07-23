import { useTable, useGlobalFilter, useSortBy } from 'react-table'
import React,{useState, useEffect} from 'react';
import PlayerService from '../../services/PlayerService';
import pic from "../images/player1.png";
import Doubles from "../images/doubles.png"
import {CSVLink} from 'react-csv';
import * as RiIcons from 'react-icons/ri';
import * as SiIcons from 'react-icons/si';
import { GlobalFilter } from '../GlobalFilter';
import SchoolService from '../../services/SchoolService';
import ClipLoader from "react-spinners/ClipLoader";
import Select from 'react-select';
import UserService from '../../services/UserService';
import {useNavigate} from "react-router-dom";
import * as AiIcons from 'react-icons/ai';
import * as HiIcons from 'react-icons/hi';
import * as FaIcons from 'react-icons/fa';
import MatchService from '../../services/MatchService';
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const SchoolsReactTable=()=>{ 
  const [data,setSchools]=useState([]);
  const [loading,setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const navigate=useNavigate();
  
  useEffect(()=>{
    async function fetchData() {
     
      setLoading(true);
      //await sleep(4000);
      await SchoolService.getSchools().then((response) => {           
        setSchools(response.data);
      });
      setLoading(false);  
      
    }
    fetchData();      
      

  },[]);
  async function deleteSchool(id) {

    const confirmed = window.confirm('Are you sure you want to delete this school?');
    if (!confirmed) {
      return;
    }
    setLoading(true);
    try {
      await SchoolService.deleteSchool(id);
      localStorage.message = "School " + id + ' Deleted Successfully';
           //navigate('/matches-summary');
    } catch (error) {
      console.log(error);
      setError('Failed to Delete Match');
    } finally {
      setLoading(false);
      window.location.reload(false);
    }
  }
  

  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',        
      },
      {
        Header: 'Name',
        Cell: tableProps => (
            <div>             
               { //<img  src= {require('../images/'+SchoolService.getSchoolImg(tableProps.row.original.name))} style={{ width: 30, height:30,marginRight: 10 }} className = 'player1' />    
              }
               <img src={`data:image/jpeg;base64,${tableProps.row.original.image}`} alt={tableProps.row.original.name}  style={{ width: 30, height:30,marginRight: 10 }} className = 'player1'/>
                {tableProps.row.original.name}  
           </div> ),
          accessor: 'name',        
      },
     
      {
        Header: (localStorage.role == 'Admin' )? 'Action':' ',
        Cell: tableProps => (
        <div>
          {(localStorage.role == 'Admin' )? 
          <button onClick={(e)=>{ deleteSchool(tableProps.row.original.id);}} className = "btn "  disabled = {loading}><RiIcons.RiDeleteBin6Line/></button>: 
          <></>}             
                    
        </div> )
      }

      
    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable({ columns, data  },useGlobalFilter,useSortBy)

  const {globalFilter} = state
  return (
    <div>
        <h1 className = "text-center"><FaIcons.FaSchool style={{ marginBottom: 8 ,marginRight: 7}}/>School Management</h1>
       
        <div style={{float:"right",paddingRight:10}}>
            <button type="button" className = "btn btn-primary mb-2" onClick={()=>{navigate('/add-school')}}  style={{marginRight: 10}}> <FaIcons.FaSchool style={{ width: 17,height:15,marginRight: 5, marginBottom: 4}}/>Add Schools </button>
          <CSVLink data = {data} filename = 'Schools'> <button type="button" className = "btn btn-primary mb-2" style={{marginRight: 10}}>  <SiIcons.SiMicrosoftexcel  style={{ width: 20,height:20,marginRight: 5}}/>Download</button> </CSVLink>
        
        </div>           
        <div className='rowC' >
              <GlobalFilter filter = {globalFilter} setFilter = {setGlobalFilter} />  
              <div style={{  width: 200, marginLeft: 10,borderRadius: 10,  borderColor: 'grey'}}>  
              
        </div>                            
        </div>
       {// <TableScrollbar height = "70vh"  style={{ marginBottom: 10 ,marginRight: 5,border:'1px solid'}}>
        }
        <div style={{ maxWidth: '99.9%' }}>
          <>
          
        <table {...getTableProps()} className = "table table-striped" style ={{height:20}}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()} style = {{background: 'white'}}> {column.render('Header')}
                    <span> 
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ''
                        : ''
                      : ''}
                    </span> 
                    </th>
                ))}
              </tr>
            ))}
          </thead>
          {loading?
                <div style={{marginBottom:0}}>                    
                    <ClipLoader
                        color={"#0d6efd"}
                        loading={loading}        
                        size = {50}
                        cssOverride={{marginLeft:'125%',marginRight:'auto',marginTop:'10%'}}          
                    />
                </div>
                :
                <></>    
            }
          <tbody {...getTableBodyProps()}>
          {
              (!loading)?
              rows.map(row => {
                prepareRow(row)
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return (
                        <td {...cell.getCellProps()}> {cell.render('Cell')} </td>
                      )
                    })}
                  </tr>
                )
              })
              :
              <></>
          }
          </tbody>
        </table>
        </>
        </div>
      {//</TableScrollbar>
}
    </div>
  )
}
export default SchoolsReactTable;