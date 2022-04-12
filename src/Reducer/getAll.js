
const nullGetAll = { Flag: false };

const getAllReducer = (state = nullGetAll, action) => {
    var _state = JSON.parse( JSON.stringify(state) );
    switch( action.type ) {
        case 'getAll/switch':
            _state.Flag = !_state.Flag;
            return _state;
            
        default:
            return state;
    }
}

export default getAllReducer;