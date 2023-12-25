import React, { useEffect, useState } from "react";
import "./RecentCar.css";
import currencyFormatter from "currency-formatter";
import { Link } from "react-router-dom";
import * as timeago from "timeago.js";
import { useSelector } from "react-redux";
function RecentProduct({ car }) {
  const user = useSelector((state) => state.user);

  return (
    <Link>
      <div className="recent__car">
        <img src={car.image} />

        <div>
          <div className="title">
            <p>
              {" "}
              {car.category.length > 12
                ? car.category.slice(0, 12) + "..."
                : car.category}
            </p>
          </div>
        </div>
        <div className="product__from">
          <p>
            {car.model.length > 20 ? car.model.slice(0, 20) + "..." : car.model}
          </p>
          <p>{timeago.format(car.createdAt)}</p>
        </div>
        <div>
          <div className="title">
            <p>
              {" "}
              {car.registrationNo.length > 12
                ? car.registrationNo.slice(0, 12) + "..."
                : car.registrationNo}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default RecentProduct;
