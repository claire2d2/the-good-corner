import { useState, useEffect } from "react";
import { categoriesList } from "../../lib/requests/cats.requests";
import { Category, AdCreateFormInfos } from "../../types/Ad";


// TO DO: disable form submission when there are no changes
interface FormProps {
	submitCall: (formData: FormData) => Promise<void>,
	error: string | undefined,
	initialData : AdCreateFormInfos | null
}

// styling
const inputStyle = "border border-gray-400";
const actionEdit = "Submit changes"
const actionCreate = "Create new ad"

const CreateOrEditAd: React.FC<FormProps> = ({error, submitCall, initialData}) => {
	console.log(error)
	const [cats, setCats] = useState<Category[]>([]);
	const [file, setFile] = useState<File | null>(null)
	const [preview, setPreview] = useState("");
	const [data, setData] = useState<AdCreateFormInfos>(initialData || {
		categoryId: "",
		title: "",
		description: "",
		price: 0,
		picture: "",
		location: "",
		tagsIds: [],
	});

	const getCategories = async () => {
		try {
		  const data = await categoriesList();
		  if (data.success) {
			setCats(data.result);
		  }
		} catch (err: any) {
		  console.log({ err });
		}
	  };

	useEffect(() => {
		getCategories();
	}, []);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
		  const selectedFile = e.target.files[0];
		  setFile(selectedFile);
		  setPreview(URL.createObjectURL(selectedFile));
		}
	  };

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData();
		if (file) {
		  formData.append("picture", file);
		}
		formData.append("title", data.title);
		formData.append("description", data.description);
		formData.append("price", data.price.toString());
		formData.append("location", data.location);
		formData.append("categoryId", data.categoryId);
		try {
		  submitCall(formData);
		} catch (err: any) {
		  console.log(err);
		}
	  };

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="categoryId">Category:</label>
				<select name="categoryId" required onChange={(e) => handleChange(e)}>
					<option value={undefined}>Select a category</option>
					{cats?.map((cat) => {
						return (
							<option key={cat.id} value={cat.id}>
								{cat.title}
							</option>
						);
					})}
				</select>
			</div>
			<div>
				<label htmlFor="title">Title:</label>
				<input
					type="text"
					name="title"
					value={data.title}
					className={inputStyle}
					onChange={(e) => handleChange(e)}
					minLength={5}
				/>
			</div>
			<div>
				<label htmlFor="description">Description:</label>
				<input
					type="text"
					name="description"
					value={data.description}
					className={inputStyle}
					onChange={(e) => handleChange(e)}
				/>
			</div>

			<div>
				<label htmlFor="price">Price:</label>
				<input
					type="float"
					name="price"
					value={data.price}
					className={inputStyle}
					onChange={(e) => handleChange(e)}
				/>
			</div>
			<div>
				<label htmlFor="picture">Picture:</label>
				<input
					type="file"
					name="picture"
					value={initialData?.picture || data.picture}
					className={inputStyle}
					onChange={(e) => handleFileChange(e)}
				/>
			</div>
			<div className="flex justify-center flex-col items-center">
          <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Prévisualisation
          </p>
          {preview ? (
            <img
              src={preview}
              alt="Previsualisation"
              style={{ maxWidth: "300px", maxHeight: "300px" }}
            />
          ) : (
            <div>No selected image at the moment</div>
          )}
        </div>

			<div>
				<label htmlFor="location">City:</label>
				<input
					type="text"
					name="location"
					value={data.location}
					className={inputStyle}
					onChange={(e) => handleChange(e)}
				/>
			</div>

			<div>Tags</div>
        
			<button type="submit" className="bg-black text-white disabled:bg-gray-200" >  {initialData ? actionEdit : actionCreate }</button>
		</form>
	);
};

export default CreateOrEditAd;
