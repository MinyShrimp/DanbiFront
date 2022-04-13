import { Button, Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from 'react';
import { connect } from "react-redux";
import './App.css';

import LoginModal  from './Container/Modal/Login';
import SignUpModal from "./Container/Modal/Signup";
import DeleteModal from "./Container/Modal/DeleteModal";
import AddModal    from "./Container/Modal/AddModal";
import UpdateModal from "./Container/Modal/UpdateModal";
import MainPage    from "./Container/MainPage";
import DayButtons  from "./Container/DayButtons";

import goServerWithToken from "./Server/goServerWithToken";

function App( props ) {
    const [showLogin,  setShowLogin]  = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const [showAdd,    setShowAdd]    = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [once,       setOnce]       = useState(false);

    useEffect(() => {
        const access = window.sessionStorage.getItem("access_token");
        const is_login = window.sessionStorage.getItem("is_login");
        if( access !== null && is_login !== null ) {
            if( is_login && !once ) {
                auto_login();
                setOnce(true);
            }
        }
    }, []);

    const auto_login = async () => {
        const res = await goServerWithToken("/api/autologin/", "post", {});
        if( res !== null ) {
            if( res.message.status === "ROUTINE_LOGIN_OK" ) {
                props.dispatch( { type: "isLogin/turn-on" } );
                props.dispatch( { type: "getAll/switch" } );
            }
        }
    }

    const logout = async () => {
        const res = await goServerWithToken( '/api/logout/', 'post', {} );
        if( res !== null ) {
            if( res.message.status === "ROUTINE_LOGOUT_OK" ) {
                props.dispatch( { type: "isLogin/turn-off" } );
                window.sessionStorage.setItem('access_token',  "");
                window.sessionStorage.setItem('refresh_token', "");
                window.sessionStorage.setItem('is_login', false);

                props.dispatch({ type: "Routines/reset" });
            }
        }
    }

    return (
        <div className="App">
            <div className="navbar navbar-inverse fixed-top" style={{ background: "#eee" }}>
                <Container>
                    <div className='navbar-header'>
                        <span className='navbar-brand'> Danbi Routine </span>
                    </div>
                    <div className="justify-content-end">
                    {
                        props.Login.isShow
                        ? <button type="button" className='btn btn-default navbar-btn' onClick={logout}>로그아웃</button>
                        : <>
                            <button type="button" className='btn btn-default navbar-btn' onClick={() => { 
                                setShowLogin(true); 
                            }}>로그인</button>
                            <button type="button" className='btn btn-default navbar-btn' onClick={() => { 
                                setShowSignup(true); 
                            }}>회원가입</button>
                        </>
                    }
                    </div>
                </Container>
            </div>
            
            <Container className="main-contents">
                <DayButtons 
                />
                <MainPage
                    setShowDelete = { setShowDelete }
                    setShowUpdate = { setShowUpdate }
                />
            </Container>

            <Button 
                className="btn-fixed"
                onClick={() => {
                    setShowAdd(true);
                    props.dispatch({ type: 'Routine/reset' }); 
                    props.dispatch({ type: "Checks/reset", value: props.days });
                }}
            >+</Button>

            <LoginModal 
                show={showLogin}
                handleClose={() => { 
                    props.dispatch({ type: 'isAlert/turn-off' }); 
                    setShowLogin(false); 
                }}
            />

            <SignUpModal 
                show={showSignup}
                handleClose={() => { 
                    props.dispatch({ type: 'isAlert/turn-off' }); 
                    setShowSignup(false); 
                }}
            />

            <AddModal 
                show={showAdd}
                handleClose={() => { 
                    props.dispatch({ type: 'Routine/reset' }); 
                    props.dispatch({ type: 'isAlert/turn-off' });
                    setShowAdd(false); 
                }}
            />

            <UpdateModal 
                show={showUpdate}
                handleClose={() => { 
                    props.dispatch({ type: 'isAlert/turn-off' });
                    setShowUpdate(false); 
                }}
            />

            <DeleteModal 
                show={showDelete}
                handleClose={() => { 
                    props.dispatch({ type: 'isAlert/turn-off' }); 
                    setShowDelete(false); 
                }}
            />
        </div>
    );
}

function setStore(state) {
    return { Login: state.isLoginReducer }
}

export default connect(setStore)(App);