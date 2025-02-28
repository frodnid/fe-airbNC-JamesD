import { useContext, useRef } from "react";
import { SearchContext } from "../contexts/Context";

export default function SearchBar() {
	const searchTerm = useRef(null);
	const { setSearch } = useContext(SearchContext);

	return (
		<div id="search-bar">
			<label htmlFor="search-term">Search</label>
			<input
				type="text"
				name="search-term"
				id="search-term"
				placeholder="enter location or property"
				onChange={(e) => {
					searchTerm.current = e.target.value;
				}}
			/>
			<button
				id="search-icon"
				onClick={() => {
					if (searchTerm === "") {
						setSearch(null);
					} else {
						setSearch(searchTerm.current);
					}
				}}
			>
				🔍
			</button>
		</div>
	);
}
