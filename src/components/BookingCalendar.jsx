import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router";

export default function BookingCalendar({ bookings, id }) {
	const [dateRange, setDateRange] = useState([null, null]);
	const navigate = useNavigate();
	const bookedTimes = bookings.map((booking) => {
		return [
			new Date(booking.check_in_date).getTime(),
			new Date(booking.check_out_date).getTime(),
		];
	});

	return (
		<form
			id="booking-calendar"
			onSubmit={(e) => {
				e.preventDefault();
				if (dateRange.includes(null)) {
					alert("Please select a valid date range");
					return;
				}
				const dateStrings = dateRange.map((date) =>
					date.toISOString().slice(0, 10)
				);
				navigate(
					`/properties/${id}/booking?check_in_date=${dateStrings[0]}&check_out_date=${dateStrings[1]}`
				);
			}}
		>
			<h3>Book your stay:</h3>
			<Calendar
				selectRange={true}
				minDate={new Date(Date.now())}
				minDetail="year"
				tileDisabled={({ date }) => {
					for (let i = 0; i < bookedTimes.length; i++) {
						const time = date.getTime();
						const checkIn = bookedTimes[i][0];
						const checkOut = bookedTimes[i][1];

						if (checkIn <= time && time <= checkOut) {
							return true;
						}
					}

					return false;
				}}
				onChange={(value) => {
					setDateRange(value);
				}}
			/>
			<input
				type="submit"
				name="booking-calendar-submit"
				id="booking-calendar-submit"
				value="Reserve booking"
			/>
		</form>
	);
}
