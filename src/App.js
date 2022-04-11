import { Button, Container, Nav } from "react-bootstrap";
import { useState } from 'react';
import { connect } from "react-redux";
import './App.css';

import LoginModal  from './Container/Login';
import SignUpModal from "./Container/Signup";
import goServerWithToken from "./Server/goServerWithToken";

function App( props ) {
    const [showLogin,  setShowLogin]  = useState(false);
    const [showSignup, setShowSignup] = useState(false);

    const logout = async () => {
        const res = await goServerWithToken( '/api/logout/', 'post', {} );
        if( res !== null ) {
            if( res.message.status === "ROUTINE_LOGOUT_OK" ) {
                props.dispatch( { type: "isLogin/turn-off" } );
                window.sessionStorage.setItem('access_token',  "");
                window.sessionStorage.setItem('refresh_token', "");
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

            </Container>

            <Button 
                className="btn-fixed"
                onClick={() => {
                }}
            >+</Button>

            <LoginModal 
                show={showLogin}
                handleClose={() => { props.dispatch({ type: 'isAlert/turn-off' }); setShowLogin(false); }}
            />

            <SignUpModal 
                show={showSignup}
                handleClose={() => { props.dispatch({ type: 'isAlert/turn-off' }); setShowSignup(false); }}
            />
        </div>
    );
}

function setStore(state) {
    return { Login: state.isLoginReducer }
}

export default connect(setStore)(App);