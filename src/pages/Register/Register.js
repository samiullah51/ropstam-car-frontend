import React, { useState } from "react";
import { publicRequest } from "../../requestMethods";
import "./Register.css";
import { loader } from "../../loader";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Register() {
  const [firstName, setfirstName] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setlastName] = useState("");

  // loading
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // Error
  const [error, setError] = useState("");

  // User Registration
  const handleRegistration = async () => {
    if (!firstName || !lastName || !email) {
      setError("Please Fill The Required Fields");
      return false;
    } else {
      try {
        setLoading(true);
        const newUser = await publicRequest.post("/user/register", {
          firstName,
          lastName,
          email,
        });
        setLoading(false);
        setError("");
        navigate("/login");
      } catch (err) {
        setLoading(false);
        setError(err.response?.data?.data?.error);
      }
    }
  };

  return (
    <div className="register">
      <div className="overlay">
        <div className="register__form">
          {error && (
            <div className="error__box">
              <p>{error}</p>
            </div>
          )}

          <h2 className="logo">RopStamCar</h2>
          <p className="desc">Register Yourself</p>
          {/* inputs */}
          <div className="inputs">
            <div className="inputs__box">
              <p>First Name</p>
              <input
                type="text"
                placeholder="Example"
                value={firstName}
                onChange={(e) => setfirstName(e.target.value)}
                autoFocus
              />
            </div>
            <div className="inputs__box">
              <p>Email</p>
              <input
                type="text"
                placeholder="someone@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="inputs__box">
              <p>lastName</p>
              <input
                type="lastName"
                placeholder="••••••••"
                value={lastName}
                onChange={(e) => setlastName(e.target.value)}
              />
            </div>

            <p style={{ fontSize: "13px", color: "var(--primary-color)" }}>
              By clicking Sign Up, you agree to our Terms, Privacy Policy and
              Cookies Policy. You may receive SMS notifications from us and can
              opt out at any time.
            </p>
            {/* Form Footer */}
            <div className="form__footer">
              <button onClick={handleRegistration}>
                {loading ? (
                  <img src={loader} width={15} height={15} />
                ) : (
                  "Register Now"
                )}
              </button>
              <p>
                Already have an account?{" "}
                <Link to="/login" style={{ color: "dodgerblue" }}>
                  Login
                </Link>{" "}
                here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
