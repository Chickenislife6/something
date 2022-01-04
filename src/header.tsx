import { ReactElement, useState } from "react";
import React from 'react';
import { JsxAttribute, JsxElement, JsxExpression } from "typescript";
import { Link } from "react-router-dom";

interface props {
    children?: ReactElement<any, any> | never[];
}

const WebsiteBanner: React.FC<props> = (props) => {
    const [showChildren, setshowChildren] = useState<Boolean>(false);
    const [Redirect, setRedirect] = useState<Boolean>(false);
    const [PoolContract, setPoolContract] = useState('');

    return <div>
        <Link to={"pool/"+PoolContract}>
            <button onClick={() => {showChildren ? setshowChildren(false): setshowChildren(true)}}>show website</button>
        </Link>
        <button onClick={() => {Redirect ? setRedirect(false): setRedirect(true)}}>go to youtube</button>
        <input onChange={(e) => {setPoolContract(e.target.value)}} value={PoolContract}></input>

        { Redirect && <meta http-equiv = "refresh" content = "0; url = https://www.youtube.com" /> }
    </div>
}
export {WebsiteBanner}