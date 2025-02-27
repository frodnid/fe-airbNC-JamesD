import { useContext, useState, useRef, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router";
import SearchBar from "./SearchBar";

export default function NavBar() {
	const { user } = useContext(UserContext);
	const [avatar, setAvatar] = useState(
		"src/assets/landscape-placeholder.svg"
	);
	const id = useRef(null);

	useEffect(() => {
		if (user) {
			setAvatar(user.avatar);
			id.current = user.user_id;
		}
	}, [user]);
	return (
		<nav id="main-nav-bar">
			<Link to="/">Home</Link>
			<SearchBar />
			<div
				className="avatar-container"
				style={{
					backgroundImage: `url(${avatar})`,
					backgroundSize: "3rem",
				}}
			></div>
		</nav>
	);
}
