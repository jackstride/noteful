import React, { Component } from 'react'

let Card = props => {
    return (
        <div className="card_container">
            <h3>{props.data.heading}</h3>
            <p>{props.data.body}</p>
        </div>
    )
}



export default Card;
