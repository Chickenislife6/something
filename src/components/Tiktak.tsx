import "./tiktak.css";

interface props {
    url: string;
}

const TikTak: React.FC<props> = (props) => {
    return <div className="tiktak">
            <img src={props.url} alt="tak"></img>
        </div>
}
export { TikTak }