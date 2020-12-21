import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProducts, getProducts } from "../actions";

function Products(props) {
  const [isModal, setIsModal] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [availableQuantity, setAvailableQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const productList = useSelector((state) => state.productList);
  const { loading, products } = productList;

  const categoryList = useSelector((state) => state.categoryList);
  const { loading: loadingCategories, categories, error } = categoryList;

  const ProductSave = useSelector((state) => state.ProductSave);
  const {
    loading: loadingSave,
    success: ProductSaved,
    error: errorSave,
  } = ProductSave;

  const productDelete = useSelector((state) => state.productDelete);

  const { success: ProductDeleted } = productDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    if (ProductSaved) {
      setModalVisible(false);
    }
    dispatch(getProducts());
    return () => {};
  }, [ProductSaved, ProductDeleted]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveProduct({
        _id: id,
        name,
        price,
        image,
        brand,
        category,
        availableQuantity,
        description,
      })
    );
  };

  const deleteHandler = (product) => {
    dispatch(deleteProducts(product._id));
  };

  const openModal = (product) => {
    setIsModal(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setImage(product.image);
    setBrand(product.brand);
    setCategory(product.category);
    setAvailableQuantity(product.availableQuantity);
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setUploading(true);

    try {
      const response = await axios.post("/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setImage(response.data);
      setUploading(false);
    } catch (err) {
      console.error(err);
      console.log(err);
      setUploading(false);
    }
  };

  return (
    <div className="content content-margined">
      <div className="product-header">
        <h3>Products</h3>
        <button className="button primary" onClick={() => openModal({})}>
          Create Product
        </button>
        <ul></ul>
      </div>
      {isModal && (
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h2>Create Product</h2>
              </li>
              <li>
                {loadingSave && <div>Loading...</div>}
                {errorSave && <div>{errorSave}</div>}
              </li>

              <li>
                <input
                  type="text"
                  name="name"
                  value={name}
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </li>
              <li>
                <input
                  type="text"
                  name="price"
                  value={price}
                  placeholder="Price"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </li>
              <li>
                <input
                  type="text"
                  name="image"
                  value={image}
                  placeholder="Image"
                  onChange={(e) => setImage(e.target.value)}
                />
                <input type="file" onChange={uploadFileHandler} />
                {uploading && <div>Uploading...</div>}
              </li>
              <li>
                <input
                  type="text"
                  name="brand"
                  value={brand}
                  placeholder="brand"
                  onChange={(e) => setBrand(e.target.value)}
                ></input>
              </li>
              <li>
                <input
                  type="text"
                  name="availableQuantity"
                  value={availableQuantity}
                  placeholder="Available Quantity"
                  onChange={(e) => setAvailableQuantity(e.target.value)}
                ></input>
              </li>
              <li>
                <strong>Select Category:</strong>
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                >
                  {[...Array(categories).keys()].map((category) => (
                    <option key={category._id} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </li>
              <li>
                <textarea
                  name="description"
                  value={description}
                  placeholder="Description"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </li>
              <li>
                <button type="submit" className="button primary">
                  {id ? "Update Product" : "Create Product"}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setIsMmodal(false)}
                  className="button secondary"
                >
                  Back
                </button>
              </li>
            </ul>
          </form>
        </div>
      )}

      <div className="product-list">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <button className="button" onClick={() => openModal(product)}>
                    Edit
                  </button>{" "}
                  <button
                    className="button"
                    onClick={() => deleteHandler(product)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;

/*
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
}

.modal-main {
  position:fixed;
  background: white;
  width: 80%;
  height: auto;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
}

.display-block {
  display: block;
}

.display-none {
  display: none;
}
*/
