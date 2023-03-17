import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import GoalForm from "../components/GoalForm";

import { getAllGoals, reset } from "../features/goals/goalSlice";
import Spinner from "../components/Spinner";
import GoalItem from "../components/GoalItem";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { isError, isLoading, message, goals } = useSelector(
    (state) => state.goals
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (isError) {
      console.log(message);
    }

    dispatch(getAllGoals());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch, isError, message]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <section className="heading">
        <h2>
          <span style={{ fontWeight: "lighter" }}>Welcome</span>{" "}
          {user && user.name.charAt(0).toUpperCase() + user.name.slice(1)}
        </h2>
        <p>Goals Dashboard</p>
      </section>
      <GoalForm />
      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </section>
    </>
  );
};

export default Dashboard;
