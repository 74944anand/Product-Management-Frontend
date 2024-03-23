import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Category {
  name: string;
}

const AddNewCategory = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState<Category>({
    name: "",
  });

  const addNewCategory = async () => {
    try {
      const response = await axios.post(
        `https://product-management-backend-ca7m.onrender.com/categories/`,
        category,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data) {
        alert(`Successfully added category`);
        navigate("/categories");
      }
    } catch (err) {
      console.log("Error adding new category");
    }
  };
  return (
    <div>
      <div className="editProd">
        <div className="container">
          <h1>Add New Category</h1>
          <div className="gridview">
            <form>
              <label htmlFor="name">Name: </label>
              <br />
              <input
                type="text"
                id="name"
                name="name"
                required
                onChange={(e) =>
                  setCategory({
                    ...category,
                    name: e.target.value,
                  })
                }
              />
              <br />
              <button
                className="btn btn-primary m-2"
                type="button"
                onClick={addNewCategory}
              >
                Add Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewCategory;
