import axios from "axios";

export function getUser() {
	return axios
		.get("https://airbnb-esque.onrender.com/api/users/2")
		.then(({ data: { user } }) => {
			return {
				...user,
				favouritePropertyIDs: [],
				bookedPropertyIDs: [],
			};
		});
}

export function getProperties(params) {
	return axios
		.get("https://airbnb-esque.onrender.com/api/properties/", {
			params,
		})
		.then(({ data: { properties } }) => properties);
}

export function getProperty(id) {
	return axios
		.get(`https://airbnb-esque.onrender.com/api/properties/${id}`)
		.then(({ data: { property } }) => property);
}

export function getReviews(id) {
	return axios
		.get(`https://airbnb-esque.onrender.com/api/properties/${id}/reviews`)
		.then(({ data }) => data);
}
