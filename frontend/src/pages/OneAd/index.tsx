import { Ad } from "../../types/Ad";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import instance from "../../lib/instance";

const OneAd = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [adData, setAdData] = useState<Ad | null>(null);

	const { id } = useParams();

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
    return <div>Loading ...</div>
  }
	if (!adData) {
		return <div>No ad found</div>;
	}

	return (
		<div>
			<h1> Title: {adData?.title}</h1>
      <div>
        <div>Category : {adData?.category.title}</div>
        <div>{adData?.location}</div>
        <div>{adData?.price} </div>
      </div>
		</div>
	);
};

export default OneAd;
