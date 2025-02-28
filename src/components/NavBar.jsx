import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { UserContext } from "../contexts/Context";
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

	if (!user) return null;
	return (
		<nav id="main-nav-bar">
			<Link to="/">Home</Link>
			<SearchBar />
			<Link to={`/users/${user.user_id}`}>
				<div
					className="avatar-container"
					style={{
						backgroundImage: `url(${avatar})`,
						backgroundSize: "3rem",
					}}
				/>
				<span style={{ fontSize: "0.6rem" }}>View Profile</span>
			</Link>
		</nav>
	);
}
