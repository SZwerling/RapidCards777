import React from "react";
import Carousel from "react-bootstrap/Carousel";

function LoadingCarousel() {
   return (
      <Carousel>
         <Carousel.Item>
            <div style={{ backgroundColor: "gray" }} className="outer-card">
               <div className="card ">
                  <div
                     style={{ backgroundColor: "gray" }}
                     className="card-body card__face card__face--front"
                  ></div>
               </div>
            </div>
         </Carousel.Item>
      </Carousel>
   );
}

export default LoadingCarousel;
