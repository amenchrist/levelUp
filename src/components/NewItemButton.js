import React from 'react'
import { NEW_ITEM } from '../constants'

export default function NewItemButton({ touchFunction }) {
    return (
        <div className='whiteB w3 h3 flex items-center justify-center' title={NEW_ITEM} onClick={touchFunction}>
            <h1 className=' white b f8 fw9 ma0'>+</h1>
        </div>
    )
}