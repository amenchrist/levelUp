import React from 'react';

export default function Scroll(props) {
    return (
        <div className='ba h-75 pl2 pr2' style={{overflowY: 'scroll'}}>
            {props.children}
        </div>
    );
}