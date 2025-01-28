import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../lib/instance";
import { Category, AdCreate } from "../../types/Ad";


// styling
const inputStyle = "border border-gray-400";

const CreateOrEditAd = () => {
	const [cats, setCats] = useState<Category[]>([]);
	const [formData, setFormData] = useState<AdCreate>({
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
			const { data } = await instance.get<{ result: Category[] }>(
				`/categories/list`
			);
			setCats(data.result);
		} catch (error: unknown) {
			console.log(error);
		}
	};

	useEffect(() => {
		getCategories();
	}, []);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await instance.post("/ads/create", formData);
			navigate("/");
		} catch (error) {
			console.log(error);
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
					value={formData.title}
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
					value={formData.description}
					className={inputStyle}
					onChange={(e) => handleChange(e)}
				/>
			</div>

			<div>
				<label htmlFor="price">Price:</label>
				<input
					type="float"
					name="price"
					value={formData.price}
					className={inputStyle}
					onChange={(e) => handleChange(e)}
				/>
			</div>
			<div>
				<label htmlFor="picture">Picture:</label>
				<input
					type="text"
					name="picture"
					value={formData.picture}
					className={inputStyle}
					onChange={(e) => handleChange(e)}
				/>
			</div>
			<div>
				<label htmlFor="location">City:</label>
				<input
					type="text"
					name="location"
					value={formData.location}
					className={inputStyle}
					onChange={(e) => handleChange(e)}
				/>
			</div>

			<div>Tags</div>
			<button type="submit">Create new ad</button>
		</form>
	);
};

export default CreateOrEditAd;
