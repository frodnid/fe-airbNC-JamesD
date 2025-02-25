import { useContext, useEffect } from "react";
import { Route, Routes } from "react-router";
import * as api from "./api";
import Feed from "./components/Feed";
import NavBar from "./components/NavBar";
import PropertySpotlight from "./components/PropertySpotlight";
import { UserContext } from "./contexts/UserContext";
import "@coreui/coreui/dist/css/coreui.min.css";

function App() {
	//Users could be hardcoded for demo purposes, but this gives an easier springboard into future auth functionality
	const { setUser } = useContext(UserContext);
	useEffect(() => {
		api.getUser().then((userData) => {
			setUser(userData);
		});
	}, []);
	return (
		<>
			<h1>Welcome to AirBNC</h1>
			<NavBar />
			<Routes>
				<Route path="/" element={<Feed />} />
				<Route path="/properties/:id" element={<PropertySpotlight />} />
			</Routes>
		</>
	);
}

export default App;
