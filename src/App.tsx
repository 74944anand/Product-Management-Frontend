import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import NavBar from "./components/NavBar";
import Products from "./components/Products";
import Categories from "./components/Categories";
import EditProd from "./components/EditProd";
import AddNewProduct from "./components/AddNewProduct";
import AddNewCategory from "./components/AddNewCategory";
import EditCategory from "./components/EditCategory";

function App() {
  return (
    <>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/categories" element={<Categories />}></Route>
          <Route path="/product/edit/:id" element={<EditProd />}></Route>
          <Route path="/category/edit/:id" element={<EditCategory />}></Route>
          <Route path="/products/new" element={<AddNewProduct />}></Route>
          <Route path="/category/new" element={<AddNewCategory />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
