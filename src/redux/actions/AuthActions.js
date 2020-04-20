import axios from "axios"
import { APIURL } from "../../supports/ApiUrl"


export const userRegister = data => {
    return (dispatch) => {
        dispatch ({ type: 'AUTH_LOADING'})
        axios.post(`${APIURL}/users/register`, data)
        .then(res => {
            dispatch ({
                type: 'USER_LOGIN_SUCCESS',
                payload: res.data
            })
        })
        .catch(err => {
            dispatch ({
                type: 'AUTH_SYSTEM_ERROR'
            })
        })
    }
}

export const Userregister2 = (data) => {
    return {
        type: 'USER_LOGIN_SUCCESS',
        payload: data
    }
}