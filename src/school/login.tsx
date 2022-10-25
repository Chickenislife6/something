import React, { useEffect, useRef, useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import { DropdownButton } from 'react-bootstrap';
import { ClassChecker } from './get_class';
import { Link } from "react-router-dom";

const Login = () => {
    const [Counter, setCounter] = useState<number>(0);
    const [ClassNums, setClassNums] = useState('');
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [Action, setAction] = useState<string>('select action');
    const [Repeat, setRepeat] = useState<boolean>(false);
    const [Ip, setIp] = useState("https://aaaaa.fly.dev");
    const [Time, setTime] = useState(Math.floor(Date.now()/1000).toString());

   return (
    <div>
        <h1>Please Login</h1>
        <form
            onSubmit={e => {
            e.preventDefault();
            console.log("SUBMITTED!");
            }}
        >
        <Link to={"/class_checker/user="+Username+"/pw="+Password}>
            {/* <Raindrops /> */}
            <button className="button">go to class checker</button>
            <button type="submit">login!</button>
        </Link>  
        <input placeholder='username' value={Username} onChange={(e) => {(setUsername(e.target.value));}}/>
        <input placeholder='password' value={Password} onChange={(e) => {(setPassword(e.target.value));}}/>
        
      </form>
    </div>
  );
};

export { Login }