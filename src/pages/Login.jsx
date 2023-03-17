import React, { useEffect, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { googleLogin, login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import { useGoogleLogin } from "@react-oauth/google";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, isSuccess, user, message } = useSelector(
    (State) => State.auth
  );
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
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

    const user = {
      email,
      password,
    };
    dispatch(login(user));
  };
  const socialLogin = useGoogleLogin({
    onSuccess: (response) => {
      dispatch(googleLogin(response.access_token));
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
      toast.success(" Logged in Successfully ");
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
          <FaSignInAlt />
          Login
        </h4>
        <p>Please log into your account</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
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
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
        <h2>OR</h2>
        <section>
          <button onClick={socialLogin} className="btngoogle btn-block">
            {" "}
            <span>
              <FcGoogle size={26} />
            </span>{" "}
            Log in with Google{" "}
          </button>
        </section>
        <section>
          <p>
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{ textDecoration: "underline", fontWeight: "bold" }}
            >
              Register Now
            </Link>
          </p>
        </section>
      </section>
    </>
  );
};

export default Login;
