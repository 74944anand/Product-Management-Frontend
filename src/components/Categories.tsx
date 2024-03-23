import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Category {
  id: number;
  name: string;
}
const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `https://product-management-backend-ca7m.onrender.com/categories`
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEdit = (catId: number) => {
    console.log(catId);
    navigate(`/category/edit/${catId}`);
  };

  const handleDelete = async (catId: number) => {
    const check = confirm("Are you sure to delete this category?");
    console.log(check);
    if (check) {
      const response = await axios.delete(
        `https://product-management-backend-ca7m.onrender.com/categories/${catId}`
      );
      if (response.data) {
        alert("Category Deleted Successfully!");
        navigate("/categories");
      }
    } else {
      alert("Category is safe!");
    }
  };

  return (
    <div>
      <div className="text-center">
        <button
          className="btn btn-primary"
          onClick={() => navigate("/category/new")}
        >
          Add Category
        </button>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Category ID</th>
            <th>Category Name</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    handleEdit(category.id);
                  }}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(category.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Categories;
