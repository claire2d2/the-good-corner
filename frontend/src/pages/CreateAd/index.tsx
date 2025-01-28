import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAd } from "../../lib/requests/ads.requests";
import CreateOrEditAd from "../../components/Forms/CreateOrEditAd";

const CreateAd = () => {
	const navigate = useNavigate();
	const [error, setError] = useState();

	const handleSubmit = async (formData: FormData) => {
	  try {
		await createAd(formData);
		navigate("/");
	  } catch (err: any) {
		console.log(err);
		setError(err.response.data.message);
	  }
	};

	return (
		<div>
			<h1>Create a new listing</h1>
			<CreateOrEditAd initialData={null} error={error} submitCall={handleSubmit}/>
		</div>
	);
};

export default CreateAd;
