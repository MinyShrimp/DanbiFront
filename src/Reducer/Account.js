
const nullAccount = { email: "", pwd: "" };

const accountReducer = (state = nullAccount, action) => {
    var _state = JSON.parse( JSON.stringify(state) );
    switch( action.type ) {
        case 'Account/change-email':
            _state.email = action.value;
            return _state;
        
        case 'Account/change-pwd':
            _state.pwd = action.value;
            return _state;
            
        default:
            return state;
    }
}

export default accountReducer;