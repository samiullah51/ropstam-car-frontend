import "./Cars.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { userRequest } from "../../requestMethods";
import { Link } from "react-router-dom";
import { useState } from "react";
function SingleItem({ car }) {
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);

  // since added car
  let carDate = new Date().toLocaleString("en-US", {
    day: "numeric",
    year: "numeric",
    month: "long",
  });
  // handle delete
  const handleDelete = async (id) => {
    const confirmation = window.confirm(
      "This car will be deleted parmanently."
    );
    if (confirmation) {
      try {
        const cars = await userRequest.delete(`/car/delete/${id}`);
        alert("car Deleted Successfully!!!");
      } catch (err) {
        console.log(err.response.data);
      }
    }
  };

  const [formData, setFormData] = useState({
    category: car.category,
    model: car.model,
    madeIn: car.madeIn,
    registrationNo: car.registrationNo,
  });

  const handleSubmit = async (id) => {
    try {
      // Send the form data to the backend API
      const response = await userRequest.put(`/car/edit/${id}`, formData);

      // Reset form state after successful submission
      setFormData({
        category: "",
        model: "",
        madeIn: "",
        registrationNo: "",
      });
      setModal(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <div className="single__item">
      {modal && (
        <div className="modal">
          <form onSubmit={() => handleSubmit(car._id)}>
            <p>Update Car</p>
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

            <div className="btns">
              <button
                className="cancel"
                type="button"
                onClick={() => setModal(false)}
              >
                Cancel
              </button>
              <button className="submit" type="submit">
                {loading ? "Loading..." : "Update"}
              </button>
            </div>
          </form>
        </div>
      )}
      <img src={car.image} />
      <p className="title">{car.category}</p>

      <p className="price">{car.madeIn}</p>
      <p className="condition">{car.model}</p>

      <p className="status">{car.registrationNo}</p>
      <p className="createdAt" style={{ fontSize: "13px" }}>
        {carDate}
      </p>
      <div className="actions">
        <DeleteOutlineIcon onClick={() => handleDelete(car._id)} />

        <Link onClick={() => setModal(true)}>
          <EditIcon />
        </Link>
      </div>
    </div>
  );
}

export default SingleItem;
