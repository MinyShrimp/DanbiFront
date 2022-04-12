
const nullAlert = { isShow: false, msg: "" };

const isAlertReducer = (state = nullAlert, action) => {
    var _state    = JSON.parse( JSON.stringify(state) );

    switch( action.type ) {
        case 'isAlert/turn-on':
            _state.isShow = true;
            _state.msg    = action.value;
            return _state;
        
        case 'isAlert/turn-off':
            _state.isShow = false;
            _state.msg    = "";
            return _state;
            
        default:
            return state;
    }
}

export default isAlertReducer;