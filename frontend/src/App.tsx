import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

import "./App.css";

function App() {
	return (
		<>
			<div className="w-full h-[5%]">
				<NavBar />
			</div>
			<div className="w-full h-[90%]">
				<Outlet />
			</div>
			<div className="w-full h-[5%]">
				<Footer />
			</div>
		</>
	);
}

export default App;
