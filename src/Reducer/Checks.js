
const nullChecks = {
    "MON": { title: "월", value: "MON", checked: false },
    "TUE": { title: "화", value: "TUE", checked: false },
    "WED": { title: "수", value: "WED", checked: false },
    "THU": { title: "목", value: "THU", checked: false },
    "FRI": { title: "금", value: "FRI", checked: false },
    "SAT": { title: "토", value: "SAT", checked: false },
    "SUN": { title: "일", value: "SUN", checked: false },
};

const checksReducer = (state = nullChecks, action) => {
    var _state = JSON.parse( JSON.stringify(state) );
    switch( action.type ) {
        case 'Checks/reset':
            return nullChecks;

        case 'Checks/check':
            _state[action.value].checked = true;
            return _state;
        
        case 'Checks/uncheck':
            _state[action.value].checked = false;
            return _state;
        
        case 'Checks/set-init':
            action.value.forEach((value) => {
                _state[value].checked = true;
            })
            return _state;
            
        default:
            return state;
    }
}

export default checksReducer;