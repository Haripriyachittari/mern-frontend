import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset, googleRegister } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import { useGoogleLogin } from "@react-oauth/google";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, isSuccess, user, message } = useSelector(
    (State) => State.auth
  );

  console.log(isLoading, isError, isSuccess, user, message);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password1: "",
  });
  const { name, email, password, password2 } = formData;
  // useEffect()
  const onChange = (e) => {
    e.preventDefault();
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };
  const socialRegister = useGoogleLogin({
    onSuccess: (response) => {
      dispatch(googleRegister(response.access_token));
    },
    onError: (error) => {
      console.log(error);
    },
  });
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
      toast.success("Successfully registered");
    }
    dispatch(reset());
  }, [isLoading, isSuccess, user, isError, dispatch, message, navigate]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h4>
          <FaUser />
          Register
        </h4>
        <p>Please create an account</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              id="name"
              className="form-control"
              name="name"
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              id="email"
              className="form-control"
              name="email"
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              id="password"
              className="form-control"
              name="password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Enter your password again"
              value={password2}
              id="password2"
              className="form-control"
              name="password2"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
        <h2>OR</h2>
        <section>
          <button onClick={socialRegister} className="btngoogle btn-block">
            {" "}
            <span>
              <FcGoogle size={26} />
            </span>{" "}
            Sign up with Google
          </button>
        </section>
        <section>
          <p>
            Already have an account{" "}
            <Link
              to="/login"
              style={{ textDecoration: "underline", fontWeight: "bold" }}
            >
              Login now
            </Link>
          </p>
        </section>
      </section>
    </>
  );
};

export default Register;
