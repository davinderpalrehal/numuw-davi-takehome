import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../state/store.ts";
import Therapist from "../views/Therapist.tsx";
import Parent from "../views/Parent.tsx";

function Dashboard() {
  const [isTherapist, setTherapist] = React.useState(true);
  const user = useSelector((state: RootState) => state.user);
  return (
    <>
      <header className="top-bar">
        <img className="top-bar__logo" src={""} alt="Numuw logo" />
        <div className="top-bar__user-section">
          <img src="" alt="User avatar" />
        </div>
      </header>
      <h1>{JSON.stringify(user)}</h1>
      {isTherapist ? <Therapist /> : <Parent />}

    </>
  );
}

export default Dashboard;
