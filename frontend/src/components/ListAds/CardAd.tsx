import React from 'react'
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
    </div>
  )
}

export default CardAd
