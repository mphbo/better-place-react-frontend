import "./Header.scss";
import { useState } from "react";
import Carousel from 'react-bootstrap/Carousel'



const Header = (props) => {

  // const images = {
  //   imagesArray: [
  //   "https://images.unsplash.com/photo-1524813686514-a57563d77965?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1778&q=80",
  //   "https://images.unsplash.com/photo-1474649107449-ea4f014b7e9f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
  //   ],
  //   imageIndex: 0
  // }

  const [displayVid, setDisplayVid] = useState("myVideo")


  return (
    <div className="videoContainer">
      {displayVid === "myVideo" && 
      <video className="myVideo" autoPlay muted onEnded={() => setDisplayVid("noVideo")}>
        <source src="/Videos/newbetterplace.mp4" type="video/mp4" />
      </video>}
        {displayVid === "noVideo"  && 
        
      <div className="noVideo">
        <Carousel>
        <Carousel.Item>
        <img className="d-block w-100 im1" src={"https://images.unsplash.com/photo-1524813686514-a57563d77965?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1778&q=80"} alt="First slide"/>
        </Carousel.Item>
        {/* <Carousel.Item>
        <img className="d-block w-100 im2"src={"https://images.unsplash.com/photo-1474649107449-ea4f014b7e9f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"}  alt="Second slide"/>
        </Carousel.Item> */}
        </Carousel>
        <div className='titleBlock'>
          <p className='titleSmall'>building a</p>
          <p className='title'>better place.</p>
          <p className='title2'>Find your way to stregthen your community.</p>
          <p className='title2'>Volunteer now.</p>

        </div>
      </div>}
      
      
    </div>
  );
};

export default Header;
