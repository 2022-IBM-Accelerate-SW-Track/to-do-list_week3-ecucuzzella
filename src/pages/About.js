import React, { Component } from "react";
import "./About.css";
import profilePicture from "../assets/profilePicture.png";

export default class About extends Component {
  render() {
    return (
      <div>
        {/* <p>Design your About me page </p> */}
        <div class="split left">
          <div className="centered">
            <img
              className="profile_image"
              src={profilePicture}
              alt="Profile Pic"
            ></img>
          </div>
        </div>
        <div className="split right">
          <div className="centered">
            <div className="name_title">Elizabeth Cucuzzella</div>
            <div className="brief_description">
              I am a Data Science major with a concentration in Environmental Science and a Mathematics major at Tufts University in the School of Engineering. 
              I currently am working as a Digital Intern with TRC on utility and sustainability data analytics.
              In my spare time I love to read and am an avid skater (both figure skating and roller skating.)
              My favorite music is indie pop and my favorite band is Misterwives.
            </div>
          </div>
        </div>
      </div>
    );
  }
}
