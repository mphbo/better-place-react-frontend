import React from "react";
import "./CategoryList.scss";



const CategoryList = ({ click, click2, id, name, description }) => {

  

  
  return (
    <div className="card" onClick={() => {
      click(id)
      click2()
      }}>
        <div className="content">
          <span className="title">{name}</span>
          <p className="copy">
            {description}
          </p>
        </div>
      </div>
  );
};

export default CategoryList;
