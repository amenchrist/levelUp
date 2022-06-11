import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { selectView } from './actions';
import NavBar from './containers/NavBar';
import './App.css';
import Main from './containers/Main';
import SplashPage from './components/SplashPage';
import { useStateContext } from './Contexts/ContextProvider';

const mapDispatchToProps = (dispatch) => {

    return {
        onTouch: (title) => {
            return dispatch(selectView(title))
        }
    }
}

function App2({ onTouch }) {

    const { isLoggedIn, setIsLoggedIn } = useStateContext();
    useEffect(() => {
        localStorage.getItem('LoggedIn') == 'true' ? setIsLoggedIn(true) : setIsLoggedIn(false)
    })

    // console.log("logged in status: ", localStorage.getItem('LoggedIn'))
    // console.log("logged in state: ", isLoggedIn)
    if(!isLoggedIn){
        return(
            <div className='app'>
                <SplashPage />
            </div>
        )
    } else {
        return (
            <div className='app'>
                <div className='home-container'>
                    <Main />
                </div>
                <NavBar touchFunction={onTouch} />
            </div>
        );
    }
}

export default connect(mapDispatchToProps)(App2);


//https://cdn.internetmultimediaonline.org/241F21/loveworldlive/ixilrao9.m3u8