import React, { useEffect, useState } from "react";
import "./RecentCars.css";
// import { products } from "../../products";
import RecentCar from "./RecentCar/RecentCar";
import { publicRequest } from "../../requestMethods";
function RecentCars({ title, items }) {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  // Fetch recent products
  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      const fetched = await publicRequest.get("/car");
      setCars(fetched.data.data.cars);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  return !loading ? (
    <div className="recent__cars">
      <h1>{title}</h1>
      <div className="products__container">
        {cars?.map((car) => (
          <RecentCar key={car.id} car={car} />
        ))}
      </div>
    </div>
  ) : (
    <div className="loader" style={{ marginTop: "100px", textAlign: "center" }}>
      <h1>Loading...</h1>
    </div>
  );
}

export default RecentCars;
