import { ReactElement, useState } from "react";
import React from 'react';
import { Link } from "react-router-dom";

interface props {
    children?: ReactElement<any, any> | never[];
}

const Home: React.FC<props> = (props) => {
    const [Redirect, setRedirect] = useState<Boolean>(false);
    const [PoolContract, setPoolContract] = useState('');

    return <div>
        <Link to={"pool/"+ (PoolContract !== '' ? PoolContract: '0x83abecf7204d5afc1bea5df734f085f2535a9976')}>
            <button>get pool information</button>
        </Link>
        <input placeholder="enter pool contract address" onChange={(e) => {setPoolContract(e.target.value)}} value={PoolContract}></input>

        <button onClick={() => {setRedirect(!Redirect)}}>go to youtube</button>
        { Redirect && <meta http-equiv = "refresh" content = "0; url = https://www.youtube.com/watch?v=dQw4w9WgXcQ" /> }


    </div>
}
export {Home}