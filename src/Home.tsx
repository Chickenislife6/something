import { ReactElement, useEffect, useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import "./home.css";
import "./navigation.css";
import { FancyText } from "./components/fancytext";

interface props {
  children?: ReactElement<any, any> | never[];
}

const Home: React.FC<props> = (props) => {
  const [Redirect, setRedirect] = useState<Boolean>(false);
  const [PoolContract, setPoolContract] = useState("");

  useEffect(() => {
    const parallax = document.getElementById("parallax");
    // Parallax Effect for DIV 1
    // FUNKY
    if (parallax) {
      window.addEventListener("scroll", function () {
        let offset = window.pageYOffset;
        parallax.style.backgroundPositionY = offset * 0.7 + "px";
      });
    }
  }, []);

  return (
    <div>
      <FancyText />
      <body>
        <div className="parallax-item" id="parallax">
          <input
            placeholder="enter uniswap pool address"
            onChange={(e) => {
              setPoolContract(e.target.value);
            }}
            value={PoolContract}
          ></input>
          <Link
            to={
              "pool/" +
              (PoolContract !== ""
                ? PoolContract
                : "0x83abecf7204d5afc1bea5df734f085f2535a9976")
            }
          >
            <button className="button purple">get pool information</button>
          </Link>
        </div>
        <div className="center parallax-item">
          <Link to="class_checker">
            {/* <Raindrops /> */}
            <button className="button">go to class checker</button>
          </Link>
        </div>
        <div className="center parallax-item"></div>
        <div className="center parallax-item">
          <button
            onClick={() => {
              setRedirect(!Redirect);
            }}
          >
            go to youtube
          </button>
          {Redirect && (
            <meta
              http-equiv="refresh"
              content="0; url = https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            />
          )}
        </div>
      </body>
      <div className="border1">
        <Link
          to={
            "pool/" +
            (PoolContract !== ""
              ? PoolContract
              : "0x83abecf7204d5afc1bea5df734f085f2535a9976")
          }
        >
          <button>get pool information</button>
        </Link>
      </div>
    </div>
  );
};
export { Home };
