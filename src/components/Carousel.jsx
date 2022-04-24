import React, { Component } from 'react';

import Slider from 'react-slick';

import heroSliderData from '../assets/fake-data/hero-slider';

// import img1 from "../assets/images/slider/slide_1.jpg"

export default class Carousel extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      // speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      pauseOnHover: true
    };

    return <div className='carousel'>
      <Slider {...settings}>
        <div>
          <img src={require("../assets/images/slider/slide_1.jpg")} alt="" className='slide-img' />
        </div>
        <div>
          <img src={require("../assets/images/slider/slide_2.jpg")} alt="" className='slide-img' />
        </div>
        <div>
          <img src={require("../assets/images/slider/slide_3.jpg")} alt="" className='slide-img' />
        </div>
        <div>
          <img src={require("../assets/images/slider/slide_4.jpg")} alt="" className='slide-img' />
        </div>
      </Slider>

    </div>;
  }
}
