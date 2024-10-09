import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { RouterProvider } from "react-router-dom";
import { AppRoute } from "./app.route";
import { theme } from "./config/mantine.config";

function App() {
	return (
		<MantineProvider theme={theme}>
			<RouterProvider router={AppRoute} />
		</MantineProvider>
	);
}

export default App;
