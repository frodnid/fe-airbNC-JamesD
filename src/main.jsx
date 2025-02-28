import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";
import { SearchProvider } from "./contexts/SearchProvider.jsx";
import { UserProvider } from "./contexts/UserProvider.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
	<UserProvider>
		<SearchProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</SearchProvider>
	</UserProvider>
);
