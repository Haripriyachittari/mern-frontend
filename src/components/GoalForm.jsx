import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createGoal } from "../features/goals/goalSlice";

const GoalForm = () => {
  const [goal, setGoal] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createGoal({ goal }));
    setGoal("");
  };
  return (
    <section className="form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="goal">Goal</label>
          <input
            placeholder="Add a goal..."
            id="goal"
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block">Add Goal</button>
        </div>
      </form>
    </section>
  );
};

export default GoalForm;
