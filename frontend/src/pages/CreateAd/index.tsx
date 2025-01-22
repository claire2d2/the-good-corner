import { useState } from "react"
const CreateAd = () => {
 const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    picture: "",
    location: ""
 })
    const handleSubmit = () => {

    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="title">Title:</label>
            <input type="text" name="title" className="border border-gray-400"/>
        </div>
        <div>
            <label htmlFor="description">Description:</label>
            <input type="text" name="description" />
        </div>
        
        <div>
            <label htmlFor="price">Price:</label>
            <input type="float" name="price" />
        </div>
        <div>
            <label htmlFor="picture">Picture:</label>
            <input type="text" name="description" />
        </div>
        <div>
            <label htmlFor="location">City:</label>
            <input type="text" name="location" />
        </div>
        <div>
            <label htmlFor="category">Category:</label>
            <select name="category" id="category">
                <option value="">A</option>
                <option value="">B</option>
            </select>
        </div>
        <div>Tags</div>
        <button type="submit">Create new ad</button>
      </form>
    </div>
  )
}

export default CreateAd
