import React, { Component } from 'react';
import axios from 'axios';
import { APIURL } from '../supports/ApiUrl'
import querystring from 'query-string'
import { connect } from 'react-redux'
import { Userregister2 } from '../redux/actions'

class Verified extends Component {
    state = {
        success: 0
    }

    componentDidMount(){
        console.log(this.props.location.search)
        var obj = querystring.parse(this.props.location.search)
        console.log(obj)
        axios.put(`${APIURL}/users/verified`, obj)
        .then(res => {
            console.log(res.data)
            this.props.Userregister2(res.data)
            this.setState( { success: 1 } )
        })
        .catch(err => {
            console.log(err)
            this.setState( { success: 2 } )
        })
    }
    render() {

        console.log(this.props.Auth)
        if (this.state.success === 1) {
            return (
                <div>
                    <center>
                        <h1>Berhasil Verified</h1>
                    </center>
                </div>
            )
        } else if (this.state.success === 2) {
            return (
                <div>
                    <center>
                        <h1>Verified Gagal</h1>
                    </center>
                </div>
            )
        }

        return (
            <div>
                <center>
                    <h1>
                        Sedang menunggu verified
                    </h1>
                </center>
            </div>
          );
    }
}

const reduxState = (state) => {
    return {
        Auth: state.Auth
    }
}

export default connect (reduxState, {Userregister2}) (Verified); 