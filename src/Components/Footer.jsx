import React from 'react'
import './Footer.scss'

const Footer = () => {
  return (
    <div className="main-footer">
      <div className="container">
        <div className= "row">
          <div className="col">
            <h6>OL' BETSY INC.</h6>
            <ul className="list-unstyled">
              <li>780-555-5432</li>
              <li>Vancouver, Canada</li>
              <li>123 Street West East</li>
            </ul>
          </div>
          <div className="col">
            <h6>Better Place</h6>
            <ul className="list-unstyled">
              <li>Mitchel Sarauer</li>
              <li>Cecil Vogrinetz</li>
              <li>Logan Thomas</li>
            </ul>
          </div>
          <div className="col">
            <h6>Created With</h6>
            <ul className="list-unstyled">
              <li>PostgreSQL for the database, <br/> Express/Node for the backend <br/> with a React frontend. </li>
              {/* <li>Express</li> */}
              {/* <li>React</li> */}
              {/* <li>Node</li> */}
            </ul>
          </div>
        </div>
        <hr/>
        <div className="row">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} OL' BETSY INC. | All rights reserved | Terms of Service | Privacy
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer
