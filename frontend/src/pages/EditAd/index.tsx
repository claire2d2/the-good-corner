import { useState, useEffect } from "react";
import instance from "../../lib/instance";
import { useParams } from "react-router-dom"
import { Ad } from "../../types/Ad";
import CreateOrEditAd from "../../components/Forms/CreateOrEditAd"

const EditAd = () => {
const [isLoading, setIsLoading] = useState<boolean>(true);
  const [adData, setAdData] = useState<Ad | null>(null);
  const { id } = useParams()

  const getAdData = async () => {
      try {
        const { data } = await instance.get<{ result: Ad }>(`/ads/find/${id}`);
      setAdData(data.result);
  
      } catch (error: unknown) {
        console.log(error)
      }
      setIsLoading(false);
    };
  
    useEffect(() => {
      getAdData();
      console.log(adData);
    }, [id]);


    if (isLoading) {
      return <div>Loading...</div>
    }

    if (!adData) {
      return <div>No ad found</div>;
    }

  return (
    <div>
			<h1>Edit ad { id }</h1>
			<CreateOrEditAd editMode={true} adData={adData}/>
		</div>
  )
}

export default EditAd
