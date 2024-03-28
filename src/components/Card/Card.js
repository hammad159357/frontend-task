import React from 'react'
import './card.css'

const Card = (props) => {
    const { name, skinColor, image } = props

    return (
        <>
            <div className="Card">
                <div className="ImageContainer">
                    <img src={image} alt={name} />
                </div>
                <div className="TextContainer" style={{backgroundColor: skinColor || "#ffffff"}}>
                    <h2>{name}</h2>
                    <p> {skinColor}</p>
                </div>

            </div>
        </>
    )
}

export default Card