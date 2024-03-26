import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface MyProd {
  product_id: number;
  product_name: string;
  category_name: string;
  category_id: number;
}

const Products = () => {
  const [products, setProducts] = useState<MyProd[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [pageNo, setPageNo] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const fetchProducts = async (page: number) => {
    try {
      const response = await axios.get(
        `https://product-management-backend-ca7m.onrender.com/products/${page}`
      );
      setProducts(response.data.data);
      setPageCount(response.data.total_pages);
      setErrorMessage("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          setErrorMessage(
            `Failed to fetch products. Please try again.`
          );
        } else if (axiosError.request) {
          setErrorMessage("No response received from the server.");
        } else {
          setErrorMessage("Error setting up the request.");
        }
      } else {
        setErrorMessage("An error occurred while fetching data.");
      }
    }
  };

  useEffect(() => {
    fetchProducts(1);
  }, []);

  const handlePrev = () => {
    if (pageNo > 1 && pageNo <= pageCount) {
      fetchProducts(pageNo - 1);
      setPageNo(pageNo - 1);
    }
  };

  const handleNext = () => {
    if (pageNo > 0 && pageNo <= pageCount) {
      fetchProducts(pageNo + 1);
      setPageNo(pageNo + 1);
    }
  };

  const handlePageClick = (page: number) => {
    fetchProducts(page);
  };

  const handleEdit = (prodId: number) => {
    console.log(prodId);
    navigate(`/product/edit/${prodId}`);
  };

  const handleDelete = async (prodId: number) => {
    const check = confirm("Are you sure to delete this product?");
    console.log(check);
    if (check) {
      try {
        const response = await axios.delete(
          `https://product-management-backend-ca7m.onrender.com/products/${prodId}`
        );
        if (response.data) {
          alert("Product Deleted Successfully!");
          window.location.reload();
        }
      } catch (error) {
        alert("An error occurred while deleting the product.");
      }
    } else {
      alert("Product is safe!");
    }
  };

  return (
    <div>
      {errorMessage && (
        <div className="alert alert-danger text-center">
          {errorMessage}
        </div>
      )}
      <div className="text-center">
        <button
          className=" btn btn-primary mt-2 "
          onClick={() => navigate("/products/new")}
        >
          Add New Product
        </button>
      </div>
      <hr />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Product Id</th>
            <th>Product Name</th>
            <th>Category Name</th>
            <th>Category Id</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod.product_id}>
              <td>{prod.product_id}</td>
              <td>{prod.product_name}</td>
              <td>{prod.category_name}</td>
              <td>{prod.category_id}</td>
              <td>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    handleEdit(prod.product_id);
                  }}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(prod.product_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Page navigation buttons */}
      <div className="pagebtn">
        <button
          className="btn btn-primary"
          onClick={() => {
            handlePrev();
            console.log(pageNo);
          }}
        >
          Prev
        </button>
        {[...Array(pageCount)].map((_, index) => (
          <button
            className={
              pageNo == index + 1
                ? "btn btn-primary m-2 disabled"
                : "btn btn-primary m-2"
            }
            key={index + 1}
            onClick={() => {
              setPageNo(index + 1);
              handlePageClick(index + 1);
              console.log(pageNo);
            }}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="btn btn-primary"
          onClick={() => {
            handleNext();
            console.log(pageNo);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;
