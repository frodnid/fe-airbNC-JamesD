import { useState, useRef } from "react";
import { UserContext } from "./Context";

export function UserProvider({ children }) {
	const [user, setUser] = useState(null);
	const favourites = useRef([]);
	const bookings = useRef([]);

	return (
		<UserContext.Provider value={{ user, setUser, favourites, bookings }}>
			{children}
		</UserContext.Provider>
	);
}
