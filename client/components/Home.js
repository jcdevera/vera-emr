import React, {Component} from 'react';
import img from "../src/images/vera-emr.gif";

const Home = () => {
  return(
    <div className="home">
      <img className="mainlogo" src={img}/>
      <strong><h1>Have a vera good day.</h1></strong>
    </div>
  )
}
export default Home;
