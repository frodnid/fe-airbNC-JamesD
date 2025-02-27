import { useState } from "react";

export default function StarRadio({ rating, setRating }) {
	const [hover, setHover] = useState(0);

	return (
		<span>
			{[1, 2, 3, 4, 5].map((starValue) => {
				return (
					<span
						key={starValue}
						style={{
							cursor: "pointer",
							fontSize: "2rem",
							color:
								starValue <= (hover || rating)
									? "gold"
									: "lightgray",
						}}
						onClick={() => setRating(starValue)}
						onMouseEnter={() => setHover(starValue)}
						onMouseLeave={() => setHover(0)}
					>
						&#9733;
					</span>
				);
			})}
		</span>
	);
}
