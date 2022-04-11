
/** root reducer */
import { createStore, combineReducers } from "redux";
import accountReducer from "./Account";
import isLoginReducer from "./isLogin";
import isAlertReducer from "./isShowAlert";

// 여러 reducer를 사용하는 경우 reducer를 하나로 묶어주는 메소드입니다.
// store에 저장되는 리듀서는 오직 1개입니다.
const rootReducer = createStore(combineReducers({
    accountReducer, isLoginReducer, isAlertReducer
}));

export default rootReducer;