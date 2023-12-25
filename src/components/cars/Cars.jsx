import React, { useEffect, useState } from "react";
import "./Cars.css";
import SingleItem from "./Car";
import { userRequest } from "../../requestMethods";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useSelector } from "react-redux";

function Cars() {
  const [cars, setCars] = useState([]);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const user = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    category: "",
    model: "",
    madeIn: "",
    registrationNo: "",
    image: null,
  });
  const [image, setImage] = useState(null);
  const [showImg, setShowImg] = useState(null);

  const handleChange = (file) => {
    if (file) {
      setImage(file);
      setShowImg(URL.createObjectURL(file));
      setFormData({ ...formData, image: file });
    }
  };
  const fetchCars = async () => {
    try {
      const result = await userRequest.get(`/car/${user._id}`);
      setCars(result.data.data.cars);
    } catch (error) {
      console.log(error);
      // Handle error
    }
  };
  useEffect(() => {
    fetchCars();
  }, []);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("userId", user._id); // Assuming userId is defined somewhere
      formDataToSend.append("category", formData.category);
      formDataToSend.append("model", formData.model);
      formDataToSend.append("madeIn", formData.madeIn);
      formDataToSend.append("registrationNo", formData.registrationNo);
      formDataToSend.append("image", formData.image); // Append the image file

      // Send the form data to the backend API
      const response = await userRequest.post("/car", formDataToSend);

      // Reset form state after successful submission
      setFormData({
        category: "",
        model: "",
        madeIn: "",
        registrationNo: "",
        imageFile: null,
      });
      setImage(null);
      setShowImg(null);
      setModal(false);
      fetchCars();
      setLoading(false);
    } catch (error) {
      // Handle error
      setError("Error adding new car");
      setLoading(false);
    }
  };

  return (
    <div className="my__cars">
      {/* Modal -- form for adding a new car */}
      {modal && (
        <div className="modal">
          <form onSubmit={handleSubmit}>
            <p>Add a new Car</p>
            <span onClick={() => setModal(false)}>X</span>

            <div className="single__input">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                <option value="Bus">Bus</option>
                <option value="Car">Car</option>
                <option value="Bike">Bike</option>
                <option value="Truck">Truck</option>
              </select>
            </div>

            <div className="single__input">
              <label htmlFor="model">Model</label>
              <input
                type="text"
                id="model"
                value={formData.model}
                onChange={(e) =>
                  setFormData({ ...formData, model: e.target.value })
                }
              />
            </div>

            <div className="single__input">
              <label htmlFor="madeIn">MadeIn</label>
              <input
                type="text"
                id="madeIn"
                value={formData.madeIn}
                onChange={(e) =>
                  setFormData({ ...formData, madeIn: e.target.value })
                }
              />
            </div>

            <div className="single__input">
              <label htmlFor="registrationNo">Registration No</label>
              <input
                type="text"
                id="registrationNo"
                value={formData.registrationNo}
                onChange={(e) =>
                  setFormData({ ...formData, registrationNo: e.target.value })
                }
              />
            </div>

            <label htmlFor="file">
              <div className="pick__image">
                {image !== null ? (
                  <img src={showImg} alt="Selected" />
                ) : (
                  <AddAPhotoIcon />
                )}
              </div>
              <input
                type="file"
                id="file"
                onChange={(e) => handleChange(e.target.files[0])}
                style={{ display: "none" }}
              />
            </label>

            <div className="btns">
              <button
                className="cancel"
                type="button"
                onClick={() => setModal(false)}
              >
                Cancel
              </button>
              <button className="submit" type="submit">
                {loading ? "Loading..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="top__cars__header">
        <h1>My Cars ({cars.length})</h1>
        <button onClick={() => setModal(true)}>Add New Car</button>
      </div>

      {/* Single item */}
      <div className="items">
        {cars.map((car) => (
          <SingleItem key={car._id} car={car} />
        ))}
      </div>
    </div>
  );
}

export default Cars;
