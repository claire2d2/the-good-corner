import { Ad } from "../../types/Ad"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import instance from "../../lib/instance"

const OneAd = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [adData, setAdData] = useState<Ad|null>(null)

    const {id} = useParams()

    const getAdData = async() =>{
        const {data} = await instance.get<{result: Ad}>(`/ads/find/${id}`)
        setAdData(data.result)
        setIsLoading(false)
    }

    useEffect(() => {
        getAdData()
        console.log(adData)
    },[id])

    if (!adData) {
        return <div>No ad found</div>
    }

  return (
    <div>
     Title: {adData?.title}
    </div>
  )
}

export default OneAd
