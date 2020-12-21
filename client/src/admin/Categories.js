import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
 deleteCategory,
 listCategories,
 saveCategory,
} from '../actions/categoryActions';

const Categories = () => {
 const [name, setName] = useState('');
 const [categoryId, setCategoryId] = useState('');

 const categoryList = useSelector((state) => state.categoryList);
 const { loading, categories, error } = categoryList;

 const categorySave = useSelector((state) => state.categorySave);
 const {
  loading: loadingSave,
  success: successSave,
  error: errorSave,
 } = categorySave;

 const categoryDelete = useSelector((state) => state.categoryDelete);
 const {
  loading: loadingDelete,
  success: successDelete,
  error: errorDelete,
 } = categoryDelete;

 const dispatch = useDispatch();

 useEffect(() => {
  dispatch(listCategories);
  return () => {};
 }, [successDelete, successSave]);

 // delete handler
 const deleteHandler = (category) => {
  dispatch(deleteCategory(category._id));
 };

 // submit Handler
 const submitHandler = (e) => {
  e.preventDefault();
  dispatch(saveCategory({ _id: categoryId, name }));
 };

 return (
  <div>
   <form onSubmit={submitHandler}>
    <ul>
     <li>
      <label htmlFor='email'>Name</label>
      <input
       type='text'
       name='name'
       value='name'
       placeholder='Enter Category Name '
       onChange={(e) => setName(e.target.value)}
      ></input>
     </li>
     <li>
      <input
       type='number'
       value='id'
       placeholder='Enter Category ID'
       name='id'
       onChange={(e) => setCategoryId(e.target.value)}
      ></input>
     </li>
     <li>
      <button type='submit' className='button primary'>
       Login
      </button>
     </li>
    </ul>
   </form>
   {categories && (
    <div className='category-list'>
     <table className='table'>
      <thead>
       <tr>
        <th>Name</th>
       </tr>
      </thead>
      <tbody>
       {categories.map((category) => (
        <tr key={category._id}>
         <td>{category.name}</td>
         <td>
          <button className='button' onClick={() => deleteHandler(category)}>
           Delete
          </button>
         </td>
        </tr>
       ))}
      </tbody>
     </table>
    </div>
   )}
  </div>
 );
};

export default Categories;
