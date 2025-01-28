import { Ad } from "../../types/Ad";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findAd } from "../../lib/requests/ads.requests";
import defaultPic from "../../assets/picture.png"

const OneAd = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [adData, setAdData] = useState<Ad | null>(null);

	const params = useParams();

	const getAdData = async () => {
		try {
			const data = await findAd(params.id!)
			if (data.success) {
				setAdData(data.result);
			}
		} catch (error: unknown) {
			console.log(error);
		}
		setIsLoading(false);
	};

	useEffect(() => {
		getAdData();
	}, []);

	if (isLoading) {
		return <div>Loading ...</div>;
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
				<img
        src={
          adData?.picture
            ? `${import.meta.env.VITE_BACKEND_URL_FILES}${adData?.picture}`
            : defaultPic
        }
        alt="Image"
        style={{ maxWidth: "300px", maxHeight: "300px" }}
      />
			</div>
		</div>
	);
};

export default OneAd;
