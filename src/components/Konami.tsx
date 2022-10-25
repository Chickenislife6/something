import { useEffect } from "react";

interface props {
    party: React.Dispatch<React.SetStateAction<boolean>>
}

const Konami: React.FC<props> = (props) => {
    useEffect(() => {
        let konami = [ "Enter", "a", "b", "ArrowRight", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowDown", "ArrowDown", "ArrowUp", "ArrowUp"]
        document.addEventListener('keydown', function(e) {
            console.log(e.key);
            if (e.key === konami.pop()) {
                if (konami.length === 0) {
                    props.party(true);
                    console.log("HOORAY!");
                }
            } else {
                konami = [ "Enter", "a", "b", "ArrowRight", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowDown", "ArrowDown", "ArrowUp", "ArrowUp"]
            }
        })
    })

    return <div></div>
}
export { Konami }