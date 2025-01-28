import { useState, useEffect } from "react";
import { findAd, updateAd } from "../../lib/requests/ads.requests";
import { useParams, useNavigate } from "react-router-dom";
import { AdCreateFormInfos } from "../../types/Ad";
import CreateOrEditAd from "../../components/Forms/CreateOrEditAd";

const EditAd = () => {
	const navigate = useNavigate();
	const params = useParams();
	// const [categories, setCategories] = useState<CategoryType[]>();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [initialData, setInitialData] = useState<AdCreateFormInfos>();
	const [error, setError] = useState();

	const getAd = async () => {
		try {
			const data = await findAd(params.id!);
			if (data.success) {
				const { category, ...adData } = data.result;
				setInitialData({ ...adData, categoryId: category.id });
			}
		} catch (err: any) {
			setError(err.response.data.message);
		}
	};

	useEffect(() => {
		getAd();
		setIsLoading(false);
	}, []);

	const handleSubmit = async (formData: FormData) => {
		try {
			await updateAd(params.id!, formData);
			navigate(`/ads/view/${params.id}`);
		} catch (err: any) {
			console.log(err);
			setError(err.response.data.message);
		}
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!initialData) {
		return <div>No ad found</div>;
	}

	return (
		<div>
			<h1>Edit ad {params.id}</h1>
			<CreateOrEditAd
				initialData={initialData}
				error={error}
				submitCall={handleSubmit}
			/>
		</div>
	);
};

export default EditAd;
