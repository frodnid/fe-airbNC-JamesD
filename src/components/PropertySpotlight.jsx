import { useState, useEffect, useRef, useContext } from "react";
import { useParams } from "react-router";
import * as api from "../api";
import { CCarousel, CCarouselItem, CImage } from "@coreui/react";
import ReviewList from "./ReviewList";
import { UserContext } from "../contexts/UserContext";
import FavouriteToggle from "./FavouriteToggle";
import "../index.css";
import BookingCalendar from "./BookingCalendar";

export default function PropertySpotlight() {
	const { id: propertyID } = useParams();
	const { user } = useContext(UserContext);
	const [userLoaded, setUserLoaded] = useState(false);
	const [property, setProperty] = useState(null);
	const [bookings, setBookings] = useState(null);
	const imgIndex = useRef(0);

	useEffect(() => {
		if (user) {
			setUserLoaded(true);
		}
	}, [user]);

	useEffect(() => {
		if (userLoaded) {
			Promise.all([
				api.getProperty(propertyID, user.user_id),
				api.getPropertyBookings(propertyID),
			]).then(([propertiesData, bookingsData]) => {
				setProperty(propertiesData);
				setBookings(bookingsData);
			});
		} else {
			return;
		}
	}, [userLoaded]);

	if (property === null) return <div>Loading...</div>;

	const {
		property_name: name,
		location,
		price_per_night: price,
		description,
		host,
		host_avatar: hostImg,
		favourited,
		images,
	} = property;

	return (
		<div id="property-spotlight">
			<h2 id="property-title">{name}</h2>
			<div id="property-info-subtitle">
				<div id="property-location">{location}</div>
				<div id="property-price">
					<span id="price">£{price}</span>
					<span id="per-night">/night</span>
				</div>
			</div>
			<div className="card" id="carousel-wrapper">
				<CCarousel controls indicators dark interval="false">
					{images.map((image) => {
						return (
							<CCarouselItem key={imgIndex.current++}>
								<CImage
									className="d-block w-100"
									src={image}
									alt={`slide-${imgIndex.current}`}
								/>
							</CCarouselItem>
						);
					})}
				</CCarousel>
			</div>

			<span id="property-description">{description}</span>
			<FavouriteToggle
				propertyID={propertyID}
				userID={user.user_id}
				favourited={favourited}
			/>

			<BookingCalendar bookings={bookings} id={propertyID} />
			<ReviewList id={propertyID} />
		</div>
	);
}
