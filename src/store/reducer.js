const initialState = {

}

export const reducer = ( state = initialState, action ) => {
    switch( action.type ) {
        case 'nothing':
            return state;
        default:
            return state;
    }
}