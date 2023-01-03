import React, { useEffect, useRef, useState } from "react";
import { Child } from "./child";
import "./login.module.css";

const Login = () => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [Render, setRender] = useState(false);

  if (Render) {
    return <Child username={Username} password={Password} />;
  }

  return (
    <div className="container">
      <form
        onSubmit={(e) => {
          setRender(true);
          e.preventDefault();
        }}
      >
        <div className="row">
          <div className="col-25">
            <label>ONYEN Login</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              placeholder="username"
              value={Username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label>ONYEN Password</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              placeholder="password"
              value={Password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <button className="button">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export { Login };
