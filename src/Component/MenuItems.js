import {
    useState,
    useEffect,
    useRef
} from "react";
import { useHistory } from 'react-router';
import Dropdown from "./Dropdown";

const MenuItems = ({
    items,
    depthLevel
}) => {
    const [dropdown, setDropdown] = useState(false);
    const history = useHistory();
    let ref = useRef();

    useEffect(() => {
        const handler = (event) => {
            if (dropdown && ref.current && !ref.current.contains(event.target)) {
                setDropdown(false);
            }
        };
        document.addEventListener("mousedown", handler);
        document.addEventListener("touchstart", handler);
        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", handler);
            document.removeEventListener("touchstart", handler);
        };
    }, [dropdown]);

    const onMouseEnter = () => {
        window.innerWidth > 960 && setDropdown(true);
    };

    const onMouseLeave = () => {
        window.innerWidth > 960 && setDropdown(false);
    };

    return (
        <li className="menu-items"
            ref={ref}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={() => {
                console.log("button", items?.title)
                if (items?.title === "Custom") {
                    history.push("/custom")
                }
                if(items?.title === "notification")
                {
                    history.push("/notification")
                }
                if (items?.title === "Plan") {
                    history.push("/price")
                }
                if (items?.title === "account") {
                    history.push("/profile")
                }
                if (items?.title === "Download") {
                    history.push("/post")
                }
            }}
        >
            {
                items.submenu ? (
                    <>
                        <button type="button" aria-haspopup="menu" aria-expanded={dropdown ? "true" : "false"}
                            onClick={() => setDropdown((prev) => !prev)} >
                            {
                                items.title
                            } {
                                " "
                            } {
                                depthLevel > 0 ? <span> </span> : <span className="arrow" />
                            } </button> <Dropdown depthLevel={
                                depthLevel
                            }
                                submenus={
                                    items.submenu
                                }
                                dropdown={
                                    dropdown
                                }
                        /> </>
                ) : (
                    <a>
                        {items.title}
                    </a>

                )
            } </li>
    );
};

export default MenuItems;
