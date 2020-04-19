import React, { useEffect, useState, useReducer } from 'react';
import { APIURL } from './supports/ApiUrl'
import axios from 'axios'
import { Table } from 'reactstrap'


import './App.css';

const initialState = {
  username: '',
  password: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USERNAME' :
      return {
        ...state,
        username: action.payload
      }
    case 'PASSWORD' :
      return {
        ...state,
        password: action.payload
      }
    default :
      return state
  }
}

function App() {

  const [ state, dispatch ] = useReducer (reducer, initialState)
  const [ data, setdata ] = useState ([])

  useEffect(() => {
    axios.get(`${APIURL}/users/allusers`)
    .then(response => {
      console.log(response.data)
      setdata(response.data)  // data dari back-end
    })
  }, [])

  const renderUsers = () => {
    return data.map((val, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{val.username}</td>
          <td>{val.password}</td>
          <td>
            <button 
              className='btn btn-primary'
              // onClick={}
              >EDIT</button>
            <button 
              className='btn btn-danger' 
              onClick={ () => deleteUserDataHandler(val.id)}
              >DELETE</button>
          </td>
        </tr>
      )
    })
  }

  const addNewDataUserHandler = () => {
    let newDataUser = {
      username: state.username,
      password: state.password
    }
    axios.post(`${APIURL}/users/users/`, newDataUser)
    .then(response => {
      setdata(response.data)
    })
    .catch(error => {
      console.log(error)
      alert(error)
    })
  }

  const deleteUserDataHandler = (id) => {
    axios.delete(`${APIURL}/users/users/${id}`)
    .then(response => {
      setdata(response.data)
    })
  } 

  return (
    <div className='mt-5 mx-5'>
      <Table striped>
        <thead>
          <tr>
            <th>No.</th>
            <th>Username</th>
            <th>Password</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {renderUsers()}
        </tbody>
        <tfoot>
          <tr>
            <td>
              <input
                type='text'
                placeholder='Username'
                value={state.username}
                onChange={ event => dispatch ({ type: 'USERNAME', payload: event.target.value })}
                /> </td>
            <td>
              <input
                type='text'
                placeholder='Password'
                value={state.password}
                onChange={ event => dispatch ({ type: 'PASSWORD', payload: event.target.value })}
                /> </td>
            <td>
              <button 
                className='btn btn-success'
                onClick={addNewDataUserHandler}
                >ADD NEW USER</button></td>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
}

export default App;
