import React, { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import axios from 'axios'
import { APIURL } from './supports/ApiUrl'
import { connect } from 'react-redux'
import { Userregister2 } from './redux/actions'

import Header from './components/Header'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import Verified from './components/Verified'


// import './App.css';





function App (props) {

  const [ loading, setLoading ] = useState (true)

  useEffect (() => {
    // const userid = localStorage.getItem('userid')
    // if (userid) {
    //   axios.get(`${APIURL}/users/keeplogin/${userid}`)
    const token = localStorage.getItem('token')
    if (token) {
      axios.get(`${APIURL}/users/keeplogin`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => {
        localStorage.setItem('token', res.data.token)
        props.Userregister2(res.data)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(()=> {
        setLoading(false)
      })
    } else {
      setLoading(false)
    }
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Header />
        <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
          <Route path='/verified' component={Verified}/>
        </Switch>
    </div>
  );
}

export default connect (null, {Userregister2}) (App);

// Null karena tidak ada mapStateToProps
//  Userregister2 dalam curly bracket karena action di redux
