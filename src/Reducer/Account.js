
const nullAccount = { email: "", pwd: "" };

const accountReducer = (state = nullAccount, action) => {
    switch( action.type ) {
        case 'Account/change-email':
            var _state = JSON.parse( JSON.stringify(state) );
            _state.email = action.value;
            return _state;
        
        case 'Account/change-pwd':
            var _state = JSON.parse( JSON.stringify(state) );
            _state.pwd = action.value;
            return _state;
            
        default:
            return state;
    }
}

export default accountReducer;