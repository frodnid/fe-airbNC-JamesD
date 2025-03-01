import { useState } from "react";
import { SearchContext } from "./Context";

export function SearchProvider({ children }) {
	const [search, setSearch] = useState(null);

	return (
		<SearchContext.Provider value={{ search, setSearch }}>
			{children}
		</SearchContext.Provider>
	);
}
