import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import RecentCars from "../../components/RecentProducts/RecentCars";
function Home() {
  return (
    <>
      <Navbar />
      <RecentCars title="Recent Products" items={10} />
      <Footer />
    </>
  );
}

export default Home;
