import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { Userregister2 } from '../redux/actions'
import { Redirect } from 'react-router-dom'
import { APIURL } from '../supports/ApiUrl';


class Login extends Component {
    
    state = {
        username: '',
        password: ''
    }

    onlogininput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onloginclick = () => {
        axios.get(`${APIURL}/users/login`, {
            params: {
                username: this.state.username,
                password: this.state.password
            }
        })
        .then(res => {
            console.log(res.data)
            localStorage.setItem('token', res.data.token)
            this.props.Userregister2(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() { 

        if (this.props.username) {
            return <Redirect to='/' />
        }
        return (
            <div className='d-flex justify-content-center align-items-center' style={{height:'80vh'}} >
                <div style={{border:'1px solid black',padding:'20px'}}>
                <h2>Login</h2>
                    <h5>Username :</h5>
                    <input type="text" placeholder='username' value={this.state.username} onChange={this.onlogininput} name='username'/>
                    <h5>Password :</h5>
                    <input type="password" placeholder='password' value={this.state.password} onChange={this.onlogininput} name='password'/>
                    <br/>
                    <br/>
                    <br/>
                    <button onClick={this.onloginClick}>
                        Login
                    </button>
                </div>
            </div>
        )
    }
}

const reduxState = (state)=>{
    return{
        username: state.Auth.username,
        loading: state.Auth.loading
    }
}
export default connect (reduxState, {Userregister2})(Login);