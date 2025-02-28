import axios from "axios";
//Default to user 2 for guest
export function getUser(id = 2) {
	return axios
		.get(`https://airbnb-esque.onrender.com/api/users/${id}`)
		.then(({ data: { user } }) => user);
}

export function getUserBookings(id = 2) {
	return axios
		.get(`https://airbnb-esque.onrender.com/api/users/${id}/bookings`)
		.then(({ data: { bookings } }) => bookings);
}

export function getUserFavourites(id = 2) {
	return axios
		.get(`https://airbnb-esque.onrender.com/api/users/${id}/favourites`)
		.then(({ data: { favourites } }) => favourites);
}
//

export function getProperties(params) {
	return axios
		.get("https://airbnb-esque.onrender.com/api/properties/", {
			params,
		})
		.then(({ data: { properties } }) => properties);
}

export function getProperty(propertyID, userID) {
	return axios
		.get(`https://airbnb-esque.onrender.com/api/properties/${propertyID}`, {
			params: { user_id: userID },
		})
		.then(({ data: { property } }) => property);
}

export function getPropertyBookings(id) {
	return axios
		.get(`https://airbnb-esque.onrender.com/api/properties/${id}/bookings`)
		.then(({ data: { bookings } }) => bookings);
}

export function getReviews(id) {
	return axios
		.get(`https://airbnb-esque.onrender.com/api/properties/${id}/reviews`)
		.then(({ data }) => data);
}

export function postFavourite(propertyID, userID) {
	return axios
		.post(
			`https://airbnb-esque.onrender.com/api/properties/${propertyID}/favourite`,
			{ guest_id: userID }
		)
		.then((res) => {
			return res.data.favourite_id;
		});
}

export function deleteFavourite(id) {
	return axios.delete(
		`https://airbnb-esque.onrender.com/api/favourites/${id}`
	);
}

export function postBooking(propertyID, booking) {
	return axios
		.post(
			`https://airbnb-esque.onrender.com/api/properties/${propertyID}/booking`,
			booking
		)
		.catch((err) => {
			console.log(err);
		});
}

export function postReview(propertyID, review) {
	return axios.post(
		`https://airbnb-esque.onrender.com/api/properties/${propertyID}/reviews`,
		review
	);
}

export function patchUser(id, userInfo) {
	return axios
		.patch(`https://airbnb-esque.onrender.com/api/users/${id}`, userInfo)
		.then(({ data }) => data);
}
