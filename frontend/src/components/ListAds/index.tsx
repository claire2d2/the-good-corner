import { Ad } from "../../types/Ad";
import { useEffect, useState } from "react";
import CardAd from "./CardAd";
import instance from "../../lib/instance";

const ListAds = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
	const [adsList, setAdsList] = useState<Ad[]>([]);

	const getAds = async () => {
		const { data }  = await instance.get<{result: Ad[]}>("/ads/list");
		console.log(data.result);
        setAdsList(data.result)
        setIsLoading(false)
		return data;
	};

	useEffect(() => {
		getAds();
	}, []);

        
    if (isLoading) {
        return <div>Loading...</div>
    }
    
    if (adsList.length === 0) {
        return <div>No ads to show</div>
    }

	return (
		<div className="grid grid-cols-2">
			{adsList?.map((ad) => {
				return <CardAd key={ad.id} ad={ad} />;
			})}
		</div>
	);
};

export default ListAds;
