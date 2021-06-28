export default function reducer(state, action) {
    switch (action.type) {
        case 'LOGIN_REQUEST':
            return {
                ...state,
                company: action.payload
            }   
        default:
            return state
    }
}