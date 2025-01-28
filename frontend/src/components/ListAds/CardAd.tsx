import React from 'react'
import { Link } from 'react-router-dom'
import { Ad } from "../../types/Ad"

type CardAdProps = {
    ad: Ad
}

const CardAd:React.FC<CardAdProps>  = ({ad}) => {
  return (
    <div className="p-1">
      <div className="text-xl font-semibold">{ad.title}</div>
      <div>{ad.description}</div>
      <div>
        <span>Price: </span>
        {ad.price}
        </div>
        <Link to={`ads/view/${ad.id}`}>See details</Link>
    </div>
  )
}

export default CardAd
