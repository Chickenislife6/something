import { useEffect, useState } from "react";
import "./tiktak.css";

interface props {
    url: string;
    alt: string;
}

const TikTak: React.FC<props> = (props) => {
    const [seconds, setSeconds] = useState(0);
    const [Tak, setTak] = useState(false);

    useEffect(() => {
        setInterval(() => {
            setSeconds(seconds => seconds + 1);
        }, 1000)
    }, []);
      
    if (seconds > 3) {
        setSeconds(0);
        setTak(!Tak);
    }
    return <div className="tiktak">
            {Tak ? <img src={props.url} alt="tak"></img> : <img src={props.alt} alt="tak"></img>}
            
        </div>
}
export { TikTak }