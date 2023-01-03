import { useEffect, useState } from "react";
import { getCart, getClassData } from "./cartHook";
import "./login.module.css";
import "./dropdown.css";
import { sortObject } from "./util/sortedList";
import DropDown from "./components/dropdown";
import { attributes } from "./data/data";

interface props {
  username: string;
  password: string;
}

const Child = (props: props) => {
  const [Subject, setSubject] = useState("COMP");
  const [Attribute, setAttribute] = useState("");
  const [Response, setResponse] = useState<{
    [_ in number]: [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ];
  }>({});
  const [Waiting, setWaiting] = useState(false);
  return (
    <div>
      <h1>hello {props.username}!</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setWaiting(true);
          let resp = await getCart(
            props.username,
            props.password,
            Subject,
            Attribute
          );
          setWaiting(false);
          console.log(resp);
          setResponse(JSON.parse(resp));
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
        {/* <DropDown
          updateParent={setAttribute}
          elts={Object.values(attributes)}
        /> */}
        <input
          width="80%"
          type="text"
          placeholder="attribute"
          onChange={(e) => {
            setAttribute(e.target.value);
          }}
          value={Attribute}
        ></input>
        <button disabled={Waiting}>Check Subject</button>
      </form>

      {sortObject({ obj: Response, sort: "COURSENUM" }).map(
        (
          [key, [name, open, reserved, waitlist, time, prof, desc, attr]],
          i
        ) => {
          if (
            (open === "0/0" && reserved === "0/0") ||
            (prof === "Staff" && time === "TBA")
          ) {
            return;
          }
          let open_seats =
            Number(open.split("/")[0]) + Number(reserved.split("/")[0]);
          let style =
            open_seats > 0
              ? "green"
              : Number(waitlist.split("/")[0]) > 0
              ? "orange"
              : "red";

          return (
            <div key={i.toString() + " Class"} className={"row " + style}>
              <div className="col-10">{key}</div>
              <div className="col-40">{name}</div>
              <div className="col-10">{time}</div>
              <div className="col-10">{prof}</div>
              <div className="col-10">{open}</div>
              <div className="col-10">{reserved}</div>
              <div className="col-10">{waitlist}</div>
              <div className="dropdown">
                <button className="dropbtn">Dropdown</button>
                <div className="dropdown-content">
                  <a>{desc}</a>
                  <a>{attr}</a>
                </div>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};

export { Child };
