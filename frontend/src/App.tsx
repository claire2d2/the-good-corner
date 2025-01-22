import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";

import "./App.css";

function App() {
	return (
		<>
			<div className="w-full h-[10%]">
				<NavBar />
			</div>
			<div className="w-full h-[80%]">
				<Home />
			</div>
			<div className="w-full h-[10%]">
				<Footer />
			</div>
		</>
	);
}

export default App;
