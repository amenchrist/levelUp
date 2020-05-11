import React from 'react'
import { NEW_ITEM } from '../constants'

export default function NewItemTile({ touchFunction }) {
    return (
        <div className='bg-white h-100 center w-100' title={NEW_ITEM} onClick={touchFunction}>
            <div className='tc'>
                <h3>Add New Item</h3>
            </div>
        </div>
    )
}