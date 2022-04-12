
const nullLogin = { isShow: false };

const isLoginReducer = (state = nullLogin, action) => {
    var _state = JSON.parse( JSON.stringify(state) );
    switch( action.type ) {
        case 'isLogin/turn-on':
            _state.isShow = true;
            return _state;
        
        case 'isLogin/turn-off':
            _state.isShow = false;
            return _state;
            
        default:
            return state;
    }
}

export default isLoginReducer;