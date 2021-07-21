import React, { useEffect } from "react";
import "./CategoryList.scss";
import axios from "axios";
import CategoryListItem from './CategoryListItem';



const CategoryList = ({ handleClick, categories, setCategories, click }) => {


  useEffect(() => {

    axios.get('/api/categories')
    .then((data) => {
      setCategories(data.data.categories)
    })
    .catch((e) => {console.log(e.message)})
  }, [setCategories])




  return (
    <div className="after-vid">
      <main className="page-content">
        {categories && categories.map((category) => {
          return <CategoryListItem key={category.id} name={category.name} id={category.id} click={handleClick} description={category.description} click2={click}/>
        })}
      </main>
    </div>
  );
};

export default CategoryList;
