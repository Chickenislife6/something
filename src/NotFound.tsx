import { useParams } from "react-router";

const NotFound = () => {
    const { route } = useParams<string>();

    return <div>
        <h1>ERROR 404: endpoint: {route} was not found on the server</h1>
    </div>
}
export { NotFound }