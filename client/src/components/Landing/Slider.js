import "./Slider.css";
import React from "react";
import "./Slider.css";
import { FaGithub } from "react-icons/fa";
const Slider = (props) => {
  return (
    <div id="projects" className="featuredProjects">
      <div className="featuredText">
        <h1 className="featuredTitle">
          Featured Projects
        </h1>
        <p className="featuredDescription">
            Real world applications utilizing GitBook services
        </p>
      </div>
      <div className="sliderContainer">
        <div id="main-slider-container">
          <div id="slider">
            {props.slides.map((slide, index) => {
              return (
                <div className="slider-card" key={index}>
                  <p className="slider-card-title">/{slide.projectName}</p>
                  <p className="slider-card-description">
                    {slide.projectDescription}
                  </p>

                  <a
                    className="git"
                    target="_blank"
                    rel="noreferrer"
                    href={slide.projectRepo}
                  >
                    <FaGithub />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
