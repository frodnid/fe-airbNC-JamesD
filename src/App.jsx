import "@coreui/coreui/dist/css/coreui.min.css";
import { useContext, useEffect } from "react";
import { Route, Routes } from "react-router";
import * as api from "./api";
import Feed from "./components/Feed";
import FinalBooking from "./components/FinalBooking";
import NavBar from "./components/NavBar";
import PropertySpotlight from "./components/PropertySpotlight";
import ThankYouPage from "./components/ThankYouPage";
import UserProfile from "./components/UserProfile";
import { UserContext } from "./contexts/Context";

function App() {
	//Users could be hardcoded for demo purposes, but this gives an easier springboard into future auth functionality
	const { setUser, favourites, bookings } = useContext(UserContext);

	useEffect(() => {
		api.getUser()
			.then((userData) => {
				setUser(userData);
			})
			.then(() => {
				return Promise.all([
					api.getUserFavourites(),
					api.getUserBookings(),
				]);
			})
			.then(([userFavourites, userBookings]) => {
				favourites.current = userFavourites;
				bookings.current = userBookings;
			});
	}, []);
	return (
		<>
			<h1>Welcome to AirBNC</h1>
			<NavBar />
			<Routes>
				<Route path="/" element={<Feed />} />
				<Route path="/users/:id" element={<UserProfile />} />
				<Route path="/properties/:id" element={<PropertySpotlight />} />
				<Route
					path="/properties/:propertyID/booking"
					element={<FinalBooking />}
				/>
				<Route path="/thank-you" element={<ThankYouPage />} />
			</Routes>
		</>
	);
}

export default App;
