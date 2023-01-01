import { useEffect, useState } from "react";
import { getCart, getClassData } from "./cartHook";
import "./login.css";

interface props {
  username: string;
  password: string;
}

const Child = (props: props) => {
  const [Subject, setSubject] = useState("COMP");
  const [Response, setResponse] = useState<{
    [_ in number]: [string, string, string, string];
  }>({});

  return (
    <div>
      <h1>hello {props.username}!</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          let resp = await getCart(props.username, props.password, Subject);
          setResponse(JSON.parse(resp));
          console.log(resp);
        }}
      >
        <input
          type="text"
          placeholder="subject"
          onChange={(e) => {
            setSubject(e.target.value);
          }}
          value={Subject}
        ></input>
        <button>Check Subject</button>
      </form>
      {Object.entries(Response).map(
        ([key, [name, open, reserved, waitlist]], i) => {
          if (open === "0/0") {
            return;
          }
          return (
            <div key={i.toString() + " Class"} className="row">
              <div className="col-25">{key}</div>
              <div className="col-50">{name}</div>
              <div className="col-10">{open}</div>
              <div className="col-10">{reserved}</div>
              <div className="col-10">{waitlist}</div>
            </div>
          );
        }
      )}
    </div>
  );
};

export { Child };
