import { useContext, useRef } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { postBooking } from "../api";
import { UserContext } from "../contexts/Context";

export default function FinalBooking() {
	const { user, bookings } = useContext(UserContext);
	const { propertyID } = useParams();
	const [searchParams] = useSearchParams();
	const checkIn = searchParams.get("check_in_date");
	const checkOut = searchParams.get("check_out_date");
	const checkInRef = useRef(null);
	const checkOutRef = useRef(null);
	const navigate = useNavigate();

	return (
		<div>
			{user.user_id} is reserving a booking at property {propertyID} from{" "}
			{checkIn} to {checkOut}.
			<form
				onSubmit={(e) => {
					e.preventDefault();
					const booking = {
						guest_id: user.user_id,
						check_in_date: checkInRef.current.value,
						check_out_date: checkOutRef.current.value,
					};

					postBooking(propertyID, booking).then(() => {
						bookings.current.push({
							property_id: Number(propertyID),
							check_in_date: checkInRef.current.value,
							check_out_date: checkOutRef.current.value,
						});
						navigate("/thank-you");
					});
				}}
			>
				<input ref={checkInRef} type="date" defaultValue={checkIn} />
				<input ref={checkOutRef} type="date" defaultValue={checkOut} />
				<input type="submit" value="Book now" />
			</form>
		</div>
	);

	//parse prop id, user id, check in, check out
	//create form and populate with existing date data
	//on submit, post request to api
	//on successfull post, redirect to thank-you-page
}
