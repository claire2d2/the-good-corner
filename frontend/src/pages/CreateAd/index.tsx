import CreateOrEditAd from "../../components/Forms/CreateOrEditAd";
const CreateAd = () => {



	

	
	return (
		<div>
			<h1>Create a new listing</h1>
			<CreateOrEditAd editMode={false} adData={null}/>
		</div>
	);
};

export default CreateAd;
