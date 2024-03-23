import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  price: string;
  category_id: number;
}

const AddNewProduct = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [product, setProduct] = useState<Product>({
    id: 0,
    name: "",
    price: "",
    category_id: 0,
  });
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

  console.log(categories);

  const addNewProduct = async () => {
    try {
      const response = await axios.post(
        `https://product-management-backend-ca7m.onrender.com/products/`,
        product,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert(`Successfully added product`);
      setTimeout(() => {
        navigate("/products");
      }, 2000);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  return (
    <div className="editProd">
      <div className="container">
        <h1>Add New Product</h1>
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
                setProduct({
                  ...product,
                  name: e.target.value,
                })
              }
            />
            <br />

            <label htmlFor="price">Price: $</label>
            <br />
            <input
              type="number"
              step=".01"
              id="price"
              name="price"
              defaultValue={product.price}
              onChange={(e) =>
                setProduct({
                  ...product,
                  price: e.target.value,
                })
              }
            />

            <br />
            <label htmlFor="category">Category:</label>
            <br />
            <select
              id="category"
              name="category"
              value={product.category_id}
              onChange={(e) =>
                setProduct({
                  ...product,
                  category_id: parseInt(e.target.value),
                })
              }
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <br />
            <button
              className="btn btn-primary m-2"
              type="button"
              onClick={addNewProduct}
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewProduct;
