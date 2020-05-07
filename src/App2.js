import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { selectView } from './actions';
import Home from './containers/Home';
import NavBar from './containers/NavBar';
import './App2.css';

const mapStateToProps = state => {
    return {
        view: state.selectViewReducer.view
    }
}

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
                <Home touchFunction={onTouch} />
            </div>
            <NavBar touchFunction={onTouch} />
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(App2);


//https://cdn.internetmultimediaonline.org/241F21/loveworldlive/ixilrao9.m3u8