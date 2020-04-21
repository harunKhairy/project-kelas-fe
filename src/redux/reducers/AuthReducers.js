

const init = {
    username: '',
    email: '',
    status: '',
    error: '',
    token: '',
    authChecked: false,
    loading: false,
    verified: 0
}

export default ( state = init, action ) => {
    switch (action.type) {
        case 'USER_LOGIN_SUCCESS' :
            return {
                ...init,
                ...action.payload,
                authChecked: true
            }
        case 'AUTH_SYSTEM_ERROR' :
            return {
                ...init,
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
                ...init,
                authChecked: true
            }
        default:
            return state
    }
} 