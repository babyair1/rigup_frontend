const initialState = {}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'PRODUCTDETAIL_FETCH_SUCCESS':
            return action.payload
        default:
            return state
    }
}