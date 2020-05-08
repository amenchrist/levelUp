import React from 'react'
import { NEW_ITEM } from '../constants'

export default function NewItemButton({ touchFunction }) {
    return (
        <div className='show w3 h3' title={NEW_ITEM} onClick={touchFunction}>
            <h3 className='tc'>N</h3>
        </div>
    )
}