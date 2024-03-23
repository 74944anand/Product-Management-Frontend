import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Category {
  id: number;
  name: string;
}

const EditCategory = () => {
  const [category, setCategory] = useState<Category>({
    id: 0,
    name: "",
  });
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const fetchCategory = async () => {
    try {
      const response = await axios.get(
        `https://product-management-backend-ca7m.onrender.com/categories/${id}`
      );
      setCategory(response.data[0]);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  if (!category) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    fetchCategory();
  }, []);

  const saveChanges = async () => {
    try {
      const response = await axios.put(
        `https://product-management-backend-ca7m.onrender.com/categories/${id}`,
        category,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data) {
        alert(`Successfully updated category`);
        navigate("/categories");
      }
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  return (
    <div className="editProd">
      <div className="container">
        <h1>Edit Category</h1>
        <div className="gridview">
          <form>
            <label htmlFor="name">Name: </label>
            <br />
            <input
              type="text"
              id="name"
              name="name"
              required
              defaultValue={category.name}
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
              onClick={saveChanges}
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCategory;
