import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UserProvider } from "./contexts/UserProvider.jsx";
import { BrowserRouter } from "react-router";
import { SearchProvider } from "./contexts/SearchProvider.jsx";

createRoot(document.getElementById("root")).render(
	<UserProvider>
		<SearchProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</SearchProvider>
	</UserProvider>
);
