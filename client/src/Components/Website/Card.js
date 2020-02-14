import React, { Component } from 'react'

let Card = props => {
    return (
        <div className="card_container">
            <div className="card_center">
            <h3>{props.data.heading}</h3>
            <p>{props.data.body}</p>
            </div>
        </div>
    )
}



export default Card;
