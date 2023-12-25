import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./MyCars.css";
import SalesItems from "../../components/cars/Cars";
import Cars from "../../components/cars/Cars";
function MyCars() {
  return (
    <>
      <Navbar />
      <div className="cars">
        <Cars />
      </div>
    </>
  );
}

export default MyCars;
