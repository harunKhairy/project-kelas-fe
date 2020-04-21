

const INIT = {
    username: '',
    email: '',
    status: '',
    error: '',
    token: '',
    authChecked: false,
    loading: false,
    verified: 0
}

export default ( state = INIT, action ) => {
    switch (action.type) {
        case 'USER_LOGIN_SUCCESS' :
            return {
                ...INIT,
                ...action.payload,
                authChecked: true
            }
        case 'AUTH_SYSTEM_ERROR' :
            return {
                ...INIT,
                ...action.payload,
                authChecked: true
            }
        case 'AUTH_LOADING' :
            return {
                ...state,
                error: '',
                loading: true
            }
        case 'USER_LOGOUT':
            return {
                ...INIT,
                authChecked: true
            }
        default:
            return state
    }
} 