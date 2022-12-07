import React, { useState } from "react";
import "./Slider.css";
import BtnSlider from "./BtnSlider";
import dataSlider from "./dataSlider";
import Typewriter from "typewriter-effect";
import {useHistory} from 'react-router-dom'
export default function Slider() {
  const [slideIndex, setSlideIndex] = useState(1);
  const history = useHistory();
  const nextSlide = () => {
    if (slideIndex !== dataSlider.length) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === dataSlider.length) {
      setSlideIndex(1);
    }
    clearInterval(myVar);
  };
  var myVar = setInterval(nextSlide, 5000);

  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(dataSlider.length);
    }
    clearInterval(myVar);
  };

  const moveDot = (index) => {
    setSlideIndex(index);
  };
  const clickHandler=()=>{
    history.push('/signup')
  }

  return (
    <div className="container-slider">
      <div className="try">
        <div className="header">
          <div className="typeWriter">
          <Typewriter
            options={{
              strings: [
                "“Pull up a chair. Take a taste. Come join us. Life is so endlessly delicious.”",
                "“A bone to the dog is not charity. Charity is the bone shared with the dog, when you are just as hungry as the dog.”"
              ],
              autoStart: true,
              loop: true,
              changeDeleteSpeed: 2,
            }}
          />
          {/* A bone to the dog is not charity. Charity is the bone shared with the dog, when you are just as hungry as the dog. */}
          </div>
          <div className="actions">
          <button onClick={clickHandler}>Sign up</button>
          </div>
        </div>
        <BtnSlider moveSlide={nextSlide} direction={"next"} />
        <BtnSlider moveSlide={prevSlide} direction={"prev"} />

        <div className="container-dots">
          {Array.from({ length: 5 }).map((item, index) => (
            <div
              onClick={() => moveDot(index + 1)}
              className={slideIndex === index + 1 ? "dot active" : "dot"}
            ></div>
          ))}
        </div>
      </div>
      {dataSlider.map((obj, index) => {
        return (
          <div
            key={obj.id}
            className={slideIndex === index + 1 ? "slide active-anim" : "slide"}
          >
            <img src={process.env.PUBLIC_URL + `/Imgs/img${index + 1}.jpg`} />
          </div>
        );
      })}
    </div>
  );
}
