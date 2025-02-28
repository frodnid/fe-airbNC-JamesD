import { CCard, CCardSubtitle, CCardTitle } from "@coreui/react";
import { useContext, useRef } from "react";
import * as api from "../api";
import { UserContext } from "../contexts/Context";

export default function UserProfile() {
	const { user, setUser, bookings, favourites } = useContext(UserContext);
	console.log("favourites:", favourites);
	console.log("bookings:", bookings);
	const formRef = useRef(null);
	if (!user) return null;
	return (
		<div id="profile-container">
			<img
				id="profile-hero"
				src={user.avatar}
				alt={`user avatar for user: ${user.user_id}`}
			/>
			<form
				ref={formRef}
				onSubmit={(e) => {
					e.preventDefault();

					const formData = new FormData(formRef.current);
					const userUpdate = Object.fromEntries(formData);
					api.patchUser(user.user_id, userUpdate).then(({ user }) => {
						setUser(user);
					});
				}}
			>
				<input
					name="first_name"
					type="text"
					defaultValue={user.first_name}
				/>
				<input name="surname" type="text" defaultValue={user.surname} />
				<input name="email" type="text" defaultValue={user.email} />
				<input
					name="phone"
					type="text"
					defaultValue={user.phone_number}
				/>
				<input name="avatar" type="text" defaultValue={user.avatar} />
				<input type="submit" />
			</form>

			<div id="profile-bookings">
				<h3>Upcoming Bookings:</h3>
				{bookings.current.map((booking) => {
					return (
						<CCard key={booking.booking_id}>
							<CCardTitle>{booking.property_name}</CCardTitle>
							<CCardSubtitle>
								{`${booking.check_in_date.slice(
									0,
									10
								)} - ${booking.check_out_date.slice(0, 10)}`}
							</CCardSubtitle>
						</CCard>
					);
				})}
			</div>
		</div>
	);
}
