import { useContext, useState, useRef, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router";

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
			<span>This is a search bar</span>

			<img id="nav-bar-avatar" src={avatar} alt={`user avatar`} />
		</nav>
	);
}
