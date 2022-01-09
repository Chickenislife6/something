
import { Link } from "react-router-dom";

interface props {
    ButtonStyle: string;
}

const ReturnToHome: React.FC<props> = (props) => {
    return <div>
        <Link to='/'>
            <button className={props.ButtonStyle}>Return to home</button>
        </Link>
    </div>
}
export { ReturnToHome }