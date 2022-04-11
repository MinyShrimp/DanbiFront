
const nullLogin = { isShow: false };

const isLoginReducer = (state = nullLogin, action) => {
    switch( action.type ) {
        case 'isLogin/turn-on':
            var _state = JSON.parse( JSON.stringify(state) );
            _state.isShow = true;
            return _state;
        
        case 'isLogin/turn-off':
            var _state = JSON.parse( JSON.stringify(state) );
            _state.isShow = false;
            return _state;
            
        default:
            return state;
    }
}

export default isLoginReducer;