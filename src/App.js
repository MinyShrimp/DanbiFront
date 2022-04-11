import { Button, Container, Nav } from "react-bootstrap";
import { useState } from 'react';
import { connect } from "react-redux";
import './App.css';

import LoginModal  from './Container/Login';
import SignUpModal from "./Container/Signup";
import goServer    from "./Server/goServer";

function App( props ) {
    const [showLogin,  setShowLogin]  = useState(false);
    const [showSignup, setShowSignup] = useState(false);

    const logout = async () => {
        try {
            const res = await goServer( '/api/logout/', 'post', {}, {
                "Content-Type": "application/json",
                "token": window.sessionStorage.getItem("access_token")
            });
            console.log(res);

            props.dispatch( { type: "isLogin/turn-off" } )
            window.sessionStorage.setItem('access_token',  "");
            window.sessionStorage.setItem('refresh_token', "");
        } catch( e ) {
            console.log(e);
        }
    }

    return (
        <div className="App">
            <div className="navbar navbar-inverse fixed-top">
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
                hi
            </Container>

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