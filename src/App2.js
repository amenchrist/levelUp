import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { selectView } from './actions';
import NavBar from './containers/NavBar';
import './App2.css';
import Main from './containers/Main';

const mapDispatchToProps = (dispatch) => {
    return {
        onTouch: (title) => {
            return dispatch(selectView(title))
        }
    }
}
function App2(props) {

    useEffect(() => {
       
    })

    const { onTouch } = props;

    
    return (
        <div className='app'>
            <div className='home-container'>
                <Main />
            </div>
            <NavBar touchFunction={onTouch} />
        </div>
    );
}

export default connect(mapDispatchToProps)(App2);


//https://cdn.internetmultimediaonline.org/241F21/loveworldlive/ixilrao9.m3u8