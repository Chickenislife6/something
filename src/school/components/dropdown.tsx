import "./dropdown.css";
import React, { useEffect, useState } from "react";

type DropDownProps = {
  elts: string[];
  updateParent: Function;
};

const DropDown: React.FC<DropDownProps> = ({
  elts,
  updateParent,
}: DropDownProps): JSX.Element => {
  return (
    <form>
      <div className="dropdown">
        <a className="dropbtn">Dropdown</a>
        <div className="dropdown-content grid">
          {elts.map((elt) => {
            return (
              <button
                onClick={(e) => {
                  updateParent(elt);
                }}
              >
                {elt}
              </button>
            );
          })}
        </div>
      </div>
    </form>
  );
};

export default DropDown;
