import React, { useEffect, useState, useReducer } from 'react';
import { APIURL } from './supports/ApiUrl'
import axios from 'axios'
import { Table, CustomInput } from 'reactstrap'


import './App.css';

//////////////////////////////////

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
    case 'password' :
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

  const [ addimagefile, setimageadd ] = useState ({
    addImageFileName: 'pilih foto..',
    addImageFile: undefined,
  })

  useEffect(() => {
    axios.get(`${APIURL}/foto/foto`)
    .then(response => {
      console.log(response.data)
      setdata(response.data)  // data dari back-end
    })
  }, [])

  const onAddImageFileChange = (event) => {
    console.log(event.target.files[0])
    var file = event.target.files[0]
    if (file) {
        setimageadd(
          {
            ...addimagefile,
            addImageFileName: file.name,
            addImageFile: event.target.files[0]
          }
        )
    } else {
      setimageadd(
        {
          ...addimagefile,
          addImageFileName:'pilih foto',
          addImageFile: undefined
        }
      )
    }
}

const addDataClick = () => {
  var formData = new FormData()
  const data = {
    caption: state.password
  }

  var Headers = {
    headers:
    {
      'Content-Type':'multipart/form-data'  //
    }
  }
  formData.append('image',addimagefile.addImageFile)
  formData.append('data',JSON.stringify(data))
  axios.post(`${APIURL}/foto/foto/`, formData, Headers)
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

  const renderUsers = () => {
    return data.map((val, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>
            <img src={APIURL + val.imagefoto} height='200px' alt='#'/></td>
          <td>{val.caption}</td>
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
              <CustomInput
                id='foto'
                type='file'
                label={addimagefile.addImageFileName}
                onChange={ onAddImageFileChange}
                /> </td>
            <td>
              <input
                type='text'
                placeholder='caption'
                value={state.password}
                onChange={ event => dispatch ({ type: 'password', payload: event.target.value })}
                /> </td>
            <td>
              <button 
                className='btn btn-success'
                onClick={ addDataClick }
                >ADD</button></td>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
}

export default App;
