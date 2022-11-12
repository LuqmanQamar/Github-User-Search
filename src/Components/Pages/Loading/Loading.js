import React from 'react'
import loading from '../Loading/Spinner-1s-200px.gif'

export default function Loading() {
    return (
        <div style={{ textAlign: 'center', margin: '20px auto' }}>
            <img className='my-5' src={loading} alt="" />
        </div>
    )
}
