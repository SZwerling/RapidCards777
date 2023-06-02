import React from "react";
import Carousel from "react-bootstrap/Carousel";

function LoadingCarousel() {
   return (
      <div className="carousel-counter">
         <Carousel>
            <Carousel.Item>
               <div className="outer-card">
                  <div className="card ">
                     <div
                        style={{ backgroundColor: "gray" }}
                        className="card-body card__face card__face--front shimmerBG"
                     ></div>
                  </div>
               </div>
            </Carousel.Item>
         </Carousel>
      </div>
   );
}

export default LoadingCarousel;
